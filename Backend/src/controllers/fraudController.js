const fraudModel = require("../models/fraudModel");

exports.getFraudAlerts = async (req,res)=>{

const alerts = await fraudModel.getAlerts();

res.json(alerts);

}