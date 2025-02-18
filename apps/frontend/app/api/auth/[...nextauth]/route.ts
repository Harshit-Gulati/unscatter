import NextAuth, { Account, Profile, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import TwitterProvider from "next-auth/providers/twitter";
import axios from "axios";

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.API_KEY || "",
      clientSecret: process.env.API_SECRET || "",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (!url || url === baseUrl) {
        return baseUrl + "/";
      }
      return baseUrl + "/dashboard";
    },
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile | undefined;
      trigger?: "signIn" | "signUp" | "update" | undefined;
      isNewUser?: boolean | undefined;
      session?: any;
    }) {
      if (account) {
        token.accessToken = account.oauth_token;
        token.refreshToken = account.oauth_token_secret;
        token.id = user.id;
      }

      return token;
    },
    async signIn({ user, account }) {
      try {
        if (user && account) {
          await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`, {
            user,
            account,
          });
        }
        return true;
      } catch (error) {
        console.error("Sign-in callback error:", error);
        return false;
      }
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: AdapterUser;
    }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
