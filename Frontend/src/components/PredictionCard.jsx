function PredictionCard({ station, demand, crowd }) {

  return (
    <div className="card">

      <h3>{station}</h3>

      <p>Predicted Demand: {demand}</p>

      <span className={`crowd-${crowd.toLowerCase()}`}>
        {crowd}
      </span>

    </div>
  );
}

export default PredictionCard;