const ticketModel = require("../models/ticketModel");
const aiService = require("./aiService");
const qrGenerator = require("../utils/qrGenerator");

exports.bookTicket = async (data) => {

  const { source, destination, time } = data;

  // Call AI demand prediction
  const prediction = await aiService.predictDemand(source, time);

  const crowd_level = prediction.crowd_level;

  // Generate ticket ID
  const ticketId = "T" + Date.now();

  const qrData = {
    ticketId,
    source,
    destination,
    time
  };

  const qrCode = await qrGenerator.generateQR(qrData);

  const ticket = {
    id: ticketId,
    source,
    destination,
    time,
    crowd_level,
    qr_code: qrCode
  };

  await ticketModel.createTicket(ticket);

  return ticket;
};