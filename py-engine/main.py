from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

if not OPENWEATHER_API_KEY:
    raise RuntimeError("CRITICAL ERROR: OPENWEATHER_API_KEY is missing!")

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ZONE_COORDINATES = {
    "Koramangala": { "lat": 12.9279, "lon": 77.6271 },
    "Indiranagar": { "lat": 12.9784, "lon": 77.6408 },
    "Whitefield": { "lat": 12.9698, "lon": 77.7499 },
    "HSR Layout": { "lat": 12.9121, "lon": 77.6446 }
}

class PremiumRequest(BaseModel):
    delivery_zone: str
    baseline_risk_score: float

def calc_weather_risk(weather_id: int) -> list:
    risk_factors = []

    if 200 <= weather_id <= 232:
        risk_factors.append(
            {
                "disruption_type": "THUNDERSTORM",
                "probability": 0.8,
                "severity_weight": 0.4
            }
        )
    
    elif 500 <= weather_id <= 531:
        risk_factors.append(
            {
                "disruption_type": "HEAVY_RAIN",
                "probability": 0.9,
                "severity_weight": 0.3
            }
        )
    
    elif weather_id == 711 or weather_id == 721:
        risk_factors.append(
            {
                "disruption_type": "SEVERE_SMOG_AQI",
                "probability": 0.6,
                "severity_weight": 0.2
            }
        )
    
    else:
        risk_factors.append(
            {
                "disruption_type": "CLEAR_WEATHER_BASELINE",
                "probability": 0.1,
                "severity_weight": 0.05
            }
        )
    
    return risk_factors

@app.post("/api/premium")
async def calc_premium(request: PremiumRequest):
    coords = ZONE_COORDINATES.get(request.delivery_zone, ZONE_COORDINATES["Koramangala"])

    weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={coords['lat']}&lon={coords['lon']}&appid={OPENWEATHER_API_KEY}"

    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(weather_url)
            res.raise_for_status()

            weather_data = res.json()
    
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail="Failed to fetch live weather telemetry."
        )
    
    current_weather_id = weather_data["weather"][0]["id"]
    weather_desc = weather_data["weather"][0]["description"].upper()

    factors = calc_weather_risk(current_weather_id)
    factors.append(
        {
            "disruption_type": "BASE_TRAFFIC_GRIDLOCK",
            "probability": 0.4,
            "severity_weight": 0.1
        }
    )

    risk_sum = sum(factor["probability"] * factor["severity_weight"] for factor in factors)
    base_premium_inr = 50.0
    final_premium = (base_premium_inr * request.baseline_risk_score) * (1 + risk_sum)

    return {
        "delivery_zone": request.delivery_zone,
        "base_premium": base_premium_inr,
        "calculated_weekly_premium_inr": round(final_premium, 2),
        "live_telemetry": weather_desc,
        "risk_factors_applied": factors
    }