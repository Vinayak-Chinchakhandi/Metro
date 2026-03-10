import API from "./api";

export const adminLogin = async (data) => {
  const res = await API.post("/admin/login", data);
  return res.data;
};