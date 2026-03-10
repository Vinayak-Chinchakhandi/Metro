const express = require("express");
const cors = require("cors");
const stationRoutes = require("./src/routes/stationRoutes");
const ticketRoutes = require("./src/routes/ticketRoutes");
const predictionRoutes = require("./src/routes/predictionRoutes");
const fraudRoutes = require("./src/routes/fraudRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/stations", stationRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/fraud-alerts", fraudRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
