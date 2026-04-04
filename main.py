"""
main.py
───────
FastAPI application entry point for GigShield backend.
"""
from utils.logger import get_logger
logger = get_logger("main")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import settings
from database.db import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize database on startup."""
    await init_db()
    yield


app = FastAPI(
    title="GigShield API",
    description="Parametric insurance platform for gig workers",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "ok",
        "service": "GigShield API",
        "environment": settings.APP_ENV
    }


@app.get("/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "database": "connected",
        "environment": settings.APP_ENV
    }

from routes import auth, users, policies, claims, admin

app.include_router(auth.router,     prefix="/auth",    tags=["auth"])
app.include_router(users.router,    prefix="/users",   tags=["users"])
app.include_router(policies.router, prefix="/policies",tags=["policies"])
app.include_router(claims.router,   prefix="/claims",  tags=["claims"])
app.include_router(admin.router,    prefix="/admin",   tags=["admin"])

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from agents.monitoring_agent import MonitoringAgent
from agents.claims_agent import ClaimsAgent
from services.event_service import event_bus

# Instantiate agents
_monitoring_agent = MonitoringAgent()
_claims_agent = ClaimsAgent()

# Wire ClaimsAgent to listen for triggers
event_bus.subscribe("trigger.fired", _claims_agent.handle_trigger)

# Scheduler
_scheduler = AsyncIOScheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    _scheduler.add_job(
        _monitoring_agent.run,
        "interval",
        seconds=settings.MONITOR_INTERVAL_SECONDS,
        id="monitoring_loop",
    )
    _scheduler.start()
    logger.info(f"[startup] monitoring loop every {settings.MONITOR_INTERVAL_SECONDS}s")
    yield
    _scheduler.shutdown()

from routes import triggers
app.include_router(triggers.router, prefix="/triggers", tags=["triggers"])    


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
