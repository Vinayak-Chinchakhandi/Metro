import api from "./api";

export const bookTicket = async (data) => {
  const res = await api.post("/tickets/book", data);
  return res.data;
};

export const getTicket = async (id) => {
  const res = await api.get(`/tickets/${id}`);
  return res.data;
};
