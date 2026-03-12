const axios = require("axios");
const { AI_SERVICE_URL } = require("../config/env");


/*
----------------------------------------
DEMAND PREDICTION
----------------------------------------
*/

exports.predictDemand = async (
  station,
  hour,
  day,
  weather,
  event,
  is_interchange
) => {

  try {

    const payload = {
      station,
      hour,
      day,
      weather,
      event,
      is_interchange
    };

    const response = await axios.post(
      `${AI_SERVICE_URL}/predict-demand`,
      payload,
      { timeout: 5000 }
    );

    return response.data;

  } catch (error) {

    console.error(
      "AI Demand Prediction Error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to fetch demand prediction from AI service");

  }

};


/*
----------------------------------------
FRAUD DETECTION
----------------------------------------
*/
exports.detectFraud = async ({ entry_station, exit_station, entry_hour, travel_time, ticket_type, distance, repeat_usage, expected_time }) => {
  
  try {

    const payload = {
      entry_station,
      exit_station,
      entry_hour,
      travel_time,
      ticket_type,
      distance,
      repeat_usage,
      expected_time
    };

    const response = await axios.post(
      `${AI_SERVICE_URL}/detect-fraud`,
      payload,
      { timeout: 5000 }
    );

    return response.data;

  } catch (error) {

    console.error("AI Fraud Detection Error:", error.response?.data || error.message);

    throw new Error("Failed to detect fraud from AI service");

  }

};