import React from 'react';
import { AuthBrandPanel } from '@/src/components/auth/AuthBrandPanel';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-surface-0 overflow-hidden">
      {/* Left Panel */}
      <div className="w-[60%] hidden lg:block">
        <AuthBrandPanel />
      </div>
      
      {/* Right Content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[420px] animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
