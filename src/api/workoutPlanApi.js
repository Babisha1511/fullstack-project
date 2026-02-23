import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1013/api/workouts"
});

export const createWorkoutPlan = (data) => API.post("", data);

export const getMemberWorkoutPlans = (memberId) =>
  API.get(`/member/${memberId}`);

export const getAllWorkoutPlans = () =>
  API.get("");
export const deleteWorkoutPlan = (id) =>
  API.delete(`/${id}`);

