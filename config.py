"""
config.py
─────────
Centralised settings loaded from the .env file via Pydantic-Settings.
Import `settings` anywhere in the app instead of calling os.getenv() directly.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # ── Core ──────────────────────────────────────────────────────────────────
    APP_ENV: str = "development"
    SECRET_KEY: str = "change-me-in-production"

    # ── Database ──────────────────────────────────────────────────────────────
    DATABASE_URL: str = "sqlite+aiosqlite:///./gigshield.db"

    # ── External API keys ─────────────────────────────────────────────────────
    OPENAI_API_KEY: str = ""
    WEATHER_API_KEY: str = ""
    AQI_API_KEY: str = ""
    FAST2SMS_API_KEY: str = ""

    # ── OpenAI model ─────────────────────────────────────────────────────────
    OPENAI_MODEL: str = "gpt-4o-mini"

    # ── Trigger thresholds ────────────────────────────────────────────────────
    RAIN_THRESHOLD_MM: float = 10.0   # mm/hr → heavy rain
    AQI_THRESHOLD: int = 200          # AQI index → unhealthy
    HEAT_THRESHOLD_C: float = 40.0    # °C → heatwave

    # ── Background monitor ────────────────────────────────────────────────────
    MONITOR_INTERVAL_SECONDS: int = 60   # how often the monitor loop runs


# Singleton – import this everywhere
settings = Settings()
