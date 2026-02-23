// ...existing code...
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8084/api",
  withCredentials: false, // set true only if you use cookie-based auth
});
// add this named export so imports like `import { bookSchedule } from '.../scheduleApi'` work
export const bookSchedule = (payload) => {
  return api.post("/schedules/book", payload);
};
// add the missing export (adjust URL/method to match your backend)
export const cancelSchedule = (id) => api.delete(`/schedules/${id}/cancel`);
// attach token and log outgoing requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Outgoing API request:", config.method, config.url, config.headers);
  return config;
}, (err) => Promise.reject(err));

export default api;

// export helpers (or adapt existing exports)
export const getSchedules = () => api.get("/schedules");
export const createSchedule = (payload) => api.post("/schedules", payload);
export const updateSchedule = (id, payload) => api.put(`/schedules/${id}`, payload);
export const deleteSchedule = (id) => api.delete(`/schedules/${id}`);
// ...existing code...