"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/Button";

const SUGGESTIONS = [
    "Run a 5K", "Read 12 books", "Learn a new skill",
    "Save ₹50,000", "Ship a side project", "Lose 5 kg",
];

const CATEGORIES: { value: string; emoji: string; label: string }[] = [
    { value: "HEALTH", emoji: "💪", label: "Health" },
    { value: "CAREER", emoji: "💼", label: "Career" },
    { value: "LEARNING", emoji: "📚", label: "Learning" },
    { value: "MINDFULNESS", emoji: "🧘", label: "Mindfulness" },
    { value: "FINANCE", emoji: "💰", label: "Finance" },
    { value: "PERSONAL", emoji: "⭐", label: "Personal" },
];

// Quick-pick date offsets
const DATE_QUICK_PICKS: { label: string; months: number }[] = [
    { label: "1 month", months: 1 },
    { label: "3 months", months: 3 },
    { label: "6 months", months: 6 },
];

function addMonths(months: number): string {
    const d = new Date();
    d.setMonth(d.getMonth() + months);
    return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

// Minimum date = tomorrow
function minDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
}

interface Props {
    onContinue: (data: {
        title: string;
        category: string;
        targetDate: string;
    }) => void;
    onSkip: () => void;
    loading: boolean;
    error: string | null;
}

export function OnboardingStep4Goal({ onContinue, onSkip, loading, error }: Props) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("PERSONAL");
    const [targetDate, setTargetDate] = useState(addMonths(3));

    function handleSubmit() {
        if (!title.trim()) return;
        onContinue({ title: title.trim(), category, targetDate });
    }

    return (
        <div className="flex flex-col gap-6">

            {/* Header */}
            <div>
                <h2 className="font-display text-[26px] font-bold tracking-[-0.5px] text-text-1">
                    Set your first goal
                </h2>
                <p className="mt-2 text-[14px] text-text-2">
                    What's one thing you want to achieve in the next 3 months?
                </p>
            </div>

            {/* Goal title */}
            <div className="flex flex-col gap-2">
                <Label
                    htmlFor="ob-goal-title"
                    className="text-[12px] font-medium text-text-2"
                >
                    Goal title
                </Label>
                <Input
                    id="ob-goal-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Run a 5K"
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
                            onClick={() => setTitle(s)}
                            className={cn(
                                "rounded-full border px-3 py-1 text-[12px] transition-all",
                                title === s
                                    ? "border-brand/40 bg-brand/10 text-brand"
                                    : "border-white/[0.07] bg-surface-2 text-text-3 hover:border-white/[0.14] hover:text-text-2"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
                <Label className="text-[12px] font-medium text-text-2">
                    Category
                </Label>
                <div className="grid grid-cols-6 gap-2">
                    {CATEGORIES.map((c) => (
                        <button
                            key={c.value}
                            type="button"
                            onClick={() => setCategory(c.value)}
                            title={c.label}
                            className={cn(
                                "flex flex-col items-center gap-1.5 rounded-[10px] border p-3 transition-all",
                                category === c.value
                                    ? "border-brand/40 bg-brand/[0.06]"
                                    : "border-white/[0.07] bg-surface-2 hover:border-white/[0.14]"
                            )}
                        >
                            <span className="text-[20px]">{c.emoji}</span>
                            <span className="text-[10px] text-text-3">{c.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Target date */}
            <div className="flex flex-col gap-2">
                <Label
                    htmlFor="ob-target-date"
                    className="text-[12px] font-medium text-text-2"
                >
                    Target date
                </Label>

                {/* Quick picks */}
                <div className="flex gap-2">
                    {DATE_QUICK_PICKS.map((q) => {
                        const d = addMonths(q.months);
                        return (
                            <button
                                key={q.label}
                                type="button"
                                onClick={() => setTargetDate(d)}
                                className={cn(
                                    "rounded-[8px] border px-3 py-1.5 text-[12px] transition-all",
                                    targetDate === d
                                        ? "border-brand/40 bg-brand/10 text-brand"
                                        : "border-white/[0.07] bg-surface-2 text-text-3 hover:border-white/[0.14] hover:text-text-2"
                                )}
                            >
                                {q.label}
                            </button>
                        );
                    })}
                </div>

                <Input
                    id="ob-target-date"
                    type="date"
                    value={targetDate}
                    min={minDate()}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="flowos-shadcn-input h-11"
                />
            </div>

            {/* Error */}
            {error && <p className="text-[12px] text-danger">{error}</p>}

            {/* Footer */}
            <div className="flex flex-col gap-2.5">
                <Button
                    onClick={handleSubmit}
                    disabled={!title.trim() || loading}
                    className="flowos-shadcn-btn-primary h-12 text-[15px]"
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <>
                            <span>Set goal &amp; continue</span>
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