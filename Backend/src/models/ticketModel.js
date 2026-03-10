const db = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const createTicket = async (ticketData) => {
  // expect the controller to supply source_station, destination_station, time,
  // crowd_level and qr_code.  We will generate an id and booking_time here.
  const { source_station, destination_station, time, crowd_level, qr_code } =
    ticketData;

  // Generate ticket ID
  const ticketId = uuidv4();

  // Get current time for booking_time
  const bookingTime = new Date().toISOString();

  // For simplicity, set travel_time to the selected time
  const travelTime = time;

  const crowdLevel = crowd_level || "Unknown";
  const qrCodeValue = qr_code || "placeholder_qr";

  const sql = `
    INSERT INTO tickets (id, source_station, destination_station, booking_time, travel_time, crowd_level, qr_code)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [
        ticketId,
        source_station,
        destination_station,
        bookingTime,
        travelTime,
        crowdLevel,
        qrCodeValue,
      ],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: ticketId,
            source_station,
            destination_station,
            booking_time: bookingTime,
            travel_time: travelTime,
            crowd_level: crowdLevel,
            qr_code: qrCodeValue,
          });
        }
      },
    );
  });
};

// fetch ticket by its id
const getTicketById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM tickets WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = {
  createTicket,
  getTicketById,
};
