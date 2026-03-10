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

exports.getPredictions = () => {

  return new Promise((resolve, reject) => {

    db.all("SELECT * FROM predictions", (err, rows) => {

      if (err) return reject(err);

      resolve(rows);

    });

  });

};