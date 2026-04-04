"""
models/trigger.py
─────────────────
Records each time a parametric trigger condition was detected by the
MonitoringAgent (e.g. heavy rain in Mumbai).
"""

from datetime import datetime, timezone
from sqlalchemy import String, Float, DateTime, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from database.db import Base


class Trigger(Base):
    __tablename__ = "triggers"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    # ── What fired ────────────────────────────────────────────────────────────
    trigger_type: Mapped[str] = mapped_column(
        String(50), nullable=False
    )  # "rain" | "aqi" | "heat"
    city: Mapped[str] = mapped_column(String(80), nullable=False, index=True)

    # ── Observed values at the time of the trigger ────────────────────────────
    observed_value: Mapped[float] = mapped_column(Float, nullable=False)
    threshold_value: Mapped[float] = mapped_column(Float, nullable=False)

    # ── Processing status ─────────────────────────────────────────────────────
    is_processed: Mapped[bool] = mapped_column(Boolean, default=False)

    detected_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        index=True,
    )
    processed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    def __repr__(self) -> str:
        return (
            f"<Trigger id={self.id} type={self.trigger_type!r} "
            f"city={self.city!r} processed={self.is_processed}>"
        )
