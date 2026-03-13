const db = require("../config/database");

exports.savePrediction = (prediction) => {

  return new Promise((resolve, reject) => {

    const query = `
      INSERT INTO predictions
      (station, hour, day, predicted_demand, crowd_level)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [
        prediction.station,
        prediction.hour,
        prediction.day,
        prediction.predicted_demand,
        prediction.crowd_level
      ],
      function (err) {

        if (err) return reject(err);

        resolve(this.lastID);

      }
    );

  });

};

exports.getPredictions = (date, month) => {

  return new Promise((resolve, reject) => {

    let query = "SELECT * FROM predictions WHERE 1=1";
    let params = [];

    if (date) {
      query += " AND DATE(created_at) = ?";
      params.push(date);
    }

    if (month) {
      query += " AND strftime('%Y-%m', created_at) = ?";
      params.push(month);
    }

    query += " ORDER BY created_at DESC";

    db.all(query, params, (err, rows) => {

      if (err) return reject(err);

      resolve(rows);

    });

  });

};