"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Flame, MoreHorizontal, ChevronLeft, ChevronRight, Archive, Trash2, Pencil, CheckCircle2, Copy, RotateCcw } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/src/components/ui/DropdownMenu';
import { ArchivedHabitsDrawer } from '@/src/components/modals/ArchivedHabitsDrawer';
import { ConfirmDialog } from '@/src/components/ui/ConfirmDialog';
import { NewHabitModal } from '@/src/components/modals/NewHabitModal';

const mockHabits = [
  { id: '1', name: 'Morning Meditation', emoji: '🧘', category: 'Mindfulness', color: '#556eff', streak: 12, best: 21, rate: 85, days: Array(30).fill(0).map(() => Math.random() > 0.3) },
  { id: '2', name: 'Read 20 Pages', emoji: '📚', category: 'Learning', color: '#00f2ff', streak: 5, best: 14, rate: 70, days: Array(30).fill(0).map(() => Math.random() > 0.4) },
  { id: '3', name: 'Deep Work Session', emoji: '🎯', category: 'Work', color: '#ffbd55', streak: 28, best: 45, rate: 92, days: Array(30).fill(0).map(() => Math.random() > 0.1) },
  { id: '4', name: 'Evening Walk', emoji: '🚶', category: 'Health', color: '#55ff9e', streak: 0, best: 10, rate: 45, days: Array(30).fill(0).map(() => Math.random() > 0.6) },
];

