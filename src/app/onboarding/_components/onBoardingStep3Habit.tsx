"use client";

import { useState, useRef } from "react";
import { ArrowRight, Loader2, Bell } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Switch } from "@/src/components/ui/Switch";
import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";

const SUGGESTIONS = [
  "Morning run", "Meditate", "Read 20 pages",
  "Drink water", "Evening journal", "No social media",
];

const FREQUENCIES: { value: "DAILY" | "WEEKDAYS"; label: string; sub: string }[] = [
  { value: "DAILY",    label: "Daily",    sub: "Every day"    },
  { value: "WEEKDAYS", label: "Weekdays", sub: "Mon – Fri"    },
];

interface Props {
  onContinue: (data: {
    name:            string;
    frequency:       "DAILY" | "WEEKDAYS";
    reminderEnabled: boolean;
    reminderTime:    string | null;
  }) => void;
  onSkip:  () => void;
  loading: boolean;
  error:   string | null;
}

export function OnboardingStep3Habit({ onContinue, onSkip, loading, error }: Props) {
  const [name,            setName]            = useState("");
  const [frequency,       setFrequency]       = useState<"DAILY" | "WEEKDAYS">("DAILY");
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime,    setReminderTime]    = useState("08:00");
  const inputRef = useRef<HTMLInputElement>(null);

  function fillSuggestion(s: string) {
    setName(s);
    inputRef.current?.focus();
  }

  function handleSubmit() {
    if (!name.trim()) return;
    onContinue({
      name: name.trim(),
      frequency,
      reminderEnabled,
      reminderTime: reminderEnabled ? reminderTime : null,
    });
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h2 className="font-display text-[26px] font-bold tracking-[-0.5px] text-text-1">
          Create your first habit
        </h2>
        <p className="mt-2 text-[14px] text-text-2">
          You can add more and customise later.
        </p>
      </div>

      {/* Habit name */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="ob-habit-name"
          className="text-[12px] font-medium text-text-2"
        >
          Habit name
        </Label>
        <Input
          ref={inputRef}
          id="ob-habit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Morning run"
          autoFocus
          className="flowos-shadcn-input h-12 text-[15px]"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => fillSuggestion(s)}
              className={cn(
                "rounded-full border px-3 py-1 text-[12px] transition-all",
                name === s
                  ? "border-brand/40 bg-brand/10 text-brand"
                  : "border-white/[0.07] bg-surface-2 text-text-3 hover:border-white/[0.14] hover:text-text-2"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Frequency */}
      <div className="flex flex-col gap-2">
        <Label className="text-[12px] font-medium text-text-2">
          Frequency
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {FREQUENCIES.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFrequency(f.value)}
              className={cn(
                "rounded-[10px] border p-3.5 text-left transition-all",
                frequency === f.value
                  ? "border-brand/40 bg-brand/[0.06]"
                  : "border-white/[0.07] bg-surface-2 hover:border-white/[0.14]"
              )}
            >
              <p className="text-[13px] font-semibold text-text-1">{f.label}</p>
              <p className="mt-0.5 text-[11px] text-text-3">{f.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Reminder */}
      <div className="rounded-[12px] border border-white/[0.07] bg-surface-2 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell size={15} className="text-text-3" />
            <div>
              <p className="text-[13px] font-medium text-text-1">Daily reminder</p>
              <p className="text-[11px] text-text-3">Get a push notification</p>
            </div>
          </div>
          <Switch
            checked={reminderEnabled}
            onCheckedChange={setReminderEnabled}
          />
        </div>

        {reminderEnabled && (
          <div className="mt-3 flex items-center gap-2 pt-3 border-t border-white/[0.07]">
            <Label htmlFor="ob-reminder-time" className="text-[12px] text-text-3 whitespace-nowrap">
              Remind me at
            </Label>
            <Input
              id="ob-reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="flowos-shadcn-input h-9 w-auto text-[13px]"
            />
          </div>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-[12px] text-danger">{error}</p>}

      {/* Footer */}
      <div className="flex flex-col gap-2.5">
        <Button
          onClick={handleSubmit}
          disabled={!name.trim() || loading}
          className="flowos-shadcn-btn-primary h-12 text-[15px]"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <span>Create habit &amp; continue</span>
              <ArrowRight size={17} strokeWidth={2.5} />
            </>
          )}
        </Button>

        <button
          type="button"
          onClick={onSkip}
          disabled={loading}
          className="py-1.5 text-center text-[13px] text-text-3 transition-colors hover:text-text-2 disabled:opacity-40"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}