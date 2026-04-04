"""
models/user.py
──────────────
SQLAlchemy ORM model for a gig worker (Zomato, Swiggy, etc.).
"""

from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.db import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    phone: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    city: Mapped[str] = mapped_column(String(80), nullable=False)
    platform: Mapped[str] = mapped_column(
        SAEnum("zomato", "swiggy", "blinkit", "zepto", "other", name="platform_enum"),
        nullable=False,
    )
    email: Mapped[str | None] = mapped_column(String(200), nullable=True)
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    # ── Relationships ─────────────────────────────────────────────────────────
    policies: Mapped[list["Policy"]] = relationship(  # noqa: F821
        "Policy", back_populates="user", cascade="all, delete-orphan"
    )
    claims: Mapped[list["Claim"]] = relationship(  # noqa: F821
        "Claim", back_populates="user", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} name={self.name!r} city={self.city!r}>"
