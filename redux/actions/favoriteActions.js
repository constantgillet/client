import FavoriteAPI from "../../lib/API/favoritesAPI";

//Action Types
export const SET_FAVORITES = "SET_FAVORITES";

//Action Creator
export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: { favorites }
});

export const ADD_FAVORITE = "ADD_FAVORITE";

export const addFavorite = (offerId) => {
  return function (dispatch) {
    dispatch({
      type: ADD_FAVORITE,
      payload: { offerId }
    });

    new FavoriteAPI().create(offerId).catch((err) => {
      console.log(err);
      //Add error
    });
  };
};

export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export const removeFavorite = (offerId) => {
  return function (dispatch) {
    dispatch({
      type: REMOVE_FAVORITE,
      payload: { offerId }
    });
    new FavoriteAPI().delete(offerId).catch((err) => {
      console.log(err);
      //Add error in state
    });
  };
};
