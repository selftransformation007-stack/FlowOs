import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github } from 'lucide-react';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

      {/* Tab Switcher */}
      <div className="flex p-1 bg-surface-2 rounded-10 border border-white/[0.07]">
        <button className="flex-1 py-2 text-sm font-medium text-text-1 bg-surface-3 rounded-[8px] shadow-sm">
          Sign In
        </button>
        <Link 
          to="/register" 
          className="flex-1 py-2 text-sm font-medium text-text-3 hover:text-text-2 text-center"
        >
          Create Account
        </Link>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="flowos-shadcn-btn-secondary flex items-center justify-center gap-2">
            <svg className="size-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
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
            <span className="bg-surface-0 px-2 text-text-4">Or continue with email</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-text-2 ml-1">Email address</label>
            <div className="input-wrapper">
              <Mail className="input-icon-left" />
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="flowos-shadcn-input pl-icon"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[12px] font-medium text-text-2">Password</label>
              <Link to="/forgot-password" title="Forgot password" className="text-[11px] text-brand-light hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon-left" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="flowos-shadcn-input pl-icon pr-icon"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="input-icon-right"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <button type="submit" className="flowos-shadcn-btn-primary group">
            Sign In
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </div>

      <p className="text-center text-[13px] text-text-3">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-light hover:underline font-medium">
          Create one for free
        </Link>
      </p>
    </div>
  );
};
