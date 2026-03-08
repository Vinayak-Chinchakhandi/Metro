# Demand Prediction Model -- MetroMind AI

## 1. Objective of the Model

The objective of the Demand Prediction Model is to estimate the expected
number of passengers at a metro station during a specific time period.

This helps metro authorities: - Predict congestion levels - Improve
passenger flow management - Adjust train frequency - Support operational
decision making

The prediction uses contextual data such as: - Station - Hour of day -
Day of week - Weather conditions - Special events

------------------------------------------------------------------------

# 2. Datasets Used

The model uses both real-world data and generated synthetic data.

## 2.1 Kaggle Dataset (Real Ridership Data)

Source: Kaggle -- Namma Metro Ridership Dataset

File: datasets/raw/NammaMetro_Ridership_Dataset.csv

This dataset contains historical passenger usage including: - Smart Card
usage - Token usage - QR ticket usage - Total passenger counts

This dataset was used to estimate realistic passenger demand patterns.

------------------------------------------------------------------------

## 2.2 Station Dataset (Manually Prepared)

File: datasets/processed/stations.csv

Columns:

  Column    Description
  --------- --------------
  code      Station Code
  station   Station Name
  line      Metro Line

Example:

  Code   Station                 Line
  ------ ----------------------- -------------
  WHTM   Whitefield (Kadugodi)   Purple Line
  BYPL   Baiyappanahalli         Purple Line
  BSNK   Banashankari            Green Line

Total stations included in the system:

83 stations

Across metro lines: - Purple Line - Green Line - Yellow Line

------------------------------------------------------------------------

## 2.3 Metro Network Dataset (Manually Constructed)

File: datasets/processed/metro_network.csv

This dataset represents the structure of the metro system.

Columns:

  Column                Description
  --------------------- ---------------------------
  station_code          Unique station identifier
  station_name          Station name
  line                  Metro line
  sequence              Station order in the line
  is_interchange        Interchange indicator
  next_station_code     Next station
  latitude              Station latitude
  longitude             Station longitude
  distance_to_next_km   Distance to next station

This dataset was manually constructed using: - Official metro station
lists - Google Maps coordinates - Distance calculations between stations

------------------------------------------------------------------------

## 2.4 Generated Demand Dataset

File: datasets/processed/demand_dataset.csv

Columns:

  Column            Description
  ----------------- ---------------------------
  station           Station name
  hour              Hour of the day
  day               Day of the week
  weather           Weather condition
  event             Special event indicator
  passenger_count   Expected passenger demand

Example:

station,hour,day,weather,event,passenger_count Mantri Square Sampige
Road,21,Sunday,Cloudy,0,13500 Hoodi,10,Wednesday,Rain,1,9734

------------------------------------------------------------------------

# 3. Dataset Size

Total rows in dataset:

7497 rows

Features used for prediction:

-   station
-   hour
-   day
-   weather
-   event

Target variable:

passenger_count

------------------------------------------------------------------------

# 4. Feature Engineering

Categorical features were encoded using Label Encoding.

Columns encoded: - station - day - weather

Example transformation:

  Station       Encoded Value
  ------------- ---------------
  MG Road       12
  Indiranagar   15

This converts categorical values into numerical values usable by machine
learning algorithms.

------------------------------------------------------------------------

# 5. Train-Test Split

The dataset was split into:

-   80% training data
-   20% testing data

Results:

Training rows: 5997\
Testing rows: 1500

This allows the model to be evaluated on unseen data.

------------------------------------------------------------------------

# 6. Algorithm Used

The machine learning algorithm used:

Random Forest Regressor

Library used:

scikit-learn

Implementation:

sklearn.ensemble.RandomForestRegressor

Random Forest works well for structured tabular datasets and reduces
overfitting by combining multiple decision trees.

------------------------------------------------------------------------

# 7. Model Configuration

The model was trained with the following parameters:

n_estimators = 150\
max_depth = 12\
random_state = 42

Explanation:

  Parameter      Meaning
  -------------- --------------------------
  n_estimators   Number of decision trees
  max_depth      Maximum depth of trees
  random_state   Ensures reproducibility

------------------------------------------------------------------------

# 8. Model Training

Training was performed using:

model.fit(X_train, y_train)

Where:

X_train → Input features\
y_train → Passenger counts

The model learns relationships between:

station + time + conditions → passenger demand

------------------------------------------------------------------------

# 9. Model Evaluation

Evaluation metric used:

Mean Absolute Error (MAE)

MAE measures the average difference between predicted and actual
passenger counts.

Result:

Mean Absolute Error ≈ 2121 passengers

------------------------------------------------------------------------

# 10. Model Accuracy

Average station demand:

\~14000 passengers

Prediction error:

\~2121 passengers

Approximate accuracy:

≈ 85%

This level of accuracy is acceptable for demand forecasting in
transportation systems.

------------------------------------------------------------------------

# 11. Example Prediction

Input:

station: MG Road\
hour: 8\
day: Monday\
weather: Clear\
event: 0

Output:

predicted_demand: 14800\
crowd_level: High

------------------------------------------------------------------------

# 12. Model Storage

The trained model is saved as:

ai-service/app/models/demand_model.pkl

The model is stored using:

joblib.dump()

This allows the AI service to load the model later for predictions.

------------------------------------------------------------------------

# 13. Model Inference

During runtime the AI service loads the trained model:

joblib.load("demand_model.pkl")

The backend sends prediction requests to the AI service.

Example API:

POST /predict-demand

Example request:

{ "station": "MG Road", "hour": 8, "day": "Monday", "weather": "Clear",
"event": 0 }

Example response:

{ "predicted_demand": 15000, "crowd_level": "High" }

------------------------------------------------------------------------

# 14. System Integration

The prediction pipeline works as:

Frontend → Backend → AI Service → ML Model

The predicted results are used in:

-   Ticket booking insights
-   Congestion monitoring
-   Admin dashboard visualization
-   Metro network map

------------------------------------------------------------------------

# 15. Advantages of the Model

The demand prediction model enables:

-   Proactive congestion management
-   Improved train scheduling
-   Better passenger distribution
-   Data-driven decision making

------------------------------------------------------------------------

# 16. Future Improvements

Possible improvements include:

-   Integration with real-time weather APIs
-   Using live ticketing data
-   Deep learning demand models
-   Reinforcement learning scheduling

------------------------------------------------------------------------

# Conclusion

The MetroMind AI Demand Prediction Model uses machine learning and
contextual data to estimate metro station passenger demand.

The model was trained using 7497 samples and achieved approximately 85%
prediction accuracy, making it suitable for intelligent metro traffic
management.
