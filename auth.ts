import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        token.googleId = account.providerAccountId;
      }

      if (profile) {
        token.picture = profile.picture;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.googleId =
          typeof token.googleId === "string"
            ? token.googleId
            : undefined;

        session.user.image =
          typeof token.picture === "string"
            ? token.picture
            : session.user.image;
      }

      return session;
    },
  },
});