"use server";

import { auth, signIn, signOut } from "@/src/lib/auth";
import { sendPasswordResetEmail } from "@/src/lib/mail";
import { hashPassword } from "@/src/lib/password";
import { db } from "@/src/lib/prisma";
import { createToken, validateTOken } from "@/src/lib/tokens";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
  LoginInput,
  loginSchema,
  RegisterInput,
  registerSchema,
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/src/schema/auth.schema";
import { ActionResult } from "@/src/types/auth.types";
import { redirect } from "next/navigation";

export async function requireAuth(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user.id;
}

export async function registerAction(
  formData: RegisterInput,
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(formData);
  if (!parsed.success) {
    const err = parsed.error;
    return {
      success: false,
      error: err.message,
      field: err.issues[0]?.path[0] as string,
    };
  }
  const { name, email, password } = parsed.data;

  const existing = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    return {
      success: false,
      error: "An account with this email already exists",
      field: "email",
    };
  }

  const hashed = await hashPassword(password);

  await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
      select: {
        id: true,
      },
    });
    await tx.userSettings.create({
      data: {
        userId: user.id,
      },
    });
  });

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    console.log("[register] auto sign-in error");
  }

  return { success: true, message: "User created successfully" };
}

export async function loginAction(formData: LoginInput): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(formData);
  if (!parsed.success) {
    const err = parsed.error;
    return {
      success: false,
      error: err.message,
      field: err.issues[0]?.path[0] as string,
    };
  }

  const { email, password } = parsed.data;

  try {
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (err) {
    if (typeof err === "object" && err !== null && "type" in err) {
      const errorType = (err as { type: string }).type;
      switch (errorType) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid email or password" };
        default:
          return {
            success: false,
            error: "Something went wrong. Please try again.",
          };
      }
    }
    throw err;
  }
}

export async function getSessionUser() {
  const userId = await requireAuth();

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      timezone: true,
      plan: true,
      onboardingDone: true,
      createdAt: true,
      settings: {
        select: {
          theme: true,
          fontSize: true,
          focusDuration: true,
          shortBreakDuration: true,
          longBreakDuration: true,
          longBreakAfter: true,
          autoStartBreaks: true,
          autoStartFocus: true,
          focusSound: true,
          focusVolume: true,
          notifyHabitReminders: true,
          habitReminderTime: true,
          notifyTaskDue: true,
          taskDueHoursBefore: true,
          notifyWeeklyReport: true,
          weeklyReportDay: true,
          notifyFocusEnd: true,
          notifyScreenLimitApproaching: true,
          notifyScreenLimitReached: true,
          notifyGoalDeadline: true,
          goalDeadlineDaysBefore: true,
          notifyStreakMilestone: true,
          screenTimeDailyGoalMinutes: true,
        },
      },
    },
  });

  return user;
}

export async function forgotPasswordAction(
  formData: ForgotPasswordInput,
): Promise<ActionResult> {
  const parsed = await forgotPasswordSchema.safeParse(formData);
  if (!parsed.success) {
    const err = parsed.error;
    return {
      success: false,
      error: err.message,
      field: err.issues[0]?.path[0] as string,
    };
  }

  const { email } = parsed.data;

  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return {
      success: false,
      error: "User not exists",
    };
  }

  if (user) {
    const token = await createToken(email);
    sendPasswordResetEmail(email, token).catch((err) =>
      console.error("[forgot-password] email error: ", err),
    );
  }

  return {
    success: true,
    message:
      "Verification email has been sent to your email address! Please check it out.",
  };
}

export async function logoutAction(): Promise<void> {
  try {
    const session = await auth();
    if (session?.user?.id) {
      await db.session.deleteMany({ where: { userId: session.user.id } });
    }
  } catch (error) {
    console.log("[logout] action");
    throw error;
  }
  await signOut({ redirectTo: "/login" });
}

export async function resetPasswordAction(
  formData: ResetPasswordSchema,
): Promise<ActionResult> {
  const parsed = resetPasswordSchema.safeParse(formData);
  if (!parsed.success) {
    const err = parsed.error;
    return {
      success: false,
      error: err.message,
      field: err.issues[0]?.path[0] as string,
    };
  }

  const { password, token } = parsed.data;

  const email = await validateTOken(token);
  if (!email) {
    return {
      success: false,
      error: "This reset link is invalid or expired. Please request new one.",
    };
  }

  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return {
      success: false,
      error: "Account not found",
    };
  }

  const hashed = await hashPassword(password);

  await db.$transaction([
    db.user.update({
      where: { id: user.id },
      data: { password: hashed },
    }),
    db.session.deleteMany({ where: { userId: user.id } }),
    db.passwordResetToken.deleteMany({ where: { token } }),
  ]);

  return {
    success: true,
    message: "Password Updated! You can now sign in with your new password.",
  };
}
