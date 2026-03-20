# 🚇 Metro AI – Intelligent Ticketing System

## 📌 Overview

Metro AI is an AI-powered metro ticketing system developed as part of the AI-Based Metro Ticketing Challenge (i-ACT 26).

The project transforms a traditional ticketing system into an intelligent, predictive, and secure platform by integrating:

- Passenger demand prediction
- Real-time fraud detection
- QR-based smart ticketing
- Analytics dashboard for metro operations

---

## 🎯 Problem Statement

Traditional metro systems lack:

- Demand forecasting → leads to congestion
- Real-time fraud detection → revenue loss
- Intelligent decision-making → inefficient operations

This system addresses these challenges by building an AI-driven solution that:

- Predicts passenger demand
- Detects anomalies and fraud in real time
- Improves passenger experience and operational efficiency

---

## 🚀 Features

### 🎫 QR-Based Smart Ticketing

- Generate QR-based tickets instantly
- Scan at entry and exit gates
- Secure and fast validation system

---

### 🤖 Passenger Demand Prediction

- Predicts station-level demand using:
  
  - Time (hour)
  - Day (weekday/weekend)
  - Weather
  - Event factor

- Outputs:
  
  - Predicted passenger count
  - Crowd level (Low / Medium / High)

✔ Helps reduce congestion and improve planning

---

### 🚨 Fraud Detection System

Detects suspicious travel patterns such as:

- Impossible travel time
- Unusually slow travel
- Entry/exit mismatch
- Ticket misuse

Uses:

- Machine Learning (Random Forest Classifier)
- Backend rule-based validation

✔ Enables near real-time fraud detection

---

### 📊 Admin Dashboard

- Total tickets, fraud alerts, active stations
- Fraud distribution visualization
- Top stations by usage
- Top fraud-prone stations
- Auto-refresh every 30 seconds

---

### 🗺️ Metro Network Visualization

- Displays station connectivity and routes
- Helps understand metro topology

---

## 🧠 Machine Learning Approach

### 📈 Demand Prediction

- Algorithm: Random Forest Regressor
- Predicts passenger demand based on multiple factors
- Converts output into crowd levels

### 🔍 Fraud Detection

- Algorithm: Random Forest Classifier
- Outputs fraud probability and alerts
- Combined with rule-based validation for accuracy

---

## 🏗️ Tech Stack

Frontend

- React.js
- Tailwind CSS
- Recharts
- React leaflet
- React Router

Backend

- Node.js
- Express.js
- SQLite

AI Service

- Python (FastAPI)
- Scikit-learn
- Pandas / NumPy
- Joblib

---

## ⚙️ Project Structure

```
METRO/
│
├── ai-service/        # AI models & API (FastAPI)
├── Backend/          # Node.js backend
├── Frontend/         # React frontend
├── database/         # SQLite database
├── datasets/         # Training datasets
└── README.md
```

---

## ▶️ How to Run the Project
```
1️⃣ Clone Repository

git clone https://github.com/Vinayak-Chinchakhandi/Metro
cd METRO

---

2️⃣ Backend Setup

cd Backend
npm install
npm run dev

---

3️⃣ Frontend Setup

cd Frontend
npm install
npm run dev

---

4️⃣ AI Service Setup

cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload

---

🗄️ Database Setup

- Create tables using SQL schema
- Insert station and network data using SQL queries from datsets
```
---

## 🏆 Achievement

🥈 2nd Place – AI-Based Metro Ticketing Challenge (i-ACT 2026)

---

## 👨‍💻 Team

- Vinayak Chinchakhandi
- Prajakta Pol
- Prajay Ganiga

---

## 📜 License

This project is developed for academic and learning purposes.