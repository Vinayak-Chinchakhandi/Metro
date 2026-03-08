import api from "./api";

export const getFraudAlerts = async () => {

  const res = await api.get("/fraud-alerts");

  return res.data;
};