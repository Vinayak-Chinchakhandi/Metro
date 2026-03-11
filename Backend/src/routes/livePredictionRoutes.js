const express = require("express");
const router = express.Router();

const controller = require("../controllers/livePredictionController");

router.get("/", controller.getLivePredictions);

module.exports = router;