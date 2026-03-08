import { useLocation } from "react-router-dom";
import QRDisplay from "../components/QRDisplay";

function TicketResult() {

  const location = useLocation();
  const ticket = location.state;

  if (!ticket) return <p>No Ticket Found</p>;

  return (
    <div className="container">

      <div className="card" style={{maxWidth:"400px", margin:"auto"}}>

        <h2>Metro Ticket</h2>

        <p><b>Ticket ID:</b> {ticket.ticket_id}</p>
        <p><b>Source:</b> {ticket.source}</p>
        <p><b>Destination:</b> {ticket.destination}</p>
        <p><b>Time:</b> {ticket.time}</p>

        <p>
          <b>Crowd Level:</b>
          <span className={`crowd-${ticket.crowd_level?.toLowerCase()}`}>
            {" "} {ticket.crowd_level}
          </span>
        </p>

        <QRDisplay qr={ticket.qr_code} />

      </div>

    </div>
  );
}

export default TicketResult;