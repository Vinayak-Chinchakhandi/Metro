import TicketForm from "../components/TicketForm";
import useTicket from "../hooks/useTicket";
import { useNavigate } from "react-router-dom";

function BookTicket() {

  const { createTicket } = useTicket();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {

    const ticket = await createTicket(data);

    navigate("/ticket", { state: ticket });
  };

  return (
    <div className="container">

      <h2>Book Ticket</h2>

      <TicketForm onSubmit={handleSubmit} />

    </div>
  );
}

export default BookTicket;