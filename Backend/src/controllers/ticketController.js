const ticketModel = require("../models/ticketModel");
const axios = require("axios");
const qrcode = require("qrcode");
const { v4: uuidv4 } = require("uuid");

const bookTicket = async (req, res) => {
  try {
    const { source, destination, time } = req.body;

    // Generate ticket ID (mostly for qr generation, model will also create its own ID)
    const ticketId = uuidv4();

    // Call AI service for demand prediction
    let crowdLevel = "Unknown";
    try {
      const aiResponse = await axios.post(
        "http://localhost:8000/predict-demand",
        {
          station: source,
          hour: parseInt(time.split(":")[0]),
        },
      );
      crowdLevel = aiResponse.data.crowd_level || "Unknown";
    } catch (aiError) {
      console.error("AI service error:", aiError.message);
    }

    // Generate QR code as data URL (encoded ticket information)
    const qrData = JSON.stringify({
      ticketId,
      source,
      destination,
      time,
      crowdLevel,
    });
    console.log("generating qr for:", qrData);
    const qrCode = await qrcode.toDataURL(qrData);
    console.log("qrCode produced length", qrCode?.length);

    // prepare data for persistence
    const ticketData = {
      source_station: source,
      destination_station: destination,
      time,
      crowd_level: crowdLevel,
      qr_code: qrCode,
    };
    console.log("ticketData before save", ticketData);

    // create record in database
    const ticket = await ticketModel.createTicket(ticketData);

    // return the saved object, which now includes the stored qr_code
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// new handler to fetch ticket by id
const getTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await ticketModel.getTicketById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  bookTicket,
  getTicket,
};
