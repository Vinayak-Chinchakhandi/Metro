import TicketForm from "../components/TicketForm";
import useTicket from "../hooks/useTicket";
import { useNavigate } from "react-router-dom";

function BookTicket() {
  const { createTicket } = useTicket();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const ticket = await createTicket(data);

    // navigate to the ticket page using the id so it can be refreshed independently
    navigate(`/ticket/${ticket.id}`, { state: ticket });
  };

  return (
    <div className="book-ticket-page">
      <div className="container">
        <div className="book-ticket-header">
          <h1>🚇 Book Your Metro Ticket</h1>
          <p>Choose your journey details and get your QR ticket instantly</p>
        </div>

        <div className="ticket-form-wrapper">
          <TicketForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default BookTicket;
