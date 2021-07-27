import api from "./api";

export const getOneUser = (id) => {
  return api.get(`/users/${id}`);
};
