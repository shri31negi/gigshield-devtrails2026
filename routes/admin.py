from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from database.db import get_db
from models.user import User
from models.claim import Claim
from models.policy import Policy
from utils.auth import require_admin

router = APIRouter()

@router.get("/workers")
async def get_all_workers(admin=Depends(require_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    return result.scalars().all()

@router.get("/claims")
async def get_all_claims(admin=Depends(require_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Claim).order_by(Claim.created_at.desc()))
    return result.scalars().all()

@router.get("/stats")
async def get_stats(admin=Depends(require_admin), db: AsyncSession = Depends(get_db)):
    workers = await db.scalar(select(func.count(User.id)))
    policies = await db.scalar(select(func.count(Policy.id)).where(Policy.status == "active"))
    claims = await db.scalar(select(func.count(Claim.id)))
    total_payouts = await db.scalar(select(func.sum(Claim.payout_amount)).where(Claim.status == "paid")) or 0
    return {"total_workers": workers, "active_policies": policies,
            "total_claims": claims, "total_payouts": total_payouts}