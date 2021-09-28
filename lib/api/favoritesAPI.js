import axios from "axios";
import { getSession } from "next-auth/client";
import { API_URL } from "../constants";

const FavoriteAPI = class {
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

  getAll = (userId) => {
    return this.api.get(`/users/${userId}/favorites`);
  };

  create = async (offerId) => {
    const session = await getSession(this.context);

    return this.api.post(`/users/${session.user.id}/favorites`, {
      offer_id: offerId
    });
  };

  delete = async (offerId) => {
    const session = await getSession(this.context);

    return this.api.delete(`/users/${session.user.id}/favorites`, {
      params: {
        offer_id: offerId
      }
    });
  };
};

export default FavoriteAPI;
