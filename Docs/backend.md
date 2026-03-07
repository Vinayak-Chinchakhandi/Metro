# Backend Responsibilities

The backend acts as the **central processing layer** of the MetroMind AI system.

It handles:
- API endpoints
- Business logic
- Communication with AI service
- Database operations
- QR ticket generation

Tech Stack:
- Node.js
- Express.js
- SQLite
- Axios (for AI service communication)

---

# Main Responsibilities

## 1. Ticket Booking System

API endpoint:

POST `/api/tickets/book`

Process:
1. Receive ticket booking request
2. Call AI service for demand prediction
3. Generate ticket ID
4. Generate QR code
5. Store ticket in database
6. Return ticket details

---

## 2. QR Code Generation

File:
`utils/qrGenerator.js`

Library:
qrcode

QR contains:
- ticket ID
- source station
- destination station
- timestamp

---

## 3. AI Service Communication

File:
`services/aiService.js`

Backend calls AI service APIs:

POST `/predict-demand`  
POST `/detect-fraud`

Backend sends ticket or station data and receives prediction results.

---

## 4. Fraud Monitoring

API endpoint:

GET `/api/fraud-alerts`

Fraud alerts are generated based on AI fraud detection results.

Examples:
- ticket reuse
- abnormal travel patterns
- impossible travel routes

---

## 5. Station Data

API endpoint:

GET `/api/stations`

Returns list of metro stations.

Used by frontend booking form.

---

# Database Layer

SQLite database stored in:

`database/metro.db`

Tables used:

stations  
tickets  
predictions  
fraud_alerts

---

# Backend Folder Responsibilities

controllers/
Handle request processing.

routes/
Define API endpoints.

services/
Business logic and AI integration.

models/
Database data models.

middleware/
Error handling and logging.

database/
SQL queries.

utils/
Helper functions like QR generation.

---

# Backend Workflow

Ticket booking flow:

1. Frontend sends booking request.
2. Backend validates data.
3. Backend calls AI service.
4. AI predicts demand.
5. Backend generates ticket.
6. QR code created.
7. Ticket stored in SQLite.
8. Ticket returned to frontend.

---

# Key Deliverables

Backend developer must implement:

- Ticket booking API
- QR ticket generation
- AI service integration
- Database schema and queries
- Fraud alert API
- Station data API