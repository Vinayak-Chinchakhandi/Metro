import pandas as pd
import random
import uuid
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

stations_path = BASE_DIR / "datasets" / "processed" / "stations.csv"
network_path = BASE_DIR / "datasets" / "processed" / "metro_network.csv"
output_path = BASE_DIR / "datasets" / "processed" / "fraud_dataset.csv"

stations = pd.read_csv(stations_path)
network = pd.read_csv(network_path)

station_list = stations["station"].tolist()

TOTAL_ROWS = 5000
FRAUD_RATIO = 0.20

rows = []

for i in range(TOTAL_ROWS):

    entry_station = random.choice(station_list)
    exit_station = random.choice(station_list)

    while exit_station == entry_station:
        exit_station = random.choice(station_list)

    entry_hour = random.randint(5, 23)

    # realistic metro distance
    distance = round(random.uniform(2, 25), 2)

    # normal travel time calculation
    normal_time = (distance / 35) * 60
    normal_time = int(normal_time + random.randint(-3, 3))

    ticket_type = random.choice(["QR", "SmartCard", "Token"])

    fraud_label = 0
    repeat_usage = 0
    travel_time = normal_time

    if random.random() < FRAUD_RATIO:

        fraud_label = 1
        fraud_type = random.choice(["reuse", "impossible_time", "slow_travel"])

        if fraud_type == "reuse":
            repeat_usage = 1

        elif fraud_type == "impossible_time":
            travel_time = random.randint(1, 3)

        elif fraud_type == "slow_travel":
            travel_time = normal_time + random.randint(40, 80)

    rows.append({
        "ticket_id": str(uuid.uuid4())[:8],
        "entry_station": entry_station,
        "exit_station": exit_station,
        "entry_hour": entry_hour,
        "travel_time": travel_time,
        "ticket_type": ticket_type,
        "distance": distance,
        "repeat_usage": repeat_usage,
        "fraud_label": fraud_label
    })

df = pd.DataFrame(rows)

df.to_csv(output_path, index=False)

print("Fraud dataset generated successfully")
print("Total rows:", len(df))
print("Fraud rows:", df["fraud_label"].sum())