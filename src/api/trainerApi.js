import axios from "axios";

/* ===== BASE URL ===== */
const API = axios.create({
  baseURL: "http://localhost:8086/api/trainers"
});

/* ===== GET ALL TRAINERS ===== */
export const getTrainers = () => {
  return API.get("");
};

/* ===== ADD TRAINER ===== */
export const addTrainer = (trainerData) => {
  return API.post("", trainerData);
};

/* ===== DELETE TRAINER ===== */
export const deleteTrainer = (id) => {
  return API.delete(`/${id}`);
};