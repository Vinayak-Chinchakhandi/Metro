import { useState } from "react";
import { bookTicket, getTicket } from "../services/ticketService";

function useTicket() {
  const [ticket, setTicket] = useState(null);

  const createTicket = async (data) => {
    const result = await bookTicket(data);
    setTicket(result);
    return result;
  };

  const fetchTicket = async (id) => {
    const result = await getTicket(id);
    setTicket(result);
    return result;
  };

  return {
    ticket,
    createTicket,
    fetchTicket,
  };
}

export default useTicket;
