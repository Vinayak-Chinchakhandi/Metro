const stationModel = require('../models/stationModel');

const getStations = async (req, res) => {
  try {
    const stations = await stationModel.getAllStations();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStations
};