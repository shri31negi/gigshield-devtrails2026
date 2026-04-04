from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from database.db import get_db
from models.policy import Policy
from utils.auth import get_current_user

router = APIRouter()

class PolicyCreate(BaseModel):
    coverage_amount: float
    weekly_premium: float
    triggers: list[dict] = []

@router.get("/")
async def get_my_policies(current=Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Policy).where(Policy.user_id == current["user_id"]))
    return result.scalars().all()

@router.post("/")
async def create_policy(body: PolicyCreate, current=Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    policy = Policy(user_id=current["user_id"], **body.model_dump())
    db.add(policy)
    await db.commit()
    await db.refresh(policy)
    return policy

@router.get("/{policy_id}")
async def get_policy(policy_id: int, current=Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Policy).where(Policy.id == policy_id, Policy.user_id == current["user_id"]))
    policy = result.scalar_one_or_none()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    return policy