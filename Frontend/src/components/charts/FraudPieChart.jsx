import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#6366F1", "#4338CA"]; // Indigo AI colors

function FraudPieChart({ data }) {

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 hover:shadow-lg transition duration-300">

      <h3 className="font-semibold text-slate-800 mb-4">
        Fraud Distribution
      </h3>

      <PieChart width={420} height={250}>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          cx="35%"
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.name === "Fraud" ? "#EF4444" : "#6366F1"}
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #E0E7FF",
          }}
        />

        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
        />

      </PieChart>

    </div>
  );
}

export default FraudPieChart;