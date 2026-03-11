import { useState } from "react";
import { entryScan } from "../services/ticketService";
import QRScanner from "../components/QRScanner";

function EntryScan() {

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleScan = async (data) => {

    try {

      const qrData = JSON.parse(data);

      const result = await entryScan({
        ticket_id: qrData.ticketId,
        entry_station: qrData.source
      });

      setMessage(result.status);
      setMessageType("success");

    } catch (err) {

      console.error(err);

      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Entry scan failed");
      }

      setMessageType("error");
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

          <div
            className={`mt-4 p-3 rounded text-sm font-medium ${
              messageType === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>

        )}

      </div>

    </div>

  );

}

export default EntryScan;