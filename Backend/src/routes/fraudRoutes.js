const express = require("express");
const router = express.Router();
const fraudController = require("../controllers/fraudController");

router.get("/", fraudController.getFraudAlerts);
router.get("/:ticketId", fraudController.getFraudAlertsByTicket);
router.post("/", fraudController.createFraudAlert);

module.exports = router;
