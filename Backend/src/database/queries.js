const db = require("../config/database");

const createTables = () => {

db.run(`
CREATE TABLE IF NOT EXISTS stations (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS tickets (
id TEXT PRIMARY KEY,
source TEXT,
destination TEXT,
time TEXT,
qr_code TEXT,
crowd_level TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS predictions (
id INTEGER PRIMARY KEY AUTOINCREMENT,
station TEXT,
predicted_demand INTEGER,
crowd_level TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS fraud_alerts (
id INTEGER PRIMARY KEY AUTOINCREMENT,
ticket_id TEXT,
fraud_probability REAL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

};

module.exports = createTables;