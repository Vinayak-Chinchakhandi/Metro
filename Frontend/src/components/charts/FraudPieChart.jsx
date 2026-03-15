import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

function FraudPieChart({ data }) {

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 hover:shadow-lg transition duration-300">

      <h3 className="font-semibold text-slate-800 mb-4">
        Fraud Distribution
      </h3>

      <ResponsiveContainer width="100%" height={250}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            cx="50%"
            cy="45%"
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
            verticalAlign="bottom"
            height={36}
          />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default FraudPieChart;