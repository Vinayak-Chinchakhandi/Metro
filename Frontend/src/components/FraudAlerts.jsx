import { useEffect, useState } from "react";
import { getFraudAlerts } from "../services/fraudService";
import FraudAlertCard from "./FraudAlertCard";

function FraudAlerts() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const data = await getFraudAlerts();
      setAlerts(data);
    } catch (err) {
      console.error("Error fetching fraud alerts", err);
    }
  };

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {alerts.map((alert, index) => (
        <FraudAlertCard key={index} alert={alert} />
      ))}

    </div>

  );

}

export default FraudAlerts;