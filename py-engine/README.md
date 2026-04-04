# GigInsura: Python AI Engine

> The high-performance algorithmic backend powering the GigInsura platform.

This reposity contains the **Python FastAPI Engine** that serves as the "brain" of the GigInsura application. It is responsible for ingesting delivery zone coordinates, securely fetching live atmospheric telemetry from global satellites (OpenWeatherMap) and executing a dynamic risk-weighing algorithm to calculate real-time insurance premiums.

## Core Capabilities

* **Algorithmic Risk Matrix:** Translates raw weather IDs into specific disruption events (e.g., `SEVERE_SMOG_AQI`, `HEAVY_RAIN`) that assigns the calculated probability and severity weights.
* **Live Satellite Telemetry:** Uses asynchronous `httpx` clients to pull real-time, localized environmental data without blocking the main execution thread.
* **High-Concurrency Architecture:** Built on top of FastAPI and Uvicorn (ASGI), designed to handle thousands of simultaneous premium quote requests from riders during sudden weather events.
* **Secure Data Handling:** Environment variable protection using `python-dotenv` ensures critical API keys are never exposed in the source code.
* **Strict Type Validation:** Uses `Pydantic` models to strictly enforce the shape of incoming API requests, preventing malformed data from crashing the pricing engine.

## Tech Stack

* **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
* **Server:** [Uvicorn](https://www.uvicorn.org/) (ASGI)
* **HTTP Client:** [HTTPX](https://www.python-httpx.org/) (Async requests)
* **Data Validation:** [Pydantic](https://docs.pydantic.dev/)
* **Environment Management:** `python-dotenv`

## Getting Started (Locally)

The Next.js frontend relies on this engine running on `localhost:8000`.

### 1. Set Up the Virtual Environment
Navigate to this backend directory and create an isolated Python environment:
```bash
# Windows
python -m venv venv
venv/Scripts/activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install fastapi uvicorn httpx pydantic python-dotenv
```

### 3. Configure Environment Variables
Create a `.env` file in the root of this python directory and add your OpenWeatherMap API key. **Never commit this file to version control**.
```bash
OPENWEATHER_API_KEY="your-open-weather-api-key-here"
```

### 4. Ignite the AI Engine
```bash
uvicorn main:app --port 8000 --reload
```
The engine is now listening for requests at `http://localhost:8000`.

## Core API Reference

`POST   /api/premium`
Calculates the dynamic weekly premium based on live conditions.

**Request Body:**
```bash
{
    "delivery_zone": "Koramangala",
    "baseline_risk_score": 1.0
}
```
**Response Payload:**
```bash
{
    "delivery_zone": "Koramangala",
    "base_premium": 50.0,
    "calculated_weekly_premium_inr": 67.5,
    "live_telemetry": "HEAVY INTENSITY RAIN",
    "risk_factors_applied": [
        {
            "disruption_type": "HEAVY_RAIN",
            "probability": 0.9,
            "severity_weight": 0.3
        },
        {
            "disruption_type": "BASE_TRAFFIC_GRIDLOCK",
            "probability": 0.4,
            "severity_weight": 0.1
        }
    ]
}
```

## Architecture Note
This API is configured with strict CORS middleware. Ensure your frontend client is added to the `allow_origins` array in `main.py` when deploying to production environments.