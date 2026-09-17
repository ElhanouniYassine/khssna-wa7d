import axios from "axios";

import { getToken } from "@/services/storage/authStorage";

const api = axios.create({
  baseURL: "http://192.168.1.70:8080/api",
});

let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  unauthorizedHandler = handler;
};

// Automatically attach JWT to every request
api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// If backend says JWT is invalid/expired
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      unauthorizedHandler?.();
    }

    return Promise.reject(error);
  },
);

export default api;
