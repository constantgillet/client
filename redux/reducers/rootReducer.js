import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import favoriteReducer from "./favoriteReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  favorite: favoriteReducer,
  user: userReducer
});

export default rootReducer;
