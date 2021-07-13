import { SET_CATEGORIES } from "../actions/categoryActions";

const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload.categories };
    default:
      return { ...state };
  }
};

export default categoryReducer;
