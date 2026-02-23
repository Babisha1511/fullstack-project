import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8094/api/payments"
});

export const createOrder = (data) =>
  API.post("/create-order", data);

export const verifyPayment = (data) =>
  API.post(`/verify?orderId=${data.orderId}&paymentId=${data.paymentId}`);

export const getAllPayments = () =>
  API.get("/all");
