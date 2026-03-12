from fastapi import APIRouter
import numpy as np
import random

from app.schemas.prediction_schema import DemandPredictionRequest
from app.utils.model_loader import (
    demand_model,
    station_encoder,
    day_encoder,
    weather_encoder
)

from app.utils.helpers import get_crowd_level

router = APIRouter()

@router.post("/predict-demand")
def predict_demand(data: DemandPredictionRequest):

    # Encode categorical inputs
    station = station_encoder.transform([data.station])[0]
    day = day_encoder.transform([data.day])[0]
    weather = weather_encoder.transform([data.weather])[0]

    features = np.array([[station,
                          data.hour,
                          day,
                          weather,
                          data.event]])

    # ML hourly prediction
    hourly_prediction = demand_model.predict(features)[0]

    predicted_demand = int(hourly_prediction)

    # Convert hourly → realtime load
    base_load = predicted_demand / 360

    # Add natural variation
    variation = random.uniform(0.5, 2.6)

    current_station_load = int(base_load * variation)

    # Interchange stations naturally busier
    if data.is_interchange == 1:
        current_station_load = int(current_station_load * 2)

    # Determine crowd level
    crowd = get_crowd_level(current_station_load)

    return {
        "predicted_demand": predicted_demand,
        "current_station_load": current_station_load,
        "crowd_level": crowd
    }