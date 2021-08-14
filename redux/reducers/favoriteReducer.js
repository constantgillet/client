import { SET_FAVORITES } from "../actions/favoriteActions";

const favoriteReducer = (state = { favorites: [] }, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return { ...state, favorites: action.payload.favorites };
    default:
      return { ...state };
  }
};

export default favoriteReducer;
