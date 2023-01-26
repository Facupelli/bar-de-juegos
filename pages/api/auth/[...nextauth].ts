import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const data = {
        email: session.user.email,
        name: session.user.name,
      };

      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
        data
      );
      const userLogged = await response.data;

      session.user.role = userLogged.role;
      token.role = userLogged.role;

      if (userLogged.message === "success") return session;
    },
  },
};
export default NextAuth(authOptions);
