import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, CheckSquare, AlertCircle, Timer as TimerIcon, BarChart2, Flame } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { FocusSettingsModal } from '@/src/components/modals/FocusSettingsModal';
import { Settings } from 'lucide-react';

import { Link } from 'react-router-dom';
import { History } from 'lucide-react';

export const FocusPage = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'short' | 'long'>('focus');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const totalTime = sessionType === 'focus' ? 25 * 60 : sessionType === 'short' ? 5 * 60 : 15 * 60;
  const progress = 1 - (timeLeft / totalTime);
  const RADIUS = 110;
  const STROKE = 10;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const dashoffset = CIRCUMFERENCE * (1 - progress);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalTime);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const switchSession = (type: 'focus' | 'short' | 'long') => {
    setSessionType(type);
    setIsActive(false);
    const newTotal = type === 'focus' ? 25 * 60 : type === 'short' ? 5 * 60 : 15 * 60;
    setTimeLeft(newTotal);
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-1000 flex flex-col items-center justify-center relative",
      isActive && sessionType === 'focus' ? "bg-[oklch(12%_0.028_264)]" : "bg-surface-0"
    )}>
      <div className="max-w-4xl w-full mx-auto px-6 py-12 space-y-12 relative">
        <FocusSettingsModal open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen} />
        
        {/* Settings & History Buttons */}
        <div className="absolute top-0 right-6 flex items-center gap-2">
          <Link 
            to="/focus/history"
            className="size-10 rounded-10 border border-white/[0.07] flex items-center justify-center text-text-4 hover:text-text-1 transition-all"
          >
            <History size={18} />
          </Link>
          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className="size-10 rounded-10 border border-white/[0.07] flex items-center justify-center text-text-4 hover:text-text-1 transition-all"
          >
            <Settings size={18} />
          </button>
        </div>

        {/* Session Tabs */}
        <div className="flex p-1 bg-surface-2 rounded-14 border border-white/[0.07] w-fit mx-auto">
          {[
            { id: 'focus', label: 'Focus' },
            { id: 'short', label: 'Short Break' },
            { id: 'long', label: 'Long Break' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => switchSession(type.id as any)}
              className={cn(
                "px-6 py-2.5 rounded-10 text-[14px] font-bold transition-all",
                sessionType === type.id 
                  ? "bg-brand text-white shadow-lg shadow-brand/20" 
                  : "text-text-3 hover:text-text-2"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Timer Circle */}
        <div className="relative size-[280px] mx-auto">
          <svg width="280" height="280" viewBox="0 0 280 280" className="-rotate-90">
            <circle
              cx="140" cy="140" r={RADIUS}
              fill="none"
              stroke="var(--surface-3)"
              strokeWidth={STROKE}
            />
            <circle
              cx="140" cy="140" r={RADIUS}
              fill="none"
              stroke={sessionType === 'focus' ? "var(--brand)" : "var(--success)"}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashoffset}
              className="transition-[stroke-dashoffset] duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-[64px] font-bold tracking-[-2px] text-text-1 tabular-nums">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[13px] text-text-3 mt-1 uppercase tracking-[1px]">
              {sessionType === 'focus' ? 'Focus' : 'Break'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8">
          <button 
            onClick={resetTimer}
            className="size-12 rounded-full bg-surface-2 border border-white/[0.07] flex items-center justify-center text-text-3 hover:text-text-1 transition-all"
          >
            <RotateCcw className="size-5" />
          </button>
          
          <button 
            onClick={toggleTimer}
            className="size-20 rounded-full bg-brand flex items-center justify-center text-white shadow-[0_0_30px_rgba(85,110,255,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            {isActive ? <Pause className="size-8 fill-current" /> : <Play className="size-8 fill-current ml-1" />}
          </button>

          <button 
            onClick={() => switchSession(sessionType === 'focus' ? 'short' : 'focus')}
            className="size-12 rounded-full bg-surface-2 border border-white/[0.07] flex items-center justify-center text-text-3 hover:text-text-1 transition-all"
          >
            <SkipForward className="size-5" />
          </button>
        </div>

        {/* Session Progress */}
        <div className="flex justify-center gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={cn(
                "size-2.5 rounded-full transition-all duration-300",
                i <= 2 ? "bg-brand scale-110" : "bg-surface-3 border border-white/[0.10]"
              )} 
            />
          ))}
        </div>

        {/* Active Task */}
        <div className="w-full max-w-md mx-auto flowos-card bg-surface-1/50 backdrop-blur-sm border-dashed border-white/10 flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-brand/10 text-brand flex items-center justify-center">
              <CheckSquare className="size-4" />
            </div>
            <div>
              <p className="text-[12px] text-text-3 font-medium uppercase tracking-wider">Working on:</p>
              <p className="text-[14px] font-bold text-text-1">Design FlowOS Dashboard</p>
            </div>
          </div>
          <button className="text-[12px] text-brand-light font-bold hover:underline">Change</button>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-12 w-full pt-8 border-t border-white/[0.05]">
          <div className="text-center space-y-1">
            <p className="text-[20px] font-display font-bold text-text-1">4h 20m</p>
            <p className="text-[11px] text-text-3 uppercase tracking-wider">Today's Focus</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-[20px] font-display font-bold text-text-1">8</p>
            <p className="text-[11px] text-text-3 uppercase tracking-wider">Sessions Done</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-[20px] font-display font-bold text-text-1">12 Days</p>
            <p className="text-[11px] text-text-3 uppercase tracking-wider">Longest Streak</p>
          </div>
        </div>
      </div>

      {/* Distraction Log Floating Button */}
      <button className="fixed bottom-8 right-8 size-14 rounded-full bg-surface-2 border border-white/[0.07] flex items-center justify-center text-text-3 hover:text-warning hover:border-warning/30 transition-all shadow-2xl group">
        <AlertCircle className="size-6" />
        <span className="absolute right-full mr-4 px-3 py-1.5 bg-surface-3 rounded-10 text-[12px] font-bold text-text-1 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none">
          Log Distraction
        </span>
      </button>
    </div>
  );
};
