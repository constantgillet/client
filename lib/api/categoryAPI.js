import api from "./api";

export const getCategories = async () => {
  return api.get(`/categories`);
};
