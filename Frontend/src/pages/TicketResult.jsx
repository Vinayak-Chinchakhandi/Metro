import { useLocation, useNavigate } from "react-router-dom";
import QRDisplay from "../components/QRDisplay";

function TicketResult() {

  const location = useLocation();
  const navigate = useNavigate();
  const ticket = location.state;

  if (!ticket) {
    return (
      <div className="p-10">
        <h2 className="text-xl font-bold text-red-500">
          No ticket data found
        </h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">

      <div className="bg-white p-8 rounded shadow w-96 text-center">

        <h2 className="text-2xl font-bold mb-6">
          Metro Ticket
        </h2>

        <p className="mb-2">
          <strong>Ticket ID:</strong> {ticket.id}
        </p>

        <p className="mb-2">
          <strong>From:</strong> {ticket.source}
        </p>

        <p className="mb-2">
          <strong>To:</strong> {ticket.destination}
        </p>

        <p className="mb-4">
          <strong>Crowd Level:</strong> {ticket.crowd_level}
        </p>

        {/* QR Code Component */}
        <QRDisplay qrValue={ticket.qr_code} />

        <button
          onClick={() => navigate("/book")}
          className="mt-6 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Book Another Ticket
        </button>

      </div>

    </div>
  );
}

export default TicketResult;