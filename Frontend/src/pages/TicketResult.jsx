import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import QRDisplay from "../components/QRDisplay";
import { getTicket } from "../services/ticketService";

function TicketResult() {
  const location = useLocation();
  const params = useParams();
  const [ticket, setTicket] = useState(location.state || null);
  const [loading, setLoading] = useState(!ticket);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticket && params.id) {
      setLoading(true);
      getTicket(params.id)
        .then((t) => {
          setTicket(t);
          setError(null);
        })
        .catch((e) => {
          console.error("Failed to load ticket", e);
          setError("Ticket not found");
        })
        .finally(() => setLoading(false));
    }
  }, [params.id, ticket]);

  if (loading) return <p>Loading ticket...</p>;
  if (error) return <p>{error}</p>;
  if (!ticket) return <p>No Ticket Found</p>;

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "400px", margin: "auto" }}>
        <h2>🚇 Your Metro Ticket</h2>

        <p>
          <b>Ticket ID:</b> {ticket.id}
        </p>
        <p>
          <b>Source:</b> {ticket.source_station}
        </p>
        <p>
          <b>Destination:</b> {ticket.destination_station}
        </p>
        <p>
          <b>Travel Time:</b> {ticket.travel_time}
        </p>
        <p>
          <b>Booking Time:</b> {new Date(ticket.booking_time).toLocaleString()}
        </p>

        <p>
          <b>Crowd Level:</b>
          <span className={`crowd-${ticket.crowd_level?.toLowerCase()}`}>
            {" "}
            {ticket.crowd_level}
          </span>
        </p>

        <QRDisplay qr={ticket.qr_code} />
      </div>
    </div>
  );
}

export default TicketResult;
