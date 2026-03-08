from fastapi import APIRouter
import numpy as np
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

    station = station_encoder.transform([data.station])[0]
    day = day_encoder.transform([data.day])[0]
    weather = weather_encoder.transform([data.weather])[0]

    features = np.array([[station,
                          data.hour,
                          day,
                          weather,
                          data.event]])

    prediction = demand_model.predict(features)[0]

    crowd = get_crowd_level(prediction)

    return {
        "predicted_demand": int(prediction),
        "crowd_level": crowd
    }