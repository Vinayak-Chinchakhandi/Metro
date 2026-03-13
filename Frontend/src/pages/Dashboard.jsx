import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FraudPieChart from "../components/charts/FraudPieChart";
import TopStationsChart from "../components/charts/TopStationsChart";

import {
  getKPI,
  getFraudStats,
  getTopStations
} from "../services/dashboardService";

function Dashboard() {

  const navigate = useNavigate();

  const [kpi, setKpi] = useState({
    totalTickets: 0,
    fraudAlerts: 0,
    activeStations: 0
  });

  const [fraudData, setFraudData] = useState([]);
  const [topStations, setTopStations] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);


  const fetchDashboardData = async () => {

    try {

      const [kpiData, fraudStats, stations] = await Promise.all([
        getKPI(),
        getFraudStats(),
        getTopStations()
      ]);


      setKpi(kpiData);
      setFraudData(fraudStats);
      setTopStations(stations);

      setLastUpdated(new Date().toLocaleTimeString());

    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }

  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/";
  };

  return (
    <div>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-4">

        <h1 className="text-3xl font-semibold text-slate-800">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

      <p className="text-sm text-slate-500 mb-8">
        🟢 System Online • Last Updated: {lastUpdated}
      </p>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-lg transition">

          <p className="text-sm text-slate-500 mb-1">
            Total Tickets Today
          </p>

          <p className="text-3xl font-bold text-indigo-600">
            {kpi.totalTickets}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-lg transition">

          <p className="text-sm text-slate-500 mb-1">
            Fraud Alerts
          </p>

          <p className="text-3xl font-bold text-red-500">
            {kpi.fraudAlerts}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 hover:shadow-lg transition">

          <p className="text-sm text-slate-500 mb-1">
            Active Stations
          </p>

          <p className="text-3xl font-bold text-green-500">
            {kpi.activeStations}
          </p>

        </div>

      </div>


      {/* CHARTS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        <FraudPieChart data={fraudData} />

        <TopStationsChart data={topStations} />

      </div>


      {/* NAVIGATION */}

      <div className="flex flex-wrap gap-4">

        <button
          onClick={() => navigate("/dashboard/fraud")}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Fraud Alerts
        </button>

        <button
          onClick={() => navigate("/dashboard/predictions")}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Predictions
        </button>

        <button
          onClick={() => navigate("/dashboard/stations")}
          className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
        >
          Stations
        </button>

      </div>

    </div>
  );
}

export default Dashboard;