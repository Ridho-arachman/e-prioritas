import { config } from "@/config";
import axios from "axios";

export const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  },
);
