from fastapi import APIRouter
import numpy as np

from app.schemas.prediction_schema import FraudDetectionRequest
from app.utils.model_loader import (
    fraud_model,
    entry_station_encoder,
    exit_station_encoder,
    ticket_type_encoder
)

from app.utils.helpers import fraud_reason, expected_travel_time

router = APIRouter(tags=["Fraud Detection"])


@router.post("/detect-fraud")
def detect_fraud(data: FraudDetectionRequest):

    try:
        entry_station = entry_station_encoder.transform([data.entry_station])[0]
        exit_station = exit_station_encoder.transform([data.exit_station])[0]
        ticket_type = ticket_type_encoder.transform([data.ticket_type])[0]

    except ValueError:
        return {"error": "Unknown station or ticket type"}

    expected_time = expected_travel_time(data.distance)

    features = np.array([[

        entry_station,
        exit_station,
        data.entry_hour,
        data.distance,
        expected_time,
        data.travel_time,
        ticket_type,
        data.repeat_usage

    ]])

    probability = float(fraud_model.predict_proba(features)[0][1])

    alert = bool(probability > 0.7)

    reason = fraud_reason(
        data.distance,
        data.travel_time,
        data.repeat_usage
    )

    return {

        "fraud_probability": round(probability, 3),
        "alert": alert,

        "expected_travel_time": round(expected_time, 2),
        "actual_travel_time": data.travel_time,

        "reason": reason
    }