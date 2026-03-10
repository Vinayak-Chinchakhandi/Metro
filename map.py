import sqlite3
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DB_PATH = os.path.join(BASE_DIR, "database", "metro.db")
OUTPUT_FILE = os.path.join(BASE_DIR, "frontend", "src", "maps", "metroStations.js")

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

query = """
SELECT 
    mn.station_code,
    s.name AS station_name,
    mn.line,
    mn.sequence,
    mn.is_interchange,
    mn.latitude,
    mn.longitude,
    mn.next_station_code,
    mn.distance_to_next_km
FROM metro_network mn
JOIN stations s
ON mn.station_code = s.code
ORDER BY mn.line, mn.sequence
"""

cursor.execute(query)

rows = cursor.fetchall()

columns = [desc[0] for desc in cursor.description]

stations = []

for row in rows:
    record = dict(zip(columns, row))

    stations.append({
        "code": record["station_code"],
        "name": record["station_name"],
        "line": record["line"],
        "sequence": record["sequence"],
        "latitude": record["latitude"],
        "longitude": record["longitude"],
        "next_station_code": record["next_station_code"],
        "distance_to_next_km": record["distance_to_next_km"],
        "is_interchange": bool(record["is_interchange"])
    })

js_content = "const metroStations = " + json.dumps(stations, indent=2) + ";\n\nexport default metroStations;"

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(js_content)

print("metroStations.js generated successfully!")

conn.close()