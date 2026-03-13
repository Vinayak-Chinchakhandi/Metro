const predictionModel = require("../models/predictionModel");

exports.getPredictions = async (req, res, next) => {

  try {

    const { date, month } = req.query;

    const data = await predictionModel.getPredictions(date, month);

    res.json(data);

  } catch (err) {

    next(err);

  }

};