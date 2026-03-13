function FraudAlertCard({ alert }) {

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 
    hover:shadow-lg hover:-translate-y-1 transition duration-300">

      <div className="flex items-center justify-between mb-3">

        <h3 className="font-semibold text-red-600">
          🚨 Fraud Alert
        </h3>

        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
          Suspicious
        </span>

      </div>

      <div className="text-sm text-slate-700 space-y-1">

        <p>
          <strong>Ticket ID:</strong> {alert.ticket_id}
        </p>

        <p>
          <strong>Probability:</strong> 
          <span className="ml-1 text-red-600 font-medium">
            {alert.fraud_probability}
          </span>
        </p>

        <p>
          <strong>Reason:</strong> {alert.reason}
        </p>

      </div>

    </div>
  );

}

export default FraudAlertCard;