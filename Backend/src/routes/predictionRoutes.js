const express = require("express");
const router = express.Router();
const predictionController = require("../controllers/predictionController");

// Seed endpoint for demo data
router.post("/seed", async (req, res) => {
  const predictionModel = require("../models/predictionModel");
  const fraudModel = require("../models/fraudModel");

  try {
    // Sample predictions
    const predictions = [
      {
        station: "Baiyappanahalli",
        hour: 8,
        day: "Monday",
        predicted_demand: 450,
        crowd_level: "High",
      },
      {
        station: "Indiranagar",
        hour: 9,
        day: "Monday",
        predicted_demand: 320,
        crowd_level: "Medium",
      },
      {
        station: "MG Road",
        hour: 10,
        day: "Monday",
        predicted_demand: 280,
        crowd_level: "Medium",
      },
      {
        station: "Cubbon Park",
        hour: 11,
        day: "Monday",
        predicted_demand: 200,
        crowd_level: "Low",
      },
      {
        station: "Majestic",
        hour: 12,
        day: "Monday",
        predicted_demand: 520,
        crowd_level: "High",
      },
    ];

    // Sample fraud alerts
    const fraudAlerts = [
      {
        ticket_id: "TICKET-001",
        fraud_probability: 0.85,
        reason: "Multiple rapid validations",
      },
      {
        ticket_id: "TICKET-002",
        fraud_probability: 0.72,
        reason: "Unusual travel pattern",
      },
      {
        ticket_id: "TICKET-003",
        fraud_probability: 0.91,
        reason: "Entry without exit record",
      },
    ];

    for (const pred of predictions) {
      await predictionModel.createPrediction(pred);
    }

    for (const alert of fraudAlerts) {
      await fraudModel.createFraudAlert(alert);
    }

    res.json({ message: "Sample data seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", predictionController.getPredictions);
router.get("/:station", predictionController.getPredictionsByStation);
router.post("/", predictionController.createPrediction);

module.exports = router;
