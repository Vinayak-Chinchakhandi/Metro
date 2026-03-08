const axios = require("axios");
const { AI_SERVICE_URL } = require("../config/env");

exports.predictDemand = async (station, time) => {

  const res = await axios.post(`${AI_SERVICE_URL}/predict-demand`, {
    station,
    time
  });

  return res.data;
};

exports.detectFraud = async (ticketData) => {

  const res = await axios.post(`${AI_SERVICE_URL}/detect-fraud`, ticketData);

  return res.data;
};