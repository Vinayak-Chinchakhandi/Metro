# MetroMind AI -- Database Schema

This document describes the normalized database structure used in the
MetroMind AI system.

Database: SQLite

Tables included: 1. stations 2. metro_network 3. tickets 4.
ticket_validations 5. fraud_alerts 6. predictions

------------------------------------------------------------------------

# 1. Stations Table

``` sql
CREATE TABLE stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    line TEXT NOT NULL
);
```

  Column   Description
  -------- ---------------------------
  id       unique station identifier
  code     station code
  name     station name
  line     metro line

------------------------------------------------------------------------

# 2. Metro Network Table

``` sql
CREATE TABLE metro_network (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    station_code TEXT NOT NULL,
    next_station_code TEXT,
    line TEXT,
    sequence INTEGER,
    is_interchange INTEGER,
    latitude REAL,
    longitude REAL,
    distance_to_next_km REAL
);
```

  Column                Description
  --------------------- ---------------------------
  station_code          current station
  next_station_code     next station
  line                  metro line
  sequence              station order
  is_interchange        interchange flag
  latitude              latitude
  longitude             longitude
  distance_to_next_km   distance between stations

------------------------------------------------------------------------

# 3. Tickets Table

``` sql
CREATE TABLE tickets (
    id TEXT PRIMARY KEY,
    source_station TEXT NOT NULL,
    destination_station TEXT NOT NULL,
    booking_time TEXT,
    travel_time TEXT,
    crowd_level TEXT,
    qr_code TEXT
);
```

  Column                Description
  --------------------- ---------------------
  id                    ticket ID
  source_station        source station
  destination_station   destination station
  booking_time          booking time
  travel_time           travel time
  crowd_level           congestion level
  qr_code               QR code data

------------------------------------------------------------------------

# 4. Ticket Validations Table

``` sql
CREATE TABLE ticket_validations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT,
    entry_station TEXT,
    exit_station TEXT,
    entry_time TEXT,
    exit_time TEXT,
    travel_time INTEGER,
    distance REAL
);
```

  Column          Description
  --------------- -------------------
  ticket_id       ticket reference
  entry_station   entry station
  exit_station    exit station
  entry_time      entry time
  exit_time       exit time
  travel_time     total travel time
  distance        travel distance

------------------------------------------------------------------------

# 5. Fraud Alerts Table

``` sql
CREATE TABLE fraud_alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT,
    fraud_probability REAL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

  Column              Description
  ------------------- -------------------
  ticket_id           ticket reference
  fraud_probability   probability score
  reason              reason for fraud
  created_at          timestamp

------------------------------------------------------------------------

# 6. Predictions Table

``` sql
CREATE TABLE predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    station TEXT,
    hour INTEGER,
    day TEXT,
    predicted_demand INTEGER,
    crowd_level TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

  Column             Description
  ------------------ ----------------------
  station            station name
  hour               hour of day
  day                day of week
  predicted_demand   predicted passengers
  crowd_level        congestion level
  created_at         timestamp

------------------------------------------------------------------------

# Relationships

stations → metro_network

stations → tickets

tickets → ticket_validations

ticket_validations → fraud_alerts

stations → predictions

------------------------------------------------------------------------

This schema supports: - ticket booking - QR validation - fraud
detection - passenger demand prediction - metro analytics dashboard
