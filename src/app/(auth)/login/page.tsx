"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Loader,
  Loader2,
} from "lucide-react";
import { GoogleSvg } from "@/public/svg/svg";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, loginSchema } from "@/src/schema/auth.schema";
import { cn } from "@/src/lib/utils";
import { loginAction } from "@/actions/auth.actions";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/Button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = (values: LoginInput) => {
    startTransition(async () => {
      await loginAction(values)
        .then((res) => {
          console.log("res", res);
          if (res.success === false) {
            toast.error(res.error || "Something went wrong");
            return;
          }
          toast.success("Login successful");
          router.push("/onboarding");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message || "Something went wrong");
          console.log("Error in login form submit", error);
        });
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-[12px] font-medium uppercase tracking-[1px] text-brand-light">
          Welcome back
        </p>
        <h1 className="font-display text-[32px] font-bold leading-[1.1] tracking-[-1px] text-text-1">
          Sign in to FlowOS
        </h1>
        <p className="text-[14px] font-light text-text-2">
          Pick up where you left off.
        </p>
      </div>

      <div className="flex p-1 bg-surface-2 rounded-10 border border-white/[0.07]">
        <button className="flex-1 py-2 text-sm font-medium text-text-1 bg-surface-3 rounded-[8px] shadow-sm">
          Sign In
        </button>
        <Link
          href="/register"
          className="flex-1 py-2 text-sm font-medium text-text-3 hover:text-text-2 text-center"
        >
          Create Account
        </Link>
      </div>

      <div className="space-y-4">
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

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.07]"></div>
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
            <span className="bg-surface-0 px-2 text-text-4">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-text-2 ml-1">
              Email address
            </label>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <>
                  <div className="input-wrapper">
                    <Mail className="input-icon-left" />
                    <input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                      className={cn(
                        "flowos-shadcn-input pl-icon focus:outline-none focus:ring-0",
                        errors.email
                          ? "border-red-400 focus:border-red-400"
                          : "focus:border-transparent",
                      )}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-400 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[12px] font-medium text-text-2">
                Password
              </label>
              <Link
                href="/forgot-password"
                title="Forgot password"
                className="text-[11px] text-brand-light hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <>
                  <div className="input-wrapper">
                    <Lock className="input-icon-left" />
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={cn(
                        "flowos-shadcn-input pl-icon focus:outline-none focus:ring-0",
                        errors.email
                          ? "border-red-400 focus:border-red-400"
                          : "focus:border-transparent",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
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
                </>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="flowos-shadcn-btn-primary mt-1"
          >
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </>
            )}
          </Button>
        </form>
      </div>

      <p className="text-center text-[13px] text-text-3">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-brand-light hover:underline font-medium"
        >
          Create one for free
        </Link>
      </p>
    </div>
  );
}
