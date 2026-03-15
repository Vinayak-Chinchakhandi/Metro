import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function TopStationsChart({ data }) {

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 hover:shadow-lg transition duration-300">

      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Top 5 Stations Today
      </h2>

      <ResponsiveContainer width="100%" height={250}>

        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >

          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="station"
            width={80}
          />

          <Tooltip />

          <Bar
            dataKey="trips"
            fill="#6366F1"
            radius={[4,4,4,4]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TopStationsChart;