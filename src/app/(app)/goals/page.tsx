"use client";

import React, { useState } from 'react';
import { Plus, Target, Calendar, CheckCircle2, MoreHorizontal, TrendingUp, ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { NewGoalModal } from '@/src/components/modals/NewGoalModal';
import { UpdateGoalProgressModal } from '@/src/components/modals/UpdateGoalProgressModal';

const mockGoals = [
  { 
    id: '1', 
    title: 'Run a 5K Marathon', 
    category: 'Fitness', 
    targetDate: 'Jun 15, 2026', 
    progress: 65, 
    color: 'text-brand',
    description: 'Improve cardiovascular health and complete a full 5K race under 25 minutes.',
    keyResults: [
      { title: 'Run 3 times a week', current: 3, target: 3, unit: 'times', done: true },
      { title: 'Complete 4km run', current: 3.2, target: 4, unit: 'km', done: false },
      { title: 'Weight training sessions', current: 8, target: 12, unit: 'sessions', done: false },
    ]
  },
  { 
    id: '2', 
    title: 'Read 24 Books', 
    category: 'Learning', 
    targetDate: 'Dec 31, 2026', 
    progress: 35, 
    color: 'text-warning',
    description: 'Expand knowledge across various fields including psychology, tech, and history.',
    keyResults: [
      { title: 'Finish 2 books per month', current: 4, target: 24, unit: 'books', done: false },
      { title: 'Write summaries for each', current: 3, target: 24, unit: 'summaries', done: false },
    ]
  },
  { 
    id: '3', 
    title: 'Launch SaaS Product', 
    category: 'Career', 
    targetDate: 'Aug 01, 2026', 
    progress: 45, 
    color: 'text-accent-cyan',
    description: 'Build and launch a fully functional productivity platform for creative professionals.',
    keyResults: [
      { title: 'Complete MVP features', current: 8, target: 10, unit: 'features', done: false },
      { title: 'Beta test with 50 users', current: 12, target: 50, unit: 'users', done: false },
      { title: 'Finalize pricing model', current: 1, target: 1, unit: 'model', done: true },
    ]
  },
];

const GoalCard: React.FC<{ goal: any; onUpdate: () => void }> = ({ goal, onUpdate }) => (
  <div className="flowos-card group">
    <div className="flex items-start justify-between mb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="flowos-badge">{goal.category}</span>
          <span className="text-[11px] text-text-3 flex items-center gap-1">
            <Calendar className="size-3" /> {goal.targetDate}
          </span>
        </div>
        <h3 className="font-display text-[20px] font-bold text-text-1 group-hover:text-brand transition-colors mt-2">
          <Link href={`/goals/${goal.id}`}>{goal.title}</Link>
        </h3>
      </div>
      <button className="text-text-4 hover:text-text-2 transition-colors">
        <MoreHorizontal className="size-4" />
      </button>
    </div>

    <p className="text-[13px] text-text-2 leading-relaxed mb-6 line-clamp-2">
      {goal.description}
    </p>

    <div className="flex items-center gap-6 mb-8">
      <div className="relative size-20 shrink-0">
        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
          <circle className="text-white/[0.05]" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
          <circle 
            className={cn("transition-all duration-1000", goal.color.replace('text-', 'text-'))} 
            strokeWidth="8" 
            strokeDasharray="263.8" 
            strokeDashoffset={263.8 - (goal.progress / 100) * 263.8} 
            strokeLinecap="round" 
            stroke="currentColor" 
            fill="transparent" 
            r="42" 
            cx="50" 
            cy="50" 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[16px] font-bold text-text-1">{goal.progress}%</span>
        </div>
      </div>
      
      <div className="flex-1 space-y-3">
        {goal.keyResults.slice(0, 2).map((kr: any, i: number) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-medium">
              <span className={cn(kr.done ? "text-text-4 line-through" : "text-text-2")}>{kr.title}</span>
              <span className="text-text-3">{kr.current}/{kr.target} {kr.unit}</span>
            </div>
            <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
              <div 
                className={cn("h-full transition-all duration-500", kr.done ? "bg-success" : goal.color.replace('text-', 'bg-'))} 
                style={{ width: `${(kr.current / kr.target) * 100}%` }} 
              />
            </div>
          </div>
        ))}
        {goal.keyResults.length > 2 && (
          <p className="text-[10px] text-text-4 font-medium uppercase tracking-wider">
            + {goal.keyResults.length - 2} more key results
          </p>
        )}
      </div>
    </div>

    <div className="flex gap-3">
      <button 
        onClick={onUpdate}
        className="flowos-shadcn-btn-primary h-9 text-[13px] flex-1"
      >
        <TrendingUp className="size-4 mr-2" />
        Update Progress
      </button>
      <Link 
        href={`/goals/${goal.id}`}
        className="flowos-shadcn-btn-secondary h-9 px-3 w-auto flex items-center justify-center"
      >
        Details
      </Link>
    </div>
  </div>
);

