const express = require("express");
const cors = require("cors");
const app = express();

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());

/* Logger middleware */
app.use(logger);

app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

const ticketRoutes = require("./routes/ticketRoutes");
const stationRoutes = require("./routes/stationRoutes");
const fraudRoutes = require("./routes/fraudRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const adminRoutes = require("./routes/adminRoutes");


app.use("/api/admin", adminRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/fraud-alerts", fraudRoutes);
app.use("/api/predictions", predictionRoutes);
app.use(errorHandler)
module.exports = app;