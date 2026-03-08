function QRDisplay({ qr }) {

  if (!qr) return null;

  return (
    <div className="qr-container">
      <img src={qr} alt="QR Ticket" />
    </div>
  );
}

export default QRDisplay;