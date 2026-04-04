# GigShield Backend

AI-powered parametric insurance platform backend for India's gig economy workers.

## Overview

GigShield Backend is a FastAPI-based REST API that provides automated insurance claim processing using AI agents. The system monitors environmental conditions (weather, air quality) and automatically triggers insurance payouts when predefined thresholds are met.

## Features

- **AI-Powered Agents**: Automated claims processing, policy management, pricing, and monitoring
- **Real-time Monitoring**: Continuous tracking of weather and air quality conditions
- **Parametric Insurance**: Automatic claim triggers based on environmental data
- **OTP Authentication**: Secure phone-based authentication for workers
- **Event-Driven Architecture**: Asynchronous event handling for scalable operations
- **RESTful API**: Clean API design with comprehensive endpoints

## Tech Stack

- **Framework**: FastAPI
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **ORM**: SQLAlchemy with async support
- **AI**: OpenAI GPT for intelligent agent decisions
- **Authentication**: JWT tokens with python-jose
- **External APIs**: OpenWeatherMap, AQICN, Fast2SMS

## Project Structure

```
backend/
├── agents/              # AI agents for claims, policies, pricing, monitoring
├── database/            # Database configuration and session management
├── models/              # SQLAlchemy models (User, Policy, Claim, Trigger)
├── routes/              # API endpoints (auth, claims, policies, etc.)
├── services/            # External service integrations (weather, AQI, payment)
├── utils/               # Helper functions, auth, logging
├── config.py            # Application configuration
├── main.py              # FastAPI application entry point
└── requirements.txt     # Python dependencies
```

## Installation

### Prerequisites

- Python 3.10+
- pip

### Setup

1. Clone the repository:
```bash
git clone https://github.com/shri31negi/gigshield-devtrails2026.git -b backend
cd gigshield-devtrails2026
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
- `OPENAI_API_KEY`: Get from [OpenAI](https://platform.openai.com/api-keys)
- `WEATHER_API_KEY`: Get from [OpenWeatherMap](https://openweathermap.org/api)
- `AQI_API_KEY`: Get from [AQICN](https://aqicn.org/api/)
- `FAST2SMS_API_KEY`: Get from [Fast2SMS](https://www.fast2sms.com/) (optional for SMS)

## Running the Application

### Development Mode

```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### API Documentation

Once running, access the interactive API docs:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- `POST /auth/send-otp` - Send OTP to phone number
- `POST /auth/verify-otp` - Verify OTP and get JWT token

### Users
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile
- `POST /users/onboard` - Complete worker onboarding

### Policies
- `GET /policies` - List all policies
- `POST /policies` - Create new policy
- `GET /policies/{id}` - Get policy details
- `PUT /policies/{id}` - Update policy
- `DELETE /policies/{id}` - Delete policy

### Claims
- `GET /claims` - List user claims
- `POST /claims` - Create manual claim
- `GET /claims/{id}` - Get claim details
- `PUT /claims/{id}/approve` - Approve claim (admin)
- `PUT /claims/{id}/reject` - Reject claim (admin)

### Triggers
- `GET /triggers` - List all triggers
- `GET /triggers/active` - Get active triggers

### Admin
- `GET /admin/dashboard` - Admin dashboard statistics
- `GET /admin/fraud-alerts` - Fraud detection alerts

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI agents | Yes |
| `WEATHER_API_KEY` | OpenWeatherMap API key | Yes |
| `AQI_API_KEY` | AQICN API key | Yes |
| `FAST2SMS_API_KEY` | Fast2SMS API key for OTP | No |
| `DATABASE_URL` | Database connection string | No (defaults to SQLite) |
| `SECRET_KEY` | JWT secret key | Yes |
| `APP_ENV` | Environment (development/production) | No |
| `RAIN_THRESHOLD_MM` | Rain threshold in mm | No (default: 10.0) |
| `AQI_THRESHOLD` | AQI threshold | No (default: 200) |
| `HEAT_THRESHOLD_C` | Heat threshold in Celsius | No (default: 40.0) |

## Development

### Database Migrations

The application uses SQLAlchemy and creates tables automatically on startup. For production, consider using Alembic for migrations.

### Testing

Run the test suite:
```bash
python test_backend.py
```

### Logging

Logs are written to `gigshield.log` and console. Configure log level in `utils/logger.py`.

## AI Agents

### Claims Agent
Automatically processes claims when triggers fire, validates conditions, and approves payouts.

### Policy Agent
Manages policy lifecycle, recommendations, and eligibility checks.

### Pricing Agent
Calculates dynamic premiums based on risk factors and historical data.

### Monitoring Agent
Continuously monitors environmental conditions and fires triggers when thresholds are exceeded.

## Security

- JWT-based authentication with 7-day expiration
- OTP verification for phone-based login
- Password hashing with passlib
- Environment variable protection for sensitive keys
- CORS configuration for frontend integration

## Production Deployment

1. Set `APP_ENV=production` in `.env`
2. Use PostgreSQL instead of SQLite
3. Configure proper CORS origins
4. Use a production ASGI server (Gunicorn + Uvicorn)
5. Set up SSL/TLS certificates
6. Enable rate limiting and monitoring
7. Use Redis for OTP storage instead of in-memory dict

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
