const predictionModel = require("../models/predictionModel");

exports.getPredictions = async (req,res)=>{

const data = await predictionModel.getPredictions();

res.json(data)

}