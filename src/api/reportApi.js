import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9393/api/reports"
});

export const getReports = () => api.get("/");
export const getKPIs = () => api.get("/kpis");
export const downloadCSV = () =>
  api.get("/csv", { responseType: "blob" });

export default api;