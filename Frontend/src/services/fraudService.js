import API from "./api";

export const getFraudAlerts = async () => {
  const res = await API.get("/fraud-alerts");
  return res.data;
};