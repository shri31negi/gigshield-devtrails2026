"""
services/event_service.py
──────────────────────────
Lightweight async event bus that decouples MonitoringAgent from ClaimsAgent.

Usage
─────
    # Publisher (MonitoringAgent)
    await event_bus.emit("trigger.fired", payload)

    # Subscriber (ClaimsAgent registers at startup)
    event_bus.subscribe("trigger.fired", claims_agent.handle_trigger)
"""

import asyncio
from collections import defaultdict
from typing import Callable, Awaitable, Any

from utils.logger import get_logger

logger = get_logger("services.event_bus")

# Type alias: an async handler that receives the payload dict
Handler = Callable[[dict], Awaitable[None]]


class EventBus:
    """Simple in-process pub/sub event bus using asyncio queues."""

    def __init__(self) -> None:
        self._subscribers: dict[str, list[Handler]] = defaultdict(list)

    def subscribe(self, event: str, handler: Handler) -> None:
        """Register *handler* to be called whenever *event* is emitted."""
        self._subscribers[event].append(handler)
        logger.debug(f"[event_bus] subscribed {handler.__qualname__!r} → {event!r}")

    async def emit(self, event: str, payload: dict) -> None:
        """
        Fire *event* with *payload*.
        All handlers are awaited concurrently so slow handlers don't block each other.
        """
        handlers = self._subscribers.get(event, [])
        if not handlers:
            logger.debug(f"[event_bus] no subscribers for {event!r}")
            return

        logger.info(f"[event_bus] emitting {event!r} → {len(handlers)} handler(s)")

        # Run all handlers concurrently; gather exceptions so one failing
        # handler doesn't kill the others.
        results = await asyncio.gather(
            *[handler(payload) for handler in handlers],
            return_exceptions=True,
        )
        for handler, result in zip(handlers, results):
            if isinstance(result, Exception):
                logger.error(
                    f"[event_bus] handler {handler.__qualname__!r} raised: {result}"
                )


# ── Singleton instance used throughout the app ────────────────────────────────
event_bus = EventBus()
