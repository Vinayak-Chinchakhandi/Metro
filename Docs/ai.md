# AI Service Responsibilities

The AI service is responsible for providing **intelligence to the metro ticketing system**.

It performs two main functions:

1. Passenger demand prediction
2. Fraud and anomaly detection

Tech Stack:
- Python
- FastAPI
- scikit-learn
- pandas
- numpy

---

# 1. Demand Prediction Model

Purpose:
Predict passenger demand at stations.

This helps metro authorities anticipate congestion.

---

## Input Features

- Station
- Time
- Day of week
- Weather
- Nearby events
- Historical passenger count
- Train frequency

---

## Output

Prediction result:

- predicted passenger demand
- congestion level

Example:

MG Road → High demand  
Indiranagar → Medium demand

---

# Model Type

Recommended models:

Random Forest  
or Gradient Boosting

---

# API Endpoint

POST `/predict-demand`

Example request:
{
"station": "MG Road",
"time": "08:30"
}

Example response:
{
"predicted_demand": 1500,
"crowd_level": "High"
}


---

# 2. Fraud Detection Model

Purpose:
Detect suspicious ticket usage patterns.

Examples:

- same ticket used multiple times
- impossible travel routes
- abnormal travel frequency

---

# Model Type

Isolation Forest  
or other anomaly detection algorithm.

---

# Fraud Detection API

POST `/detect-fraud`

Example request:
{
"ticket_id": "T102",
"entry_station": "MG Road",
"exit_station": "Indiranagar",
"entry_time": "08:30"
}


Example response:
{
"fraud_probability": 0.82,
"alert": true
}


---

# Dataset Responsibilities

Datasets stored in:

`datasets/`

raw/
original dataset

processed/
cleaned datasets used for training

---

# AI Service Workflow

1. Backend sends prediction request.
2. AI service processes data.
3. ML model generates prediction.
4. Result returned to backend.

---

# Key Deliverables

AI developer must deliver:

- Demand prediction model
- Fraud detection model
- FastAPI prediction endpoints
- Data preprocessing pipeline
- Model training scripts