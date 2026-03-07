import pandas as pd
import random
from pathlib import Path

# project root
BASE_DIR = Path(__file__).resolve().parents[3]

raw_data = BASE_DIR / "datasets" / "raw"
processed_data = BASE_DIR / "datasets" / "processed"

ridership_file = raw_data / "NammaMetro_Ridership_Dataset.csv"
stations_file = processed_data / "stations.csv"

ridership = pd.read_csv(ridership_file)
stations = pd.read_csv(stations_file)

# calculate total passengers
ridership["total_passengers"] = (
    ridership["Total Smart Cards"]
    + ridership["Total Tokens"]
    + ridership["Total QR"]
)

avg_daily_passengers = ridership["total_passengers"].mean()

station_list = stations["station"].tolist()

hours = list(range(6, 23))

days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

weather_options = ["Clear", "Rain", "Cloudy"]

data = []

for station in station_list:

    base = avg_daily_passengers / len(station_list)

    for day in days:

        for hour in hours:

            weather = random.choice(weather_options)
            event = random.choice([0,0,0,1])

            peak_multiplier = 1

            if hour in [8,9,18,19]:
                peak_multiplier = 1.6

            passenger_count = int(
                base * peak_multiplier * random.uniform(0.7,1.3)
            )

            data.append({
                "station": station,
                "hour": hour,
                "day": day,
                "weather": weather,
                "event": event,
                "passenger_count": passenger_count
            })

df = pd.DataFrame(data)

output_file = processed_data / "demand_dataset.csv"

df = df.sample(frac=1).reset_index(drop=True)

df.to_csv(output_file, index=False)

print("Demand dataset created successfully!")