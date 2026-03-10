function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-title">🚇 MetroMind AI</h1>

          <p className="hero-subtitle">
            Intelligent Metro Ticketing, Demand Forecasting & Fraud Detection
            Platform
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎫</div>
            <h3>Smart Ticket Booking</h3>
            <p>
              Book metro tickets with QR-based validation and instant
              processing.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Demand Forecasting</h3>
            <p>
              Predict passenger demand at stations using advanced AI algorithms.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Fraud Detection</h3>
            <p>
              Detect suspicious ticket usage patterns with real-time monitoring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
