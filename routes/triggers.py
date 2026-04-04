from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.db import get_db
from models.trigger import Trigger
from utils.auth import get_current_user, require_admin

router = APIRouter()

@router.get("/")
async def get_recent_triggers(current=Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Last 50 triggers — visible to all logged-in users."""
    result = await db.execute(
        select(Trigger).order_by(Trigger.detected_at.desc()).limit(50)
    )
    return result.scalars().all()

@router.get("/active")
async def get_active_triggers(current=Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Unprocessed triggers only — for the disruption monitor screen."""
    result = await db.execute(
        select(Trigger).where(Trigger.is_processed == False)
        .order_by(Trigger.detected_at.desc())
    )
    return result.scalars().all()