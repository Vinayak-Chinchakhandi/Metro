const db = require("../config/database");

exports.getStations = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM stations", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};