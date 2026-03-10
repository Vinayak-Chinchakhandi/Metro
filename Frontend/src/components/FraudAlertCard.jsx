function FraudAlertCard({ alert }) {

  return (
    <div className="bg-white p-4 rounded shadow border-l-4 border-red-500">

      <h3 className="font-bold text-red-600 mb-2">
        Fraud Alert
      </h3>

      <p>
        <strong>Ticket ID:</strong> {alert.ticket_id}
      </p>

      <p>
        <strong>Probability:</strong> {alert.fraud_probability}
      </p>

      <p>
        <strong>Reason:</strong> {alert.reason}
      </p>

    </div>
  );

}

export default FraudAlertCard;