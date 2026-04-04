"""
utils/helpers.py
────────────────
Shared utility functions used across agents, services, and routes.
"""

from datetime import datetime, timezone
from uuid import uuid4


def now_utc() -> datetime:
    """Return current UTC time (timezone-aware)."""
    return datetime.now(timezone.utc)


def generate_id() -> str:
    """Generate a short unique identifier."""
    return str(uuid4())


def rupees(amount: float) -> str:
    """Format a float as Indian Rupees string, e.g. ₹1,234.50"""
    return f"₹{amount:,.2f}"


def clamp(value: float, lo: float, hi: float) -> float:
    """Clamp value between lo and hi."""
    return max(lo, min(hi, value))
