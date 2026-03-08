import { useEffect, useState } from "react";

import { getPredictions } from "../services/predictionService";
import { getFraudAlerts } from "../services/fraudService";

import PredictionCard from "../components/PredictionCard";
import FraudAlertCard from "../components/FraudAlertCard";

function Dashboard() {

  const [predictions, setPredictions] = useState([]);
  const [frauds, setFrauds] = useState([]);

  useEffect(() => {

    async function load() {

      const p = await getPredictions();
      const f = await getFraudAlerts();

      setPredictions(p);
      setFrauds(f);
    }

    load();

  }, []);

  return (
    <div className="container">

      <h2>Metro Operations Dashboard</h2>

      <h3>Demand Predictions</h3>

      <div className="grid">

        {predictions.map((p, i) => (
          <PredictionCard
            key={i}
            station={p.station}
            demand={p.predicted_demand}
            crowd={p.crowd_level}
          />
        ))}

      </div>

      <h3>Fraud Alerts</h3>

      <div className="grid">

        {frauds.map((f, i) => (
          <FraudAlertCard
            key={i}
            ticketId={f.ticket_id}
            alertType={f.alert_type}
            confidence={f.confidence_score}
          />
        ))}

      </div>

    </div>
  );
}

export default Dashboard;