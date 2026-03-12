const db = require("../config/database");

exports.getStationLine = (stationName) => {

  return new Promise((resolve, reject) => {

    const query = `
      SELECT line FROM stations WHERE name = ?
    `;

    db.get(query, [stationName], (err, row) => {

      if (err) return reject(err);
      if (!row) return reject(new Error("Station not found"));

      resolve(row.line);

    });

  });

};

// CREATE TICKET
exports.createTicket = (ticket) => {

  return new Promise((resolve, reject) => {

    const query = `
      INSERT INTO tickets 
      (id, source_station, destination_station, booking_time, crowd_level, qr_code)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [
        ticket.id,
        ticket.source,
        ticket.destination,
        ticket.booking_time,
        ticket.crowd_level,
        ticket.qr_code
      ],
      function (err) {

        if (err) return reject(err);

        resolve(ticket);

      }
    );

  });

};



// GET TICKET
exports.getTicketById = (ticketId) => {

  return new Promise((resolve, reject) => {

    const query = "SELECT * FROM tickets WHERE id = ?";

    db.get(query, [ticketId], (err, row) => {

      if (err) return reject(err);

      resolve(row);

    });

  });

};



// CREATE ENTRY RECORD
exports.createEntryValidation = (ticket_id, entry_station) => {

  return new Promise((resolve, reject) => {

    const query = `
      INSERT INTO ticket_validations
      (ticket_id, entry_station, entry_time)
      VALUES (?, ?, datetime('now'))
    `;

    db.run(query, [ticket_id, entry_station], function (err) {

      if (err) return reject(err);

      resolve(true);

    });

  });

};



// GET ACTIVE ENTRY
exports.getActiveEntry = (ticket_id) => {

  return new Promise((resolve, reject) => {

    const query = `
      SELECT * FROM ticket_validations
      WHERE ticket_id = ? AND exit_time IS NULL
    `;

    db.get(query, [ticket_id], (err, row) => {

      if (err) return reject(err);

      resolve(row);

    });

  });

};



// UPDATE EXIT
exports.updateExitValidation = (ticket_id, exit_station, distance) => {

  return new Promise((resolve, reject) => {

    const query = `
      UPDATE ticket_validations
      SET exit_station = ?, 
          exit_time = datetime('now'),
          travel_time = CAST((strftime('%s','now') - strftime('%s',entry_time)) AS INTEGER),
          distance = ?
      WHERE ticket_id = ? AND exit_time IS NULL
    `;

    db.run(query, [exit_station, distance, ticket_id], function (err) {

      if (err) return reject(err);

      resolve(true);

    });

  });

};

exports.updateTicketTravelTime = (ticket_id, travel_time) => {
  return new Promise((resolve, reject) => {

    const query = `
      UPDATE tickets
      SET travel_time = ?
      WHERE id = ?
    `;

    db.run(query, [travel_time, ticket_id], function (err) {
      if (err) return reject(err);
      resolve(true);
    });

  });
};

// CALCULATE DISTANCE BETWEEN TWO STATIONS
exports.calculateDistance = (entryStationName, exitStationName) => {

  return new Promise((resolve, reject) => {

    const getEntryCode = `
      SELECT code FROM stations WHERE name = ?
    `;

    const getExitCode = `
      SELECT code FROM stations WHERE name = ?
    `;

    db.get(getEntryCode, [entryStationName], (err, entry) => {

      if (err) return reject(err);
      if (!entry) return reject(new Error("Entry station not found"));

      db.get(getExitCode, [exitStationName], (err, exit) => {

        if (err) return reject(err);
        if (!exit) return reject(new Error("Exit station not found"));

        const entryCode = entry.code;
        const exitCode = exit.code;

        const seqQuery = `
          SELECT sequence, line
          FROM metro_network
          WHERE station_code = ?
        `;

        db.get(seqQuery, [entryCode], (err, entryStation) => {

          if (err) return reject(err);
          if (!entryStation) return reject(new Error("Entry station not in metro network"));

          db.get(seqQuery, [exitCode], (err, exitStation) => {

            if (err) return reject(err);
            if (!exitStation) return reject(new Error("Exit station not in metro network"));

            // 🚨 LINE VALIDATION
            if (entryStation.line !== exitStation.line) {
              return reject(new Error("Stations are on different metro lines"));
            }

            const start = Math.min(entryStation.sequence, exitStation.sequence);
            const end = Math.max(entryStation.sequence, exitStation.sequence);

            const distanceQuery = `
              SELECT SUM(distance_to_next_km) AS total_distance
              FROM metro_network
              WHERE sequence >= ?
              AND sequence < ?
              AND line = ?
            `;

            db.get(
              distanceQuery,
              [start, end, entryStation.line],
              (err, result) => {

                if (err) return reject(err);

                if (!result || result.total_distance === null) {
                  return resolve(0);
                }

                resolve(result.total_distance);

              }
            );

          });

        });

      });

    });

  });

};

exports.getCompletedTrip = (ticket_id) => {

  return new Promise((resolve, reject) => {

    const query = `
      SELECT * FROM ticket_validations
      WHERE ticket_id = ?
      AND exit_time IS NOT NULL
      LIMIT 1
    `;

    db.get(query, [ticket_id], (err, row) => {

      if (err) return reject(err);

      resolve(row);

    });

  });

};

exports.getStationDetails = (stationName) => {

  return new Promise((resolve, reject) => {

    const query = `
      SELECT 
        s.name,
        m.is_interchange
      FROM stations s
      LEFT JOIN metro_network m
      ON s.code = m.station_code
      WHERE s.name = ?
      LIMIT 1
    `;

    db.get(query, [stationName], (err, row) => {

      if (err) return reject(err);

      resolve(row);

    });

  });

};