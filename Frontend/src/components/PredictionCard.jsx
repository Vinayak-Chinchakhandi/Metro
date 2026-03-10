function PredictionCard({ prediction }) {

  const getColor = () => {

    if (prediction.crowd_level === "High") return "text-red-600";
    if (prediction.crowd_level === "Medium") return "text-orange-500";
    return "text-green-600";

  };

  return (

    <div className="bg-white p-4 rounded shadow border-l-4 border-blue-500">

      <h3 className="font-bold mb-2">
        Demand Prediction
      </h3>

      <p>
        <strong>Station:</strong> {prediction.station}
      </p>

      <p>
        <strong>Hour:</strong> {prediction.hour}
      </p>

      <p>
        <strong>Demand:</strong> {prediction.predicted_demand}
      </p>

      <p className={getColor()}>
        <strong>Crowd:</strong> {prediction.crowd_level}
      </p>

    </div>

  );

}

export default PredictionCard;