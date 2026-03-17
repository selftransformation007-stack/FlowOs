/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'TEAM');

-- CreateEnum
CREATE TYPE "ThemeName" AS ENUM ('VOID', 'CARBON', 'AURA', 'INK', 'FROST', 'STUDIO', 'MINERAL', 'BLOOM', 'SAGE', 'ZINC');

-- CreateEnum
CREATE TYPE "FontSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "OnboardingIntent" AS ENUM ('HABITS', 'TASKS', 'FOCUS', 'TIME', 'GOALS', 'SCREEN_TIME');

-- CreateEnum
CREATE TYPE "HabitFrequency" AS ENUM ('DAILY', 'WEEKDAYS', 'CUSTOM');

-- CreateEnum
CREATE TYPE "HabitCategory" AS ENUM ('HEALTH', 'FITNESS', 'LEARNING', 'MINDFULNESS', 'SOCIAL', 'CREATIVE', 'WORK', 'FINANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "HabitStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('P1', 'P2', 'P3', 'NONE');

-- CreateEnum
CREATE TYPE "TaskCommentType" AS ENUM ('COMMENT', 'SYSTEM_EVENT');

-- CreateEnum
CREATE TYPE "PlannerBlockType" AS ENUM ('TASK', 'HABIT', 'MEETING', 'BREAK', 'CUSTOM');

-- CreateEnum
CREATE TYPE "GoalCategory" AS ENUM ('HEALTH', 'CAREER', 'LEARNING', 'MINDFULNESS', 'FINANCE', 'PERSONAL');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "FocusSessionType" AS ENUM ('FOCUS', 'SHORT_BREAK', 'LONG_BREAK');

-- CreateEnum
CREATE TYPE "FocusSessionStatus" AS ENUM ('RUNNING', 'PAUSED', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "DistractionCategory" AS ENUM ('PHONE', 'WEB', 'CHAT', 'THOUGHT', 'PERSON', 'OTHER');

-- CreateEnum
CREATE TYPE "AppCategory" AS ENUM ('PRODUCTIVE', 'NEUTRAL', 'DISTRACTING', 'SOCIAL', 'ENTERTAINMENT');

-- CreateEnum
CREATE TYPE "ScreenTimeSource" AS ENUM ('MANUAL', 'EXTENSION');

-- CreateEnum
CREATE TYPE "TimeEntrySource" AS ENUM ('MANUAL', 'FOCUS_SESSION');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('HABIT_REMINDER', 'TASK_DUE', 'GOAL_DEADLINE', 'FOCUS_END', 'SCREEN_LIMIT_APPROACHING', 'SCREEN_LIMIT_REACHED', 'STREAK_MILESTONE', 'WEEKLY_REPORT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "IntegrationProvider" AS ENUM ('GOOGLE_CALENDAR', 'NOTION', 'TODOIST');

-- CreateEnum
CREATE TYPE "IntegrationStatus" AS ENUM ('CONNECTED', 'DISCONNECTED', 'ERROR');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "image" TEXT,
    "bio" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "onboarding_done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_settings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "theme" "ThemeName" NOT NULL DEFAULT 'FROST',
    "font_size" "FontSize" NOT NULL DEFAULT 'MEDIUM',
    "focus_duration" INTEGER NOT NULL DEFAULT 25,
    "short_break_duration" INTEGER NOT NULL DEFAULT 5,
    "long_break_duration" INTEGER NOT NULL DEFAULT 15,
    "long_break_after" INTEGER NOT NULL DEFAULT 4,
    "auto_start_breaks" BOOLEAN NOT NULL DEFAULT false,
    "auto_start_focus" BOOLEAN NOT NULL DEFAULT false,
    "focus_sound" TEXT NOT NULL DEFAULT 'ding',
    "focus_volume" INTEGER NOT NULL DEFAULT 70,
    "notify_habit_reminders" BOOLEAN NOT NULL DEFAULT true,
    "habit_reminder_time" TEXT,
    "notify_task_due" BOOLEAN NOT NULL DEFAULT true,
    "task_due_hours_before" INTEGER NOT NULL DEFAULT 1,
    "notify_weekly_report" BOOLEAN NOT NULL DEFAULT true,
    "weekly_report_day" INTEGER NOT NULL DEFAULT 1,
    "notify_focus_end" BOOLEAN NOT NULL DEFAULT true,
    "notify_screen_limit_approaching" BOOLEAN NOT NULL DEFAULT true,
    "notify_screen_limit_reached" BOOLEAN NOT NULL DEFAULT true,
    "notify_goal_deadline" BOOLEAN NOT NULL DEFAULT true,
    "goal_deadline_days_before" INTEGER NOT NULL DEFAULT 3,
    "notify_streak_milestone" BOOLEAN NOT NULL DEFAULT true,
    "screen_time_daily_goal_minutes" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_onboarding_intents" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "intent" "OnboardingIntent" NOT NULL,

    CONSTRAINT "user_onboarding_intents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habits" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '✦',
    "color" TEXT NOT NULL DEFAULT '#2563EB',
    "category" "HabitCategory" NOT NULL DEFAULT 'OTHER',
    "frequency" "HabitFrequency" NOT NULL DEFAULT 'DAILY',
    "custom_days" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "target_per_day" INTEGER NOT NULL DEFAULT 1,
    "reminder_enabled" BOOLEAN NOT NULL DEFAULT false,
    "reminder_time" TEXT,
    "notes" TEXT,
    "goal_id" TEXT,
    "status" "HabitStatus" NOT NULL DEFAULT 'ACTIVE',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit_logs" (
    "id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "log_date" DATE NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT true,
    "count" INTEGER NOT NULL DEFAULT 1,
    "note" TEXT,
    "logged_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "habit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '📁',
    "color" TEXT NOT NULL DEFAULT '#2563EB',
    "description" TEXT,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "labels" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#2563EB',

    CONSTRAINT "labels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_id" TEXT,
    "goal_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "priority" "TaskPriority" NOT NULL DEFAULT 'NONE',
    "due_date" DATE,
    "estimate_minutes" INTEGER,
    "completed_at" TIMESTAMP(3),
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "archived_at" TIMESTAMP(3),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_labels" (
    "task_id" TEXT NOT NULL,
    "label_id" TEXT NOT NULL,

    CONSTRAINT "task_labels_pkey" PRIMARY KEY ("task_id","label_id")
);

-- CreateTable
CREATE TABLE "subtasks" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "done_at" TIMESTAMP(3),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subtasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_comments" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "TaskCommentType" NOT NULL DEFAULT 'COMMENT',
    "body" TEXT,
    "event_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planner_blocks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "task_id" TEXT,
    "habit_id" TEXT,
    "title" TEXT NOT NULL,
    "type" "PlannerBlockType" NOT NULL DEFAULT 'TASK',
    "date" DATE NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#2563EB',
    "notes" TEXT,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planner_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goals" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "GoalCategory" NOT NULL DEFAULT 'PERSONAL',
    "status" "GoalStatus" NOT NULL DEFAULT 'ACTIVE',
    "target_date" DATE NOT NULL,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_results" (
    "id" TEXT NOT NULL,
    "goal_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "current_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "target_value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'count',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "key_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_result_progress" (
    "id" TEXT NOT NULL,
    "key_result_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "key_result_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal_progress_notes" (
    "id" TEXT NOT NULL,
    "goal_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "kr_snapshot" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goal_progress_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "focus_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "task_id" TEXT,
    "type" "FocusSessionType" NOT NULL DEFAULT 'FOCUS',
    "status" "FocusSessionStatus" NOT NULL DEFAULT 'RUNNING',
    "planned_duration_secs" INTEGER NOT NULL,
    "actual_duration_secs" INTEGER NOT NULL DEFAULT 0,
    "started_at" TIMESTAMP(3) NOT NULL,
    "paused_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "total_paused_secs" INTEGER NOT NULL DEFAULT 0,
    "cycle_position" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "focus_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distraction_logs" (
    "id" TEXT NOT NULL,
    "focus_session_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "category" "DistractionCategory" NOT NULL DEFAULT 'OTHER',
    "logged_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "distraction_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_entries" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_id" TEXT,
    "task_id" TEXT,
    "duration_minutes" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "log_date" DATE NOT NULL,
    "notes" TEXT,
    "source" "TimeEntrySource" NOT NULL DEFAULT 'MANUAL',
    "focus_session_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screen_time_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "log_date" DATE NOT NULL,
    "appName" TEXT NOT NULL,
    "app_domain" TEXT,
    "category" "AppCategory" NOT NULL DEFAULT 'NEUTRAL',
    "duration_minutes" INTEGER NOT NULL,
    "hourly_breakdown" JSONB,
    "source" "ScreenTimeSource" NOT NULL DEFAULT 'MANUAL',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "screen_time_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screen_time_limits" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "app_name" TEXT,
    "category" "AppCategory",
    "limit_minutes" INTEGER NOT NULL,
    "alert_at_percent" INTEGER NOT NULL DEFAULT 80,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "screen_time_limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productivity_scores" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "score_date" DATE NOT NULL,
    "total_score" INTEGER NOT NULL,
    "habit_score" INTEGER NOT NULL,
    "focus_score" INTEGER NOT NULL,
    "task_score" INTEGER NOT NULL,
    "screen_time_score" INTEGER NOT NULL,
    "habits_completed" INTEGER NOT NULL,
    "habits_total_due" INTEGER NOT NULL,
    "focus_minutes" INTEGER NOT NULL,
    "tasks_completed" INTEGER NOT NULL,
    "screen_time_minutes" INTEGER NOT NULL,
    "computed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productivity_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "action_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider" "IntegrationProvider" NOT NULL,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'DISCONNECTED',
    "access_token" TEXT,
    "refresh_token" TEXT,
    "token_expiry" TIMESTAMP(3),
    "scope" TEXT,
    "api_key" TEXT,
    "external_id" TEXT,
    "external_name" TEXT,
    "external_email" TEXT,
    "last_synced_at" TIMESTAMP(3),
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "password_reset_tokens_email_idx" ON "password_reset_tokens"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_user_id_key" ON "user_settings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_onboarding_intents_user_id_intent_key" ON "user_onboarding_intents"("user_id", "intent");

-- CreateIndex
CREATE INDEX "habits_user_id_idx" ON "habits"("user_id");

-- CreateIndex
CREATE INDEX "habits_user_id_status_idx" ON "habits"("user_id", "status");

-- CreateIndex
CREATE INDEX "habit_logs_habit_id_log_date_idx" ON "habit_logs"("habit_id", "log_date");

-- CreateIndex
CREATE INDEX "habit_logs_user_id_log_date_idx" ON "habit_logs"("user_id", "log_date");

-- CreateIndex
CREATE UNIQUE INDEX "habit_logs_habit_id_log_date_key" ON "habit_logs"("habit_id", "log_date");

-- CreateIndex
CREATE INDEX "projects_user_id_idx" ON "projects"("user_id");

-- CreateIndex
CREATE INDEX "projects_user_id_is_archived_idx" ON "projects"("user_id", "is_archived");

-- CreateIndex
CREATE INDEX "labels_user_id_idx" ON "labels"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "labels_user_id_name_key" ON "labels"("user_id", "name");

-- CreateIndex
CREATE INDEX "tasks_user_id_idx" ON "tasks"("user_id");

-- CreateIndex
CREATE INDEX "tasks_user_id_status_idx" ON "tasks"("user_id", "status");

-- CreateIndex
CREATE INDEX "tasks_user_id_project_id_idx" ON "tasks"("user_id", "project_id");

-- CreateIndex
CREATE INDEX "tasks_user_id_due_date_idx" ON "tasks"("user_id", "due_date");

-- CreateIndex
CREATE INDEX "tasks_user_id_priority_idx" ON "tasks"("user_id", "priority");

-- CreateIndex
CREATE INDEX "tasks_user_id_is_archived_idx" ON "tasks"("user_id", "is_archived");

-- CreateIndex
CREATE INDEX "subtasks_task_id_idx" ON "subtasks"("task_id");

-- CreateIndex
CREATE INDEX "task_comments_task_id_created_at_idx" ON "task_comments"("task_id", "created_at");

-- CreateIndex
CREATE INDEX "planner_blocks_user_id_date_idx" ON "planner_blocks"("user_id", "date");

-- CreateIndex
CREATE INDEX "goals_user_id_idx" ON "goals"("user_id");

-- CreateIndex
CREATE INDEX "goals_user_id_status_idx" ON "goals"("user_id", "status");

-- CreateIndex
CREATE INDEX "key_results_goal_id_idx" ON "key_results"("goal_id");

-- CreateIndex
CREATE INDEX "key_result_progress_key_result_id_recorded_at_idx" ON "key_result_progress"("key_result_id", "recorded_at");

-- CreateIndex
CREATE INDEX "goal_progress_notes_goal_id_created_at_idx" ON "goal_progress_notes"("goal_id", "created_at");

-- CreateIndex
CREATE INDEX "focus_sessions_user_id_started_at_idx" ON "focus_sessions"("user_id", "started_at");

-- CreateIndex
CREATE INDEX "focus_sessions_user_id_status_idx" ON "focus_sessions"("user_id", "status");

-- CreateIndex
CREATE INDEX "distraction_logs_focus_session_id_idx" ON "distraction_logs"("focus_session_id");

-- CreateIndex
CREATE INDEX "time_entries_user_id_log_date_idx" ON "time_entries"("user_id", "log_date");

-- CreateIndex
CREATE INDEX "time_entries_user_id_project_id_idx" ON "time_entries"("user_id", "project_id");

-- CreateIndex
CREATE INDEX "screen_time_logs_user_id_log_date_idx" ON "screen_time_logs"("user_id", "log_date");

-- CreateIndex
CREATE UNIQUE INDEX "screen_time_logs_user_id_log_date_appName_key" ON "screen_time_logs"("user_id", "log_date", "appName");

-- CreateIndex
CREATE INDEX "screen_time_limits_user_id_idx" ON "screen_time_limits"("user_id");

-- CreateIndex
CREATE INDEX "productivity_scores_user_id_score_date_idx" ON "productivity_scores"("user_id", "score_date");

-- CreateIndex
CREATE UNIQUE INDEX "productivity_scores_user_id_score_date_key" ON "productivity_scores"("user_id", "score_date");

-- CreateIndex
CREATE INDEX "notifications_user_id_is_read_idx" ON "notifications"("user_id", "is_read");

-- CreateIndex
CREATE INDEX "notifications_user_id_created_at_idx" ON "notifications"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "integrations_user_id_provider_key" ON "integrations"("user_id", "provider");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_onboarding_intents" ADD CONSTRAINT "user_onboarding_intents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_logs" ADD CONSTRAINT "habit_logs_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_logs" ADD CONSTRAINT "habit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "labels" ADD CONSTRAINT "labels_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_labels" ADD CONSTRAINT "task_labels_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_labels" ADD CONSTRAINT "task_labels_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_comments" ADD CONSTRAINT "task_comments_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_comments" ADD CONSTRAINT "task_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planner_blocks" ADD CONSTRAINT "planner_blocks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planner_blocks" ADD CONSTRAINT "planner_blocks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_results" ADD CONSTRAINT "key_results_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_results" ADD CONSTRAINT "key_results_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_result_progress" ADD CONSTRAINT "key_result_progress_key_result_id_fkey" FOREIGN KEY ("key_result_id") REFERENCES "key_results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_progress_notes" ADD CONSTRAINT "goal_progress_notes_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_progress_notes" ADD CONSTRAINT "goal_progress_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "focus_sessions" ADD CONSTRAINT "focus_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "focus_sessions" ADD CONSTRAINT "focus_sessions_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distraction_logs" ADD CONSTRAINT "distraction_logs_focus_session_id_fkey" FOREIGN KEY ("focus_session_id") REFERENCES "focus_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "distraction_logs" ADD CONSTRAINT "distraction_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entries" ADD CONSTRAINT "time_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entries" ADD CONSTRAINT "time_entries_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entries" ADD CONSTRAINT "time_entries_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screen_time_logs" ADD CONSTRAINT "screen_time_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screen_time_limits" ADD CONSTRAINT "screen_time_limits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productivity_scores" ADD CONSTRAINT "productivity_scores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
