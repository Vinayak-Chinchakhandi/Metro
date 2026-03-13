import { useEffect, useState } from "react";
import { getPredictions } from "../services/predictionService";
import PredictionCard from "./PredictionCard";

function Predictions({ date, month }) {

  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchPredictions();
  }, [date, month]);

  const fetchPredictions = async () => {
    try {

      const data = await getPredictions(date, month);
      setPredictions(data);

    } catch (err) {
      console.error("Error fetching predictions", err);
    }
  };

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {predictions.map((prediction, index) => (
        <PredictionCard key={index} prediction={prediction} />
      ))}

    </div>

  );

}

export default Predictions;