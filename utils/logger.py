"""
utils/logger.py
───────────────
Centralised structured logger for the entire GigShield backend.
Import `logger` from this module instead of using print().
"""

import logging
import sys
from logging.handlers import RotatingFileHandler

# ── Formatter ─────────────────────────────────────────────────────────────────
LOG_FORMAT = "[%(asctime)s] %(levelname)-8s %(name)-25s │ %(message)s"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

formatter = logging.Formatter(fmt=LOG_FORMAT, datefmt=DATE_FORMAT)


def _make_handler(stream=sys.stdout) -> logging.StreamHandler:
    h = logging.StreamHandler(stream)
    h.setFormatter(formatter)
    return h


def _make_file_handler(path: str = "gigshield.log") -> RotatingFileHandler:
    h = RotatingFileHandler(path, maxBytes=5 * 1024 * 1024, backupCount=3)
    h.setFormatter(formatter)
    return h


def get_logger(name: str) -> logging.Logger:
    """Return a named logger with console + rotating file output."""
    log = logging.getLogger(name)
    if not log.handlers:
        log.setLevel(logging.DEBUG)
        log.addHandler(_make_handler())
        log.addHandler(_make_file_handler())
        log.propagate = False
    return log


# ── Default app-level logger ──────────────────────────────────────────────────
logger = get_logger("gigshield")
