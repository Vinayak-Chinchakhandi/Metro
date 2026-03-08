function Home() {
  return (
    <div className="container">

      <h1 style={{fontSize:"36px", fontWeight:"bold"}}>
        MetroMind AI
      </h1>

      <p style={{marginTop:"10px", color:"#555"}}>
        Intelligent Metro Ticketing, Demand Forecasting & Fraud Detection Platform
      </p>

      <div className="grid" style={{marginTop:"40px"}}>

        <div className="card">
          <h3>🎫 Smart Ticket Booking</h3>
          <p>Book metro tickets with QR-based validation.</p>
        </div>

        <div className="card">
          <h3>📊 Demand Forecasting</h3>
          <p>Predict passenger demand at stations using AI.</p>
        </div>

        <div className="card">
          <h3>🛡 Fraud Detection</h3>
          <p>Detect suspicious ticket usage patterns.</p>
        </div>

      </div>

    </div>
  );
}

export default Home;