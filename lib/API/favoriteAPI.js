import { getSession } from "next-auth/client";
import api from "./api";

export const getAllFavorites = (userId) => {
  return api.get(`/users/${userId}/favorites`);
};

export const createFavorite = async (offerId) => {
  const session = await getSession();

  return api.post(`/users/${session.user.id}/favorites`, {
    offer_id: offerId
  });
};

export const deleteFavorite = async (offerId) => {
  const session = await getSession();

  return api.delete(`/users/${session.user.id}/favorites`, {
    params: {
      offer_id: offerId
    }
  });
};
