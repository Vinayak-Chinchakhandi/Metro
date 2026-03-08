const ticketService = require("../services/ticketService");

exports.bookTicket = async (req, res) => {
  try {

    console.log("BODY:", req.body);

    const ticket = await ticketService.bookTicket(req.body);

    console.log("GENERATED TICKET:", ticket);

    res.json(ticket);

  } catch (err) {

    console.error("ERROR:", err);

    res.status(500).json({ error: err.message });

  }
};