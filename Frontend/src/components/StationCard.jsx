function StationCard({ station, prediction }) {

  const getBorderColor = () => {

    if (!prediction) return "border-gray-300";

    if (prediction.crowd_level === "Low") return "border-green-500";
    if (prediction.crowd_level === "Medium") return "border-orange-400";
    if (prediction.crowd_level === "High") return "border-red-500";

    return "border-gray-300";
  };

  return (

    <div className={`bg-white p-4 rounded shadow border-l-4 ${getBorderColor()}`}>

      <h3 className="font-bold mb-2">
        Station Info
      </h3>

      <p>
        <strong>Name:</strong> {station.name}
      </p>

      <p>
        <strong>Line:</strong> {station.line}
      </p>

      <p>
        <strong>Code:</strong> {station.code}
      </p>

      {prediction && (
        <>
          <hr className="my-2" />

          <p>
            <strong>Current Load:</strong> {prediction.current_station_load ?? 0}
          </p>

          <p>
            <strong>Hourly Prediction:</strong> {prediction.predicted_demand ?? 0}
          </p>

          <p>
            <strong>Crowd Level:</strong> {prediction.crowd_level}
          </p>
        </>
      )}

    </div>

  );

}

export default StationCard;