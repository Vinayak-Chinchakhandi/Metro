import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#10b981", "#ef4444"];

function FraudPieChart({ data }) {

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Fraud Distribution</h3>

      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

    </div>
  );
}

export default FraudPieChart;