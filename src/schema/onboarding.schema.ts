import { GoalCategory, HabitFrequency, OnboardingIntent } from "@prisma/client";
import z from "zod";

export const saveIntentsSchema = z.object({
    intents: z.array(z.nativeEnum(OnboardingIntent))
        .min(1, "Select at least one option.")
})

export const createFirstHabitSchema = z.object({
    name: z
        .string()
        .min(1, "Habit name is required")
        .max(60, "Habit name too long")
        .trim(),
    frequency: z.nativeEnum(HabitFrequency).default(HabitFrequency.DAILY),
    reminderEnabled: z.boolean().default(false),
    reminderTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:MM format")
        .nullable()
        .optional(),
});

export type CreateFirstHabitInput = z.infer<typeof createFirstHabitSchema>;

export const createFirstGoalSchema = z.object({
    title: z
        .string()
        .min(1, "Goal title is required")
        .max(120, "Goal title too long")
        .trim(),
    category: z.nativeEnum(GoalCategory).default(GoalCategory.PERSONAL),
    targetDate: z.string().min(1, "Target date is required"),
})

export type CreateFirstGoalInput = z.infer<typeof createFirstGoalSchema>;
