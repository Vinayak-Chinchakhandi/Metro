from pydantic import BaseModel

class DemandPredictionRequest(BaseModel):

    station: str
    hour: int
    day: str
    weather: str
    event: int


class FraudDetectionRequest(BaseModel):

    entry_station: str
    exit_station: str
    entry_hour: int
    travel_time: int
    ticket_type: str
    distance: float
    repeat_usage: int