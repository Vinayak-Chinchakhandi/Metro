const predictionModel = require("../models/predictionModel");

exports.getPredictions = async (req,res)=>{
try {
const data = await predictionModel.getPredictions();

res.json(data)
} catch (err) {

    next(err);

  }
}