const stationModel = require("../models/stationModel");

exports.getStations = async (req, res, next) => {

  try {

    const stations = await stationModel.getStations();

    res.json(stations);

  } catch (err) {

    next(err);

  }

};