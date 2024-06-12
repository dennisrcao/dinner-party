import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', // Only enable debug in development

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.picture = token.picture!;
        session.user.name = token.name!;
        session.user.email = token.email!;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email_verified && profile.email) {
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true;
    },
  },
});

