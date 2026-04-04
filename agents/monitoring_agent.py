"""
agents/monitoring_agent.py
───────────────────────────
Polls weather + AQI for all active cities every MONITOR_INTERVAL_SECONDS.
Fires events via event_bus when a threshold is breached.
"""

from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.db import AsyncSessionLocal
from models.user import User
from models.trigger import Trigger
from services.weather_service import get_weather
from services.aqi_service import get_aqi
from services.event_service import event_bus
from config import settings
from utils.logger import get_logger

logger = get_logger("agents.monitoring")


class MonitoringAgent:

    async def run(self) -> None:
        """Called by APScheduler every MONITOR_INTERVAL_SECONDS."""
        logger.info("[MonitoringAgent] tick started")
        async with AsyncSessionLocal() as db:
            cities = await self._get_active_cities(db)
            for city in cities:
                await self._check_city(city, db)
        logger.info(f"[MonitoringAgent] tick done — checked {len(cities)} cities")

    async def _get_active_cities(self, db: AsyncSession) -> list[str]:
        """Return distinct cities that have at least one active policy."""
        from models.policy import Policy
        result = await db.execute(
            select(User.city)
            .join(Policy, Policy.user_id == User.id)
            .where(Policy.status == "active")
            .distinct()
        )
        return [row[0] for row in result.all()]

    async def _check_city(self, city: str, db: AsyncSession) -> None:
        weather = await get_weather(city)
        aqi = await get_aqi(city)

        # Rain trigger
        if weather.rain_mm_per_hr >= settings.RAIN_THRESHOLD_MM:
            await self._fire(db, city, "rain",
                             observed=weather.rain_mm_per_hr,
                             threshold=settings.RAIN_THRESHOLD_MM)

        # Heat trigger
        if weather.temperature_c >= settings.HEAT_THRESHOLD_C:
            await self._fire(db, city, "heat",
                             observed=weather.temperature_c,
                             threshold=settings.HEAT_THRESHOLD_C)

        # AQI trigger
        if aqi.aqi >= settings.AQI_THRESHOLD:
            await self._fire(db, city, "aqi",
                             observed=float(aqi.aqi),
                             threshold=float(settings.AQI_THRESHOLD))

    async def _fire(self, db: AsyncSession, city: str,
                    trigger_type: str, observed: float, threshold: float) -> None:
        logger.warning(
            f"[MonitoringAgent] TRIGGER {trigger_type.upper()} in {city} "
            f"— observed={observed} threshold={threshold}"
        )
        # Save trigger record
        trigger = Trigger(
            trigger_type=trigger_type,
            city=city,
            observed_value=observed,
            threshold_value=threshold,
        )
        db.add(trigger)
        await db.commit()
        await db.refresh(trigger)

        # Emit event for ClaimsAgent to handle
        await event_bus.emit("trigger.fired", {
            "trigger_id": trigger.id,
            "trigger_type": trigger_type,
            "city": city,
            "observed_value": observed,
            "threshold_value": threshold,
        })