import API from "./api";

/* Stations */

export const getStations = async () => {
  const res = await API.get("/stations");
  return res.data;
};


/* Ticket Booking */

export const bookTicket = async (data) => {
  const res = await API.post("/tickets/book", data);
  return res.data;
};


/* Entry Scan */

export const entryScan = async (data) => {
  const res = await API.post("/tickets/entry", data);
  return res.data;
};


/* Exit Scan */

export const exitScan = async (data) => {
  const res = await API.post("/tickets/exit", data);
  return res.data;
};