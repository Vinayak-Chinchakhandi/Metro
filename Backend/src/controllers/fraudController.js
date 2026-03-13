const fraudModel = require("../models/fraudModel");
const aiService = require("../services/aiService");

// GET FRAUD ALERTS
exports.getFraudAlerts = async (req, res, next) => {

  try {

    const { date, month } = req.query;

    const alerts = await fraudModel.getAlerts(date, month);

    res.json(alerts);

  } catch (err) {

    next(err);

  }

};

// CHECK FRAUD
exports.checkFraud = async (req, res, next) => {

try {

const { ticket_id, source_station, destination_station, travel_time, distance } = req.body;  

const result = await aiService.detectFraud({  
  source_station,  
  destination_station,  
  travel_time,  
  distance  
});  

if (result.fraud_probability > 0.7) {  

  await fraudModel.createAlert({  
    ticket_id,  
    fraud_probability: result.fraud_probability  
  });  

}  

res.json(result);

} catch (err) {

next(err);

}

};