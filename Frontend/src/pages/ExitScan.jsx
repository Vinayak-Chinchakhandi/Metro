import { useState } from "react";
import { exitScan } from "../services/ticketService";
import QRScanner from "../components/QRScanner";

function ExitScan() {

  const [result, setResult] = useState(null);

  const handleScan = async (data) => {

    try {

      const qrData = JSON.parse(data);

      const result = await exitScan({
        ticket_id: qrData.ticketId,
        exit_station: qrData.destination
      });

      setResult(result);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="flex justify-center mt-10">

      <div className="bg-white p-6 rounded shadow w-96 text-center">

        <h2 className="text-xl font-bold mb-4">
          Exit Scan
        </h2>

        <QRScanner onScan={handleScan} />

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