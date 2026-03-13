import axios from "axios";

const API = "http://localhost:5000/api/analytics";

export const getKPI = async () => {
  const res = await axios.get(`${API}/kpi`);
  return res.data;
};

export const getFraudStats = async () => {
  const res = await axios.get(`${API}/fraud-stats`);
  return res.data;
};

export const getTopStations = async () => {
  const res = await axios.get(`${API}/top-stations`);
  return res.data;
};