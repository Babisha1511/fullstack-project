import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8084/api/progress"
});

export const addProgress = (data) => API.post("", data);

export const getMemberProgress = (memberId) =>
  API.get(`/member/${memberId}`);
