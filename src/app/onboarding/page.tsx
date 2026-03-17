"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Flame,
  Target,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Logo } from "@/src/components/ui/Logo";
import { getSessionUser } from "@/actions/auth.actions";

const steps = [
  {
    id: "welcome",
    title: "Welcome to FlowOS",
    subtitle: "Your unified workspace for habits, tasks, and focus.",
    content: (
      <div className="space-y-6 py-8">
        <div className="relative size-32 mx-auto">
          <div className="size-full rounded-full bg-brand/10 border-2 border-brand/20 flex items-center justify-center animate-pulse">
            <Sparkles className="size-12 text-brand" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
          {[
            { icon: Flame, text: "Build lasting habits with streaks" },
            { icon: Target, text: "Set and achieve strategic goals" },
            { icon: CheckCircle2, text: "Master your daily tasks" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-14 bg-surface-2 border border-white/[0.07]"
            >
              <item.icon className="size-5 text-brand" />
              <span className="text-[14px] text-text-2">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "intents",
    title: "What brings you to FlowOS?",
    subtitle: "Select all that apply. We'll personalize your experience.",
    content: (
      <div className="grid grid-cols-2 gap-4 py-8 max-w-2xl mx-auto">
        {[
          {
            id: "habits",
            emoji: "🔥",
            title: "Build better habits",
            desc: "Daily tracking & streaks",
          },
          {
            id: "tasks",
            emoji: "✅",
            title: "Manage tasks & projects",
            desc: "Projects, labels, kanban",
          },
          {
            id: "focus",
            emoji: "🎯",
            title: "Deep work & focus",
            desc: "Pomodoro timer sessions",
          },
          {
            id: "time",
            emoji: "⏱",
            title: "Track my time",
            desc: "Log hours per project",
          },
          {
            id: "goals",
            emoji: "🏆",
            title: "Reach my goals",
            desc: "OKRs with key results",
          },
          {
            id: "screen",
            emoji: "📱",
            title: "Monitor screen time",
            desc: "Track & limit app usage",
          },
        ].map((intent) => (
          <button
            key={intent.id}
            className="flowos-card p-5 text-left transition-all duration-200 hover:border-brand/40 hover:bg-brand/5 relative group"
          >
            <span className="text-[28px] mb-3 block">{intent.emoji}</span>
            <p className="font-display text-[15px] font-bold text-text-1">
              {intent.title}
            </p>
            <p className="text-[12px] text-text-3 mt-1 leading-relaxed">
              {intent.desc}
            </p>
            <div className="absolute top-4 right-4 size-5 rounded-full border border-white/10 group-hover:border-brand/40 transition-colors" />
          </button>
        ))}
      </div>
    ),
  },
  {
    id: "habit",
    title: "Create your first habit",
    subtitle: "Small daily actions compound into big results.",
    content: (
      <div className="max-w-md mx-auto py-12 space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-text-3 uppercase tracking-wider ml-1">
              Habit Name
            </label>
            <input
              type="text"
              placeholder="e.g. Morning Meditation"
              className="flowos-shadcn-input h-14 text-lg font-display font-bold"
              autoFocus
            />
          </div>
          <div className="space-y-4">
            <label className="text-[12px] font-medium text-text-3 uppercase tracking-wider ml-1">
              Frequency
            </label>
            <div className="flex p-1 bg-surface-2 rounded-14 border border-white/[0.07]">
              <button className="flex-1 py-2.5 text-sm font-bold text-text-1 bg-surface-3 rounded-10 shadow-sm">
                Daily
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium text-text-3 hover:text-text-2">
                Weekdays
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium text-text-3 hover:text-text-2">
                Custom
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "Morning run",
            "Meditate",
            "Read 20 pages",
            "Drink water",
            "Journaling",
          ].map((chip) => (
            <button
              key={chip}
              className="px-4 py-2 rounded-full border border-white/[0.07] bg-surface-2 text-[13px] text-text-3 hover:text-text-1 hover:border-white/[0.14] transition-all"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "complete",
    title: "You're all set!",
    subtitle: "FlowOS is ready. Start building your productivity system.",
    content: (
      <div className="flex flex-col items-center text-center gap-8 py-12">
        <div className="relative size-32">
          <div className="size-full rounded-full bg-success/10 border-2 border-success/20 flex items-center justify-center animate-bounce">
            <Sparkles className="size-12 text-success" />
          </div>
        </div>
        <div className="space-y-3 max-w-sm mx-auto">
          {[
            "Habit tracking enabled",
            "Dashboard personalized",
            "Focus sessions ready",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-surface-2 rounded-10 border border-white/[0.07]"
            >
              <CheckCircle2 className="size-5 text-success" />
              <span className="text-[14px] text-text-2 font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      await getSessionUser().then((user) => {
        console.log(user);
      });
    };
    fetchUserData();
  }, []);

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-surface-0 flex flex-col">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-12 shrink-0">
        <Logo />
        <div className="flex items-center gap-8">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === currentStep
                    ? "w-8 bg-brand"
                    : i < currentStep
                      ? "w-4 bg-success"
                      : "w-4 bg-white/10",
                )}
              />
            ))}
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-[13px] text-text-4 hover:text-text-2 font-medium"
          >
            Skip
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-12 overflow-y-auto">
        <div className="w-full max-w-4xl animate-fade-in">
          <div className="text-center space-y-2 mb-8">
            <h1 className="font-display text-[42px] font-extrabold tracking-tight text-text-1 leading-tight">
              {step.title}
            </h1>
            <p className="text-[18px] text-text-3 font-light max-w-xl mx-auto">
              {step.subtitle}
            </p>
          </div>

          {step.content}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-24 flex items-center justify-between px-12 border-t border-white/[0.07] shrink-0">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2 text-[14px] font-bold text-text-3 hover:text-text-1 disabled:opacity-0 transition-all"
        >
          <ChevronLeft className="size-5" />
          Back
        </button>

        <button
          onClick={handleNext}
          className="flowos-shadcn-btn-primary w-auto px-10 h-12 text-[15px] group"
        >
          {currentStep === steps.length - 1 ? "Go to Dashboard" : "Continue"}
          <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
        </button>
      </footer>
    </div>
  );
}
