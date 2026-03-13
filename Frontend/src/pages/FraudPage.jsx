import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FraudAlerts from "../components/FraudAlerts";

function FraudPage() {

  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Fraud Alerts
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800"
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
          className="border border-indigo-100 p-2.5 rounded-lg 
  focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border border-indigo-100 p-2.5 rounded-lg 
  focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          onClick={() => {
            setDate("");
            setMonth("");
          }}
          className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"        >
          Reset
        </button>

      </div>

      <FraudAlerts date={date} month={month} />

    </div>
  );
}

export default FraudPage;