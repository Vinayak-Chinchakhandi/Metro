const db = require("../config/database");

const getAllPredictions = () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM predictions ORDER BY created_at DESC",
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      },
    );
  });
};

const getPredictionsByStation = (station) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM predictions WHERE station = ? ORDER BY created_at DESC",
      [station],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      },
    );
  });
};

const createPrediction = (predictionData) => {
  const { station, hour, day, predicted_demand, crowd_level } = predictionData;
  const created_at = new Date().toISOString();

  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO predictions (station, hour, day, predicted_demand, crowd_level, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [station, hour, day, predicted_demand, crowd_level, created_at],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            station,
            hour,
            day,
            predicted_demand,
            crowd_level,
            created_at,
          });
        }
      },
    );
  });
};

module.exports = {
  getAllPredictions,
  getPredictionsByStation,
  createPrediction,
};
