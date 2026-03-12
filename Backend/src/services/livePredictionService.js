const stationModel = require("../models/stationModel");
const aiService = require("./aiService");

exports.getLivePredictions = async () => {

  const stations = await stationModel.getStations();

  const now = new Date();

  const hour = now.getHours();

  const day = now.toLocaleString("en-US", { weekday: "long" });

  const weatherOptions = ["Clear", "Cloudy", "Rain"];
  const weather =
    weatherOptions[Math.floor(Math.random() * weatherOptions.length)];

  const event = (day === "Saturday" || day === "Sunday") ? 1 : 0;

  const predictions = await Promise.all(

    stations.map(async (station) => {

      try {

        const prediction = await aiService.predictDemand(
          station.name,
          hour,
          day,
          weather,
          event,
          station.is_interchange ? 1 : 0
        );

        return {
          station: station.name,
          predicted_demand: prediction.predicted_demand,
          current_station_load: prediction.current_station_load,
          crowd_level: prediction.crowd_level
        };

      } catch (error) {

        console.log("Prediction failed:", station.name);

        return {
          station: station.name,
          predicted_demand: 0,
          current_station_load: 0,
          crowd_level: "Low"
        };

      }

    })

  );

  return predictions;

};