const GOAL_CATEGORIES = [
  { id: "HEALTH",      emoji: "🏃", label: "Health"      },
  { id: "CAREER",      emoji: "💼", label: "Career"      },
  { id: "LEARNING",    emoji: "📚", label: "Learning"    },
  { id: "MINDFULNESS", emoji: "🧘", label: "Mindfulness" },
  { id: "FINANCE",     emoji: "💰", label: "Finance"     },
  { id: "PERSONAL",    emoji: "✨", label: "Personal"    },
];

export default function GoalsPage() {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('all');

  const handleUpdateClick = (goal: any) => {
    setSelectedGoal(goal);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <NewGoalModal open={isNewModalOpen} onOpenChange={setIsNewModalOpen} />
      <UpdateGoalProgressModal open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen} goal={selectedGoal} />

      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[12px] font-medium uppercase tracking-[1px] text-brand-light">
            Strategic Planning
          </p>
          <h1 className="font-display text-[36px] font-bold leading-tight tracking-[-1px] text-text-1">
            Goals
          </h1>
        </div>
        <button 
          onClick={() => setIsNewModalOpen(true)}
          className="flowos-shadcn-btn-primary w-auto px-6"
        >
          <Plus className="size-4 mr-2" />
          New Goal
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('all')}
          className={cn(
            "px-5 py-2 rounded-full text-[13px] font-bold transition-all whitespace-nowrap",
            activeTab === 'all' ? "bg-brand text-white shadow-lg shadow-brand/20" : "bg-surface-2 text-text-3 hover:text-text-2"
          )}
        >
          All
        </button>
        {GOAL_CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setActiveTab(cat.id.toLowerCase())}
            className={cn(
              "px-5 py-2 rounded-full text-[13px] font-bold transition-all whitespace-nowrap flex items-center gap-2",
              activeTab === cat.id.toLowerCase() ? "bg-brand text-white shadow-lg shadow-brand/20" : "bg-surface-2 text-text-3 hover:text-text-2"
            )}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flowos-card flex items-center gap-4 p-5">
          <div className="size-12 rounded-full bg-brand/10 text-brand flex items-center justify-center">
            <Target className="size-6" />
          </div>
          <div>
            <p className="text-[24px] font-display font-bold text-text-1">8</p>
            <p className="text-[12px] text-text-3 uppercase tracking-wider">Active Goals</p>
          </div>
        </div>
        <div className="flowos-card flex items-center gap-4 p-5">
          <div className="size-12 rounded-full bg-success/10 text-success flex items-center justify-center">
            <CheckCircle2 className="size-6" />
          </div>
          <div>
            <p className="text-[24px] font-display font-bold text-text-1">14</p>
            <p className="text-[12px] text-text-3 uppercase tracking-wider">Completed</p>
          </div>
        </div>
        <div className="flowos-card flex items-center gap-4 p-5">
          <div className="size-12 rounded-full bg-warning/10 text-warning flex items-center justify-center">
            <TrendingUp className="size-6" />
          </div>
          <div>
            <p className="text-[24px] font-display font-bold text-text-1">52%</p>
            <p className="text-[12px] text-text-3 uppercase tracking-wider">Avg. Progress</p>
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockGoals.map(goal => (
          <GoalCard key={goal.id} goal={goal} onUpdate={() => handleUpdateClick(goal)} />
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
            <p className="text-[14px] font-bold text-text-2 group-hover:text-text-1">Set a new goal</p>
            <p className="text-[12px] text-text-4">Define your next milestone</p>
          </div>
        </button>
      </div>
    </div>
  );
}
