import axios from "axios";
import { parseCookies } from "nookies";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_ROUTE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { "lar-fraterno_token": token } = parseCookies();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
