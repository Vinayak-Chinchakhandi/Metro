const predictionModel = require("../models/predictionModel");

const getPredictions = async (req, res) => {
  try {
    const predictions = await predictionModel.getAllPredictions();
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPredictionsByStation = async (req, res) => {
  try {
    const { station } = req.params;
    const predictions = await predictionModel.getPredictionsByStation(station);
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPrediction = async (req, res) => {
  try {
    const prediction = await predictionModel.createPrediction(req.body);
    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPredictions,
  getPredictionsByStation,
  createPrediction,
};
