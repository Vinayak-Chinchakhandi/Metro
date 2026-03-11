import API from "./api";

export const getLivePredictions = async () => {
  const res = await API.get("/live-predictions");
  return res.data;
};