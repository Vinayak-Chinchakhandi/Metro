from fastapi import FastAPI
from app.api import demand_prediction
from app.api import fraud_detection

app = FastAPI(title="MetroMind AI Service")

app.include_router(demand_prediction.router)
app.include_router(fraud_detection.router)


@app.get("/")
def home():

    return {
        "message": "MetroMind AI Service Running"
    }


@app.get("/health")
def health():

    return {
        "status": "AI service running"
    }