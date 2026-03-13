function QRDisplay({ qrValue }) {

  if (!qrValue) {
    return (
      <div className="text-center text-slate-500 mt-4">
        No QR available
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-6">

      <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 
      hover:shadow-lg transition duration-300">

        <img
          src={qrValue}
          alt="QR Code"
          className="w-44 h-44"
        />

      </div>

    </div>
  );
}

export default QRDisplay;