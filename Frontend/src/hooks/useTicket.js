import { useState } from "react";
import { bookTicket } from "../services/ticketService";

function useTicket() {

  const [ticket, setTicket] = useState(null);

  const createTicket = async (data) => {

    const result = await bookTicket(data);

    setTicket(result);

    return result;
  };

  return {
    ticket,
    createTicket
  };
}

export default useTicket;