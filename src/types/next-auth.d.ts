import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    expires: string;
    user: {
      email: string;
      image: string;
      name: string;
      role?: string;
    };
  }
}
