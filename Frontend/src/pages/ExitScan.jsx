import { useState } from "react";
import { exitScan } from "../services/ticketService";
import QRScanner from "../components/QRScanner";

function ExitScan() {

  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleScan = async (data) => {

    try {

      const qrData = JSON.parse(data);

      const res = await exitScan({
        ticket_id: qrData.ticketId,
        exit_station: qrData.destination
      });

      console.log("EXIT API Responce", res);


      setResult(res);
      setMessage("Journey completed successfully");
      setMessageType("success");

      if (res.alert) {
        setMessage("⚠ Security Alert: " + res.reason);
        setMessageType("warning");
      }

    } catch (err) {

      console.error(err);

      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Exit scan failed");
      }

      setMessageType("error");

    }

  };

  return (

    <div className="flex justify-center mt-10">

      <div className="bg-white p-6 rounded shadow w-96 text-center">

        <h2 className="text-xl font-bold mb-4">
          Exit Scan
        </h2>

        <QRScanner onScan={handleScan} />

        {message && (
          <div
            className={`mt-4 p-3 rounded text-sm font-medium ${messageType === "error"
              ? "bg-red-100 text-red-700"
              : messageType === "warning"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
              }`}
          >
            {message}
          </div>
        )}

        {result && (

          <div className="mt-4 text-sm">

            <p>
              <strong>Distance:</strong>{" "}
              {result.distance_km ? Number(result.distance_km).toFixed(2) : "0"} km
            </p>

            <p>
              <strong>Travel Time:</strong>{" "}
              {result.travel_time_seconds < 60
                ? `${result.travel_time_seconds} sec`
                : `${result.travel_time_minutes} min`}
            </p>

            <p>
              <strong>Fraud Probability:</strong>{" "}
              {result.fraud_probability
                ? Number(result.fraud_probability).toFixed(3)
                : "0"}
            </p>

            <p>
              <strong>Alert:</strong>{" "}
              {result.alert ? (
                <span className="text-red-600 font-bold">YES 🚨</span>
              ) : (
                <span className="text-green-600 font-bold">NO</span>
              )}
            </p>

            {result.reason && (
              <p className="text-red-600 font-semibold mt-2">
                Reason: {result.reason}
              </p>
            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default ExitScan;