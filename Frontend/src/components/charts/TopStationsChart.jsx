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
    <div className="bg-white shadow rounded p-4">

      <h2 className="text-lg font-semibold mb-4">
        Top 5 Stations Today
      </h2>

      <ResponsiveContainer width="100%" height={250}>

        <BarChart
          data={data}
          layout="vertical"
        >

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="station"
            width={120}
          />

          <Tooltip />

          <Bar
            dataKey="trips"
            fill="#3b82f6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );

}

export default TopStationsChart;