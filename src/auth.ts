import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [Google],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3,
    updateAge: 60 * 60 * 24 * 365,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        token.provider = account.provider;
        const sub = (profile as { sub?: string } | null | undefined)?.sub;
        token.provider_subject = sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.provider = token.provider;
        session.user.provider_subject = token.provider_subject;
      }
      return session;
    },
  },
});
