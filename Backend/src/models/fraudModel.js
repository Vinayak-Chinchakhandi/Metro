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


exports.getAlerts = (date, month) => {

  return new Promise((resolve, reject) => {

    let query = "SELECT * FROM fraud_alerts WHERE 1=1";
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