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
  }, []);

  const fetchDashboardData = async () => {

    try {

      const kpiData = await getKPI();
      const fraudStats = await getFraudStats();
      const stations = await getTopStations();

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
    <div className="p-8">

      <div className="flex justify-between items-center mb-2">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>

      </div>

      <p className="text-sm text-gray-500 mb-6">
        🟢 System Online | Last Updated: {lastUpdated}
      </p>


      {/* KPI CARDS */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white shadow rounded p-4 border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">Total Tickets Today</h3>
          <p className="text-2xl font-bold">{kpi.totalTickets}</p>
        </div>

        <div className="bg-white shadow rounded p-4 border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm">Fraud Alerts</h3>
          <p className="text-2xl font-bold">{kpi.fraudAlerts}</p>
        </div>

        <div className="bg-white shadow rounded p-4 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Active Stations</h3>
          <p className="text-2xl font-bold">{kpi.activeStations}</p>
        </div>

      </div>


      {/* CHARTS */}

      <div className="grid grid-cols-2 gap-6 mb-10">

        <FraudPieChart data={fraudData} />

        <TopStationsChart data={topStations} />

      </div>


      {/* NAVIGATION */}

      <div className="flex gap-4">

        <button
          onClick={() => navigate("/dashboard/fraud")}
          className="px-4 py-2 rounded bg-red-600 text-white"
        >
          Fraud Alerts
        </button>

        <button
          onClick={() => navigate("/dashboard/predictions")}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Predictions
        </button>

        <button
          onClick={() => navigate("/dashboard/stations")}
          className="px-4 py-2 rounded bg-green-600 text-white"
        >
          Stations
        </button>

      </div>

    </div>
  );
}

export default Dashboard;