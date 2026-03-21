import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";
import { OnboardingIntent } from "@prisma/client";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";

interface IntentType {
    id: OnboardingIntent;
    emoji: string;
    title: string;
    desc: string;
}

const INTENTS: IntentType[] = [
    { id: "HABITS", emoji: "🔥", title: "Build better habits", desc: "Daily tracking & streaks" },
    { id: "TASKS", emoji: "✅", title: "Manage tasks & projects", desc: "Projects, labels, kanban" },
    { id: "FOCUS", emoji: "🎯", title: "Deep work & focus", desc: "Pomodoro timer sessions" },
    { id: "TIME", emoji: "⏱", title: "Track my time", desc: "Log hours per project" },
    { id: "GOALS", emoji: "🏆", title: "Reach my goals", desc: "OKRs with key results" },
    { id: "SCREEN_TIME", emoji: "📱", title: "Monitor screen time", desc: "Track & limit app usage" },
];

interface Props {
    onContinue: (intents: OnboardingIntent[]) => void;
    loading: boolean;
    error: string | null;
}
const OnBoardingStepTwoIntents = ({ error, loading, onContinue }: Props) => {
    const [selected, setSelected] = useState<OnboardingIntent[]>([]);

    function toggle(id: OnboardingIntent) {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    }

    return (
        <div className="flex flex-col gap-6">

            <div>
                <h2 className="font-display text-[26px] font-bold tracking-[-0.5px] text-text-1">
                    What brings you to FlowOS?
                </h2>
                <p className="mt-2 text-[14px] text-text-2">
                    Select all that apply. We'll personalise your experience.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {INTENTS.map((intent) => {
                    const isSelected = selected.includes(intent.id);
                    return (
                        <button
                            key={intent.id}
                            onClick={() => toggle(intent.id)}
                            className={cn(
                                "relative rounded-[14px] border p-5 text-left transition-all duration-150",
                                "bg-surface-2 hover:border-white/[0.14]",
                                isSelected
                                    ? "border-brand/40 bg-brand/[0.06]"
                                    : "border-white/[0.07]"
                            )}
                        >
                            {isSelected && (
                                <div className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-brand">
                                    <Check size={11} strokeWidth={3} className="text-white" />
                                </div>
                            )}

                            <span className="mb-3 block text-[26px]">{intent.emoji}</span>
                            <p className="font-display text-[14px] font-semibold text-text-1">
                                {intent.title}
                            </p>
                            <p className="mt-0.5 text-[11px] text-text-3">{intent.desc}</p>
                        </button>
                    );
                })}
            </div>

            {error && (
                <p className="text-[12px] text-danger">{error}</p>
            )}

            <Button
                onClick={() => onContinue(selected)}
                disabled={selected.length === 0 || loading}
                className="flowos-shadcn-btn-primary h-12 text-[15px]"
            >
                {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <>
                        <span>Continue</span>
                        <ArrowRight size={17} strokeWidth={2.5} />
                    </>
                )}
            </Button>

            {selected.length === 0 && (
                <p className="text-center text-[12px] text-text-4">
                    Select at least one option to continue
                </p>
            )}
        </div>
    );
}

export default OnBoardingStepTwoIntents