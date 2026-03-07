# System Workflow – MetroMind AI

This document explains how the different modules of the MetroMind AI system interact with each other.

The system has four main layers:

1. Frontend (React)
2. Backend API (Node.js + Express)
3. AI Service (Python + FastAPI)
4. Database (SQLite)

The backend acts as the central coordinator between all modules.

---

# High-Level Architecture

Frontend → Backend → AI Service → Database

The frontend never directly communicates with the AI service or database.

All requests go through the backend.

---

# Main Workflows

## 1. Passenger Ticket Booking Flow

Step 1: User opens booking page.

Frontend page:
BookTicket.jsx

User selects:
- Source station
- Destination station
- Travel time

Frontend sends request to backend.

POST /api/tickets/book

Example request:

{
  "source": "MG Road",
  "destination": "Indiranagar",
  "time": "08:45"
}

---

Step 2: Backend receives booking request.

Backend validates request data.

Then backend calls AI service to predict congestion.

POST /predict-demand

Example request sent to AI service:

{
  "station": "MG Road",
  "time": "08:45"
}

---

Step 3: AI Service predicts passenger demand.

Demand prediction model processes input.

Example response:

{
  "predicted_demand": 1500,
  "crowd_level": "High"
}

Backend receives prediction.

---

Step 4: Backend generates ticket.

Backend performs:

- create ticket ID
- generate QR code
- store ticket in SQLite database

Database table:
tickets

---

Step 5: Backend returns ticket response.

Example response:

{
  "ticket_id": "T1201",
  "source": "MG Road",
  "destination": "Indiranagar",
  "time": "08:45",
  "crowd_level": "High",
  "qr_code": "base64_image"
}

Frontend displays ticket.

Page:
TicketResult.jsx

---

# 2. Fraud Detection Workflow

Fraud detection runs when tickets are used or validated.

Step 1: Ticket validation request sent.

Backend sends ticket data to AI service.

POST /detect-fraud

Example request:

{
  "ticket_id": "T1201",
  "entry_station": "MG Road",
  "exit_station": "Indiranagar",
  "entry_time": "08:45"
}

---

Step 2: AI Fraud Model analyzes ticket behavior.

Model detects anomalies such as:

- ticket reuse
- impossible travel
- abnormal travel frequency

Example response:

{
  "fraud_probability": 0.82,
  "alert": true
}

---

Step 3: Backend stores fraud alert.

If alert is true:

Backend stores record in database table:

fraud_alerts

---

Step 4: Admin dashboard displays alerts.

Frontend page:
Dashboard.jsx

API request:

GET /api/fraud-alerts

Fraud alerts displayed using FraudAlertCard component.

---

# 3. Demand Prediction Visualization

Admin dashboard displays predicted congestion.

Step 1: Dashboard loads.

Frontend requests predictions.

GET /api/predictions

---

Step 2: Backend retrieves predictions.

Predictions may come from:

- AI service
- stored predictions in database

---

Step 3: Data sent to frontend.

Example response:

[
  {
    "station": "MG Road",
    "predicted_demand": 1500,
    "crowd_level": "High"
  }
]

---

Step 4: Dashboard visualizes results.

Charts:
- passenger flow
- congestion levels

Components used:
PredictionCard.jsx
StationCard.jsx

---

# 4. Metro Network Map Workflow

Page:
NetworkMap.jsx

Step 1: Map loads station coordinates.

Data source:

maps/metroStations.js

---

Step 2: Backend provides congestion data.

GET /api/predictions

---

Step 3: Map markers update.

Station colors:

Green → Low demand  
Yellow → Medium demand  
Red → High demand

This visualizes congestion across the metro network.

---

# Database Interaction

Database used:
SQLite

Tables:

stations  
tickets  
predictions  
fraud_alerts

The backend performs all database operations.

---

# Module Responsibilities

Frontend:
- UI
- ticket booking interface
- dashboard visualization
- metro network map

Backend:
- API endpoints
- business logic
- QR code generation
- database access
- communication with AI service

AI Service:
- demand prediction model
- fraud detection model
- ML preprocessing

Database:
- persistent storage for system data

---

# Integration Order (Recommended)

1. Setup backend API
2. Setup SQLite database
3. Connect frontend booking page
4. Integrate AI prediction service
5. Implement fraud detection
6. Build dashboard visualization
7. Add metro network map