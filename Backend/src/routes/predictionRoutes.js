const express = require("express");
const router = express.Router();
const predictionController = require("../controllers/predictionController");

router.get("/", predictionController.getPredictions);

module.exports = router;