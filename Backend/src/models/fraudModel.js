const db = require("../config/database");

const getAllFraudAlerts = () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM fraud_alerts ORDER BY created_at DESC",
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

const getFraudAlertsByTicket = (ticketId) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM fraud_alerts WHERE ticket_id = ? ORDER BY created_at DESC",
      [ticketId],
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

const createFraudAlert = (fraudData) => {
  const { ticket_id, fraud_probability, reason } = fraudData;
  const created_at = new Date().toISOString();

  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO fraud_alerts (ticket_id, fraud_probability, reason, created_at)
      VALUES (?, ?, ?, ?)
    `;

    db.run(
      sql,
      [ticket_id, fraud_probability, reason, created_at],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            ticket_id,
            fraud_probability,
            reason,
            created_at,
          });
        }
      },
    );
  });
};

module.exports = {
  getAllFraudAlerts,
  getFraudAlertsByTicket,
  createFraudAlert,
};
