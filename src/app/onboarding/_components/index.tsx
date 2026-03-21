"use client"

import { completeOnboardingAction, createFirstGoalAction, createFirstHabitAction, saveIntentAction, skipOnboardingAction } from "@/actions/onboarding.actions";
import { GoalCategory, HabitFrequency, OnboardingIntent } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { OnboardingShell } from "./onBoardingShell";
import { AnimatePresence, motion } from 'framer-motion'
import OnBoardingStepOneWelcome from "./onBoardingStep1Welcome";
import OnBoardingStepTwoIntents from "./onBoardingStep2Intents";
import { OnboardingStep3Habit } from "./onBoardingStep3Habit";
import { OnboardingStep4Goal } from "./onBoardingStep4Goal";
import { OnboardingStep5Complete } from "./onBoardingStep5Complete";


const TOTAL_STEPS = 5;
const LS_KEY = "flowos_onboarding_step"
const OnboardingPage = () => {

  const router = useRouter()

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSkipConfirm, setShowSkipConfirm] = useState(false)

  // restore from localstorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const n = parseInt(saved, 10)
      if (n >= 1 && n <= TOTAL_STEPS) setStep(n)
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(LS_KEY, String(step))
  }, [step])

  const advance = useCallback(() => {
    setDirection(1)
    setError(null)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }, [])

  const goBack = useCallback(() => {
    setDirection(-1)
    setError(null)
    setStep((s) => Math.max(s - 1, 1))
  }, [])

  async function handleIntents(intents: OnboardingIntent[]) {
    setLoading(true)
    setError(null)
    const res = await saveIntentAction(intents)
    setLoading(false)
    if (res.success === false) { setError(res.error); return; }
    advance()
  }

  async function handleHabit(data: {
    name: string;
    frequency: HabitFrequency;
    reminderEnabled: boolean;
    reminderTime: string | null;
  }) {
    setLoading(true)
    setError(null)
    const res = await createFirstHabitAction(data)
    setLoading(false)
    if (res.success === false) { setError(res.error); return; }
    advance()
  }

  async function handleGoal(data: {
    title: string;
    category: GoalCategory;
    targetDate: string
  }) {
    setLoading(true)
    setError(null)
    const res = await createFirstGoalAction(data)
    setLoading(false)
    if (res.success === false) { setError(res.error); return; }
    advance()
  }

  async function handleComplete() {
    setLoading(true)
    const res = await completeOnboardingAction()
    if (res.success === false) {
      setLoading(false)
      setError("Something went wrong. Please try again.")
      return
    }
    localStorage.removeItem(LS_KEY)
    router.refresh()
    router.push("/dashboard")
  }

  async function handleSkip() {
    setLoading(true)
    setShowSkipConfirm(false)
    const res = await skipOnboardingAction()
    if (res.success === false) {
      setLoading(false)
      return
    }
    localStorage.removeItem(LS_KEY)
    router.refresh()
    router.push("/dashboard")
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 30 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -30 }),
  };

  return (
    <OnboardingShell
      step={step}
      totalSteps={TOTAL_STEPS}
      canGoBack={step > 1}
      onBack={goBack}
      showSkipConfirm={showSkipConfirm}
      onSkipRequest={() => setShowSkipConfirm(true)}
      onSkipCancel={() => setShowSkipConfirm(false)}
      onSkipConfirm={handleSkip}
      loading={loading}
    >
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit={"exit"}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {step === 1 && (
            <OnBoardingStepOneWelcome onContinue={advance} />
          )}
          {step === 2 && (
            <OnBoardingStepTwoIntents
              onContinue={handleIntents}
              loading={loading}
              error={error}
            />
          )}
          {step === 3 && (
            <OnboardingStep3Habit
              onContinue={handleHabit}
              onSkip={advance}
              loading={loading}
              error={error}
            />
          )}
          {step === 4 && (
            <OnboardingStep4Goal
              onContinue={handleGoal}
              onSkip={advance}
              loading={loading}
              error={error}
            />
          )}

          {step === 5 && (
            <OnboardingStep5Complete
              onComplete={handleComplete}
              loading={loading}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </OnboardingShell>
  )
}

export default OnboardingPage