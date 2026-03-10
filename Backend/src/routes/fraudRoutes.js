const express = require("express");
const router = express.Router();
const fraudController = require("../controllers/fraudController");

router.get("/", fraudController.getFraudAlerts);
router.post("/check", fraudController.checkFraud);

module.exports = router;