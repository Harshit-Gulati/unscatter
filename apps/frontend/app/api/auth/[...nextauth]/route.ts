import NextAuth, {
  Account,
  NextAuthOptions,
  Profile,
  Session,
  User,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import TwitterProvider from "next-auth/providers/twitter";
import { prismaClient } from "@repo/db/client";

export const authOptions: NextAuthOptions = {
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
      if (user && account) {
        try {
          const existingUser = await prismaClient.user.findUnique({
            where: { id: user.id },
          });

          if (existingUser) {
            await prismaClient.user.update({
              where: { id: user.id },
              data: {
                refreshToken: account.oauth_token as string,
                accessToken: account.oauth_token_secret as string,
              },
            });
          } else {
            await prismaClient.user.create({
              data: {
                id: user.id,
                refreshToken: account.oauth_token as string,
                accessToken: account.oauth_token_secret as string,
              },
            });
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
        }
      }
      return true;
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
