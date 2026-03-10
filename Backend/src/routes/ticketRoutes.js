const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

router.post("/book", ticketController.bookTicket);

// fetch a ticket by its id (used by frontend page on refresh)
router.get("/:id", ticketController.getTicket);

module.exports = router;
