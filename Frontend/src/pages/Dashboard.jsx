import { useNavigate } from "react-router-dom";

import DemandTrendChart from "../components/charts/DemandTrendChart";
import StationDemandChart from "../components/charts/StationDemandChart";
import FraudPieChart from "../components/charts/FraudPieChart";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/";
  };

  const demandTrendData = [
    { hour: "6", demand: 200 },
    { hour: "7", demand: 450 },
    { hour: "8", demand: 900 },
    { hour: "9", demand: 700 },
    { hour: "10", demand: 650 },
  ];

  const stationDemandData = [
    { station: "Majestic", demand: 11000 },
    { station: "MG Road", demand: 9800 },
    { station: "Indiranagar", demand: 8700 },
    { station: "Yeshwantpur", demand: 8200 },
  ];

  const fraudData = [
    { name: "Normal", value: 950 },
    { name: "Fraud", value: 50 },
  ];

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

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


      {/* KPI CARDS */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow rounded p-4 border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">Total Tickets Today</h3>
          <p className="text-2xl font-bold">1,245</p>
        </div>

        <div className="bg-white shadow rounded p-4 border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm">Fraud Alerts</h3>
          <p className="text-2xl font-bold">32</p>
        </div>

        <div className="bg-white shadow rounded p-4 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Active Stations</h3>
          <p className="text-2xl font-bold">83</p>
        </div>

        <div className="bg-white shadow rounded p-4 border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm">Peak Demand</h3>
          <p className="text-2xl font-bold">11,000</p>
        </div>

      </div>


      {/* ANALYTICS CHARTS */}

      <div className="grid grid-cols-3 gap-6 mb-10">

        <DemandTrendChart data={demandTrendData} />

        <StationDemandChart data={stationDemandData} />

        <FraudPieChart data={fraudData} />

      </div>


      {/* NAVIGATION BUTTONS */}

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