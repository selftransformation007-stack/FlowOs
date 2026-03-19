import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import { Plan } from "@prisma/client";
import { db } from "./prisma";
import { verifyPassword } from "./password";


interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  plan: Plan;
  onboardingDone: boolean;
}


const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),

  session: { strategy: "jwt" },

  secret: process.env.AUTH_SECRET,

  trustHost: true,

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<AuthUser | null> {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            password: true,
            plan: true,
            onboardingDone: true,
          },
        });

        if (!user) return null;

        const valid = await verifyPassword(password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          plan: user.plan,
          onboardingDone: user.onboardingDone,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as AuthUser;
        token.userId = u.id;
        token.plan = u.plan ?? Plan.FREE;
        token.onboardingDone = u.onboardingDone ?? false;
      } else if (token.userId) {
        const fresh = await db.user.findUnique({
          where: { id: token.userId as string },
          select: { plan: true, onboardingDone: true },
        });
        if (fresh) {
          token.plan = fresh.plan;
          token.onboardingDone = fresh.onboardingDone;
        }
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.userId as string;
      session.user.plan = token.plan as Plan;
      session.user.onboardingDone = token.onboardingDone as boolean;
      return session;
    },
  },
});