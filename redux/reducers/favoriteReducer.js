import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES } from "../actions/favoriteActions";

const favoriteReducer = (state = { favorites: [], error: null }, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return { ...state, favorites: action.payload.favorites };
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload.offerId] };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((favoriteOfferId) => favoriteOfferId != action.payload.offerId)
      };
    default:
      return { ...state };
  }
};

export default favoriteReducer;
