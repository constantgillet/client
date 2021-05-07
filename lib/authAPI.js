import { API_URL } from "./constants";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export const refreshAccessToken = async (token) => {
    
    try {

        const response = await fetch(API_URL + '/auth/accessToken?refreshToken=' + token.refreshToken)

        const res = await response.json();

        if (!res.status) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: res.data.accessToken,
            accessTokenExpires: Date.now() + 300000, //accessTokenExpires: Date.now() + account.expires_in * 1000,
            refreshToken: res.data.refreshToken ?? token.refreshToken, // Fall back to old refresh token
        };

    } catch (error) {
        console.error(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}