import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import QRDisplay from "../components/QRDisplay";
import html2canvas from "html2canvas";

function TicketResult() {

  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state;
  const ticketRef = useRef(null);

  if (!ticket) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          No ticket data found
        </h2>
      </div>
    );
  }

  const downloadTicket = async () => {

    const canvas = await html2canvas(ticketRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;
    link.download = `ticket-${ticket.id}.png`;

    link.click();

  };

  const getCrowdBadge = () => {
    if (ticket.crowd_level === "High") return "bg-red-100 text-red-600";
    if (ticket.crowd_level === "Medium") return "bg-orange-100 text-orange-600";
    return "bg-green-100 text-green-600";
  };

  return (

    <div className="p-8 flex justify-center">

      <div ref={ticketRef}
        className="bg-white p-8 rounded-xl shadow-md border border-indigo-100 w-96 text-center">

        {/* HEADER */}

        <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
          Metro Smart Ticket
        </h2>

        {/* TICKET DETAILS */}

        <div className="text-slate-700 text-sm space-y-2 mb-4">

          <p>
            <strong>Ticket ID:</strong> {ticket.id}
          </p>

          <p>
            <strong>From:</strong> {ticket.source}
          </p>

          <p>
            <strong>To:</strong> {ticket.destination}
          </p>

          <div className="flex justify-center items-center gap-2">

            <strong>Crowd Level:</strong>

            <span className={`text-xs px-2 py-1 rounded-full ${getCrowdBadge()}`}>
              {ticket.crowd_level}
            </span>

          </div>

        </div>

        {/* QR CODE */}

        <QRDisplay qrValue={ticket.qr_code} />

        {/* ACTION BUTTONS */}

        <div className="flex flex-col gap-3 mt-6">

          <button
            onClick={downloadTicket}
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Download Ticket
          </button>

          <button
            onClick={() => navigate("/book")}
            className="bg-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-300 transition"
          >
            Book Another Ticket
          </button>

        </div>

      </div>

    </div>

  );
}

export default TicketResult;