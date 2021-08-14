import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import favoriteReducer from "./favoriteReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  favorite: favoriteReducer
});

export default rootReducer;