const HabitCard: React.FC<{ habit: any, onArchive: (habit: any) => void }> = ({ habit, onArchive }) => {
  const [isLogged, setIsLogged] = useState(habit.days[29]);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="flowos-card group relative border border-white/[0.04] p-8"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div 
            className="size-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg"
            style={{ backgroundColor: `${habit.color}15`, border: `1px solid ${habit.color}30` }}
          >
            {habit.emoji}
          </div>
          <div>
            <h3 className="font-display text-[18px] font-black text-white italic tracking-tight group-hover:text-brand transition-colors">
              <Link href={`/habits/${habit.id}`}>{habit.name.toUpperCase()}</Link>
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="size-1.5 rounded-full" style={{ backgroundColor: habit.color }} />
              <span className="text-[10px] font-black text-text-4 tracking-widest uppercase opacity-60 font-mono">{habit.category}</span>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="btn-icon size-9 border-white/[0.05]">
              <MoreHorizontal className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-surface-2 border-white/[0.08] p-1.5">
            <DropdownMenuItem className="gap-3 py-2.5 rounded-lg text-[12px] font-bold">
              <Pencil size={14} className="text-text-4" />
              CALIBRATE PROTOCOL
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-2.5 rounded-lg text-[12px] font-bold">
              <Copy size={14} className="text-text-4" />
              DUPLICATE TRACE
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/[0.04]" />
            <DropdownMenuItem 
              className="gap-3 py-2.5 rounded-lg text-[12px] font-bold text-warning focus:text-warning"
              onClick={() => onArchive(habit)}
            >
              <Archive size={14} />
              ARCHIVE MODULE
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3 py-2.5 rounded-lg text-[12px] font-bold text-danger focus:text-danger">
              <Trash2 size={14} />
              TERMINATE
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Heatmap Matrix */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {habit.days.slice(0, 30).map((done, i) => (
          <div 
            key={i}
            className={cn(
               "size-2.5 rounded-[2px] transition-all duration-500",
               done ? "bg-brand shadow-[0_0_8px_var(--color-brand)]" : "bg-white/[0.05]",
               i === 29 && !done && "ring-1 ring-brand ring-offset-2 ring-offset-surface-1" 
            )}
            style={done ? { backgroundColor: habit.color, boxShadow: `0 0 10px ${habit.color}40` } : {}}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/[0.05] gap-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-text-4 tracking-widest uppercase opacity-60">Streak</span>
            <span className="text-[15px] font-black text-white italic">{habit.streak}D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-text-4 tracking-widest uppercase opacity-60">Rate</span>
            <span className="text-[15px] font-black text-white italic">{habit.rate}%</span>
          </div>
        </div>

        <button 
          onClick={() => setIsLogged(!isLogged)}
          className={cn(
            "flex-1 h-11 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2.5",
            isLogged 
              ? "bg-brand-dim/20 text-brand border border-brand/20 hover:bg-brand/30" 
              : "btn-primary shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {isLogged ? (
            <>
              <CheckCircle2 size={16} strokeWidth={3} />
              SYNCHRONIZED
            </>
          ) : (
            <>
              <Plus size={16} strokeWidth={3} />
              LOG CYCLE
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};


export default function HabitsPage() {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isArchiveDrawerOpen, setIsArchiveDrawerOpen] = useState(false);
  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<any>(null);

  const handleArchiveClick = (habit: any) => {
    setSelectedHabit(habit);
    setIsConfirmArchiveOpen(true);
  };

  const confirmArchive = () => {
    console.log('Archiving habit:', selectedHabit?.name);
  };

  return (
    <div className="space-y-12">
      <NewHabitModal open={isNewModalOpen} onOpenChange={setIsNewModalOpen} />
      <ArchivedHabitsDrawer open={isArchiveDrawerOpen} onOpenChange={setIsArchiveDrawerOpen} />
      <ConfirmDialog 
        open={isConfirmArchiveOpen}
        onOpenChange={setIsConfirmArchiveOpen}
        title="ARCHIVE PROTOCOL?"
        description={`Initialize archival sequence for "${selectedHabit?.name}"? Data remains in telemetry history.`}
        confirmText="ARCHIVE"
        onConfirm={confirmArchive}
        variant="primary"
      />

      {/* Immersive Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flowos-card relative overflow-hidden bg-brand-dim/5 border-brand/10"
      >
        <div className="absolute top-0 right-0 p-12 opacity-10 blur-2xl pointer-events-none">
           <RotateCcw size={160} className="text-brand rotate-12" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 relative z-10">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] font-black text-text-4 tracking-widest uppercase italic opacity-60">Routine Synchronization Engine</span>
             </div>
             <h1 className="font-display text-[42px] font-black tracking-tighter text-white italic leading-none">
                HABITUAL <span className="text-gradient">CYCLES</span>
             </h1>
             <p className="text-[14px] text-text-4 font-medium max-w-[420px] leading-relaxed">
                Synchronization with biological routines is critical. Consistency is the primary driver of neuro-plastic evolution.
             </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsArchiveDrawerOpen(true)}
              className="btn-secondary h-14 px-6 rounded-2xl"
              title="Archived Habits"
            >
              <Archive size={20} className="text-text-2" />
            </button>
            <button 
              onClick={() => setIsNewModalOpen(true)}
              className="btn-primary h-14 px-8 rounded-2xl shadow-xl shadow-brand/20"
            >
              <Plus size={20} strokeWidth={3} />
              <span>NEW PROTOCOL</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Pulse Visualization */}
      <div className="flowos-card relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
           <span className="text-[10px] font-black text-white/20 tracking-[0.2em] uppercase italic">30D Pulse History</span>
        </div>
        <div className="grid grid-cols-30 gap-1.5 h-16 items-end">
          {Array(30).fill(0).map((_, i) => {
            const filled = Math.random() > 0.3;
            const h = filled ? (40 + Math.random() * 60) : 10;
            return (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                key={i} 
                className={cn(
                  "flex-1 rounded-full transition-all duration-500",
                  filled ? "bg-brand shadow-[0_0_12px_var(--color-brand)] opacity-80" : "bg-white/5",
                  i === 29 && "ring-2 ring-brand ring-offset-4 ring-offset-surface-1"
                )} 
              />
            );
          })}
        </div>
      </div>

      {/* Habit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {mockHabits.map(habit => (
          <HabitCard key={habit.id} habit={habit} onArchive={handleArchiveClick} />
        ))}
        
        {/* Add New Placeholder */}
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setIsNewModalOpen(true)}
          className="flowos-card border-dashed border-white/[0.08] bg-transparent flex flex-col items-center justify-center gap-6 py-20 hover:border-brand/40 hover:bg-brand/5 group transition-all"
        >
          <div className="size-16 rounded-2xl bg-surface-3 flex items-center justify-center border border-white/[0.03] group-hover:bg-brand/10 group-hover:border-brand/30 transition-all">
            <Plus size={24} className="text-text-4 group-hover:text-brand transition-colors" />
          </div>
          <div className="space-y-1">
            <p className="font-display text-[16px] font-black text-text-2 group-hover:text-text-1 uppercase italic tracking-tight">INITIALIZE NEW HABIT</p>
            <p className="text-[11px] font-bold text-text-4 tracking-widest uppercase opacity-40">System Expansion Point</p>
          </div>
        </motion.button>
      </div>
    </div>
  );
}

