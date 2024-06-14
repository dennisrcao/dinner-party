import NextAuth from "next-auth";

declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      picture: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
  }
  interface Profile {
    email_verified?: boolean;
  }

}
