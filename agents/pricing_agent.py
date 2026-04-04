"""
agents/pricing_agent.py
────────────────────────
PricingAgent — uses OpenAI (or rule-based fallback) to compute a weekly
premium for a gig worker based on city, live weather, and AQI data.

Tool used: get_weather, get_aqi
LLM used : GPT-4o-mini (function-calling disabled; structured prompt instead)
"""

import json
from dataclasses import dataclass

from openai import AsyncOpenAI
from services.weather_service import get_weather, WeatherData
from services.aqi_service import get_aqi, AQIData
from config import settings
from utils.logger import get_logger
from utils.helpers import clamp

logger = get_logger("agents.pricing")

# ── Base premium table by platform (₹ / week) ─────────────────────────────────
_BASE_PREMIUM: dict[str, float] = {
    "zomato":  49.0,
    "swiggy":  49.0,
    "blinkit": 39.0,
    "zepto":   39.0,
    "other":   59.0,
}


@dataclass
class PricingResult:
    weekly_premium: float          # ₹
    base_premium: float            # ₹ before adjustments
    weather_loading: float         # ₹ added/subtracted for rain/heat
    aqi_loading: float             # ₹ added for bad air
    ai_explanation: str            # Human-readable AI reasoning
    weather: WeatherData
    aqi: AQIData


class PricingAgent:
    """
    Responsibility: Compute risk-adjusted weekly insurance premium.

    Flow
    ────
    1. Fetch live (or mock) weather + AQI for the city.
    2. Apply rule-based loading on top of base premium.
    3. If OpenAI key is present, ask LLM to validate / explain the premium.
    4. Return PricingResult.
    """

    def __init__(self) -> None:
        self._client: AsyncOpenAI | None = (
            AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            if settings.OPENAI_API_KEY and settings.OPENAI_API_KEY != "sk-your-openai-key-here"
            else None
        )
        logger.info(
            f"[PricingAgent] initialised — LLM={'enabled' if self._client else 'disabled (mock)'}"
        )

    # ── Public interface ──────────────────────────────────────────────────────
    async def compute_premium(self, city: str, platform: str) -> PricingResult:
        """Compute and return the weekly premium for a worker in *city*."""
        logger.info(f"[PricingAgent] computing premium | city={city} platform={platform}")

        weather = await get_weather(city)
        aqi     = await get_aqi(city)

        base      = _BASE_PREMIUM.get(platform.lower(), 49.0)
        w_load    = self._weather_loading(weather)
        a_load    = self._aqi_loading(aqi)
        premium   = clamp(base + w_load + a_load, 29.0, 299.0)

        explanation = await self._llm_explain(city, platform, weather, aqi, base, premium)

        result = PricingResult(
            weekly_premium=round(premium, 2),
            base_premium=base,
            weather_loading=round(w_load, 2),
            aqi_loading=round(a_load, 2),
            ai_explanation=explanation,
            weather=weather,
            aqi=aqi,
        )
        logger.info(
            f"[PricingAgent] premium=₹{result.weekly_premium} "
            f"(base=₹{base} + weather=₹{w_load} + aqi=₹{a_load})"
        )
        return result

    # ── Private helpers ───────────────────────────────────────────────────────
    def _weather_loading(self, w: WeatherData) -> float:
        """Rule-based weather risk loading."""
        loading = 0.0
        if w.rain_mm_per_hr >= settings.RAIN_THRESHOLD_MM:
            loading += 20.0 + (w.rain_mm_per_hr - settings.RAIN_THRESHOLD_MM) * 1.5
        if w.temperature_c >= settings.HEAT_THRESHOLD_C:
            loading += 15.0 + (w.temperature_c - settings.HEAT_THRESHOLD_C) * 2.0
        return round(loading, 2)

    def _aqi_loading(self, a: AQIData) -> float:
        """Rule-based AQI risk loading."""
        if a.aqi <= 100:   return 0.0
        if a.aqi <= 200:   return 10.0
        if a.aqi <= 300:   return 25.0
        return 40.0

    async def _llm_explain(
        self,
        city: str,
        platform: str,
        weather: WeatherData,
        aqi: AQIData,
        base: float,
        final: float,
    ) -> str:
        """Ask the LLM to write a short explanation of the premium. Falls back to rule text."""
        if not self._client:
            return (
                f"Rule-based premium: base ₹{base} adjusted for weather "
                f"({weather.description}, {weather.rain_mm_per_hr:.1f} mm/hr rain, "
                f"{weather.temperature_c:.0f}°C) and AQI {aqi.aqi} ({aqi.category})."
            )

        prompt = (
            f"You are an actuary for GigShield, an AI parametric insurance platform for Indian "
            f"gig delivery workers. Explain in 2-3 sentences why the weekly premium for a "
            f"{platform} worker in {city} is ₹{final:.2f} given: "
            f"weather={weather.description}, rain={weather.rain_mm_per_hr:.1f}mm/hr, "
            f"temp={weather.temperature_c:.0f}°C, AQI={aqi.aqi} ({aqi.category}). "
            f"Be concise and reassuring."
        )
        try:
            resp = await self._client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=120,
                temperature=0.4,
            )
            return resp.choices[0].message.content.strip()
        except Exception as exc:
            logger.warning(f"[PricingAgent] LLM call failed: {exc}")
            return f"Premium ₹{final:.2f} computed based on weather and AQI conditions in {city}."
