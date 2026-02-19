import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      shopId?: string | null;
    };
  }

  interface User {
    shopId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    shopId?: string | null;
  }
}
