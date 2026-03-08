const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/metro.db", (err) => {
  if (err) {
    console.error("Database error", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = db;