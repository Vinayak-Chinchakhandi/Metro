import { useEffect, useState } from "react";
import { getPredictions } from "../services/predictionService";
import PredictionCard from "./PredictionCard";

function Predictions({ date, month }) {

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPredictions();
  }, [date, month]);

  const fetchPredictions = async () => {

    try {

      setLoading(true);

      const data = await getPredictions(date, month);
      setPredictions(data);

      setLoading(false);

    } catch (err) {

      console.error("Error fetching predictions", err);
      setLoading(false);

    }

  };

  const getFilterText = () => {

    if (date && month)
      return `Showing results for ${date} • ${month}`;

    if (date)
      return `Showing results for ${date}`;

    if (month)
      return `Showing results for ${month}`;

    return null;

  };

  return (

    <div>

      {loading && (
        <p className="text-slate-500 font-medium">
          Loading predictions...
        </p>
      )}

      {!loading && predictions.length === 0 && (
        <div className="bg-white border border-indigo-100 rounded-xl p-6 text-center shadow-sm">
          <p className="text-red-500 font-semibold">
            No data available for selected filters
          </p>
        </div>
      )}

      {!loading && predictions.length > 0 && getFilterText() && (
        <p className="mb-5 text-sm text-slate-600 font-medium">
          {getFilterText()}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {predictions.map((prediction, index) => (
          <PredictionCard key={index} prediction={prediction} />
        ))}

      </div>

    </div>

  );

}

export default Predictions;