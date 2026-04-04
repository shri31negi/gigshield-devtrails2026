"""
agents/policy_agent.py
───────────────────────
PolicyAgent — orchestrates policy creation for a user.

Flow
────
1. Call PricingAgent to get the computed premium.
2. Use LLM (or rule-based fallback) to generate 3 parametric triggers.
3. Persist the Policy to the database.
4. Return the created Policy ORM object.
"""

import json
from sqlalchemy.ext.asyncio import AsyncSession

from agents.pricing_agent import PricingAgent, PricingResult
from models.policy import Policy
from models.user import User
from config import settings
from utils.logger import get_logger

logger = get_logger("agents.policy")

# ── Singleton PricingAgent (stateless, safe to share) ─────────────────────────
_pricing_agent = PricingAgent()

# ── Default triggers if LLM is unavailable ────────────────────────────────────
_DEFAULT_TRIGGERS = [
    {
        "type": "rain",
        "description": "Heavy rain exceeding 10 mm/hr",
        "threshold": 10.0,
        "unit": "mm/hr",
        "payout_pct": 30,   # % of coverage per trigger event
    },
    {
        "type": "aqi",
        "description": "Air Quality Index above 200 (Unhealthy)",
        "threshold": 200,
        "unit": "AQI",
        "payout_pct": 20,
    },
    {
        "type": "heat",
        "description": "Heatwave — temperature above 40°C",
        "threshold": 40.0,
        "unit": "°C",
        "payout_pct": 25,
    },
]


class PolicyAgent:
    """
    Responsibility: Create and store an insurance policy for a gig worker.
    """

    def __init__(self) -> None:
        from openai import AsyncOpenAI
        self._client = (
            AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            if settings.OPENAI_API_KEY and settings.OPENAI_API_KEY != "sk-your-openai-key-here"
            else None
        )
        logger.info(
            f"[PolicyAgent] initialised — LLM={'enabled' if self._client else 'disabled (mock)'}"
        )

    # ── Public interface ──────────────────────────────────────────────────────
    async def create_policy(self, user: User, db: AsyncSession) -> Policy:
        """
        Generate and persist an insurance policy for *user*.

        Returns the saved Policy ORM object.
        """
        logger.info(f"[PolicyAgent] creating policy for user_id={user.id} city={user.city}")

        # Step 1: get dynamic premium via PricingAgent
        pricing: PricingResult = await _pricing_agent.compute_premium(user.city, user.platform)

        # Step 2: coverage amount = 52 × weekly premium (≈ 1 year) capped at ₹50k
        coverage = min(round(pricing.weekly_premium * 52, 2), 50_000.0)

        # Step 3: generate triggers via LLM or fallback
        triggers = await self._generate_triggers(user.city, user.platform, pricing)

        # Step 4: build AI summary
        summary = pricing.ai_explanation

        # Step 5: persist
        policy = Policy(
            user_id=user.id,
            coverage_amount=coverage,
            weekly_premium=pricing.weekly_premium,
            ai_summary=summary,
        )
        policy.triggers = triggers   # uses the @property setter

        db.add(policy)
        await db.commit()
        await db.refresh(policy)

        logger.info(
            f"[PolicyAgent] policy id={policy.id} created | "
            f"premium=₹{policy.weekly_premium} coverage=₹{policy.coverage_amount}"
        )
        return policy

    # ── Private helpers ───────────────────────────────────────────────────────
    async def _generate_triggers(
        self,
        city: str,
        platform: str,
        pricing: PricingResult,
    ) -> list[dict]:
        """Ask LLM to customise the 3 triggers for this city/platform."""
        if not self._client:
            return _DEFAULT_TRIGGERS

        prompt = (
            f"You are designing parametric insurance triggers for a {platform} delivery worker "
            f"in {city}, India. Current conditions: weather={pricing.weather.description}, "
            f"AQI={pricing.aqi.aqi} ({pricing.aqi.category}), "
            f"temp={pricing.weather.temperature_c:.0f}°C.\n\n"
            f"Generate exactly 3 triggers as a JSON array. Each element must have:\n"
            f'  "type": one of ["rain","aqi","heat"],\n'
            f'  "description": short human-readable description,\n'
            f'  "threshold": numeric threshold value,\n'
            f'  "unit": unit string,\n'
            f'  "payout_pct": integer percentage of coverage to pay out (5-40).\n\n'
            f"Return ONLY valid JSON, no explanation."
        )
        try:
            resp = await self._client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=400,
                temperature=0.3,
            )
            raw = resp.choices[0].message.content.strip()
            # strip markdown fences if present
            if raw.startswith("```"):
                raw = raw.split("```")[1]
                if raw.startswith("json"):
                    raw = raw[4:]
            triggers = json.loads(raw)
            if isinstance(triggers, list) and len(triggers) == 3:
                logger.info(f"[PolicyAgent] LLM generated {len(triggers)} triggers")
                return triggers
        except Exception as exc:
            logger.warning(f"[PolicyAgent] LLM trigger generation failed: {exc}")

        return _DEFAULT_TRIGGERS
