import API from "./api";

export const getPredictions = async (date, month) => {

  let url = "/predictions";
  let params = [];

  if (date) {
    params.push(`date=${date}`);
  }

  if (month) {
    params.push(`month=${month}`);
  }

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  const res = await API.get(url);

  return res.data;

};