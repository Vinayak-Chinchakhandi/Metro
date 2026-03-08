import { useState } from "react";
import { STATIONS } from "../utils/constants";
import { predictDemand } from "../services/predictionService";

function TicketForm({ onSubmit }) {

  const [form, setForm] = useState({
    source: "",
    destination: "",
    time: ""
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = async (e) => {

    const updated = {
      ...form,
      [e.target.name]: e.target.value
    };

    setForm(updated);

    // Run prediction when source and time are selected
    if (updated.source && updated.time) {

      const hour = updated.time.split(":")[0];

      const result = await predictDemand({
        station: updated.source,
        hour: parseInt(hour)
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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto space-y-5"
    >

      {/* Source */}

      <div>
        <label className="block font-semibold mb-1">
          Source Station
        </label>

        <select
          name="source"
          value={form.source}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >

          <option value="">Select Source</option>

          {STATIONS.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}

        </select>
      </div>

      {/* Destination */}

      <div>
        <label className="block font-semibold mb-1">
          Destination Station
        </label>

        <select
          name="destination"
          value={form.destination}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >

          <option value="">Select Destination</option>

          {STATIONS.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}

        </select>
      </div>

      {/* Time */}

      <div>
        <label className="block font-semibold mb-1">
          Travel Time
        </label>

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Congestion Indicator */}

      {prediction && (

        <div className="p-3 rounded bg-gray-100">

          <p className="font-semibold">
            Predicted Demand: {prediction.predicted_demand}
          </p>

          <p>
            Crowd Level:
            <span
              className={
                prediction.crowd_level === "High"
                  ? "text-red-600 font-bold"
                  : prediction.crowd_level === "Medium"
                  ? "text-yellow-600 font-bold"
                  : "text-green-600 font-bold"
              }
            >
              {" "}{prediction.crowd_level}
            </span>
          </p>

        </div>

      )}

      {/* Submit */}

      <button
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Generate Ticket
      </button>

    </form>
  );
}

export default TicketForm;