from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from database.db import get_db
from models.user import User
from utils.auth import get_current_user

router = APIRouter()

class UserCreate(BaseModel):
    name: str
    phone: str
    city: str
    platform: str
    email: str | None = None

class UserUpdate(BaseModel):
    name: str | None = None
    city: str | None = None
    email: str | None = None

@router.post("/")
async def register_user(body: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.phone == body.phone))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Phone already registered")
    user = User(**body.model_dump())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

@router.get("/me")
async def get_me(current=Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == current["user_id"]))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.patch("/me")
async def update_me(body: UserUpdate, current=Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == current["user_id"]))
    user = result.scalar_one_or_none()
    for field, value in body.model_dump(exclude_none=True).items():
        setattr(user, field, value)
    await db.commit()
    await db.refresh(user)
    return user