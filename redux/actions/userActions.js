import UserAPI from "../../lib/API/userAPI";

//Action Types
export const SET_USER = "SET_USER";
export const SET_LOADING_USER_START = "SET_LOADING_USER_START";
export const SET_LOADING_USER_END = "SET_LOADING_USER_END";

//Action Creator
export const getUser = (userId) => {
  return function (dispatch) {
    dispatch({
      type: SET_LOADING_USER_START,
      payload: {}
    });

    new UserAPI()
      .getOneUser(userId)
      .then((res) => {
        const user = res.data.data;
        dispatch({
          type: SET_USER,
          payload: { user: user }
        });
        dispatch({
          type: SET_LOADING_USER_END,
          payload: {}
        });
      })
      .catch((err) => console.log(err));
  };
};

//Action Creator
export const setUser = (user) => ({
  type: SET_USER,
  payload: { user }
});

export const updateUserProfile = (userId, location, teamName, description, profilePicture, bannerPicture) => {
  return function (dispatch) {
    dispatch({
      type: SET_LOADING_USER_START,
      payload: {}
    });

    new UserAPI()
      .updateUser(userId, location, teamName, description, profilePicture, bannerPicture)
      .then((res) => {
        dispatch({
          type: SET_LOADING_USER_END,
          payload: {}
        });

        const user = res.data.data;
        dispatch({
          type: SET_USER,
          payload: { user: user }
        });
      })
      .catch((err) => console.error(err));
  };
};
