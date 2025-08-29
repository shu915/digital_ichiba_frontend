import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [Google],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 5,
    updateAge: 0,
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google") {
        token.provider = account.provider;
        token.provider_subject = profile?.sub;
      }
      return token;
    },
  }
});