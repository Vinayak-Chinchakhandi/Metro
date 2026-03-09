import pandas as pd

# Load raw dataset
df = pd.read_csv("datasets/raw/Namma_Metro_stations(Bengaluru).csv")

# Select required columns
df = df[[
    "Station Name (English)",
    "Line",
    "Abbreviations"
]]

# Rename columns
df = df.rename(columns={
    "Station Name (English)": "station",
    "Line": "line",
    "Abbreviations": "code"
})

# Remove extra spaces
df["station"] = df["station"].str.strip()
df["line"] = df["line"].str.strip()

# Remove duplicates if any
df = df.drop_duplicates()

# Save cleaned dataset
df.to_csv("datasets/processed/stations.csv", index=False)

print("Stations dataset cleaned successfully!")