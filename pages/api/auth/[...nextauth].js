import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { API_URL } from '../../../lib/constants';

const GOOGLE_AUTHORIZATION_URL =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
    });

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {

    try {

        const url =
        "https://oauth2.googleapis.com/token?" +

        new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
        });

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };

    } catch (error) {
        console.error(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export default NextAuth({
    
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            authorize: async (credentials) => {
                
                const body = {
                    email: credentials.email,
                    password: credentials.password
                };

                const response = await fetch(API_URL + '/api/users/login', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                const res = await response.json();
                
                if (res.data) {
                    return res.data
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {

        async jwt(token, user, account) {

            // Initial sign in
            if (account && user) {
                return {
                    accessToken: user.accessToken,
                    accessTokenExpires: Date.now() + 300000, //accessTokenExpires: Date.now() + account.expires_in * 1000,
                    refreshToken: user.refreshToken,
                    user: user.user,
                };
            }

            console.log(token);
            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },

        async session(session, token) {

            if (token) {
                session.user = token.user;
                session.accessToken = token.accessToken;
                session.error = token.error;
            }

            return session;
        },
    },

    pages: {
        signIn: '/auth/connexion',
    }
});