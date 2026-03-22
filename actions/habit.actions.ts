"use server";


import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
    HabitCategory,
    HabitFrequency,
    HabitStatus,
    Plan,
} from "@prisma/client";
import { db } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";


export type ActionResult<T = undefined> =
    | { success: true; data?: T; message?: string }
    | { success: false; error: string; code?: string };


async function requireAuth(): Promise<string> {
    const session = await auth();
    if (!session?.user?.id) throw new Error("UNAUTHORIZED");
    return session.user.id;
}

function getDayOfWeek(date: Date | string): number {
    const d = typeof date === "string" ? new Date(date + "T00:00:00Z") : date;
    return d.getUTCDay();
}

function isScheduledDay(
    frequency: HabitFrequency,
    customDays: number[],
    date: Date | string
): boolean {
    const dow = getDayOfWeek(date);
    if (frequency === HabitFrequency.DAILY) return true;
    if (frequency === HabitFrequency.WEEKDAYS) return dow >= 1 && dow <= 5;
    if (frequency === HabitFrequency.CUSTOM) return customDays.includes(dow);
    return false;
}

function dateString(offsetDays = 0): string {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() + offsetDays);
    return d.toISOString().split("T")[0];
}

function lastNDays(n: number): string[] {
    return Array.from({ length: n }, (_, i) => dateString(-(n - 1 - i)));
}

const FREE_PLAN_HABIT_LIMIT = 5;


function computeCurrentStreak(
    logs: { logDate: Date; completed: boolean }[],
    frequency: HabitFrequency,
    customDays: number[]
): number {
    const logMap = new Map<string, boolean>();
    for (const l of logs) {
        const key = l.logDate.toISOString().split("T")[0];
        logMap.set(key, l.completed);
    }

    let streak = 0;
    const today = new Date();

    const todayStr = today.toISOString().split("T")[0];
    const todayLogged = logMap.get(todayStr) === true;
    const todayScheduled = isScheduledDay(frequency, customDays, today);

    let startOffset = 0;
    if (todayScheduled && !todayLogged) {
        startOffset = -1;
    } else if (todayScheduled && todayLogged) {
        startOffset = 0;
    } else {
        startOffset = -1;
    }

    for (let i = startOffset; i >= -365; i--) {
        const dateStr = dateString(i);
        const scheduled = isScheduledDay(frequency, customDays, dateStr);
        if (!scheduled) continue; 
        const completed = logMap.get(dateStr) === true;
        if (completed) {
            streak++;
        } else {
            break;  
        }
    }

    return streak;
}

