import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";


const prisma = new PrismaClient();

export const authOptions = {
  session: {
    strategy: "jwt" as const,
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            shopId: user.shopId,
          };
        } catch (err) {
          console.error("AUTH ERROR:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.shopId = user.shopId;
      }
      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.shopId = token.shopId;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
