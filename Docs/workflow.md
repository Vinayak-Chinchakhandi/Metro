
# System Workflow – MetroMind AI

This document explains how different modules of the **MetroMind AI** system interact with each other.
The goal of this document is to act as a **development contract** between frontend, backend, and AI services so that different parts of the system can be developed independently and integrated smoothly.

---

# System Layers

The MetroMind AI platform consists of four main layers:

1. **Frontend – React**
2. **Backend API – Node.js + Express**
3. **AI Service – Python + FastAPI**
4. **Database – SQLite**

The backend acts as the **central coordinator** between all modules.

The frontend never communicates directly with the AI service or the database.  
All requests pass through the backend.

---

# High‑Level Architecture

```
Frontend → Backend API → AI Service → Database
```

| Layer | Responsibility |
|------|------|
| Frontend | UI, dashboards, ticket booking |
| Backend | APIs, business logic, validation |
| AI Service | ML models for prediction and fraud detection |
| Database | Persistent storage |

---

# Project Datasets

## 1. Stations Dataset

File

```
datasets/processed/stations.csv
```

| Column | Description |
|------|------|
| code | station code |
| station | station name |
| line | metro line |

Used for:

- station dropdowns
- route selection
- validation

---

## 2. Metro Network Dataset

File

```
datasets/processed/metro_network.csv
```

| Column | Description |
|------|------|
| station_code | station identifier |
| station_name | station name |
| line | metro line |
| sequence | station order |
| is_interchange | interchange flag |
| next_station_code | next station |
| latitude | station latitude |
| longitude | station longitude |
| distance_to_next_km | distance to next station |

Used for:

- route distance calculation
- travel time estimation
- metro network map
- fraud detection logic

---

## 3. Demand Prediction Dataset

File

```
datasets/processed/demand_dataset.csv
```

| Column | Description |
|------|------|
| station | station name |
| hour | hour |
| day | weekday |
| weather | weather condition |
| event | special event indicator |
| passenger_count | expected passengers |

Used for demand prediction model.

---

## 4. Fraud Detection Dataset

File

```
datasets/processed/fraud_dataset.csv
```

| Column | Description |
|------|------|
| ticket_id | ticket identifier |
| entry_station | entry station |
| exit_station | exit station |
| entry_hour | entry hour |
| travel_time | travel time |
| ticket_type | QR / SmartCard / Token |
| distance | travel distance |
| repeat_usage | ticket reuse flag |
| fraud_label | fraud indicator |

Used for training fraud detection model.

---

# Main Workflows

---

# 1. Passenger Ticket Booking Flow

### Step 1: User Opens Booking Page

Frontend page

```
BookTicket.jsx
```

User selects:

- source station
- destination station
- travel time

Frontend sends request to backend.

API

```
POST /api/tickets/book
```

Example request

```json
{
  "source_station": "Mahatma Gandhi Road",
  "destination_station": "Indiranagar",
  "travel_time": "08:45"
}
```

---

### Step 2: Backend Processes Request

Backend performs:

- validation
- route lookup
- distance calculation using

```
metro_network.csv
```

Backend calls AI service:

```
POST /predict-demand
```

Example AI request

```json
{
  "station": "Mahatma Gandhi Road",
  "hour": 8,
  "day": "Monday",
  "weather": "Clear",
  "event": 0
}
```

---

### Step 3: AI Predicts Demand

Example response

```json
{
  "predicted_demand": 1500,
  "crowd_level": "High"
}
```

---

### Step 4: Backend Generates Ticket

Backend:

- generates ticket ID
- generates QR code
- stores ticket in database

Database table

```
tickets
```

---

### Step 5: Backend Returns Ticket

Example response

```json
{
  "ticket_id": "T1201",
  "source_station": "Mahatma Gandhi Road",
  "destination_station": "Indiranagar",
  "travel_time": "08:45",
  "distance": 4.8,
  "crowd_level": "High",
  "qr_code": "base64_image"
}
```

Displayed in

```
TicketResult.jsx
```

---

# 2. Fraud Detection Workflow

### Step 1: Ticket Validation

Backend sends ticket data

```
POST /detect-fraud
```

Example request

```json
{
  "ticket_id": "T1201",
  "entry_station": "Mahatma Gandhi Road",
  "exit_station": "Indiranagar",
  "entry_hour": 8,
  "travel_time": 14,
  "distance": 5.2,
  "ticket_type": "QR",
  "repeat_usage": 0
}
```

---

### Step 2: AI Fraud Model Analysis

Model analyzes:

- travel distance
- travel duration
- ticket reuse
- abnormal travel patterns

Example response

```json
{
  "fraud_probability": 0.82,
  "alert": true
}
```

---

### Step 3: Store Fraud Alert

Backend stores result in

```
fraud_alerts
```

---

### Step 4: Display in Admin Dashboard

Frontend page

```
Dashboard.jsx
```

API

```
GET /api/fraud-alerts
```

Displayed using

```
FraudAlertCard.jsx
```

---

# 3. Demand Prediction Visualization

### Step 1: Dashboard Request

```
GET /api/predictions
```

### Step 2: Backend Retrieves Predictions

From AI service or database.

### Step 3: Backend Sends Response

```json
[
  {
    "station": "Mahatma Gandhi Road",
    "predicted_demand": 1500,
    "crowd_level": "High"
  }
]
```

### Step 4: Visualization

Components

```
PredictionCard.jsx
StationCard.jsx
```

---

# 4. Metro Network Map Workflow

Frontend page

```
NetworkMap.jsx
```

### Step 1: Load Station Coordinates

Source

```
metro_network.csv
```

### Step 2: Fetch Congestion Data

```
GET /api/predictions
```

### Step 3: Update Map Markers

| Color | Meaning |
|------|------|
| Green | Low demand |
| Yellow | Medium demand |
| Red | High demand |

---

# Database Tables

| Table | Purpose |
|------|------|
| stations | station list |
| metro_network | metro topology |
| tickets | booked tickets |
| predictions | demand predictions |
| fraud_alerts | fraud records |

---

# Integration Order

1. Setup backend API
2. Setup SQLite database
3. Connect frontend booking page
4. Integrate AI prediction service
5. Implement fraud detection
6. Build dashboard visualization
7. Add metro network map
