import axios from "axios";
import { getSession } from "next-auth/client";
import { API_URL } from "../constants";

const ShippingCategoryAPI = class {
  constructor(context) {
    this.context = context;
    this.api = axios.create({ baseURL: API_URL });
    this.api.interceptors.request.use(async (config) => {
      const session = await getSession(context);

      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
      } else {
        delete config.headers.Authorization;
      }

      return config;
    });
  }

  getOneShippingCategory = (name) => {
    return this.api.get(`/shipping/${name}`);
  };
};

export default ShippingCategoryAPI;
