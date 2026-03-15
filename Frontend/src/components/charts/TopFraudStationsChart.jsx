import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function TopFraudStationsChart({ data }) {

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 hover:shadow-lg transition">

      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Top Fraud Stations Today
      </h2>

      <ResponsiveContainer width="100%" height={260}>

        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >

          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />

          <XAxis
            type="number"
            tick={{ fill: "#475569", fontSize: 12 }}
          />

          <YAxis
            type="category"
            dataKey="station"
            width={80}
            tick={{ fill: "#475569", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #E0E7FF"
            }}
          />

          <Bar
            dataKey="frauds"
            fill="#EF4444"
            radius={[4,4,4,4]}
            animationDuration={800}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );

}

export default TopFraudStationsChart;