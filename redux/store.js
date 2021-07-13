//From https://dev.to/waqasabbasi/server-side-rendered-app-with-next-js-react-and-redux-38gf
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

export default store;
