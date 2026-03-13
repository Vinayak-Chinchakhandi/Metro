function PredictionCard({ prediction }) {

  const getColor = () => {

    if (prediction.crowd_level === "High")
      return "bg-red-100 text-red-600";

    if (prediction.crowd_level === "Medium")
      return "bg-orange-100 text-orange-600";

    return "bg-green-100 text-green-600";

  };

  return (

    <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 
    hover:shadow-lg hover:-translate-y-1 transition duration-300">

      <div className="flex items-center justify-between mb-3">

        <h3 className="font-semibold text-slate-800">
          Demand Prediction
        </h3>

        <span className={`text-xs px-2 py-1 rounded-full ${getColor()}`}>
          {prediction.crowd_level}
        </span>

      </div>

      <div className="text-sm text-slate-700 space-y-1">

        <p>
          <strong>Station:</strong> {prediction.station}
        </p>

        <p>
          <strong>Hour:</strong> {prediction.hour}
        </p>

        <p>
          <strong>Demand:</strong> {prediction.predicted_demand}
        </p>

      </div>

    </div>

  );

}

export default PredictionCard;