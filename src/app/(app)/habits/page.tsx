"use client";

import React, { useState } from 'react';
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
    <div className="flowos-card group relative">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div 
            className="size-10 rounded-[12px] flex items-center justify-center text-xl shrink-0"
            style={{ backgroundColor: `${habit.color}20`, border: `1px solid ${habit.color}40` }}
          >
            {habit.emoji}
          </div>
          <div>
            <h3 className="font-display text-[16px] font-bold text-text-1 leading-tight group-hover:text-brand transition-colors">
              <Link href={`/habits/${habit.id}`}>{habit.name}</Link>
            </h3>
            <span className="flowos-badge mt-1">{habit.category}</span>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="size-8 rounded-full flex items-center justify-center text-text-4 hover:text-text-2 hover:bg-white/5 transition-all">
              <MoreHorizontal className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem className="gap-2">
              <Pencil size={14} />
              Edit Habit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Copy size={14} />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="gap-2 text-warning focus:text-warning"
              onClick={() => onArchive(habit)}
            >
              <Archive size={14} />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-danger focus:text-danger">
              <Trash2 size={14} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-6 gap-1.5 mb-6">
        {habit.days.slice(0, 30).map((done, i) => (
          <div 
            key={i}
            className={cn(
              "aspect-square rounded-[3px] transition-all duration-300",
              done ? "bg-brand" : "bg-surface-3",
              i === 29 && !done && "border border-brand/50" // Today
            )}
            style={done ? { backgroundColor: habit.color } : {}}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Flame className="size-3.5 text-warning" />
            <span className="text-[13px] font-bold text-text-1">{habit.streak}d</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-bold text-text-1">{habit.rate}%</span>
          </div>
        </div>

        <button 
          onClick={() => setIsLogged(!isLogged)}
          className={cn(
            "flex-1 h-9 rounded-10 text-[12px] font-bold transition-all flex items-center justify-center gap-2",
            isLogged 
              ? "bg-brand/10 text-brand border border-brand/20 hover:bg-brand/20" 
              : "bg-brand text-white shadow-lg shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {isLogged ? (
            <>
              <CheckCircle2 className="size-4" />
              Logged
            </>
          ) : (
            <>
              <Plus className="size-4" />
              Log Progress
            </>
          )}
        </button>
      </div>
    </div>
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
    // Logic to archive habit would go here
  };

  return (
    <div className="space-y-8">
      <NewHabitModal open={isNewModalOpen} onOpenChange={setIsNewModalOpen} />
      <ArchivedHabitsDrawer open={isArchiveDrawerOpen} onOpenChange={setIsArchiveDrawerOpen} />
      <ConfirmDialog 
        open={isConfirmArchiveOpen}
        onOpenChange={setIsConfirmArchiveOpen}
        title="Archive Habit?"
        description={`Are you sure you want to archive "${selectedHabit?.name}"? It will be hidden from your active list but you can restore it later.`}
        confirmText="Archive"
        onConfirm={confirmArchive}
        variant="primary"
      />

      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[12px] font-medium uppercase tracking-[1px] text-brand-light">
            Habit Tracker
          </p>
          <h1 className="font-display text-[36px] font-bold leading-tight tracking-[-1px] text-text-1">
            Habits
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsArchiveDrawerOpen(true)}
            className="flowos-shadcn-btn-secondary size-11 p-0 flex items-center justify-center"
            title="Archived Habits"
          >
            <Archive className="size-5" />
          </button>
          <button 
            onClick={() => setIsNewModalOpen(true)}
            className="flowos-shadcn-btn-primary w-auto px-6"
          >
            <Plus className="size-4 mr-2" />
            New Habit
          </button>
        </div>
      </div>

      {/* Streak Bar */}
      <div className="flowos-card p-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="flowos-label">Last 30 Days Activity</span>
          <div className="flex gap-2">
            <button className="size-7 rounded-full bg-surface-3 flex items-center justify-center text-text-3 hover:text-text-1 transition-colors">
              <ChevronLeft className="size-4" />
            </button>
            <button className="size-7 rounded-full bg-surface-3 flex items-center justify-center text-text-3 hover:text-text-1 transition-colors">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-1 px-2">
          {Array(30).fill(0).map((_, i) => {
            const filled = Math.random() > 0.3;
            const partial = !filled && Math.random() > 0.5;
            return (
              <div 
                key={i} 
                className={cn(
                  "flex-1 h-2.5 rounded-full transition-all duration-500",
                  filled ? "bg-brand shadow-[0_0_8px_rgba(85,110,255,0.3)]" : 
                  partial ? "bg-brand/30" : "bg-white/5",
                  i === 29 && "ring-2 ring-brand/50 ring-offset-2 ring-offset-surface-2"
                )} 
              />
            );
          })}
        </div>
      </div>

      {/* Habit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockHabits.map(habit => (
          <HabitCard key={habit.id} habit={habit} onArchive={handleArchiveClick} />
        ))}
        
        {/* Add New Placeholder */}
        <button 
          onClick={() => setIsNewModalOpen(true)}
          className="flowos-card border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center gap-3 py-12 hover:border-brand/40 hover:bg-brand/5 transition-all group"
        >
          <div className="size-12 rounded-full bg-surface-3 flex items-center justify-center group-hover:bg-brand/10 transition-colors">
            <Plus className="size-6 text-text-4 group-hover:text-brand transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-[14px] font-bold text-text-2 group-hover:text-text-1">Create new habit</p>
            <p className="text-[12px] text-text-4">Build a new routine today</p>
          </div>
        </button>
      </div>
    </div>
  );
};
