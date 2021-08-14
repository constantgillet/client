//Action Types
export const SET_FAVORITES = "SET_FAVORITES";

//Action Creator
export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: { favorites }
});

export const ADD_FAVORITE = "ADD_FAVORITE";

export const addFavorite = (offerId) => ({
  type: ADD_FAVORITE,
  payload: { offerId }
});

export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export const removeFavorite = (offerId) => ({
  type: REMOVE_FAVORITE,
  payload: { offerId }
});
