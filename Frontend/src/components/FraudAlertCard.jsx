function FraudAlertCard({ ticketId, alertType, confidence }) {

  return (
    <div className="card fraud-card">

      <h4>Fraud Alert</h4>

      <p>Ticket: {ticketId}</p>
      <p>Type: {alertType}</p>
      <p>Confidence: {confidence}</p>

    </div>
  );
}

export default FraudAlertCard;