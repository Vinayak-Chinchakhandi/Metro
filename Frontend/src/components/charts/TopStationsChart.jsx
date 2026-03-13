import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
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
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >

          <XAxis
            type="number"
            tick={{ fill: "#475569", fontSize: 12 }}
          />

          <YAxis
            type="category"
            dataKey="station"
            width={120}
            tick={{ fill: "#475569", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #E0E7FF"
            }}
          />

          <Bar
            dataKey="trips"
            fill="#6366F1"
            radius={[4, 4, 4, 4]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );

}

export default TopStationsChart;