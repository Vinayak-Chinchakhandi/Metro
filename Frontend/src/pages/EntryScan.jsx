import { useState } from "react";
import { entryScan } from "../services/ticketService";
import QRScanner from "../components/QRScanner";

function EntryScan() {

  const [message, setMessage] = useState("");

  const handleScan = async (data) => {

    try {

      const qrData = JSON.parse(data);

      const result = await entryScan({
        ticket_id: qrData.ticketId,
        entry_station: qrData.source
      });

      setMessage(result.status);

    } catch (err) {

      console.error(err);
      setMessage("Entry scan failed");

    }

  };

  return (

    <div className="flex justify-center mt-10">

      <div className="bg-white p-6 rounded shadow w-96 text-center">

        <h2 className="text-xl font-bold mb-4">
          Entry Scan
        </h2>

        <QRScanner onScan={handleScan} />

        {message && (
          <p className="mt-4 text-green-600">{message}</p>
        )}

      </div>

    </div>

  );

}

export default EntryScan;