"""
agents/claims_agent.py
───────────────────────
Listens for "trigger.fired" events.
Finds all affected active policies and auto-creates + pays claims.
"""

from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.db import AsyncSessionLocal
from models.policy import Policy
from models.claim import Claim
from models.trigger import Trigger
from services.payment_service import process_payment
from utils.logger import get_logger

logger = get_logger("agents.claims")


class ClaimsAgent:

    async def handle_trigger(self, payload: dict) -> None:
        """Handler registered with event_bus for 'trigger.fired'."""
        trigger_type = payload["trigger_type"]
        city         = payload["city"]
        trigger_id   = payload["trigger_id"]
        observed     = payload["observed_value"]

        logger.info(f"[ClaimsAgent] handling trigger_id={trigger_id} {trigger_type} in {city}")

        async with AsyncSessionLocal() as db:
            # Find all active policies for workers in this city
            result = await db.execute(
                select(Policy)
                .join(Policy.user)
                .where(
                    Policy.status == "active",
                    Policy.user.has(city=city),
                )
            )
            policies = result.scalars().all()

            if not policies:
                logger.info(f"[ClaimsAgent] no active policies in {city}, skipping")
                return

            logger.info(f"[ClaimsAgent] found {len(policies)} policies to process in {city}")

            for policy in policies:
                await self._process_claim(db, policy, trigger_type, city, observed)

            # Mark trigger as processed
            trigger = await db.get(Trigger, trigger_id)
            if trigger:
                trigger.is_processed = True
                trigger.processed_at = datetime.now(timezone.utc)
                await db.commit()

    async def _process_claim(self, db: AsyncSession, policy: Policy,
                              trigger_type: str, city: str, observed: float) -> None:
        # Calculate payout from policy triggers config
        payout = self._calculate_payout(policy, trigger_type)
        if payout <= 0:
            logger.debug(f"[ClaimsAgent] policy {policy.id} has no {trigger_type} trigger, skip")
            return

        # Create claim
        claim = Claim(
            user_id=policy.user_id,
            policy_id=policy.id,
            trigger_type=trigger_type,
            trigger_city=city,
            payout_amount=payout,
            status="pending",
            ai_notes=f"Auto-triggered: {trigger_type} observed={observed:.1f}",
        )
        db.add(claim)
        await db.commit()
        await db.refresh(claim)
        logger.info(f"[ClaimsAgent] claim {claim.id} created — ₹{payout} for user {policy.user_id}")

        # Process payment immediately
        result = await process_payment(policy.user_id, payout, reason=trigger_type)

        claim.status = "paid" if result.success else "rejected"
        claim.processed_at = datetime.now(timezone.utc)
        claim.ai_notes += f" | txn={result.transaction_id}"
        await db.commit()
        logger.info(f"[ClaimsAgent] claim {claim.id} → {claim.status}")

    def _calculate_payout(self, policy: Policy, trigger_type: str) -> float:
        """Look up payout_pct from this policy's trigger config."""
        for t in policy.triggers:
            if t.get("type") == trigger_type:
                pct = t.get("payout_pct", 0)
                return round(policy.coverage_amount * pct / 100, 2)
        return 0.0