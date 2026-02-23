import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8086/api/memberships"
});

/* ===== GET ALL PLANS ===== */
export const getMemberships = () => API.get("");

/* ===== CREATE PLAN ===== */
export const createMembership = (data) => API.post("/", data);

/* ===== DELETE PLAN ===== */
export const deleteMembership = (id) => API.delete(`/${id}`);
