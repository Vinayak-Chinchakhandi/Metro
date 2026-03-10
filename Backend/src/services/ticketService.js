const ticketModel = require("../models/ticketModel");
const aiService = require("./aiService");
const qrService = require("./qrService");
const fraudModel = require("../models/fraudModel");
const predictionModel = require("../models/predictionModel");


// BOOK TICKET
exports.bookTicket = async (data) => {

  const { source, destination, time } = data;

  if (!source || !destination || !time) {
    throw new Error("Missing ticket booking fields");
  }

  if (source === destination) {
    throw new Error("Source and destination cannot be the same");
  }

  // 🚨 Check if both stations are on same line
  const sourceLine = await ticketModel.getStationLine(source);
  const destinationLine = await ticketModel.getStationLine(destination);

  if (sourceLine !== destinationLine) {
    throw new Error("Interchange routes are coming soon. Please select stations on the same line.");
  }

  const prediction = await aiService.predictDemand(source, time);

  await predictionModel.savePrediction({
    station: source,
    hour: parseInt(time.split(":")[0]),
    day: new Date().toLocaleString("en-US", { weekday: "long" }),
    predicted_demand: prediction.predicted_demand,
    crowd_level: prediction.crowd_level
  });

  const crowd_level = prediction.crowd_level;

  const ticketId = "T" + Date.now();

  const qrData = {
    ticketId,
    source,
    destination,
    time
  };

  const qrCode = await qrService.generateQR(qrData);

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



// VALIDATE TICKET
exports.validateTicket = async ({ ticket_id }) => {

  const ticket = await ticketModel.getTicketById(ticket_id);

  if (!ticket) {
    return {
      status: "invalid",
      message: "Ticket not found"
    };
  }

  return {
    status: "valid",
    ticket
  };

};


// ENTRY SCAN
exports.entryScan = async ({ ticket_id, entry_station }) => {

  const ticket = await ticketModel.getTicketById(ticket_id);

  if (!ticket) {
    return { status: "invalid", message: "Ticket not found" };
  }

  if (ticket.source_station !== entry_station) {
    return {
      status: "invalid",
      message: "Entry station does not match ticket source"
    };
  }

  // 🚨 CHECK IF TICKET ALREADY COMPLETED A TRIP
  const completedTrip = await ticketModel.getCompletedTrip(ticket_id);

  if (completedTrip) {
    return {
      status: "invalid",
      message: "Ticket already used"
    };
  }

  const existingEntry = await ticketModel.getActiveEntry(ticket_id);

  if (existingEntry) {
    return { status: "invalid", message: "Already entered station" };
  }

  await ticketModel.createEntryValidation(ticket_id, entry_station);

  return {
    status: "entry recorded",
    ticket_id,
    entry_station
  };

};

// EXIT SCAN + FRAUD DETECTION
exports.exitScan = async ({ ticket_id, exit_station }) => {

  // 1️⃣ Check ticket exists
  const ticket = await ticketModel.getTicketById(ticket_id);

  if (!ticket) {
    return { status: "invalid", message: "Ticket not found" };
  }

  if (ticket.destination_station !== exit_station) {
    return {
      status: "invalid",
      message: "Exit station does not match ticket destination"
    };
  }

  // 2️⃣ Check entry recorded
  const entry = await ticketModel.getActiveEntry(ticket_id);

  if (!entry) {
    return {
      status: "invalid",
      message: "Ticket already exited or entry not recorded"
    };
  }

  // 3️⃣ Calculate travel time
  const entryTime = new Date(entry.entry_time);
  const exitTime = new Date();

  const travelTime = Math.floor((exitTime - entryTime) / 60000);

  // 4️⃣ Calculate distance using metro network
  const distance = await ticketModel.calculateDistance(
    entry.entry_station,
    exit_station
  );

  // 5️⃣ Update ticket_validations table
  await ticketModel.updateExitValidation(
    ticket_id,
    exit_station,
    travelTime,
    distance
  );

  // 6️⃣ Update tickets table (store travel time)
  await ticketModel.updateTicketTravelTime(ticket_id, travelTime);

  // 7️⃣ Run AI fraud detection
  const fraudResult = await aiService.detectFraud({
    entry_station: entry.entry_station,
    exit_station: exit_station,
    entry_hour: entryTime.getHours(),
    travel_time: travelTime,
    ticket_type: "QR",
    distance: distance,
    repeat_usage: 0
  });

  // 8️⃣ Save fraud alert if detected
  if (fraudResult.alert) {
    await fraudModel.createAlert({
      ticket_id: ticket_id,
      fraud_probability: fraudResult.fraud_probability,
      reason: fraudResult.reason
    });
  }

  // 9️⃣ Return response
  return {
    status: "exit recorded",
    ticket_id,
    entry_station: entry.entry_station,
    exit_station,
    distance_km: distance,
    travel_time_minutes: travelTime,
    fraud_analysis: fraudResult
  };

};