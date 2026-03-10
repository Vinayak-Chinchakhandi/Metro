const db = require("../config/database");



exports.createAlert = (alert) => {

  return new Promise((resolve, reject) => {

    const query = `
      INSERT INTO fraud_alerts(ticket_id, fraud_probability, reason)
      VALUES (?,?,?)
    `;

    db.run(
      query,
      [alert.ticket_id, alert.fraud_probability, alert.reason],
      function (err) {

        if (err) return reject(err);

        resolve(this.lastID);

      }
    );

  });

};


exports.getAlerts = () => {

  return new Promise((resolve, reject) => {

    db.all("SELECT * FROM fraud_alerts", (err, rows) => {

      if (err) return reject(err);

      resolve(rows);

    });

  });

};