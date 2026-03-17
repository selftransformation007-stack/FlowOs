"use client";

// ─────────────────────────────────────────────────────────────
// src/components/auth/ResetPasswordForm.tsx
//
// Form fields:    password · confirmPassword
// Token:          from URL search param (passed as prop)
// Server action:  resetPasswordAction({ token, password, confirmPassword })
// On success:     shows success state, user goes to /login
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  Loader2,
  Check,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { resetPasswordAction } from "@/actions/auth.actions";
import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .max(72, "Maximum 72 characters")
      .regex(/[A-Z]/, "One uppercase letter required")
      .regex(/[0-9]/, "One number required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type Values = z.infer<typeof schema>;

const PW_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /[0-9]/.test(v) },
];

interface Props {
  token: string;
}

export default function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const pw = watch("password", "");

  if (!token) {
    return (
      <div className="flex flex-col gap-4 rounded-[10px] border border-danger/25 bg-danger/10 p-5 text-[14px] text-danger">
        <p>This reset link is missing or invalid. Please request a new one.</p>
        <Link
          href="/forgot-password"
          className="font-medium text-brand-light no-underline hover:text-accent-cyan"
        >
          Request a new link →
        </Link>
      </div>
    );
  }

  // ── Success state ─────────────────────────────────────────
  if (success) {
    return (
      <div className="flex animate-fade-in flex-col items-center gap-5 py-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-full border border-success/30 bg-success/10">
          <CheckCircle2 size={28} className="text-success" />
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="font-display text-[18px] font-semibold tracking-[-0.3px] text-text-1">
            Password updated
          </p>
          <p className="text-[14px] font-light leading-relaxed text-text-2">
            Your password has been changed. You can now sign in with your new
            password.
          </p>
        </div>
        <Button
          onClick={() => router.push("/login")}
          className="flowos-shadcn-btn-primary"
        >
          Go to sign in
        </Button>
      </div>
    );
  }

  // ── Form state ────────────────────────────────────────────
  async function onSubmit(data: Values) {
    setServerError(null);

    const result = await resetPasswordAction({
      token,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    if (result.success === false) {
      setServerError(result.error);
      return;
    }

    setSuccess(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        {/* New password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="rp-password"
            className="text-[12px] font-medium tracking-[0.3px] text-text-2"
          >
            New password
          </label>
          <div className="input-wrapper">
            <Lock className="input-icon-left" size={15} aria-hidden />
            <input
              {...register("password")}
              id="rp-password"
              type={showPw ? "text" : "password"}
              autoComplete="new-password"
              autoFocus
              placeholder="Create a strong password"
              className={cn(
                "flowos-shadcn-input pl-icon pr-icon",
                errors.password && "input-error",
              )}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "Hide" : "Show"}
              className="input-icon-right"
            >
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Strength checklist */}
          {pw.length > 0 && (
            <div className="flex flex-col gap-1 pt-1">
              {PW_RULES.map((rule) => {
                const ok = rule.test(pw);
                return (
                  <div key={rule.label} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex size-3.5 shrink-0 items-center justify-center rounded-full transition-colors",
                        ok ? "bg-success/20" : "bg-surface-3",
                      )}
                    >
                      <Check
                        size={8}
                        strokeWidth={3}
                        className={cn(
                          "transition-colors",
                          ok ? "text-success" : "text-text-4",
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-[11px] transition-colors",
                        ok ? "text-success" : "text-text-3",
                      )}
                    >
                      {rule.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {errors.password && (
            <p className="text-[11px] text-danger">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="rp-confirm"
            className="text-[12px] font-medium tracking-[0.3px] text-text-2"
          >
            Confirm new password
          </label>
          <div className="input-wrapper">
            <Lock className="input-icon-left" size={15} aria-hidden />
            <input
              {...register("confirmPassword")}
              id="rp-confirm"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Repeat your new password"
              className={cn(
                "flowos-shadcn-input pl-icon pr-icon",
                errors.confirmPassword && "input-error",
              )}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Hide" : "Show"}
              className="input-icon-right"
            >
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] text-danger">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Server error */}
        {serverError && (
          <div className="rounded-[10px] border border-danger/25 bg-danger/10 px-3.5 py-2.5 text-[13px] text-danger">
            {serverError}{" "}
            {serverError.toLowerCase().includes("expired") && (
              <Link
                href="/forgot-password"
                className="font-medium underline underline-offset-2"
              >
                Get a new link
              </Link>
            )}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flowos-shadcn-btn-primary mt-1"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <span>Update password</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
