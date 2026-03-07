import pandas as pd
import random
import uuid
from datetime import datetime, timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

stations_path = BASE_DIR / "datasets" / "processed" / "stations.csv"
creditcard_path = BASE_DIR / "datasets" / "raw" / "creditcard.csv"
output_path = BASE_DIR / "datasets" / "processed" / "fraud_dataset.csv"

stations = pd.read_csv(stations_path)
fraud_source = pd.read_csv(creditcard_path)

station_list = stations["station"].tolist()

fraud_ratio = fraud_source["Class"].mean()

print("Fraud ratio learned from dataset:", fraud_ratio)

rows = []

for i in range(5000):

    entry_station = random.choice(station_list)
    exit_station = random.choice(station_list)

    while exit_station == entry_station:
        exit_station = random.choice(station_list)

    entry_hour = random.randint(5, 23)
    travel_minutes = random.randint(2, 45)

    entry_time = datetime(2024, 1, 1, entry_hour, random.randint(0, 59))
    exit_time = entry_time + timedelta(minutes=travel_minutes)

    ticket_type = random.choice(["QR", "SmartCard", "Token"])

    distance = round(random.uniform(1.0, 25.0), 2)

    fraud_label = 1 if random.random() < fraud_ratio else 0

    repeat_usage = 1 if random.random() < 0.05 else 0

    rows.append({
        "ticket_id": str(uuid.uuid4())[:8],
        "entry_station": entry_station,
        "exit_station": exit_station,
        "entry_hour": entry_hour,
        "travel_time": travel_minutes,
        "ticket_type": ticket_type,
        "distance": distance,
        "repeat_usage": repeat_usage,
        "fraud_label": fraud_label
    })

df = pd.DataFrame(rows)

df.to_csv(output_path, index=False)

print("Fraud dataset generated successfully")
print("Total rows:", len(df))
print("Saved to:", output_path)