function computeBestStreak(
    logs: { logDate: Date; completed: boolean }[],
    frequency: HabitFrequency,
    customDays: number[]
): number {
    if (logs.length === 0) return 0;

    const logMap = new Map<string, boolean>();
    for (const l of logs) {
        logMap.set(l.logDate.toISOString().split("T")[0], l.completed);
    }

    const sorted = [...logs].sort(
        (a, b) => a.logDate.getTime() - b.logDate.getTime()
    );
    const firstDate = sorted[0].logDate;
    const today = new Date();

    let best = 0;
    let current = 0;

    const cursor = new Date(firstDate);
    while (cursor <= today) {
        const dateStr = cursor.toISOString().split("T")[0];
        const scheduled = isScheduledDay(frequency, customDays, cursor);
        if (scheduled) {
            if (logMap.get(dateStr) === true) {
                current++;
                best = Math.max(best, current);
            } else {
                current = 0;
            }
        }
        cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return best;
}

function computeCompletionRate(
    logs: { logDate: Date; completed: boolean }[],
    frequency: HabitFrequency,
    customDays: number[]
): number {
    const days = lastNDays(30);
    const logMap = new Map(
        logs.map((l) => [l.logDate.toISOString().split("T")[0], l.completed])
    );

    let scheduled = 0;
    let completed = 0;
    for (const d of days) {
        if (isScheduledDay(frequency, customDays, d)) {
            scheduled++;
            if (logMap.get(d) === true) completed++;
        }
    }

    return scheduled === 0 ? 0 : Math.round((completed / scheduled) * 100);
}



const habitFormSchema = z.object({
    name: z
        .string()
        .min(1, "Habit name is required")
        .max(60, "Name must be 60 characters or less")
        .trim(),
    emoji: z.string().default("✦"),
    color: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format")
        .default("#2563EB"),
    category: z.nativeEnum(HabitCategory).default(HabitCategory.OTHER),
    frequency: z.nativeEnum(HabitFrequency).default(HabitFrequency.DAILY),
    customDays: z
        .array(z.number().int().min(0).max(6))
        .default([]),
    targetPerDay: z
        .number()
        .int()
        .min(1, "Target must be at least 1")
        .max(20, "Target cannot exceed 20")
        .default(1),
    reminderEnabled: z.boolean().default(false),
    reminderTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:MM format")
        .nullable()
        .default(null),
    notes: z.string().max(2000).nullable().default(null),
    goalId: z.string().nullable().default(null),
});


export async function getActiveHabits() {
    const userId = await requireAuth();
    const todayStr = dateString(0);
    const thirtyDaysAgoStr = dateString(-29);

    const habits = await db.habit.findMany({
        where: { userId, status: HabitStatus.ACTIVE },
        orderBy: { sortOrder: "asc" },
        select: {
            id: true,
            name: true,
            emoji: true,
            color: true,
            category: true,
            frequency: true,
            customDays: true,
            targetPerDay: true,
            reminderEnabled: true,
            reminderTime: true,
            notes: true,
            goalId: true,
            sortOrder: true,
            createdAt: true,
        },
    });

    const habitIds = habits.map((h) => h.id);
    const logs = await db.habitLog.findMany({
        where: {
            userId,
            habitId: { in: habitIds },
            logDate: {
                gte: new Date(thirtyDaysAgoStr + "T00:00:00.000Z"),
                lte: new Date(todayStr + "T23:59:59.999Z"),
            },
        },
        select: {
            id: true,
            habitId: true,
            logDate: true,
            completed: true,
            count: true,
            note: true,
        },
    });

    const logsByHabit = new Map<string, typeof logs>();
    for (const log of logs) {
        if (!logsByHabit.has(log.habitId)) logsByHabit.set(log.habitId, []);
        logsByHabit.get(log.habitId)!.push(log);
    }

    const days30 = lastNDays(30);

    const habitsWithData = habits.map((habit) => {
        const habitLogs = logsByHabit.get(habit.id) ?? [];
        const logMap = new Map(
            habitLogs.map((l) => [
                l.logDate.toISOString().split("T")[0],
                l,
            ])
        );

        const todayLog = logMap.get(todayStr) ?? null;

        const todayScheduled = isScheduledDay(
            habit.frequency,
            habit.customDays,
            todayStr
        );
        let todayStatus: "not-logged" | "logged" | "partial" | "not-scheduled";
        if (!todayScheduled) {
            todayStatus = "not-scheduled";
        } else if (!todayLog) {
            todayStatus = "not-logged";
        } else if (todayLog.count >= habit.targetPerDay) {
            todayStatus = "logged";
        } else {
            todayStatus = "partial";
        }

        const heatmapData = days30.map((date) => {
            const isScheduled = isScheduledDay(
                habit.frequency,
                habit.customDays,
                date
            );
            const log = logMap.get(date);
            let status: "completed" | "missed" | "not-scheduled";
            if (!isScheduled) {
                status = "not-scheduled";
            } else if (log?.completed) {
                status = "completed";
            } else {
                status = "missed";
            }
            return { date, status };
        });

        const currentStreak = computeCurrentStreak(
            habitLogs.map((l) => ({ logDate: l.logDate, completed: l.completed })),
            habit.frequency,
            habit.customDays
        );
        const completionRate = computeCompletionRate(
            habitLogs.map((l) => ({ logDate: l.logDate, completed: l.completed })),
            habit.frequency,
            habit.customDays
        );

        return {
            ...habit,
            currentStreak,
            completionRate,
            heatmapData,
            todayLog: todayLog
                ? {
                    id: todayLog.id,
                    completed: todayLog.completed,
                    count: todayLog.count,
                    note: todayLog.note,
                }
                : null,
            todayStatus,
        };
    });

    const [archivedCount, user] = await Promise.all([
        db.habit.count({ where: { userId, status: HabitStatus.ARCHIVED } }),
        db.user.findUnique({ where: { id: userId }, select: { plan: true } }),
    ]);

    return {
        habits: habitsWithData,
        meta: {
            activeCount: habits.length,
            archivedCount,
            userPlan: user?.plan ?? Plan.FREE,
        },
    };
}


export async function getArchivedHabits() {
    const userId = await requireAuth();

    const habits = await db.habit.findMany({
        where: { userId, status: HabitStatus.ARCHIVED },
        orderBy: { updatedAt: "desc" },
        select: {
            id: true,
            name: true,
            emoji: true,
            color: true,
            category: true,
            updatedAt: true, 
        },
    });

    return habits.map((h) => ({ ...h, archivedAt: h.updatedAt }));
}


export async function getHabitById(habitId: string) {
    const userId = await requireAuth();
    const todayStr = dateString(0);

    const habit = await db.habit.findFirst({
        where: { id: habitId, userId },
        select: {
            id: true,
            name: true,
            emoji: true,
            color: true,
            category: true,
            frequency: true,
            customDays: true,
            targetPerDay: true,
            reminderEnabled: true,
            reminderTime: true,
            notes: true,
            goalId: true,
            status: true,
            sortOrder: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!habit) return null;

    const todayLog = await db.habitLog.findUnique({
        where: {
            habitId_logDate: {
                habitId,
                logDate: new Date(todayStr + "T00:00:00.000Z"),
            },
        },
        select: { id: true, completed: true, count: true, note: true },
    });

    const todayIsScheduled = isScheduledDay(
        habit.frequency,
        habit.customDays,
        todayStr
    );

    let linkedGoal = null;
    if (habit.goalId) {
        const goal = await db.goal.findFirst({
            where: { id: habit.goalId, userId },
            select: {
                id: true,
                title: true,
                category: true,
                status: true,
                keyResults: {
                    select: { currentValue: true, targetValue: true },
                },
            },
        });
        if (goal) {
            const krs = goal.keyResults;
            const progressPercent =
                krs.length === 0
                    ? 0
                    : Math.min(
                        100,
                        Math.round(
                            krs.reduce(
                                (sum, kr) =>
                                    sum +
                                    (kr.targetValue === 0
                                        ? 0
                                        : (kr.currentValue / kr.targetValue) * 100),
                                0
                            ) / krs.length
                        )
                    );
            linkedGoal = {
                id: goal.id,
                title: goal.title,
                category: goal.category,
                status: goal.status,
                progressPercent,
            };
        }
    }

    return {
        ...habit,
        todayIsScheduled,
        todayLog,
        linkedGoal,
    };
}

export async function getHabitStats(habitId: string) {
    const userId = await requireAuth();

    const habit = await db.habit.findFirst({
        where: { id: habitId, userId },
        select: { frequency: true, customDays: true, targetPerDay: true },
    });
    if (!habit) return null;

    const allLogs = await db.habitLog.findMany({
        where: { habitId, userId },
        select: { logDate: true, completed: true },
        orderBy: { logDate: "asc" },
    });

    const last30Logs = allLogs.filter((l) => {
        const thirtyAgo = new Date(dateString(-29) + "T00:00:00.000Z");
        return l.logDate >= thirtyAgo;
    });

    return {
        currentStreak: computeCurrentStreak(
            allLogs,
            habit.frequency,
            habit.customDays
        ),
        bestStreak: computeBestStreak(allLogs, habit.frequency, habit.customDays),
        totalCompletions: allLogs.filter((l) => l.completed).length,
        completionRate: computeCompletionRate(
            last30Logs,
            habit.frequency,
            habit.customDays
        ),
    };
}


export async function getHabitHeatmapData(habitId: string) {
    const userId = await requireAuth();

    const habit = await db.habit.findFirst({
        where: { id: habitId, userId },
        select: { frequency: true, customDays: true },
    });
    if (!habit) return null;

    const logs = await db.habitLog.findMany({
        where: {
            habitId,
            userId,
            logDate: { gte: new Date(dateString(-364) + "T00:00:00.000Z") },
        },
        select: { logDate: true, completed: true },
    });

    const logMap = new Map(
        logs.map((l) => [
            l.logDate.toISOString().split("T")[0],
            l.completed,
        ])
    );

    const days = lastNDays(365);
    return days.map((date) => {
        const scheduled = isScheduledDay(habit.frequency, habit.customDays, date);
        if (!scheduled) return { date, status: "not-scheduled" as const };
        return {
            date,
            status: logMap.get(date) === true
                ? ("completed" as const)
                : ("missed" as const),
        };
    });
}

export async function getHabitCalendarMonth(
    habitId: string,
    year: number,
    month: number 
) {
    const userId = await requireAuth();

    const habit = await db.habit.findFirst({
        where: { id: habitId, userId },
        select: { frequency: true, customDays: true },
    });
    if (!habit) return null;

    const firstDay = new Date(Date.UTC(year, month - 1, 1));
    const lastDay = new Date(Date.UTC(year, month, 0)); 

    const logs = await db.habitLog.findMany({
        where: {
            habitId,
            userId,
            logDate: { gte: firstDay, lte: lastDay },
        },
        select: { logDate: true, completed: true },
    });

    const logMap = new Map(
        logs.map((l) => [
            l.logDate.toISOString().split("T")[0],
            l.completed,
        ])
    );

    const todayStr = dateString(0);
    const days: { date: string; status: "completed" | "missed" | "not-scheduled" | "future" }[] = [];

    const cursor = new Date(firstDay);
    while (cursor <= lastDay) {
        const dateStr = cursor.toISOString().split("T")[0];
        const isFuture = dateStr > todayStr;
        const scheduled = isScheduledDay(habit.frequency, habit.customDays, cursor);

        let status: "completed" | "missed" | "not-scheduled" | "future";
        if (isFuture) {
            status = "future";
        } else if (!scheduled) {
            status = "not-scheduled";
        } else if (logMap.get(dateStr) === true) {
            status = "completed";
        } else {
            status = "missed";
        }

        days.push({ date: dateStr, status });
        cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return { year, month, days };
}


export async function getHabitLogHistory(
    habitId: string,
    filter: {
        status: "all" | "completed" | "missed";
        dateRange: "this-week" | "this-month" | "all-time";
    },
    cursor: string | null = null, 
    limit = 28
) {
    const userId = await requireAuth();

    // Verify ownership
    const habit = await db.habit.findFirst({
        where: { id: habitId, userId },
        select: { id: true },
    });
    if (!habit) return null;

    // Build date range filter
    const today = new Date(dateString(0) + "T23:59:59.999Z");
    let gteDate: Date | undefined;
    if (filter.dateRange === "this-week") {
        const dow = new Date().getUTCDay();
        gteDate = new Date(dateString(-dow) + "T00:00:00.000Z");
    } else if (filter.dateRange === "this-month") {
        const d = new Date();
        gteDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
    }

    const logs = await db.habitLog.findMany({
        where: {
            habitId,
            userId,
            ...(filter.status === "completed" && { completed: true }),
            ...(filter.status === "missed" && { completed: false }),
            ...(gteDate && { logDate: { gte: gteDate, lte: today } }),
            ...(cursor && {
                logDate: { lt: new Date(cursor + "T00:00:00.000Z") },
            }),
        },
        orderBy: { logDate: "desc" },
        take: limit + 1, 
        select: {
            id: true,
            logDate: true,
            completed: true,
            count: true,
            note: true,
            loggedAt: true,
        },
    });

    const hasMore = logs.length > limit;
    const items = hasMore ? logs.slice(0, limit) : logs;
    const nextCursor = hasMore
        ? items[items.length - 1].logDate.toISOString().split("T")[0]
        : null;

    return {
        logs: items.map((l) => ({
            ...l,
            logDate: l.logDate.toISOString().split("T")[0],
        })),
        nextCursor,
        hasMore,
    };
}


export async function getGoalsForHabitLink() {
    const userId = await requireAuth();

    const goals = await db.goal.findMany({
        where: { userId, status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, category: true },
    });

    return goals;
}

export async function createHabit(
    formData: z.infer<typeof habitFormSchema>
): Promise<ActionResult<{ id: string }>> {
    const userId = await requireAuth();

    const parsed = habitFormSchema.safeParse(formData);
    if (!parsed.success) {
        return { success: false, error: parsed.error?.message };
    }
    const data = parsed.data;

    if (
        data.frequency === HabitFrequency.CUSTOM &&
        data.customDays.length === 0
    ) {
        return {
            success: false,
            error: "Select at least one day for a custom schedule",
        };
    }

    if (!data.reminderEnabled) data.reminderTime = null;

    const user = await db.user.findUnique({
        where: { id: userId },
        select: { plan: true },
    });
    if (user?.plan === Plan.FREE) {
        const activeCount = await db.habit.count({
            where: { userId, status: HabitStatus.ACTIVE },
        });
        if (activeCount >= FREE_PLAN_HABIT_LIMIT) {
            return { success: false, error: "PLAN_LIMIT_REACHED" };
        }
    }

    const maxSortOrder = await db.habit.aggregate({
        where: { userId, status: HabitStatus.ACTIVE },
        _max: { sortOrder: true },
    });
    const nextSortOrder = (maxSortOrder._max.sortOrder ?? -1) + 1;

    const habit = await db.habit.create({
        data: {
            userId,
            name: data.name,
            emoji: data.emoji,
            color: data.color,
            category: data.category,
            frequency: data.frequency,
            customDays: data.frequency === HabitFrequency.CUSTOM ? data.customDays : [],
            targetPerDay: data.targetPerDay,
            reminderEnabled: data.reminderEnabled,
            reminderTime: data.reminderTime,
            notes: data.notes,
            goalId: data.goalId,
            status: HabitStatus.ACTIVE,
            sortOrder: nextSortOrder,
        },
        select: { id: true },
    });

    revalidatePath("/habits");
    return { success: true, data: { id: habit.id } };
}

export async function updateHabit(
    habitId: string,
    formData: Partial<z.infer<typeof habitFormSchema>>
): Promise<ActionResult<{ id: string }>> {
    const userId = await requireAuth();

    const existing = await db.habit.findFirst({
        where: { id: habitId, userId },
        select: { id: true, frequency: true },
    });
    if (!existing) {
        return { success: false, error: "Habit not found" };
    }

    const parsed = habitFormSchema.partial().safeParse(formData);
    if (!parsed.success) {
        return { success: false, error: parsed.error.message };
    }
    const data = parsed.data;

    const newFrequency = data.frequency ?? existing.frequency;
    if (
        newFrequency === HabitFrequency.CUSTOM &&
        data.customDays !== undefined &&
        data.customDays.length === 0
    ) {
        return {
            success: false,
            error: "Select at least one day for a custom schedule",
        };
    }

    if (data.reminderEnabled === false) data.reminderTime = null;

    await db.habit.update({
        where: { id: habitId },
        data: {
            ...(data.name !== undefined && { name: data.name }),
            ...(data.emoji !== undefined && { emoji: data.emoji }),
            ...(data.color !== undefined && { color: data.color }),
            ...(data.category !== undefined && { category: data.category }),
            ...(data.frequency !== undefined && { frequency: data.frequency }),
            ...(data.customDays !== undefined && {
                customDays:
                    (data.frequency ?? existing.frequency) === HabitFrequency.CUSTOM
                        ? data.customDays
                        : [],
            }),
            ...(data.targetPerDay !== undefined && {
                targetPerDay: data.targetPerDay,
            }),
            ...(data.reminderEnabled !== undefined && {
                reminderEnabled: data.reminderEnabled,
            }),
            ...(data.reminderTime !== undefined && {
                reminderTime: data.reminderTime,
            }),
            ...(data.notes !== undefined && { notes: data.notes }),
            ...(data.goalId !== undefined && { goalId: data.goalId }),
        },
    });

    revalidatePath("/habits");
    revalidatePath(`/habits/${habitId}`);
    return { success: true, data: { id: habitId } };
}


export async function archiveHabit(
    habitId: string
): Promise<ActionResult> {
    const userId = await requireAuth();

    const habit = await db.habit.findFirst({
        where: { id: habitId, userId },
        select: { id: true, status: true },
    });
    if (!habit) return { success: false, error: "Habit not found" };
    if (habit.status === HabitStatus.ARCHIVED) {
        return { success: false, error: "Habit is already archived" };
    }

    await db.habit.update({
        where: { id: habitId },
        data: { status: HabitStatus.ARCHIVED },
    });

    revalidatePath("/habits");
    return { success: true };
}


export async function restoreHabit(
    habitId: string
): Promise<ActionResult> {
    const userId = await requireAuth();

    const habit = await db.habit.findFirst({
        where: { id: habitId, userId },
        select: { id: true, status: true },
    });
    if (!habit) return { success: false, error: "Habit not found" };
    if (habit.status === HabitStatus.ACTIVE) {
        return { success: false, error: "Habit is already active" };
    }

    const user = await db.user.findUnique({
        where: { id: userId },
        select: { plan: true },
    });
    if (user?.plan === Plan.FREE) {
        const activeCount = await db.habit.count({
            where: { userId, status: HabitStatus.ACTIVE },
        });
        if (activeCount >= FREE_PLAN_HABIT_LIMIT) {
            return { success: false, error: "PLAN_LIMIT_REACHED" };
        }
    }

    await db.habit.update({
        where: { id: habitId },
        data: { status: HabitStatus.ACTIVE },
    });

    revalidatePath("/habits");
    return { success: true };
}


export async function deleteHabit(
    habitId: string
): Promise<ActionResult> {
    const userId = await requireAuth();

    const habit = await db.habit.findFirst({
        where: { id: habitId, userId },
        select: { id: true },
    });
    if (!habit) return { success: false, error: "Habit not found" };

    await db.habit.delete({ where: { id: habitId } });

    revalidatePath("/habits");
    return { success: true };
}


export async function duplicateHabit(
    habitId: string,
    newName: string
): Promise<ActionResult<{ id: string }>> {
    const userId = await requireAuth();

    const trimmed = newName.trim();
    if (!trimmed || trimmed.length > 60) {
        return { success: false, error: "Habit name must be 1–60 characters" };
    }

    const source = await db.habit.findFirst({
        where: { id: habitId, userId },
    });
    if (!source) return { success: false, error: "Habit not found" };

    const user = await db.user.findUnique({
        where: { id: userId },
        select: { plan: true },
    });
    if (user?.plan === Plan.FREE) {
        const activeCount = await db.habit.count({
            where: { userId, status: HabitStatus.ACTIVE },
        });
        if (activeCount >= FREE_PLAN_HABIT_LIMIT) {
            return { success: false, error: "PLAN_LIMIT_REACHED" };
        }
    }

    const maxSortOrder = await db.habit.aggregate({
        where: { userId, status: HabitStatus.ACTIVE },
        _max: { sortOrder: true },
    });

    const habit = await db.habit.create({
        data: {
            userId,
            name: trimmed,
            emoji: source.emoji,
            color: source.color,
            category: source.category,
            frequency: source.frequency,
            customDays: source.customDays,
            targetPerDay: source.targetPerDay,
            reminderEnabled: false,  
            reminderTime: null,
            notes: source.notes,
            goalId: null,            
            status: HabitStatus.ACTIVE,
            sortOrder: (maxSortOrder._max.sortOrder ?? -1) + 1,
        },
        select: { id: true },
    });

    revalidatePath("/habits");
    return { success: true, data: { id: habit.id } };
}


export async function reorderHabits(
    orderedIds: string[]
): Promise<ActionResult> {
    const userId = await requireAuth();

    if (orderedIds.length === 0) {
        return { success: false, error: "No habits provided" };
    }

    const count = await db.habit.count({
        where: { id: { in: orderedIds }, userId },
    });
    if (count !== orderedIds.length) {
        return { success: false, error: "Invalid habit IDs" };
    }

    await db.$transaction(
        orderedIds.map((id, index) =>
            db.habit.update({
                where: { id },
                data: { sortOrder: index },
            })
        )
    );

    revalidatePath("/habits");
    return { success: true };
}


export async function logHabitToday(
    habitId: string
): Promise<ActionResult<{ id: string; completed: boolean; count: number }>> {
    const userId = await requireAuth();
    const todayStr = dateString(0);
    const todayDate = new Date(todayStr + "T00:00:00.000Z");

    const habit = await db.habit.findFirst({
        where: { id: habitId, userId },
        select: {
            id: true,
            frequency: true,
            customDays: true,
            targetPerDay: true,
        },
    });
    if (!habit) return { success: false, error: "Habit not found" };

    if (!isScheduledDay(habit.frequency, habit.customDays, todayStr)) {
        return {
            success: false,
            error: "This habit is not scheduled for today",
        };
    }

    const existing = await db.habitLog.findUnique({
        where: { habitId_logDate: { habitId, logDate: todayDate } },
        select: { id: true, count: true },
    });

    let log;

    if (!existing) {
        log = await db.habitLog.create({
            data: {
                habitId,
                userId,
                logDate: todayDate,
                completed: habit.targetPerDay <= 1,
                count: 1,
            },
            select: { id: true, completed: true, count: true },
        });
    } else {
        if (existing.count >= habit.targetPerDay) {
            const current = await db.habitLog.findUnique({
                where: { id: existing.id },
                select: { id: true, completed: true, count: true },
            });
            return {
                success: true,
                data: { id: current!.id, completed: current!.completed, count: current!.count },
            };
        }

        const newCount = existing.count + 1;
        log = await db.habitLog.update({
            where: { id: existing.id },
            data: {
                count: newCount,
                completed: newCount >= habit.targetPerDay,
            },
            select: { id: true, completed: true, count: true },
        });
    }

    revalidatePath("/habits");
    revalidatePath(`/habits/${habitId}`);
    return { success: true, data: log };
}

export async function undoTodayLog(
    habitId: string
): Promise<ActionResult<{ deleted: boolean }>> {
    const userId = await requireAuth();
    const todayDate = new Date(dateString(0) + "T00:00:00.000Z");

    const log = await db.habitLog.findUnique({
        where: { habitId_logDate: { habitId, logDate: todayDate } },
        select: { id: true, count: true, userId: true },
    });

    if (!log) {
        return { success: false, error: "No log found for today" };
    }
    if (log.userId !== userId) {
        return { success: false, error: "Unauthorized" };
    }

    if (log.count <= 1) {
        await db.habitLog.delete({ where: { id: log.id } });
        revalidatePath("/habits");
        revalidatePath(`/habits/${habitId}`);
        return { success: true, data: { deleted: true } };
    } else {
        const newCount = log.count - 1;
        const habit = await db.habit.findFirst({
            where: { id: habitId },
            select: { targetPerDay: true },
        });
        await db.habitLog.update({
            where: { id: log.id },
            data: {
                count: newCount,
                completed: newCount >= (habit?.targetPerDay ?? 1),
            },
        });
        revalidatePath("/habits");
        revalidatePath(`/habits/${habitId}`);
        return { success: true, data: { deleted: false } };
    }
}


export async function updateTodayNote(
    habitId: string,
    note: string
): Promise<ActionResult<{ id: string; note: string | null }>> {
    const userId = await requireAuth();
    const todayDate = new Date(dateString(0) + "T00:00:00.000Z");

    const log = await db.habitLog.findUnique({
        where: { habitId_logDate: { habitId, logDate: todayDate } },
        select: { id: true, userId: true },
    });

    if (!log) {
        return {
            success: false,
            error: "Log today first before adding a note",
        };
    }
    if (log.userId !== userId) {
        return { success: false, error: "Unauthorized" };
    }

    const trimmedNote = note.trim() || null;

    const updated = await db.habitLog.update({
        where: { id: log.id },
        data: { note: trimmedNote },
        select: { id: true, note: true },
    });

    revalidatePath(`/habits/${habitId}`);
    return { success: true, data: updated };
}


export async function updateHabitLog(
    logId: string,
    fields: {
        completed: boolean;
        count?: number;
        note?: string | null;
    }
): Promise<
    ActionResult<{
        id: string;
        logDate: string;
        completed: boolean;
        count: number;
        note: string | null;
    }>
> {
    const userId = await requireAuth();

    const log = await db.habitLog.findFirst({
        where: { id: logId, userId },
        select: {
            id: true,
            habitId: true,
            logDate: true,
            userId: true,
            habit: { select: { targetPerDay: true } },
        },
    });
    if (!log) return { success: false, error: "Log not found" };

    // Cannot edit future logs
    const today = dateString(0);
    if (log.logDate.toISOString().split("T")[0] > today) {
        return { success: false, error: "Cannot edit future log entries" };
    }

    // Validate count
    const targetPerDay = log.habit.targetPerDay;
    const newCount = fields.count ?? 1;
    if (newCount < 1 || newCount > targetPerDay) {
        return {
            success: false,
            error: `Count must be between 1 and ${targetPerDay}`,
        };
    }

    const updated = await db.habitLog.update({
        where: { id: logId },
        data: {
            completed: fields.completed,
            count: newCount,
            ...(fields.note !== undefined && {
                note: fields.note?.trim() || null,
            }),
        },
        select: {
            id: true,
            logDate: true,
            completed: true,
            count: true,
            note: true,
        },
    });

    revalidatePath(`/habits/${log.habitId}`);
    return {
        success: true,
        data: {
            ...updated,
            logDate: updated.logDate.toISOString().split("T")[0],
        },
    };
}

export async function deleteHabitLog(
    logId: string
): Promise<ActionResult<{ deletedLogId: string }>> {
    const userId = await requireAuth();

    const log = await db.habitLog.findFirst({
        where: { id: logId, userId },
        select: { id: true, habitId: true, logDate: true },
    });
    if (!log) return { success: false, error: "Log not found" };

    const today = dateString(0);
    if (log.logDate.toISOString().split("T")[0] === today) {
        return {
            success: false,
            error: "Use the Undo button to remove today's log",
        };
    }

    await db.habitLog.delete({ where: { id: logId } });

    revalidatePath(`/habits/${log.habitId}`);
    return { success: true, data: { deletedLogId: logId } };
}