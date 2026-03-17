"use client";

// ─────────────────────────────────────────────────────────────
// src/components/auth/ForgotPasswordForm.tsx
//
// Form fields:    email
// Server action:  forgotPasswordAction({ email })
// Always shows success state — prevents email enumeration.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/Button";
import { forgotPasswordAction } from "@/actions/auth.actions";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/src/schema/auth.schema";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    // Server action always returns success — never reveals whether email exists
    await forgotPasswordAction(data).then((response) => {
      console.log("response", response);
      if (response.success === false) {
        toast.success(response.error);
        return;
      }
      toast.success(response.message);
      setSentEmail(data.email);
      setSent(true);
    });
  }

  // ── Success state ─────────────────────────────────────────
  if (sent) {
    return (
      <div className="flex animate-fade-in flex-col items-center gap-5 py-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-full border border-success/30 bg-success/10">
          <CheckCircle2 size={28} className="text-success" />
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="font-display text-[18px] font-semibold tracking-[-0.3px] text-text-1">
            Check your inbox
          </p>
          <p className="text-[14px] font-light leading-relaxed text-text-2">
            We sent a reset link to{" "}
            <span className="font-medium text-text-1">{sentEmail}</span>. It
            expires in 15 minutes.
          </p>
        </div>
        <Link
          href="/login"
          className="text-[13px] font-medium text-brand-light no-underline transition-colors hover:text-accent-cyan"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  // ── Form state ────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="fp-email"
            className="text-[12px] font-medium tracking-[0.3px] text-text-2"
          >
            Email address
          </label>
          <div className="input-wrapper">
            <Mail className="input-icon-left" size={15} aria-hidden />
            <input
              {...register("email")}
              id="fp-email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              className={cn(
                "flowos-shadcn-input pl-icon",
                errors.email && "input-error",
              )}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-danger">{errors.email.message}</p>
          )}
        </div>

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
              <span>Send reset link</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-[13px] text-text-2">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-brand-light no-underline transition-colors hover:text-accent-cyan"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
