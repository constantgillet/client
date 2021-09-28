import axios from "axios";
import { getSession } from "next-auth/client";
import { API_URL } from "../constants";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session?.accessToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default api;
