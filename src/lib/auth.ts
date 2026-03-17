// src/lib/auth.ts
import NextAuth, { NextAuthConfig } from "next-auth"; // v5 type
import Credentials from "next-auth/providers/credentials"; // same
import bcrypt from "bcryptjs";
import { db } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authConfig: NextAuthConfig = {
  // ← v5 type
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) return null;
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password as string,
        );
        if (!isValid) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id as string;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
  pages: { signIn: "/login" },
};

// v5 — `auth` is a real callable function
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
