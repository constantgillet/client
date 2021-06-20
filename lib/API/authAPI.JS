import axios from "axios";
import { API_URL } from "../constants";

export const registerUser = async (username, email, password, passwordConfirm) => {
  return axios.post(`${API_URL}/auth/register`, {
    username: username,
    email: email,
    password: password,
    confirm_password: passwordConfirm
  });
};
