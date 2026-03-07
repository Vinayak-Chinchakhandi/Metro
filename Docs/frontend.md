# Frontend Responsibilities

The frontend is responsible for building the **user interface and visualization layer** of the MetroMind AI system.

It communicates with the backend APIs and displays ticket booking, predictions, fraud alerts, and metro network analytics.

Tech Stack:
- React
- Tailwind CSS
- Axios (API calls)
- Chart.js or Recharts
- Leaflet.js (Metro Network Map)

---

# Application Pages

## 1. Home Page
File: `pages/Home.jsx`

Purpose:
- Landing page of the application.
- Brief explanation of system features.

Components used:
- Navbar
- Feature cards
- Navigation links.

---

## 2. Ticket Booking Page
File: `pages/BookTicket.jsx`

Purpose:
Allow passengers to book metro tickets.

Features:
- Select source station
- Select destination station
- Select travel time

Data is sent to backend API.

API call:
POST `/api/tickets/book`

---

## 3. Ticket Result Page
File: `pages/TicketResult.jsx`

Purpose:
Display generated ticket.

Features:
- Ticket ID
- Source & Destination
- Time
- QR Code

Component used:
- `QRDisplay.jsx`

---

## 4. Admin Dashboard
File: `pages/Dashboard.jsx`

Purpose:
Provide operational insights.

Displays:
- Station demand predictions
- Fraud alerts
- Passenger analytics charts

Data sources:
GET `/api/predictions`
GET `/api/fraud-alerts`

---

## 5. Metro Network Map
File: `pages/NetworkMap.jsx`

Purpose:
Visualize predicted congestion across the metro network.

Technology:
Leaflet.js

Station markers show:
- Green → Low demand
- Yellow → Medium demand
- Red → High demand

Station coordinates stored in:
`maps/metroStations.js`

---

# Components

Reusable UI components stored in `components/`.

Important components:

Navbar.jsx  
Navigation bar.

TicketForm.jsx  
Form for booking tickets.

QRDisplay.jsx  
Displays QR ticket.

StationCard.jsx  
Displays station prediction.

FraudAlertCard.jsx  
Displays fraud detection alerts.

PredictionCard.jsx  
Displays predicted passenger demand.

---

# API Communication

Frontend interacts with backend through services.

Location:
`services/`

Files:

api.js  
Axios configuration.

ticketService.js  
Handles ticket booking API.

fraudService.js  
Fetch fraud alerts.

predictionService.js  
Fetch demand predictions.

---

# Hooks

Location:
`hooks/useTicket.js`

Purpose:
Manage ticket booking state and logic.

---

# Expected Workflow

Passenger flow:

1. User opens booking page.
2. User selects source and destination.
3. Request sent to backend.
4. Backend generates QR ticket.
5. Ticket displayed to user.

Admin flow:

1. Admin opens dashboard.
2. System fetches demand predictions.
3. Fraud alerts displayed.
4. Network map visualizes congestion.

---

# Key Deliverables

Frontend developer must deliver:

- Ticket booking interface
- QR ticket display
- Admin analytics dashboard
- Metro congestion map
- API integration with backend