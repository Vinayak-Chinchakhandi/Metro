# Fraud Detection Model – MetroMind AI

This document explains the design, dataset preparation, training process, and evaluation of the **Fraud Detection Model** used in the MetroMind AI system.

The model detects suspicious ticket usage patterns in the metro network to prevent ticket misuse and fraudulent behavior.

---

# 1. Objective

The objective of the Fraud Detection Model is to identify **suspicious metro ticket activity**.

The model detects anomalies such as:

- Ticket reuse
- Impossible travel time
- Abnormal travel duration
- Suspicious travel patterns
- Unusual ticket usage

This helps metro authorities improve:

- ticket security
- revenue protection
- system reliability

---

# 2. Datasets Used

The fraud detection model uses multiple datasets from the MetroMind AI system.

## 2.1 Stations Dataset

File:

```
datasets/processed/stations.csv
```

Columns:

| Column | Description |
|------|------|
| code | station code |
| station | station name |
| line | metro line |

Purpose:

- station selection
- validation
- travel generation

Total stations:

```
83 stations
```

Across metro lines:

- Purple Line
- Green Line
- Yellow Line

---

## 2.2 Metro Network Dataset

File:

```
datasets/processed/metro_network.csv
```

Columns:

| Column | Description |
|------|------|
| station_code | unique station identifier |
| station_name | station name |
| line | metro line |
| sequence | order of station in line |
| is_interchange | interchange station flag |
| next_station_code | next station |
| latitude | station latitude |
| longitude | station longitude |
| distance_to_next_km | distance to next station |

Purpose:

- calculate route distance
- estimate travel time
- simulate metro network travel
- support fraud detection logic

---

## 2.3 Fraud Dataset

File:

```
datasets/processed/fraud_dataset.csv
```

Columns:

| Column | Description |
|------|------|
| ticket_id | unique ticket identifier |
| entry_station | passenger entry station |
| exit_station | passenger exit station |
| entry_hour | entry time (hour) |
| travel_time | travel duration in minutes |
| ticket_type | ticket format |
| distance | travel distance |
| repeat_usage | ticket reused flag |
| fraud_label | fraud indicator |

Example row:

```
ticket_id,entry_station,exit_station,entry_hour,travel_time,ticket_type,distance,repeat_usage,fraud_label
7f88616c,Vajarahalli,Cubbon Park,15,23,QR,13.57,0,0
6ee17696,Mahalakshmi,Goraguntepalya,15,77,QR,7.36,0,1
```

---

# 3. Dataset Size

Total rows:

```
5000 rows
```

Fraud rows:

```
1013 rows
```

Fraud ratio:

```
~20%
```

Dataset split:

```
Training set → 4000 rows
Testing set → 1000 rows
```

This ensures the model learns from historical data and is evaluated on unseen samples.

---

# 4. Feature Engineering

Categorical values must be converted into numeric format before training.

The following columns were encoded:

- entry_station
- exit_station
- ticket_type

Encoding method used:

```
LabelEncoder
```

Library:

```
sklearn.preprocessing.LabelEncoder
```

Example:

| Station | Encoded Value |
|------|------|
MG Road | 15 |
Indiranagar | 21 |

---

# 5. Machine Learning Algorithm

The fraud detection system uses:

```
Random Forest Classifier
```

Library:

```
scikit-learn
```

Implementation:

```
sklearn.ensemble.RandomForestClassifier
```

Random Forest was chosen because:

- handles tabular data well
- resistant to overfitting
- performs well on classification problems
- effective for fraud detection tasks

---

# 6. Model Training

Training steps:

1. Load fraud dataset
2. Encode categorical features
3. Split dataset into training and testing sets
4. Train Random Forest classifier
5. Evaluate model performance

Training method:

```
model.fit(X_train, y_train)
```

Where:

```
X_train → ticket behavior features
y_train → fraud labels
```

---

# 7. Model Parameters

Model configuration:

```
RandomForestClassifier(
    n_estimators = 200,
    max_depth = 12,
    random_state = 42
)
```

Parameter explanation:

| Parameter | Purpose |
|------|------|
n_estimators | number of decision trees |
max_depth | maximum depth of trees |
random_state | ensures reproducible results |

---

# 8. Model Evaluation

Evaluation metric used:

```
Accuracy Score
```

Testing results:

```
Dataset loaded: (5000, 9)
Training rows: 4000
Testing rows: 1000
Model Accuracy: 0.99
```

Accuracy:

```
99%
```

Meaning:

```
990 out of 1000 predictions were correct
```

---

# 9. Classification Metrics

Classification report:

| Metric | Value |
|------|------|
Precision | ~0.99 |
Recall | ~0.98 |
F1 Score | ~0.98 |

These metrics show strong classification performance.

---

# 10. Fraud Detection Logic

The model detects suspicious ticket behavior using patterns such as:

### 1. Ticket Reuse

Example:

```
repeat_usage = 1
```

This indicates the same ticket was reused multiple times.

---

### 2. Impossible Travel Time

Example:

```
distance = 12 km
travel_time = 3 minutes
```

This is unrealistic because metro trains cannot travel that fast between stations.

---

### 3. Abnormal Travel Duration

Example:

```
distance = 5 km
travel_time = 70 minutes
```

This indicates suspicious behavior or ticket misuse.

---

# 11. Model Output

Example model input:

```
entry_station = MG Road
exit_station = Indiranagar
travel_time = 3 minutes
distance = 12 km
```

Model prediction:

```
fraud_probability = 0.82
alert = true
```

Meaning:

```
High probability of fraudulent behavior
```

---

# 12. Model Storage

The trained model is stored as:

```
ai-service/app/models/fraud_model.pkl
```

The model is saved using:

```
joblib.dump()
```

This allows the AI service to load the model during runtime.

---

# 13. System Integration

Fraud detection workflow:

```
Frontend → Backend → AI Service → Fraud Model
```

Steps:

1. Passenger exits metro station
2. Backend sends ticket data to AI service
3. AI service loads fraud model
4. Model analyzes ticket behavior
5. Fraud probability is calculated
6. If fraud detected → alert generated

---

# 14. Backend API Integration

Fraud detection API:

```
POST /detect-fraud
```

Example request:

```json
{
  "ticket_id": "T1201",
  "entry_station": "MG Road",
  "exit_station": "Indiranagar",
  "entry_hour": 8,
  "travel_time": 14,
  "distance": 5.2,
  "ticket_type": "QR",
  "repeat_usage": 0
}
```

Example response:

```json
{
  "fraud_probability": 0.82,
  "alert": true
}
```

---

# 15. Future Improvements

Potential improvements include:

- graph-based travel anomaly detection
- passenger behavior modeling
- deep learning fraud detection
- real-time streaming fraud monitoring

---

# Conclusion

The MetroMind AI Fraud Detection Model identifies suspicious metro ticket usage using machine learning techniques.

The model was trained on:

```
5000 simulated travel records
```

and achieved:

```
~99% classification accuracy
```

This enables the system to effectively detect fraudulent ticket activity and improve metro ticketing security.