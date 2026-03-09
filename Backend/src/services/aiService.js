const axios = require("axios");
const { AI_SERVICE_URL } = require("../config/env");

exports.predictDemand = async (station, time) => {

  const now = new Date()

  const hour = parseInt(time.split(":")[0])

  const day = now.toLocaleString("en-US", { weekday: "long" })

  const weatherOptions = ["Clear","Cloudy","Rain"]

  const weather = weatherOptions[Math.floor(Math.random()*3)]

  const event = (day === "Saturday" || day === "Sunday") ? 1 : 0

  const res = await axios.post(`${AI_SERVICE_URL}/predict-demand`, {

    station,
    hour,
    day,
    weather,
    event

  })

  return res.data
}

exports.detectFraud = async (ticketData) => {

  const res = await axios.post(`${AI_SERVICE_URL}/detect-fraud`, ticketData);

  return res.data;
};