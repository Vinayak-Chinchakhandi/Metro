import { useState, useEffect } from "react";
import { getStations } from "../services/api";
import { predictDemand } from "../services/predictionService";

function TicketForm({ onSubmit }) {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    time: "",
  });

  const [stations, setStations] = useState([]);
  const [loadingStations, setLoadingStations] = useState(true);
  const [stationsError, setStationsError] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const loadStations = async () => {
    setLoadingStations(true);
    setStationsError(null);

    try {
      const response = await getStations();
      setStations(response.data);
    } catch (error) {
      console.error("Error fetching stations:", error);
      setStationsError("Failed to load stations. Please try again.");
    } finally {
      setLoadingStations(false);
    }
  };

  useEffect(() => {
    loadStations();
  }, []);

  const handleChange = async (e) => {
    const updated = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updated);

    // Run prediction when source and time are selected
    if (updated.source && updated.time) {
      const hour = updated.time.split(":")[0];

      const result = await predictDemand({
        station: updated.source,
        hour: parseInt(hour),
      });

      setPrediction(result);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.source === form.destination) {
      alert("Source and destination cannot be same");
      return;
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form space-y-6">
      {/* Source */}

      <div className="form-group">
        <label>Source Station</label>

        {stationsError ? (
          <div className="error-block">
            <p className="text-red-600">{stationsError}</p>
            <button type="button" onClick={loadStations} className="mt-2 underline">
              Retry
            </button>
          </div>
        ) : (
          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            required
            disabled={loadingStations}
          >
            <option value="">
              {loadingStations ? "Loading stations..." : "Select Source Station"}
            </option>

            {stations.map((station) => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Destination */}

      <div className="form-group">
        <label>Destination Station</label>

        {stationsError ? (
          <div className="error-block">
            <p className="text-red-600">{stationsError}</p>
            <button type="button" onClick={loadStations} className="mt-2 underline">
              Retry
            </button>
          </div>
        ) : (
          <select
            name="destination"
            value={form.destination}
            onChange={handleChange}
            required
            disabled={loadingStations}
          >
            <option value="">
              {loadingStations ? "Loading stations..." : "Select Destination Station"}
            </option>

            {stations.map((station) => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Time */}

      <div className="form-group">
        <label>Travel Time</label>

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
      </div>

      {/* Congestion Indicator */}

      {prediction && (
        <div className="prediction-card">
          <p>
            <strong>Predicted Demand:</strong> {prediction.predicted_demand}{" "}
            passengers
          </p>
          <p>
            <strong>Crowd Level:</strong>
            <span
              className={
                prediction.crowd_level === "High"
                  ? "crowd-high"
                  : prediction.crowd_level === "Medium"
                    ? "crowd-medium"
                    : "crowd-low"
              }
            >
              {" "}
              {prediction.crowd_level}
            </span>
          </p>
        </div>
      )}

      {/* Submit */}

      <button type="submit">🚇 Generate Ticket</button>
    </form>
  );
}

export default TicketForm;
