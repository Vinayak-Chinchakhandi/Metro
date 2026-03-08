const express = require("express");
const router = express.Router();
const fraudController = require("../controllers/fraudController");

router.get("/", fraudController.getFraudAlerts);

module.exports = router;