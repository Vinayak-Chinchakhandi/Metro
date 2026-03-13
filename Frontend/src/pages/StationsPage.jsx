import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stations from "../components/Stations";

function StationsPage() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  return (

    <div className="p-8">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-semibold text-slate-800">
          Station Monitoring
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition"
        >
          Back
        </button>

      </div>


      {/* SEARCH BAR */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search station..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-indigo-100 p-2.5 rounded-lg w-80 
          focus:ring-2 focus:ring-indigo-500 outline-none"
        />

      </div>


      {/* STATION LIST */}

      <Stations search={search} />

    </div>

  );

}

export default StationsPage;