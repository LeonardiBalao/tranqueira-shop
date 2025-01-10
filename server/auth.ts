import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import prisma from "@/prisma/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET!,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await prisma.user.findFirst({
        where: {
          id: token.sub,
        },
      });
      if (!existingUser) return token;
      const existingAccount = await prisma.account.findFirst({
        where: {
          userId: existingUser.id,
        },
      });
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.image = existingUser.image;
      token.acceptsTerms = existingUser.acceptsTerms;
      token.acceptsNotification = existingUser.acceptsNotifications;
      token.firstLogin = existingUser.firstLogin;

      return token;
    },
    async session({ session, token }) {
      if (session && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.image = token.image as string;
        session.user.acceptsTerms = token.acceptsTerms as boolean;
        session.user.acceptsNotifications =
          token.acceptsNotification as boolean;
        session.user.firstLogin = token.firstLogin as boolean;
      }
      return session;
    },
  },
});
