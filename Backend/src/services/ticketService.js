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

  const hour = parseInt(time.split(":")[0]);

  const day = new Date().toLocaleString("en-US", {
    weekday: "long"
  });

  const weatherOptions = ["Clear", "Cloudy", "Rain"];
  const weather =
    weatherOptions[Math.floor(Math.random() * weatherOptions.length)];

  const event = 0;

  const stationData = await ticketModel.getStationDetails(source);
  const is_interchange = stationData?.is_interchange ? 1 : 0;

  const prediction = await aiService.predictDemand(
    source,
    hour,
    day,
    weather,
    event,
    is_interchange
  );

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
    booking_time: new Date().toISOString(),
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

  const entry = await ticketModel.getActiveEntry(ticket_id);

  if (!entry) {
    return {
      status: "invalid",
      message: "Ticket already exited or entry not recorded"
    };
  }

  const distance = await ticketModel.calculateDistance(
    entry.entry_station,
    exit_station
  );

  await ticketModel.updateExitValidation(
    ticket_id,
    exit_station,
    distance
  );

  const trip = await ticketModel.getCompletedTrip(ticket_id);

  const travelTime = trip.travel_time;

  await ticketModel.updateTicketTravelTime(ticket_id, travelTime);

  const expectedTime = (distance / 35) * 3600;

  let backendFlag = false;
  let backendReason = null;

  if (travelTime < expectedTime * 0.3) {
    backendFlag = true;
    backendReason = "Impossible travel time";
  }

  if (travelTime > expectedTime * 4) {
    backendFlag = true;
    backendReason = "Unusually slow travel";
  }

  const fraudResult = await aiService.detectFraud({
    entry_station: entry.entry_station,
    exit_station: exit_station,
    entry_hour: new Date(entry.entry_time).getHours(),
    travel_time: travelTime,
    ticket_type: "QR",
    distance: distance,
    repeat_usage: 0,
    expected_time: expectedTime
  });

  let finalAlert = fraudResult.alert;
  let finalReason = fraudResult.reason;

  if (backendFlag) {
    finalAlert = true;
    finalReason = backendReason;
  }

  if (finalAlert) {
    await fraudModel.createAlert({
      ticket_id,
      fraud_probability: fraudResult.fraud_probability,
      reason: finalReason
    });
  }

  return {
    status: "exit recorded",
    ticket_id,
    entry_station: entry.entry_station,
    exit_station,
    distance_km: distance,
    travel_time_seconds: travelTime,
    travel_time_minutes: Math.round(travelTime / 60),
    expected_time_seconds: Math.round(expectedTime),

    fraud_probability: fraudResult.fraud_probability,
    alert: finalAlert,
    reason: finalReason,

    fraud_analysis: {
      ...fraudResult,
      backend_flag: backendFlag,
      backend_reason: backendReason
    }
  };

};