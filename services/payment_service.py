"""
services/payment_service.py
────────────────────────────
Tool: process_payment(user_id, amount, reason)

Simulates a payment gateway (Razorpay / UPI style).
In production replace the _simulate_transfer() stub with a real SDK call.
"""

import asyncio
import random
from dataclasses import dataclass
from datetime import datetime, timezone

from utils.logger import get_logger

logger = get_logger("services.payment")


@dataclass
class PaymentResult:
    success: bool
    transaction_id: str
    amount: float
    user_id: int
    reason: str
    timestamp: datetime


async def process_payment(user_id: int, amount: float, reason: str) -> PaymentResult:
    """
    Simulate disbursing *amount* (₹) to *user_id*.

    Replace the body of _simulate_transfer() with a real payment SDK
    (e.g. razorpay.payout or UPI direct payout) for production use.
    """
    logger.info(f"[payment] initiating ₹{amount:.2f} payout to user {user_id} | reason={reason}")

    txn_id, ok = await _simulate_transfer(user_id, amount)

    result = PaymentResult(
        success=ok,
        transaction_id=txn_id,
        amount=amount,
        user_id=user_id,
        reason=reason,
        timestamp=datetime.now(timezone.utc),
    )

    if ok:
        logger.info(f"[payment] ✓ txn={txn_id} ₹{amount:.2f} → user {user_id}")
    else:
        logger.error(f"[payment] ✗ txn={txn_id} FAILED for user {user_id}")

    return result


async def _simulate_transfer(user_id: int, amount: float) -> tuple[str, bool]:
    """
    Mock UPI/Razorpay transfer.
    Simulates ~95 % success rate with a small random delay.
    """
    await asyncio.sleep(random.uniform(0.1, 0.4))   # network latency simulation

    success = random.random() < 0.95               # 95 % success
    txn_id = f"GS-TXN-{user_id}-{random.randint(100000, 999999)}"
    return txn_id, success
