const stationModel = require("../models/stationModel");
const aiService = require("./aiService");

exports.getLivePredictions = async () => {

  const stations = await stationModel.getStations();

  const hour = new Date().getHours();
  const time = `${hour}:00`;

  const predictions = await Promise.all(

    stations.map(async (station) => {

      try {

        const prediction = await aiService.predictDemand(
          station.name,
          time
        );

        return {
          station: station.name,
          predicted_demand: prediction.predicted_demand,
          crowd_level: prediction.crowd_level
        };

      } catch (error) {

        console.log("Prediction failed:", station.name);

        return {
          station: station.name,
          predicted_demand: 0,
          crowd_level: "Low"
        };

      }

    })

  );

  return predictions;

};