import React from 'react';
import { cn } from '@/src/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="size-8 rounded-[8px] bg-brand flex items-center justify-center shadow-[0_0_15px_rgba(85,110,255,0.3)]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <span className="font-display text-xl font-bold tracking-tight text-text-1">
        FlowOS
      </span>
    </div>
  );
};
