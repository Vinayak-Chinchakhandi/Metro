import pandas as pd

network = pd.read_csv("datasets/processed/metro_network.csv")

stations = network[["station_name","line","station_code"]].drop_duplicates()

stations = stations.rename(columns={
    "station_name": "station",
    "station_code": "code"
})

stations = stations[["station","line","code"]]

stations = stations.sort_values("station")

stations.to_csv("datasets/processed/stations.csv", index=False)

print("Stations dataset generated successfully")
print("Total stations:", len(stations))