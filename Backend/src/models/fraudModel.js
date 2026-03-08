const db = require("../config/database");

exports.createAlert = (alert) => {

  const query = `
  INSERT INTO fraud_alerts(ticket_id, fraud_probability)
  VALUES (?,?)
  `;

  db.run(query, [alert.ticket_id, alert.fraud_probability]);
};

exports.getAlerts = () => {

  return new Promise((resolve,reject)=>{

    db.all("SELECT * FROM fraud_alerts",(err,rows)=>{
      if(err) reject(err)
      resolve(rows)
    })

  })
};