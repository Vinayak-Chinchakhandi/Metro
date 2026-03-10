import sqlite3
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DB_PATH = os.path.join(BASE_DIR, "database", "metro.db")
OUTPUT_FILE = os.path.join(BASE_DIR, "frontend", "src", "maps", "metroStations.js")

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute("SELECT * FROM metro_network")
rows = cursor.fetchall()

columns = [description[0] for description in cursor.description]

stations = []
for row in rows:
    stations.append(dict(zip(columns, row)))

js_content = "export const metroStations = " + json.dumps(stations, indent=2) + ";"

with open(OUTPUT_FILE, "w") as f:
    f.write(js_content)

print("metroStations.js generated successfully!")

conn.close()