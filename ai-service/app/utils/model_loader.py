import joblib
from pathlib import Path
import pandas as pd
from sklearn.preprocessing import LabelEncoder

BASE_DIR = Path(__file__).resolve().parents[1]

demand_model_path = BASE_DIR / "models" / "demand_model.pkl"
fraud_model_path = BASE_DIR / "models" / "fraud_model.pkl"

demand_model = joblib.load(demand_model_path)
fraud_model = joblib.load(fraud_model_path)

print("Models loaded successfully")

# ---------- Load datasets to recreate encoders ----------

dataset_dir = BASE_DIR.parents[1] / "datasets" / "processed"

demand_data = pd.read_csv(dataset_dir / "demand_dataset.csv")
fraud_data = pd.read_csv(dataset_dir / "fraud_dataset.csv")

# Demand encoders
station_encoder = LabelEncoder()
day_encoder = LabelEncoder()
weather_encoder = LabelEncoder()

station_encoder.fit(demand_data["station"])
day_encoder.fit(demand_data["day"])
weather_encoder.fit(demand_data["weather"])

# Fraud encoders
entry_station_encoder = LabelEncoder()
exit_station_encoder = LabelEncoder()
ticket_type_encoder = LabelEncoder()

entry_station_encoder.fit(fraud_data["entry_station"])
exit_station_encoder.fit(fraud_data["exit_station"])
ticket_type_encoder.fit(fraud_data["ticket_type"])