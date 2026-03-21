"use client";

import { Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { useSession } from "next-auth/react";

const SETUP_ITEMS = [
    "Your workspace is ready",
    "Sidebar personalised to your goals",
    "Productivity tracking enabled",
    "Daily reminders configured",
];

interface Props {
    onComplete: () => void;
    loading: boolean;
}

export function OnboardingStep5Complete({ onComplete, loading }: Props) {
    const { data: session } = useSession();
    const firstName = session?.user?.name?.split(" ")[0] ?? "there";

    return (
        <div className="flex flex-col items-center gap-7 text-center py-4">

            {/* Animated success circle */}
            <div className="relative flex size-[110px] items-center justify-center rounded-full border-2 border-success bg-success/10 animate-[pulse_2.5s_ease-in-out_infinite]">
                <Sparkles size={44} className="text-success" />
            </div>

            {/* Headline */}
            <div>
                <h1 className="font-display text-[30px] font-bold tracking-[-0.5px] text-text-1">
                    You're all set, {firstName}! 🎉
                </h1>
                <p className="mt-2 text-[15px] leading-relaxed text-text-2">
                    FlowOS is ready. Start building your productivity system.
                </p>
            </div>

            {/* What was set up */}
            <div className="flex w-full flex-col gap-2">
                {SETUP_ITEMS.map((item) => (
                    <div
                        key={item}
                        className="flex items-center gap-3 rounded-[10px] border border-white/[0.07] bg-surface-2 p-3"
                    >
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-success/15">
                            <Check size={14} strokeWidth={2.5} className="text-success" />
                        </div>
                        <span className="text-[13px] text-text-2">{item}</span>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="w-full">
                <Button
                    onClick={onComplete}
                    disabled={loading}
                    className="flowos-shadcn-btn-primary h-12 w-full text-[15px]"
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        "Go to Dashboard →"
                    )}
                </Button>

                <p className="mt-3 text-[12px] text-text-3">
                    You can explore all features from the sidebar
                </p>
            </div>
        </div>
    );
}