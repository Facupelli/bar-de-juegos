import axios from "axios";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "secret",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "secret",
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      const data = {
        email: session.user.email,
        name: session.user.name,
      };

      let userLogged;

      try {
        const response = await axios.post(
          `http://192.168.1.44:3000/api/auth/login`,
          data
        );
        userLogged = await response.data;
      } catch (e) {
        console.error("LOGIN ERROR:", e);
      }

      session.user.role = userLogged.role;
      token.role = userLogged.role;

      return session;
    },
  },
};
export default NextAuth(authOptions);
