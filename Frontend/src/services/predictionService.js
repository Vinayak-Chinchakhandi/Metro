import API from "./api";

export const getPredictions = async () => {
  const res = await API.get("/predictions");
  return res.data;
};