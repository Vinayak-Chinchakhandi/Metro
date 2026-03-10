const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "metro.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
});

// Sample predictions data
const predictions = [
  ["Baiyappanahalli", 8, "Monday", 450, "High"],
  ["Indiranagar", 9, "Monday", 320, "Medium"],
  ["MG Road", 10, "Monday", 280, "Medium"],
  ["Cubbon Park", 11, "Monday", 200, "Low"],
  ["Majestic", 12, "Monday", 520, "High"],
  ["Vijayanagar", 13, "Monday", 380, "Medium"],
  ["Whitefield", 14, "Monday", 290, "Medium"],
  ["Yeshwanthpur", 15, "Monday", 340, "Medium"],
  ["Rajajinagar", 16, "Monday", 410, "High"],
  ["Jayanagar", 17, "Monday", 360, "Medium"],
];

// Sample fraud alerts data
const fraudAlerts = [
  ["TICKET-001", 0.85, "Multiple rapid validations"],
  ["TICKET-002", 0.72, "Unusual travel pattern"],
  ["TICKET-003", 0.91, "Entry without exit record"],
  ["TICKET-004", 0.68, "Time gap anomaly"],
  ["TICKET-005", 0.79, "Frequent short trips"],
];

// Insert predictions
predictions.forEach((pred) => {
  db.run(
    `INSERT INTO predictions (station, hour, day, predicted_demand, crowd_level, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))`,
    pred,
    function (err) {
      if (err) {
        console.error("Error inserting prediction:", err.message);
      } else {
        console.log(`Inserted prediction for ${pred[0]}`);
      }
    },
  );
});

// Insert fraud alerts
fraudAlerts.forEach((alert) => {
  db.run(
    `INSERT INTO fraud_alerts (ticket_id, fraud_probability, reason, created_at) VALUES (?, ?, ?, datetime('now'))`,
    alert,
    function (err) {
      if (err) {
        console.error("Error inserting fraud alert:", err.message);
      } else {
        console.log(`Inserted fraud alert for ${alert[0]}`);
      }
    },
  );
});

db.close((err) => {
  if (err) {
    console.error("Error closing database:", err.message);
  } else {
    console.log("Database connection closed.");
  }
});
