const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../../database/metro.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database error", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = db;