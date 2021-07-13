//Action Types
export const SET_CATEGORIES = "SET_CATEGORIES";

//Action Creator
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: { categories }
});
