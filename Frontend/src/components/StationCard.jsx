function StationCard({ station }) {

  return (

    <div className="bg-white p-4 rounded shadow border-l-4 border-green-500">

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

    </div>

  );

}

export default StationCard;