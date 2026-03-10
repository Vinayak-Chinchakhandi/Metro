const ticketService = require("../services/ticketService");


/*
----------------------------------------
BOOK TICKET
----------------------------------------
*/
exports.bookTicket = async (req, res) => {
  try {

    const { source, destination, time } = req.body;

    if (!source || !destination || !time) {
      return res.status(400).json({
        error: "source, destination and time are required"
      });
    }

    const ticket = await ticketService.bookTicket({
      source,
      destination,
      time
    });

    return res.status(200).json(ticket);

  } catch (error) {

    console.error("Ticket Booking Error:", error);

    return res.status(400).json({
      error: error.message
    });
  }
};



/*
----------------------------------------
VALIDATE TICKET
----------------------------------------
*/
exports.validateTicket = async (req, res) => {
  try {

    const { ticket_id } = req.body;

    if (!ticket_id) {
      return res.status(400).json({
        error: "ticket_id is required"
      });
    }

    const result = await ticketService.validateTicket({
      ticket_id
    });

    return res.status(200).json(result);

  } catch (error) {

    console.error("Ticket Validation Error:", error);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
};

exports.entryScan = async (req, res) => {

  try {

    const result = await ticketService.entryScan(req.body);

    if (result.status === "invalid") {
      return res.status(400).json(result);
    }

    res.json(result);

  } catch (error) {

    console.error("Entry Error:", error);

    res.status(500).json({
      error: "Internal server error"
    });

  }

};


exports.exitScan = async (req, res) => {

  try {

    const result = await ticketService.exitScan(req.body);

    if (result.status === "invalid") {
      return res.status(400).json(result);
    }

    res.json(result);

  } catch (error) {

    console.error("Exit Error:", error);

    res.status(500).json({
      error: "Internal server error"
    });

  }

};