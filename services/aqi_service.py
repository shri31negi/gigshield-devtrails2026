"""
services/aqi_service.py
───────────────────────
Tool: get_aqi(city) → AQIData

Tries the real AQICN (World Air Quality Index) API first.
Falls back to realistic mock data when key is missing or request fails.
"""

import httpx
from dataclasses import dataclass
from utils.logger import get_logger
from config import settings

logger = get_logger("services.aqi")

AQICN_URL = "https://api.waqi.info/feed/{city}/"


@dataclass
class AQIData:
    city: str
    aqi: int               # AQI index (0-500+)
    dominant_pollutant: str
    category: str          # Good / Moderate / Unhealthy / Hazardous
    source: str            # "live" | "mock"


def _categorise(aqi: int) -> str:
    if aqi <= 50:   return "Good"
    if aqi <= 100:  return "Moderate"
    if aqi <= 150:  return "Unhealthy for Sensitive Groups"
    if aqi <= 200:  return "Unhealthy"
    if aqi <= 300:  return "Very Unhealthy"
    return "Hazardous"


# ── Mock AQI data per Indian city ─────────────────────────────────────────────
_MOCK: dict[str, dict] = {
    "mumbai":    {"aqi": 160, "pollutant": "PM2.5"},
    "delhi":     {"aqi": 280, "pollutant": "PM2.5"},
    "bangalore": {"aqi": 85,  "pollutant": "PM10"},
    "hyderabad": {"aqi": 130, "pollutant": "PM2.5"},
    "chennai":   {"aqi": 95,  "pollutant": "NO2"},
    "pune":      {"aqi": 110, "pollutant": "PM2.5"},
    "kolkata":   {"aqi": 220, "pollutant": "PM2.5"},
    "jaipur":    {"aqi": 175, "pollutant": "PM10"},
}


async def get_aqi(city: str) -> AQIData:
    """Fetch live AQI for *city*.  Falls back to mock when key absent."""
    city_key = city.lower().strip()

    if settings.AQI_API_KEY and settings.AQI_API_KEY != "your-aqicn-key-here":
        try:
            url = AQICN_URL.format(city=city)
            async with httpx.AsyncClient(timeout=8) as client:
                resp = await client.get(url, params={"token": settings.AQI_API_KEY})
                resp.raise_for_status()
                data = resp.json()

                if data.get("status") == "ok":
                    aqi_val = int(data["data"]["aqi"])
                    dominant = data["data"].get("dominentpol", "PM2.5")
                    logger.info(f"[aqi] live data fetched for {city}")
                    return AQIData(
                        city=city,
                        aqi=aqi_val,
                        dominant_pollutant=dominant,
                        category=_categorise(aqi_val),
                        source="live",
                    )
        except Exception as exc:
            logger.warning(f"[aqi] live fetch failed for {city}: {exc}. Using mock.")

    # ── Mock fallback ─────────────────────────────────────────────────────────
    mock = _MOCK.get(city_key, {"aqi": 100, "pollutant": "PM2.5"})
    logger.debug(f"[aqi] mock data served for {city!r}")
    return AQIData(
        city=city,
        aqi=mock["aqi"],
        dominant_pollutant=mock["pollutant"],
        category=_categorise(mock["aqi"]),
        source="mock",
    )
