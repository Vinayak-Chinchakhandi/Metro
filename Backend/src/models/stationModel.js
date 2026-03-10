const db = require('../config/database');

const getAllStations = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM stations', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  getAllStations
};