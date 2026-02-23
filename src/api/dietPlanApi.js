import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8084/api/diet-plans"
});

export const createDietPlan = (data) => API.post("", data);

export const getMemberDietPlans = (memberId) =>
  API.get(`/member/${memberId}`);

export const getPlanFoods = (planId) =>
  API.get(`/${planId}/foods`);
