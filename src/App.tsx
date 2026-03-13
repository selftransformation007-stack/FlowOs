import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Layouts
import { AuthLayout } from './app/(auth)/layout';
import { AppLayout } from './app/(app)/layout';

// Auth Pages
import { LoginPage } from './app/(auth)/login/page';
import { RegisterPage } from './app/(auth)/register/page';

// App Pages
import { DashboardPage } from './app/(app)/dashboard/page';
import { HabitsPage } from './app/(app)/habits/page';
import { HabitDetailPage } from './app/(app)/habits/[habitId]/page';
import { TasksPage } from './app/(app)/tasks/page';
import { TaskDetailPage } from './app/(app)/tasks/[taskId]/page';
import { ProjectDetailPage } from './app/(app)/tasks/projects/[projectId]/page';
import { PlannerPage } from './app/(app)/planner/page';
import { GoalsPage } from './app/(app)/goals/page';
import { GoalDetailPage } from './app/(app)/goals/[goalId]/page';
import { FocusPage } from './app/(app)/focus/page';
import { FocusHistoryPage } from './app/(app)/focus/history/page';
import { TimePage } from './app/(app)/time/page';
import { ScreenTimePage } from './app/(app)/screen-time/page';
import { AnalyticsPage } from './app/(app)/analytics/page';
import { AnalyticsReportPage } from './app/(app)/analytics/reports/[reportId]/page';
import { SettingsPage } from './app/(app)/settings/page';
import { OnboardingPage } from './app/onboarding/page';

// Placeholder for other pages to avoid 404s during initial build
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
    <div className="size-16 rounded-full bg-surface-2 flex items-center justify-center border border-white/[0.07]">
      <LayoutDashboard className="size-8 text-text-3" />
    </div>
    <div className="space-y-1">
      <h2 className="font-display text-2xl font-bold text-text-1">{title}</h2>
      <p className="text-text-3">This module is currently under construction.</p>
    </div>
  </div>
);

import { LayoutDashboard } from 'lucide-react';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster 
        theme="dark" 
        position="top-right"
        toastOptions={{
          style: {
            background: 'oklch(17% 0.032 260)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: 'oklch(95% 0.012 260)',
            fontFamily: 'DM Sans, sans-serif',
          },
        }}
      />
      <Routes>
        {/* Onboarding */}
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<PlaceholderPage title="Forgot Password" />} />
          <Route path="/reset-password" element={<PlaceholderPage title="Reset Password" />} />
        </Route>

        {/* App Routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/habits/:habitId" element={<HabitDetailPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
          <Route path="/tasks/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/goals/:goalId" element={<GoalDetailPage />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/focus/history" element={<FocusHistoryPage />} />
          <Route path="/time" element={<TimePage />} />
          <Route path="/screen-time" element={<ScreenTimePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/analytics/reports/:reportId" element={<AnalyticsReportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
