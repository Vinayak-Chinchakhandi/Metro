const livePredictionService = require("../services/livePredictionService");

exports.getLivePredictions = async (req, res) => {

  try {

    const predictions = await livePredictionService.getLivePredictions();

    res.json(predictions);

  } catch (error) {

    console.error("Live prediction error:", error);

    res.status(500).json({
      error: "Live prediction failed"
    });

  }

};