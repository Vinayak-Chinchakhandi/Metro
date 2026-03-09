const db = require("../config/database");

exports.getPredictions = () => {

  return new Promise((resolve, reject) => {

    db.all("SELECT * FROM predictions", (err, rows) => {

      if (err) return reject(err);

      resolve(rows);

    });

  });

};