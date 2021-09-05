import { SET_LOADING_USER_START, SET_LOADING_USER_END, SET_USER } from "../actions/userActions";

const userReducer = (state = { user: {}, loading: false }, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload.user };
    case SET_LOADING_USER_START:
      return { ...state, loading: true };
    case SET_LOADING_USER_END:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};

export default userReducer;
