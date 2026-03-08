# API Specification – MetroMind AI

This document defines all API endpoints used in the MetroMind AI system.

The backend acts as the central layer between the frontend and the AI service.

Frontend communicates only with backend APIs.

Backend communicates with AI service APIs.

---

# Base URL

Backend API:

http://localhost:5000/api

AI Service API:

http://localhost:8000

---

# 1. Ticket Booking API

Endpoint:

POST /api/tickets/book

Description:

Creates a new metro ticket and generates a QR code.

Request Body:

{
  "source": "MG Road",
  "destination": "Indiranagar",
  "time": "08:45"
}

Response:

{
  "ticket_id": "T1201",
  "source": "MG Road",
  "destination": "Indiranagar",
  "time": "08:45",
  "crowd_level": "High",
  "qr_code": "base64_image"
}

---

# 2. Get Ticket Details

Endpoint:

GET /api/tickets/:id

Example:

GET /api/tickets/T1201

Response:

{
  "ticket_id": "T1201",
  "source": "MG Road",
  "destination": "Indiranagar",
  "time": "08:45",
  "status": "valid"
}

---

# 3. Get Stations

Endpoint:

GET /api/stations

Description:

Returns list of all metro stations.

Response:

[
  {
    "station_id": 1,
    "station_name": "MG Road",
    "line": "Purple"
  },
  {
    "station_id": 2,
    "station_name": "Indiranagar",
    "line": "Purple"
  }
]

---

# 4. Demand Predictions

Endpoint:

GET /api/predictions

Description:

Returns predicted passenger demand for stations.

Response:

[
  {
    "station": "MG Road",
    "predicted_demand": 1500,
    "crowd_level": "High"
  },
  {
    "station": "Indiranagar",
    "predicted_demand": 900,
    "crowd_level": "Medium"
  }
]

---

# 5. Fraud Alerts

Endpoint:

GET /api/fraud-alerts

Description:

Returns detected ticket fraud alerts.

Response:

[
  {
    "ticket_id": "T102",
    "alert_type": "Multiple Entries",
    "confidence_score": 0.82
  }
]

---

# AI SERVICE APIs

These APIs are used by the backend to communicate with the AI service.

---

# 6. Demand Prediction

Endpoint:

POST /predict-demand

Request Body:

{
  "station": "MG Road",
  "hour": 8,
  "day_of_week": "Monday",
  "weather": "Clear",
  "event": 0
}

Response:

{
  "predicted_demand": 1500,
  "crowd_level": "High"
}

---

# 7. Fraud Detection

Endpoint:

POST /detect-fraud

Request Body:

{
  "ticket_id": "T102",
  "entry_station": "MG Road",
  "exit_station": "Indiranagar",
  "travel_time": 5
}

Response:

{
  "fraud_probability": 0.82,
  "alert": true
}

---

# API Workflow

Passenger Ticket Booking Flow:

Frontend → POST /api/tickets/book → Backend

Backend → POST /predict-demand → AI Service

AI Service → returns prediction

Backend → generates ticket + QR code

Backend → returns ticket response

Frontend → displays ticket to user

---

# Data Format

All APIs use JSON format.

Content-Type:

application/json