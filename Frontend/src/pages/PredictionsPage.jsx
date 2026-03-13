import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Predictions from "../components/Predictions";

function PredictionsPage() {

  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Demand Predictions
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Back
        </button>

      </div>

      {/* Filters */}

      <div className="flex gap-4 mb-6">

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={() => {
            setDate("");
            setMonth("");
          }}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Reset
        </button>

      </div>

      <Predictions date={date} month={month} />

    </div>
  );
}

export default PredictionsPage;