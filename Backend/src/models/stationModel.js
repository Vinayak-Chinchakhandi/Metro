const db = require("../config/database");

exports.getStations = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT s.name, s.code, s.line, m.is_interchange FROM stations s LEFT JOIN metro_network m ON s.code = m.station_code GROUP BY s.code", (err, rows) => {
      if (err) reject(err);
    resolve(rows);
  });
});
};