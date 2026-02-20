import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("🔐 AUTHORIZE CALLED");
        console.log("📩 credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log("👤 user from DB:", user);

        if (!user) {
          console.log("❌ User not found");
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("🔑 password match:", isValid);

        if (!isValid) {
          console.log("❌ Password mismatch");
          return null;
        }

        console.log("✅ LOGIN SUCCESS");

        return {
          id: user.id,
          email: user.email,
          shopId: user.shopId,
        } as any;
      },
    }),
  ],

  session: {
    strategy: "jwt" as const, // ⭐ FIXED TYPE ERROR
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).shopId = (user as any).shopId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).shopId = (token as any).shopId;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };