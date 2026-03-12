import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function StationDemandChart({ data }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Station Demand</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="station" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="demand" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StationDemandChart;