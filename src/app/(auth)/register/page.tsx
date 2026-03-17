"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Github, User, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { GoogleSvg } from "@/public/svg/svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, registerSchema } from "@/src/schema/auth.schema";
import { registerAction } from "@/actions/auth.actions";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password");

  const handleFormSubmit = (values: RegisterInput) => {
    startTransition(async () => {
      const result = await registerAction(values);

      if (result.success === false) {
        toast.error(result.error || "Something went wrong");
        return;
      }

      toast.success(result.message || "Account created successfully");
      router.push("/login");
    });
  };

  const strengthRules = [
    { label: "At least 8 characters", met: password?.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password || "") },
    { label: "One number", met: /[0-9]/.test(password || "") },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-[12px] font-medium uppercase tracking-[1px] text-brand-light">
          Get started
        </p>
        <h1 className="font-display text-[32px] font-bold leading-[1.1] tracking-[-1px] text-text-1">
          Create your account
        </h1>
        <p className="text-[14px] font-light text-text-2">
          Join 2,400+ users building better habits.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button className="flowos-shadcn-btn-secondary flex items-center justify-center gap-2">
          <GoogleSvg />
          Google
        </button>
        <button className="flowos-shadcn-btn-secondary flex items-center justify-center gap-2">
          <Github className="size-4" />
          GitHub
        </button>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label className="text-[12px] font-medium text-text-2 ml-1">
            Full name
          </label>
          <div className="input-wrapper">
            <User className="input-icon-left" />
            <input
              {...register("name")}
              placeholder="John Doe"
              className={cn(
                "flowos-shadcn-input pl-icon focus:outline-none focus:ring-0",
                errors.name
                  ? "border-red-400 focus:border-red-400"
                  : "focus:border-transparent",
              )}
            />
          </div>
          {errors.name && (
            <span className="text-red-400 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label className="text-[12px] font-medium text-text-2 ml-1">
            Email address
          </label>
          <div className="input-wrapper">
            <Mail className="input-icon-left" />
            <input
              {...register("email")}
              type="email"
              placeholder="johndoe@example.com"
              className={cn(
                "flowos-shadcn-input pl-icon focus:outline-none focus:ring-0",
                errors.email
                  ? "border-red-400 focus:border-red-400"
                  : "focus:border-transparent",
              )}
            />
          </div>
          {errors.email && (
            <span className="text-red-400 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="text-[12px] font-medium text-text-2 ml-1">
            Password
          </label>
          <div className="input-wrapper">
            <Lock className="input-icon-left" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={cn(
                "flowos-shadcn-input pl-icon pr-icon focus:outline-none focus:ring-0",
                errors.password
                  ? "border-red-400 focus:border-red-400"
                  : "focus:border-transparent",
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="input-icon-right"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-400 text-sm">
              {errors.password.message}
            </span>
          )}
          {password && (
            <div className="pt-2 space-y-2">
              {strengthRules.map((rule, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "size-1.5 rounded-full",
                      rule.met ? "bg-success" : "bg-white/10",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[11px]",
                      rule.met ? "text-success" : "text-text-4",
                    )}
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="text-[12px] font-medium text-text-2 ml-1">
            Confirm password
          </label>
          <div className="input-wrapper">
            <Lock className="input-icon-left" />
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className={cn(
                "flowos-shadcn-input pl-icon pr-icon focus:outline-none focus:ring-0",
                errors.confirmPassword
                  ? "border-red-400 focus:border-red-400"
                  : "focus:border-transparent",
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="input-icon-right"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-400 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="flowos-shadcn-btn-primary"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="text-center text-[13px] text-text-3">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-brand-light hover:underline font-medium"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
