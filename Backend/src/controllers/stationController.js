const stationModel = require("../models/stationModel");

exports.getStations = async (req, res) => {
  const stations = await stationModel.getStations();
  res.json(stations);
};