const db = require("../config/database");

exports.createTicket = (ticket) => {
  return new Promise((resolve, reject) => {

    const query = `
    INSERT INTO tickets (id, source, destination, time, qr_code, crowd_level)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(query,
      [
        ticket.id,
        ticket.source,
        ticket.destination,
        ticket.time,
        ticket.qr_code,
        ticket.crowd_level
      ],
      (err) => {
        if (err) return reject(err);
        resolve(ticket);
      }
    );
  });
};