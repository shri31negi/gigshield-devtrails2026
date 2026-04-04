"""
models/policy.py
────────────────
Insurance Policy model linked to a User.
Stores coverage amount, weekly premium, and JSON-encoded triggers.
"""

import json
from datetime import datetime, timezone
from sqlalchemy import String, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.db import Base


class Policy(Base):
    __tablename__ = "policies"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)

    # ── Coverage ──────────────────────────────────────────────────────────────
    coverage_amount: Mapped[float] = mapped_column(Float, nullable=False)  # ₹
    weekly_premium: Mapped[float] = mapped_column(Float, nullable=False)   # ₹

    # ── Triggers stored as JSON list of dicts ─────────────────────────────────
    # e.g. [{"type": "rain", "threshold": 10, "payout": 500}, ...]
    _triggers_json: Mapped[str] = mapped_column("triggers_json", Text, default="[]")

    # ── Policy lifecycle ──────────────────────────────────────────────────────
    status: Mapped[str] = mapped_column(
        String(20), default="active"
    )  # active | suspended | expired
    start_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )
    end_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # ── AI-generated summary text ─────────────────────────────────────────────
    ai_summary: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    # ── Relationships ─────────────────────────────────────────────────────────
    user: Mapped["User"] = relationship("User", back_populates="policies")  # noqa: F821
    claims: Mapped[list["Claim"]] = relationship(  # noqa: F821
        "Claim", back_populates="policy", cascade="all, delete-orphan"
    )

    # ── Hybrid property for triggers ──────────────────────────────────────────
    @property
    def triggers(self) -> list[dict]:
        return json.loads(self._triggers_json or "[]")

    @triggers.setter
    def triggers(self, value: list[dict]) -> None:
        self._triggers_json = json.dumps(value)

    def __repr__(self) -> str:
        return (
            f"<Policy id={self.id} user_id={self.user_id} "
            f"premium=₹{self.weekly_premium} status={self.status!r}>"
        )
