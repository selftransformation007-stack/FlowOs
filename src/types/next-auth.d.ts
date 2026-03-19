import type { DefaultSession } from "next-auth";
import type { Plan } from "@prisma/client";

declare module "next-auth" {
  interface User {
    plan?: Plan;
    onboardingDone?: boolean;
  }
  interface Session {
    user: {
      id: string;
      plan: Plan;
      onboardingDone: boolean;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    plan?: Plan;
    onboardingDone?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    plan: Plan;
    onboardingDone: boolean;
  }
}