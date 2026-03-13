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

    <div className="p-8">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-semibold text-slate-800">
            Exit Gate Scanner
          </h1>

          <p className="text-slate-600 mt-1">
            Scan passenger QR tickets to complete metro journeys.
          </p>

        </div>


        {/* SCANNER CARD */}

        <div className="flex justify-center">

          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 w-[360px] text-center">

            <p className="text-sm text-slate-600 mb-4">
              Align the QR code within the frame to scan
            </p>

            <QRScanner onScan={handleScan} />

            {message && (

              <div
                className={`mt-5 p-3 rounded-lg text-sm font-medium ${
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

          </div>

        </div>


        {/* RESULT CARD */}

        {result && (

          <div className="mt-8 flex justify-center">

            <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 w-[420px]">

              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Journey Summary
              </h3>

              <div className="space-y-2 text-sm text-slate-700">

                <p>
                  <strong>Distance:</strong>{" "}
                  {result.distance_km
                    ? Number(result.distance_km).toFixed(2)
                    : "0"} km
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
                  <strong>Security Alert:</strong>{" "}
                  {result.alert ? (
                    <span className="text-red-600 font-semibold">
                      YES 🚨
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      No Issues
                    </span>
                  )}
                </p>

                {result.reason && (
                  <p className="text-red-600 font-semibold">
                    Reason: {result.reason}
                  </p>
                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default ExitScan;