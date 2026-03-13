const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/kpi", (req, res) => {

  const response = {};

  db.get(
    `SELECT COUNT(*) AS totalTickets
     FROM tickets
     WHERE DATE(booking_time) = DATE('now','localtime')`,
    [],
    (err, row) => {

      if (err) return res.status(500).json(err);

      response.totalTickets = row.totalTickets;

      db.get(
        `SELECT COUNT(*) AS fraudAlerts
         FROM fraud_alerts
         WHERE DATE(created_at) = DATE('now','localtime')`,
        [],
        (err, row) => {

          if (err) return res.status(500).json(err);

          response.fraudAlerts = row.fraudAlerts;

          db.get(
            `SELECT COUNT(*) AS activeStations
             FROM stations`,
            [],
            (err, row) => {

              if (err) return res.status(500).json(err);

              response.activeStations = row.activeStations;

              res.json(response);

            }
          );

        }
      );

    }
  );

});

router.get("/fraud-stats", (req, res) => {

  const response = {};

  db.get(
    `SELECT COUNT(*) AS fraud
     FROM fraud_alerts
     WHERE DATE(created_at)=DATE('now','localtime')`,
    [],
    (err, row) => {

      if (err) return res.status(500).json(err);

      response.fraud = row.fraud;

      db.get(
        `SELECT COUNT(*) AS tickets
         FROM tickets
         WHERE DATE(booking_time)=DATE('now','localtime')`,
        [],
        (err, row) => {

          if (err) return res.status(500).json(err);

          response.normal = row.tickets - response.fraud;

          res.json([
            { name: "Normal", value: response.normal },
            { name: "Fraud", value: response.fraud }
          ]);

        }
      );

    }
  );

});

router.get("/top-stations", (req, res) => {

  db.all(
    `SELECT source_station AS station,
            COUNT(*) AS trips
     FROM tickets
     WHERE DATE(booking_time)=DATE('now','localtime')
     GROUP BY source_station
     ORDER BY trips DESC
     LIMIT 5`,
    [],
    (err, rows) => {

      if (err) return res.status(500).json(err);

      res.json(rows);

    }
  );

});

module.exports = router;