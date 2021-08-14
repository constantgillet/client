//Action Types
export const SET_FAVORITES = "SET_FAVORITES";

//Action Creator
export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: { favorites }
});
