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

      setResult(res);
      setMessage("Journey completed successfully");
      setMessageType("success");

      if (res.fraud_analysis.alert) {
        setMessage("⚠ Security Alert: " + res.fraud_analysis.reason);
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
            className={`mt-4 p-3 rounded text-sm font-medium ${
              messageType === "error"
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

            <p><strong>Distance:</strong> {result.distance_km} km</p>

            <p><strong>Travel Time:</strong> {result.travel_time_minutes} min</p>

            <p>
              <strong>Fraud Probability:</strong>{" "}
              {result.fraud_analysis.fraud_probability}
            </p>

            <p>
              <strong>Alert:</strong>{" "}
              {result.fraud_analysis.alert ? "Yes" : "No"}
            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default ExitScan;