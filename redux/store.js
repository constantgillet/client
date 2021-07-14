//From https://dev.to/waqasabbasi/server-side-rendered-app-with-next-js-react-and-redux-38gf
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
