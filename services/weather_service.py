"""
services/weather_service.py
────────────────────────────
Tool: get_weather(city) → WeatherData

Tries the real OpenWeatherMap API first.
Falls back to realistic mock data if the key is missing / request fails.
"""

import httpx
from dataclasses import dataclass
from utils.logger import get_logger
from config import settings

logger = get_logger("services.weather")

OWMAP_URL = "https://api.openweathermap.org/data/2.5/weather"


@dataclass
class WeatherData:
    city: str
    temperature_c: float      # Celsius
    humidity_pct: float       # 0-100
    rain_mm_per_hr: float     # mm/hour
    description: str
    source: str               # "live" | "mock"


# ── Mock data per Indian city ─────────────────────────────────────────────────
_MOCK: dict[str, dict] = {
    "mumbai":    {"temp": 32, "humidity": 88, "rain": 12.5, "desc": "heavy rain"},
    "delhi":     {"temp": 42, "humidity": 30, "rain": 0.0,  "desc": "clear sky (heatwave)"},
    "bangalore": {"temp": 27, "humidity": 70, "rain": 2.0,  "desc": "light rain"},
    "hyderabad": {"temp": 38, "humidity": 45, "rain": 0.0,  "desc": "sunny"},
    "chennai":   {"temp": 36, "humidity": 80, "rain": 5.0,  "desc": "moderate rain"},
    "pune":      {"temp": 30, "humidity": 65, "rain": 8.0,  "desc": "moderate rain"},
    "kolkata":   {"temp": 35, "humidity": 85, "rain": 15.0, "desc": "very heavy rain"},
    "jaipur":    {"temp": 44, "humidity": 20, "rain": 0.0,  "desc": "heatwave"},
}


async def get_weather(city: str) -> WeatherData:
    """
    Fetch live weather for *city*.  Falls back to mock when key absent.
    """
    city_key = city.lower().strip()

    if settings.WEATHER_API_KEY and settings.WEATHER_API_KEY != "your-openweathermap-key-here":
        try:
            async with httpx.AsyncClient(timeout=8) as client:
                resp = await client.get(
                    OWMAP_URL,
                    params={"q": city, "appid": settings.WEATHER_API_KEY, "units": "metric"},
                )
                resp.raise_for_status()
                data = resp.json()

                rain_mm = 0.0
                if "rain" in data:
                    rain_mm = data["rain"].get("1h", data["rain"].get("3h", 0.0))

                logger.info(f"[weather] live data fetched for {city}")
                return WeatherData(
                    city=city,
                    temperature_c=data["main"]["temp"],
                    humidity_pct=data["main"]["humidity"],
                    rain_mm_per_hr=rain_mm,
                    description=data["weather"][0]["description"],
                    source="live",
                )
        except Exception as exc:
            logger.warning(f"[weather] live fetch failed for {city}: {exc}. Using mock.")

    # ── Mock fallback ─────────────────────────────────────────────────────────
    mock = _MOCK.get(city_key, {"temp": 30, "humidity": 60, "rain": 0.0, "desc": "clear"})
    logger.debug(f"[weather] mock data served for {city!r}")
    return WeatherData(
        city=city,
        temperature_c=mock["temp"],
        humidity_pct=mock["humidity"],
        rain_mm_per_hr=mock["rain"],
        description=mock["desc"],
        source="mock",
    )
