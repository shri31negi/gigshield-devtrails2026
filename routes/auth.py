from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from jose import jwt
from datetime import datetime, timedelta, timezone
from database.db import get_db
from models.user import User
from config import settings
import random, string
import httpx

router = APIRouter()
otp_store: dict[str, str] = {}  # use Redis in production

class PhoneRequest(BaseModel):
    phone: str

class OTPVerify(BaseModel):
    phone: str
    otp: str
    role: str = "worker"

def create_token(user_id: int, role: str) -> str:
    payload = {
        "sub": str(user_id),
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(days=7)
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

@router.post("/send-otp")
async def send_otp(req: PhoneRequest):
    otp = "".join(random.choices(string.digits, k=6))
    otp_store[req.phone] = otp
    
    # Log OTP for development
    print(f"🔐 OTP for {req.phone}: {otp}")
    
    # Send real SMS via Fast2SMS
    async with httpx.AsyncClient() as client:
        await client.post(
            "https://www.fast2sms.com/dev/bulkV2",
            headers={"authorization": settings.FAST2SMS_API_KEY},
            json={
                "route": "otp",
                "variables_values": otp,
                "numbers": req.phone,
            }
        )
    
    return {"message": "OTP sent", "dev_otp": otp if settings.APP_ENV == "development" else None}

@router.post("/verify-otp")
async def verify_otp(req: OTPVerify, db: AsyncSession = Depends(get_db)):
    stored = otp_store.get(req.phone)
    if not stored or stored != req.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    result = await db.execute(select(User).where(User.phone == req.phone))
    user = result.scalar_one_or_none()

    if not user:
        # Auto-create on first login; full profile filled via onboarding
        user = User(name="New Worker", phone=req.phone, city="Unknown", platform="other")
        db.add(user)
        await db.commit()
        await db.refresh(user)

    del otp_store[req.phone]
    token = create_token(user.id, req.role)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user.id,
        "role": req.role,
        "is_onboarded": user.city != "Unknown"
    }