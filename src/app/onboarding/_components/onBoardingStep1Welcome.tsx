import { Button } from "@/src/components/ui/Button";
import { ArrowRight, BarChart2, Clock, Flame, Target } from "lucide-react";

interface Props {
    onContinue: () => void
}
const features = [
    { icon: Flame, label: "Habit tracking", desc: "Build streaks that stick" },
    { icon: Target, label: "Goal setting", desc: "OKRs with key results" },
    { icon: Clock, label: "Focus timer", desc: "Pomodoro for deep work" },
    { icon: BarChart2, label: "Analytics", desc: "Understand your productivity" },

];

const OnBoardingStepOneWelcome = ({ onContinue }: Props) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="text-center">
                <div className="mb-5 flex justify-center">
                    <div className="flex size-16 items-center justify-center rounded-[18px] bg-brand/15 border border-brand/25">
                        <span className="font-display text-[28px] font-bold text-brand">F</span>
                    </div>
                </div>
                <h1 className="font-display text-[32px] font-bold leading-tight tracking-[-0.5px] text-text-1">
                    Welcome to FlowOS
                </h1>
                <p className="mt-2.5 text-[15px] leading-relaxed text-text-2">
                    A unified productivity workspace. Let's get you set up in under 2 minutes.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {features.map(({ icon: Icon, label, desc }) => (
                    <div
                        key={label}
                        className="rounded-[12px] border border-white/[0.07] bg-surface-2 p-4"
                    >
                        <div className="mb-2.5 flex size-8 items-center justify-center rounded-[8px] bg-brand/12">
                            <Icon size={16} className="text-brand" />
                        </div>
                        <p className="text-[13px] font-semibold text-text-1">{label}</p>
                        <p className="mt-0.5 text-[11px] text-text-3">{desc}</p>
                    </div>
                ))}
            </div>

            <Button
                onClick={onContinue}
                className="flowos-shadcn-btn-primary h-12 text-[15px]"
            >
                <span>Get started</span>
                <ArrowRight size={17} strokeWidth={2.5} />
            </Button>

            <p className="text-center text-[12px] text-text-4">
                Takes about 2 minutes · No credit card required
            </p>
        </div>
    )
}

export default OnBoardingStepOneWelcome