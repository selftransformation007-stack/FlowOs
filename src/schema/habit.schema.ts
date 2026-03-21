import { HabitCategory, HabitFrequency } from "@prisma/client";
import z from "zod";

export const habitFormSchema = z.object({
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