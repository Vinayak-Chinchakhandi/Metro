import { useEffect, useState } from "react";
import { getLivePredictions } from "../services/livePredictionService";

export const usePredictions = () => {

  const [predictions, setPredictions] = useState([]);

  const fetchPredictions = async () => {

    try {

      const data = await getLivePredictions();
      setPredictions(data);

    } catch (err) {

      console.error("Prediction fetch failed", err);

    }

  };

  useEffect(() => {

    fetchPredictions();

    const interval = setInterval(fetchPredictions, 10000);

    return () => clearInterval(interval);

  }, []);

  return predictions;

};