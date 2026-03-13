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

    <div className="p-8">

      <div className="max-w-5xl mx-auto">

        {/* PAGE HEADER */}

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-semibold text-slate-800">
            Entry Gate Scanner
          </h1>

          <p className="text-slate-600 mt-1">
            Scan passenger QR tickets to allow metro entry.
          </p>

        </div>

        {/* SCANNER CARD */}

        <div className="flex justify-center">

          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 w-[380px] text-center">

            <p className="text-sm text-slate-600 mb-4">
              Align the QR code within the frame to scan
            </p>

            <QRScanner onScan={handleScan} />

            {message && (

              <div
                className={`mt-5 p-3 rounded-lg text-sm font-medium ${messageType === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                  }`}
              >
                {message}
              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default EntryScan;