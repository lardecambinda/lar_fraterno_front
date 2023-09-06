import axios from "axios";
import { parseCookies } from "nookies";

const { "lar-fraterno_token": token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_ROUTE,
  headers: {
    Authorization: `Bearer ${token ? token : ""}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
