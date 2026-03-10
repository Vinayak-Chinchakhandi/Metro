CREATE TABLE stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    line TEXT NOT NULL
);

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

CREATE TABLE tickets (
    id TEXT PRIMARY KEY,
    source_station TEXT NOT NULL,
    destination_station TEXT NOT NULL,
    booking_time TEXT,
    travel_time TEXT,
    crowd_level TEXT,
    qr_code TEXT
);

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

CREATE TABLE fraud_alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT,
    fraud_probability REAL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    station TEXT,
    hour INTEGER,
    day TEXT,
    predicted_demand INTEGER,
    crowd_level TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);