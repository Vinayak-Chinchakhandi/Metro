import pandas as pd
import math
from pathlib import Path

# Project root
BASE_DIR = Path(__file__).resolve().parents[3]

network_file = BASE_DIR / "datasets" / "processed" / "metro_network.csv"

# Load dataset
df = pd.read_csv(network_file)

# Haversine formula
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km

    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

    return R * c


# Convert station_code → row index map
station_map = {row["station_code"]: idx for idx, row in df.iterrows()}

distances = []

for idx, row in df.iterrows():

    next_code = row["next_station_code"]

    if next_code == "NULL":
        distances.append(0)
        continue

    if next_code not in station_map:
        distances.append(0)
        continue

    next_row = df.loc[station_map[next_code]]

    lat1 = row["latitude"]
    lon1 = row["longitude"]
    lat2 = next_row["latitude"]
    lon2 = next_row["longitude"]

    dist = haversine(lat1, lon1, lat2, lon2)

    distances.append(round(dist, 2))

df["distance_to_next_km"] = distances

# Save updated dataset
df.to_csv(network_file, index=False)

print("Distances calculated successfully!")