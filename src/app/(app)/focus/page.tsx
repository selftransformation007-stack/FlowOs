"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, CheckSquare, AlertCircle, Timer as TimerIcon, BarChart2, Flame, Settings, History } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { FocusSettingsModal } from '@/src/components/modals/FocusSettingsModal';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'short' | 'long'>('focus');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const totalTime = sessionType === 'focus' ? 25 * 60 : sessionType === 'short' ? 5 * 60 : 15 * 60;
  const progress = 1 - (timeLeft / totalTime);
  const RADIUS = 110;
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
      "min-h-[calc(100vh-140px)] flex flex-col items-center justify-center transition-all duration-700",
      isActive && sessionType === 'focus' ? "bg-surface-0 scale-[1.02]" : "bg-surface-0"
    )}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full mx-auto space-y-12 relative z-10"
      >
        <FocusSettingsModal open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen} />
        
        {/* Top Controls */}
        <div className="flex items-center justify-between">
           <div className="flex gap-1.5 p-1 bg-surface-2 rounded-xl border border-white/[0.05]">
            {[
              { id: 'focus', label: 'Work' },
              { id: 'short', label: 'Break' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => switchSession(type.id as any)}
                className={cn(
                  "px-6 py-2 rounded-lg text-[13px] font-bold transition-all",
                  sessionType === type.id 
                    ? "bg-brand text-white shadow-lg shadow-brand/20" 
                    : "text-text-4 hover:text-text-2"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/focus/history" className="btn-icon"><History size={16}/></Link>
            <button onClick={() => setIsSettingsModalOpen(true)} className="btn-icon">
               <Settings size={16}/>
            </button>
          </div>
        </div>

        {/* Timer UI */}
        <div className="flex flex-col items-center gap-12 py-8">
           <div className="relative size-[320px]">
              <svg className="size-full -rotate-90" viewBox="0 0 280 280">
                <circle cx="140" cy="140" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="2" className="text-white/[0.03]" />
                <motion.circle
                  cx="140" cy="140" r={RADIUS}
                  fill="none"
                  stroke={sessionType === 'focus' ? "var(--color-brand)" : "var(--color-success)"}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset: dashoffset }}
                  className="transition-[stroke-dashoffset] duration-300 drop-shadow-[0_0_12px_rgba(85,110,255,0.4)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  className={cn(
                    "font-display text-[84px] font-bold tracking-[-3px] tabular-nums leading-none transition-colors",
                    isActive ? "text-text-1" : "text-text-3"
                  )}
                >
                  {formatTime(timeLeft)}
                </motion.span>
                <div className="flex items-center gap-2 mt-4">
                   <span className="badge-brand uppercase tracking-widest text-[9px] px-2">{sessionType}</span>
                </div>
              </div>
           </div>

           {/* Timer Controls */}
            <div className="flex items-center gap-10">
              <button onClick={resetTimer} className="btn-icon size-12"><RotateCcw size={20}/></button>
              
              <button 
                onClick={toggleTimer} 
                className={cn(
                  "size-24 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-brand/30",
                  isActive ? "bg-surface-2 text-brand border border-brand/20" : "bg-brand text-white"
                )}
              >
                {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} className="ml-2" fill="currentColor" />}
              </button>

              <button 
                onClick={() => switchSession(sessionType === 'focus' ? 'short' : 'focus')}
                className="btn-icon size-12"
              >
                <SkipForward size={20}/>
              </button>
            </div>
        </div>

        <div className="flex flex-col items-center gap-8">
           {/* Progress track */}
           <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={cn(
                  "w-12 h-1 rounded-full transition-all duration-700",
                  i <= 2 ? "bg-brand" : "bg-surface-4"
                )} />
              ))}
           </div>

           {/* Current Task Widget */}
           <div className="w-full card p-5 flex items-center justify-between border-dashed border-white/10 bg-transparent">
              <div className="flex items-center gap-4">
                 <div className="size-10 rounded-xl bg-brand-dim border border-brand/20 flex items-center justify-center text-brand">
                    <CheckSquare size={18}/>
                 </div>
                 <div>
                    <span className="label-section text-[10px] block mb-0.5">CURRENT INTERVAL WORK</span>
                    <p className="font-display font-medium text-text-1">Design FlowOS Dashboard</p>
                 </div>
              </div>
              <button className="btn-ghost text-[12px] font-bold">CHANGE</button>
           </div>
        </div>

        {/* Stats footer */}
        <div className="grid grid-cols-3 gap-8 py-10 border-t border-white/[0.05]">
           <div className="text-center group cursor-default">
              <p className="font-display text-[20px] font-bold text-text-1 group-hover:text-brand transition-colors tracking-tight line-height-1">4h 20m</p>
              <p className="label-section mt-1">TOTAL TODAY</p>
           </div>
           <div className="text-center group cursor-default">
              <p className="font-display text-[20px] font-bold text-text-1 group-hover:text-brand transition-colors tracking-tight line-height-1">8</p>
              <p className="label-section mt-1">SESSIONS</p>
           </div>
           <div className="text-center group cursor-default">
              <p className="font-display text-[20px] font-bold text-text-1 group-hover:text-brand transition-colors tracking-tight line-height-1">12d</p>
              <p className="label-section mt-1">BEST STREAK</p>
           </div>
        </div>
      </motion.div>

      {/* Floating Action for distractions */}
      <motion.button 
        whileHover={{ x: -10 }}
        className="fixed bottom-10 right-10 flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-surface-2 border border-white/[0.08] shadow-2xl group overflow-hidden"
      >
        <span className="text-[12px] font-bold text-text-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">LOG DISTRACTION</span>
        <div className="size-10 rounded-full bg-danger-dim text-danger flex items-center justify-center">
           <AlertCircle size={20}/>
        </div>
      </motion.button>
    </div>
  );
}
