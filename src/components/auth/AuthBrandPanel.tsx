import React from 'react';
import { Logo } from '@/src/components/ui/Logo';
import { cn } from '@/src/lib/utils';

export const AuthBrandPanel = () => {
  return (
    <div className="hidden lg:flex flex-col h-full w-full bg-surface-1 relative overflow-hidden p-12 border-r border-white/[0.07]">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 right-0 size-[500px] bg-brand/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <Logo className="relative z-10 mb-24" />
      
      <div className="relative z-10 max-w-md">
        <h1 className="font-display text-[52px] font-extrabold leading-[1.05] tracking-[-2px] text-text-1 mb-6">
          Build habits that <span className="text-gradient">actually stick</span>
        </h1>
        <p className="text-[18px] font-light leading-relaxed text-text-2 mb-12">
          A unified workspace to track habits, manage tasks, and master your focus.
        </p>

        {/* Habit Preview Card */}
        <div className="flowos-card mb-12 bg-surface-2/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <span className="flowos-label">Active Habits</span>
            <span className="text-[12px] text-text-3">Last 7 days</span>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Deep Work', streak: 12, days: [1, 1, 1, 0, 1, 1, 1] },
              { name: 'Meditation', streak: 5, days: [1, 1, 0, 1, 1, 1, 1] },
              { name: 'Reading', streak: 28, days: [1, 1, 1, 1, 1, 1, 1] },
            ].map((habit, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-text-1">{habit.name}</span>
                  <span className="text-[11px] text-brand-light font-medium">{habit.streak} day streak</span>
                </div>
                <div className="flex gap-1.5">
                  {habit.days.map((done, j) => (
                    <div 
                      key={j} 
                      className={cn(
                        "size-2.5 rounded-full",
                        j === 6 ? (done ? "bg-brand shadow-[0_0_8px_rgba(85,110,255,0.5)]" : "border border-brand") :
                        done ? "bg-success/40" : "bg-white/5"
                      )} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-10 mb-12">
          <div>
            <p className="text-[24px] font-display font-bold text-text-1">2.4k+</p>
            <p className="text-[12px] text-text-3 uppercase tracking-wider">Users</p>
          </div>
          <div>
            <p className="text-[24px] font-display font-bold text-text-1">94%</p>
            <p className="text-[12px] text-text-3 uppercase tracking-wider">Retention</p>
          </div>
          <div>
            <p className="text-[24px] font-display font-bold text-text-1">4.9 ★</p>
            <p className="text-[12px] text-text-3 uppercase tracking-wider">Rating</p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="flowos-card bg-surface-2/30 backdrop-blur-sm border-dashed">
          <div className="flex gap-4">
            <div className="size-10 rounded-full bg-brand/20 flex items-center justify-center text-brand-light font-bold text-sm">
              JD
            </div>
            <div>
              <p className="text-[14px] text-text-2 italic mb-2">
                "FlowOS completely changed how I manage my day. The focus mode is a game changer."
              </p>
              <p className="text-[12px] font-medium text-text-1">James Dalton</p>
              <p className="text-[11px] text-text-3">Product Designer at Linear</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
