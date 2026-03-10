const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

router.post("/book", ticketController.bookTicket);
router.post("/validate", ticketController.validateTicket);
router.post("/entry", ticketController.entryScan);
router.post("/exit", ticketController.exitScan);

module.exports = router;