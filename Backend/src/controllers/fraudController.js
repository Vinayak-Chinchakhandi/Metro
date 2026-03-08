const fraudModel = require("../models/fraudModel");

exports.getFraudAlerts = async (req,res)=>{
try{
const alerts = await fraudModel.getAlerts();

res.json(alerts);
} catch (err) {

    next(err);

  }
}