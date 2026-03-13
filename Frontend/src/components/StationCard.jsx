function StationCard({ station, prediction }) {

  const getBorderColor = () => {

    if (!prediction) return "border-gray-300";

    if (prediction.crowd_level === "Low") return "border-green-500";
    if (prediction.crowd_level === "Medium") return "border-orange-400";
    if (prediction.crowd_level === "High") return "border-red-500";

    return "border-gray-300";
  };

  const getBadgeColor = () => {

    if (!prediction) return "";

    if (prediction.crowd_level === "Low")
      return "bg-green-100 text-green-600";

    if (prediction.crowd_level === "Medium")
      return "bg-orange-100 text-orange-600";

    if (prediction.crowd_level === "High")
      return "bg-red-100 text-red-600";

    return "";
  };

  return (

    <div className={`bg-white p-5 rounded-xl shadow-sm border border-indigo-100 
    border-l-4 ${getBorderColor()} hover:shadow-lg hover:-translate-y-1 transition duration-300`}>

      <h3 className="font-semibold text-slate-800 mb-3">
        Station Info
      </h3>

      <div className="text-sm text-slate-700 space-y-1">

        <p>
          <strong>Name:</strong> {station.name}
        </p>

        <p>
          <strong>Line:</strong> {station.line}
        </p>

        <p>
          <strong>Code:</strong> {station.code}
        </p>

      </div>

      {prediction && (
        <>
          <hr className="my-3 border-indigo-100" />

          <div className="text-sm text-slate-700 space-y-1">

            <p>
              <strong>Current Load:</strong> {prediction.current_station_load ?? 0}
            </p>

            <p>
              <strong>Hourly Prediction:</strong> {prediction.predicted_demand ?? 0}
            </p>

            <div className="flex items-center gap-2">

              <strong>Crowd Level:</strong>

              <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor()}`}>
                {prediction.crowd_level}
              </span>

            </div>

          </div>
        </>
      )}

    </div>

  );

}

export default StationCard;