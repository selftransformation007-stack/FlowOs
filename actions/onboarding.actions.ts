"use server"

import { auth } from "@/src/lib/auth";
import { db } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { GoalStatus, HabitCategory, HabitStatus, OnboardingIntent } from "@prisma/client";
import { CreateFirstGoalInput, createFirstGoalSchema, CreateFirstHabitInput, createFirstHabitSchema, saveIntentsSchema } from "@/src/schema/onboarding.schema";

export type ActionResult<T = undefined> =
    | { success: true; data?: T; message?: string }
    | { success: false; error: string };

async function requireAuth(): Promise<string> {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");
    return session.user.id;
}

export async function saveIntentAction(intents: OnboardingIntent[]): Promise<ActionResult> {
    const userId = await requireAuth()

    const parsed = saveIntentsSchema.safeParse({ intents });
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message };
    }

    await db.$transaction([
        db.userOnboardingIntent.deleteMany({
            where: { userId }
        }),
        db.userOnboardingIntent.createMany({
            data: parsed.data.intents.map(intent => ({
                userId,
                intent
            }))
        })
    ])

    return { success: true }

}

export async function createFirstHabitAction(formData: CreateFirstHabitInput): Promise<ActionResult<{ habitId: string }>> {
    const userId = await requireAuth()

    const parsed = createFirstHabitSchema.safeParse(formData);
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const { frequency, name, reminderEnabled, reminderTime } = parsed.data;

    const habit = await db.habit.create({
        data: {
            userId,
            name,
            emoji: "✦",
            color: "#6D28D9",
            category: HabitCategory.OTHER,
            frequency,
            reminderEnabled,
            reminderTime: reminderEnabled ? (reminderTime ?? null) : null,
            status: HabitStatus.ACTIVE,
            sortOrder: 0,
        },
        select: { id: true },
    });

    return {
        success: true,
        data: {
            habitId: habit.id
        }
    }

}

export async function createFirstGoalAction(formData: CreateFirstGoalInput): Promise<ActionResult<{ goalId: string }>> {
    const userId = await requireAuth()

    const parsed = createFirstGoalSchema.safeParse(formData);
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const { category, targetDate, title } = parsed.data

    const targetDateObj = new Date(targetDate + "T00:00:00.000Z");
    if (isNaN(targetDateObj.getTime())) {
        return { success: false, error: "Invalid target date" };
    }
    const goal = await db.goal.create({
        data: {
            userId,
            title,
            category,
            status: GoalStatus.ACTIVE,
            targetDate: targetDateObj
        },
        select: { id: true }
    })

    return {
        success: true,
        data: {
            goalId: goal.id
        }
    }

}

export async function completeOnboardingAction(): Promise<ActionResult> {
    const userId = await requireAuth();

    await db.user.update({
        where: { id: userId },
        data: {
            onboardingDone: true
        }
    })

    revalidatePath("/", "layout")

    return { success: true }
}

export async function skipOnboardingAction(): Promise<ActionResult> {
    return completeOnboardingAction();
}