import api from "./api";

export const getPredictions = async () => {
  const res = await api.get("/predictions");
  return res.data;
};

export const predictDemand = async (data) => {
  const res = await api.post("/predict-demand", data);
  return res.data;
};