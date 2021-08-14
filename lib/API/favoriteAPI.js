import api from "./api";

export const getAllFavorites = (userId) => {
  return api.get(`/users/${userId}/favorites`);
};
