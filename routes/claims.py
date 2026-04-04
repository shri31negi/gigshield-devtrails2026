from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from database.db import get_db
from models.claim import Claim
from utils.auth import get_current_user

router = APIRouter()

class ClaimCreate(BaseModel):
    policy_id: int
    trigger_type: str
    trigger_city: str
    payout_amount: float

@router.get("/")
async def get_my_claims(current=Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Claim).where(Claim.user_id == current["user_id"]))
    return result.scalars().all()

@router.post("/")
async def file_claim(body: ClaimCreate, current=Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    claim = Claim(user_id=current["user_id"], **body.model_dump())
    db.add(claim)
    await db.commit()
    await db.refresh(claim)
    return claim