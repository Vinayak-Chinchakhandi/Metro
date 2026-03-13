import { useEffect, useState } from "react";
import { getFraudAlerts } from "../services/fraudService";
import FraudAlertCard from "./FraudAlertCard";

function FraudAlerts({ date, month }) {

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, [date, month]);

  const fetchAlerts = async () => {

    try {

      setLoading(true);

      const data = await getFraudAlerts(date, month);
      setAlerts(data);

      setLoading(false);

    } catch (err) {

      console.error("Error fetching fraud alerts", err);
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
        <p className="text-gray-500">Loading fraud alerts...</p>
      )}

      {!loading && alerts.length === 0 && (
        <p className="text-red-500 font-semibold">
          No data available for selected filters
        </p>
      )}

      {!loading && alerts.length > 0 && getFilterText() && (
        <p className="mb-4 text-gray-600 font-medium">
          {getFilterText()}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {alerts.map((alert, index) => (
          <FraudAlertCard key={index} alert={alert} />
        ))}

      </div>

    </div>

  );

}

export default FraudAlerts;