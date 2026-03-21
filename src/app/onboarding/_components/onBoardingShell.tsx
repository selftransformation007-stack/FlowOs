"use client";

import { ChevronLeft, Loader2 } from "lucide-react";

interface OnboardingShellProps {
    step: number;
    totalSteps: number;
    canGoBack: boolean;
    onBack: () => void;
    showSkipConfirm: boolean;
    onSkipRequest: () => void;
    onSkipCancel: () => void;
    onSkipConfirm: () => void;
    loading: boolean;
    children: React.ReactNode;
}

export function OnboardingShell({
    step,
    totalSteps,
    canGoBack,
    onBack,
    showSkipConfirm,
    onSkipRequest,
    onSkipCancel,
    onSkipConfirm,
    loading,
    children,
}: OnboardingShellProps) {
    const progress = (step / totalSteps) * 100;

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-start px-4 py-8 sm:py-12">

            <div className="relative mb-6 flex w-full max-w-[520px] items-center justify-between">

                <div className="w-16">
                    {canGoBack && (
                        <button
                            onClick={onBack}
                            disabled={loading}
                            className="flex items-center gap-1 text-[13px] text-text-3 transition-colors hover:text-text-1 disabled:opacity-40"
                        >
                            <ChevronLeft size={16} />
                            Back
                        </button>
                    )}
                </div>

                <p className="text-[12px] text-text-3">
                    Step {step} of {totalSteps}
                </p>

                <div className="w-16 text-right">
                    {step < totalSteps && (
                        <button
                            onClick={onSkipRequest}
                            disabled={loading}
                            className="text-[12px] text-text-4 transition-colors hover:text-text-3 disabled:opacity-40"
                        >
                            Skip setup
                        </button>
                    )}
                </div>
            </div>

            <div className="mb-8 h-1 w-full max-w-[520px] overflow-hidden rounded-full bg-surface-3">
                <div
                    className="h-full rounded-full bg-brand transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {showSkipConfirm && (
                <div className="mb-6 w-full max-w-[520px] rounded-[12px] border border-white/[0.07] bg-surface-2 p-4">
                    <p className="mb-3 text-[13px] text-text-2">
                        Skip setup? You can configure these later in Settings.
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={onSkipConfirm}
                            disabled={loading}
                            className="flex h-8 items-center gap-1.5 rounded-[8px] bg-danger/15 px-4 text-[12px] font-semibold text-danger transition-colors hover:bg-danger/25 disabled:opacity-50"
                        >
                            {loading && <Loader2 size={12} className="animate-spin" />}
                            Yes, skip
                        </button>
                        <button
                            onClick={onSkipCancel}
                            disabled={loading}
                            className="flex h-8 items-center rounded-[8px] bg-surface-3 px-4 text-[12px] font-medium text-text-2 transition-colors hover:bg-surface-4"
                        >
                            Continue setup
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full max-w-[520px]">
                {children}
            </div>
        </div>
    );
}