import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { refreshAccessToken } from "../../../lib/api/authAPI";
import { API_URL } from "../../../lib/constants";

export default NextAuth({
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        const body = {
          email: credentials.email,
          password: credentials.password
        };

        const response = await fetch(API_URL + "/auth/login", {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        const res = await response.json();

        if (res.data) {
          return res.data;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt(token, user, account) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: user.access_token.value,
          accessTokenExpires: user.access_token.expires * 1000,
          refreshToken: user.refresh_token.value,
          user: {
            id: user.user.id,
            username: user.user.username,
            emailVerified: user.user.email_verified
          }
        };
      }

      //Return previous token if the access token has not expired yet
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
        session.accessTokenExpires = token.accessTokenExpires;
        session.refreshToken = token.refreshToken;
        session.error = token.error;
      }
      return session;
    }
  },

  pages: {
    signIn: "/auth/connexion",
    signOut: "/auth/deconnexion"
  }
});
