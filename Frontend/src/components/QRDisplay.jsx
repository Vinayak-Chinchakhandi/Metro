function QRDisplay({ qrValue }) {

  if (!qrValue) {
    return <p>No QR available</p>;
  }

  return (
    <div className="flex justify-center mt-4">

      <img
        src={qrValue}
        alt="QR Code"
        className="w-44 h-44"
      />

    </div>
  );
}

export default QRDisplay;