function StationCard({ station, passengers }) {

  return (
    <div className="card">

      <h3>{station}</h3>
      <p>{passengers} passengers</p>

    </div>
  );
}

export default StationCard;