import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8086/api/clients"
});

/* ===== GET ALL CLIENTS ===== */
export const getClients = () => API.get("");

/* ===== ADD CLIENT ===== */
export const addClient = (data) => API.post("", data);

/* ===== DELETE CLIENT ===== */
export const deleteClient = (id) => API.delete(`/${id}`);