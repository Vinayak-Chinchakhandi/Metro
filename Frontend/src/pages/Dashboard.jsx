import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getPredictions } from "../services/predictionService";
import { getFraudAlerts } from "../services/fraudService";
import PredictionCard from "../components/PredictionCard";
import FraudAlertCard from "../components/FraudAlertCard";

function Dashboard() {
  const [predictions, setPredictions] = useState([]);
  const [frauds, setFrauds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, f] = await Promise.all([getPredictions(), getFraudAlerts()]);
        setPredictions(p);
        setFrauds(f);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        // For demo purposes, use mock data if API fails
        setPredictions([
          {
            id: 1,
            station: "Baiyappanahalli",
            hour: 8,
            predicted_demand: 450,
            crowd_level: "High",
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            station: "Indiranagar",
            hour: 9,
            predicted_demand: 320,
            crowd_level: "Medium",
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            station: "MG Road",
            hour: 10,
            predicted_demand: 280,
            crowd_level: "Medium",
            created_at: new Date().toISOString(),
          },
          {
            id: 4,
            station: "Majestic",
            hour: 12,
            predicted_demand: 520,
            crowd_level: "High",
            created_at: new Date().toISOString(),
          },
        ]);
        setFrauds([
          {
            id: 1,
            ticket_id: "TICKET-001",
            fraud_probability: 0.85,
            reason: "Multiple rapid validations",
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            ticket_id: "TICKET-002",
            fraud_probability: 0.72,
            reason: "Unusual travel pattern",
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            ticket_id: "TICKET-003",
            fraud_probability: 0.91,
            reason: "Entry without exit record",
            created_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Prepare chart data
  const predictionChartData = predictions.slice(0, 10).map((p) => ({
    station: p.station,
    demand: p.predicted_demand,
    hour: p.hour,
  }));

  const crowdLevelData = [
    {
      name: "Low",
      value: predictions.filter((p) => p.crowd_level === "Low").length,
      color: "#10b981",
    },
    {
      name: "Medium",
      value: predictions.filter((p) => p.crowd_level === "Medium").length,
      color: "#f59e0b",
    },
    {
      name: "High",
      value: predictions.filter((p) => p.crowd_level === "High").length,
      color: "#ef4444",
    },
  ];

  const fraudTrendData = frauds.slice(0, 7).map((f, index) => ({
    day: `Day ${index + 1}`,
    alerts: Math.floor(Math.random() * 10) + 1, // Mock data for trend
  }));

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="container">
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>🚇 Metro Operations Dashboard</h1>
          <p>Real-time insights into passenger demand and system security</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">📊</div>
            <div className="summary-content">
              <h3>{predictions.length}</h3>
              <p>Total Predictions</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">🚨</div>
            <div className="summary-content">
              <h3>{frauds.length}</h3>
              <p>Fraud Alerts</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">🏙️</div>
            <div className="summary-content">
              <h3>{new Set(predictions.map((p) => p.station)).size}</h3>
              <p>Monitored Stations</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">⚠️</div>
            <div className="summary-content">
              <h3>
                {predictions.filter((p) => p.crowd_level === "High").length}
              </h3>
              <p>High Congestion Areas</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <h2>Analytics Overview</h2>

          <div className="charts-grid">
            {/* Demand Predictions Chart */}
            <div className="chart-card">
              <h3>Station Demand Predictions</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={predictionChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="station" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="demand" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Crowd Level Distribution */}
            <div className="chart-card">
              <h3>Crowd Level Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={crowdLevelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {crowdLevelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Fraud Alerts Trend */}
            <div className="chart-card">
              <h3>Fraud Alerts Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fraudTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="alerts"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="details-section">
          <div className="detail-column">
            <h2>📊 Recent Demand Predictions</h2>
            <div className="grid">
              {predictions.slice(0, 6).map((p, i) => (
                <PredictionCard
                  key={i}
                  station={p.station}
                  demand={p.predicted_demand}
                  crowd={p.crowd_level}
                />
              ))}
            </div>
          </div>

          <div className="detail-column">
            <h2>🚨 Recent Fraud Alerts</h2>
            <div className="grid">
              {frauds.slice(0, 6).map((f, i) => (
                <FraudAlertCard
                  key={i}
                  ticketId={f.ticket_id}
                  alertType={f.reason || "Suspicious Activity"}
                  confidence={f.fraud_probability || 0.85}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
