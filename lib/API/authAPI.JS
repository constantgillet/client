import axios from "axios";
import { API_URL } from "../constants";
import api from "./api";

export const registerUser = async (username, email, password, passwordConfirm) => {
  return axios.post(`${API_URL}/auth/register`, {
    username: username,
    email: email,
    password: password,
    confirm_password: passwordConfirm
  });
};

export const sendVerificationEmail = async (userId) => {
  return api.post(`/auth/verify/email/send`, {
    user_id: userId
  });
};

export const verifyEmail = async (hash) => {
  return api.post(`/auth/verify/email`, {
    hash: hash
  });
};

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export const refreshAccessToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refresh_token: token.refreshToken
    });

    if (!response.data.data.status === "success") {
      throw refreshedTokens;
    }

    const { data } = response.data;
    console.log("refresh token");
    return {
      ...token,
      accessToken: data.access_token.value,
      accessTokenExpires: data.access_token.expires * 1000, //accessTokenExpires: Date.now() + account.expires_in * 1000,
      refreshToken: data.refresh_token.value, // Fall back to old refresh token
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        profilePicture: data.user.profile_picture,
        bannerPicture: data.user.banner_picture,
        emailVerified: data.user.email_verified
      }
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError"
    };
  }
};
