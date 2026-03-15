"use client";

import React, { useState } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  Timer, 
  Calendar as CalendarIcon, 
  ArrowUpRight, 
  MoreHorizontal,
  Plus,
  Play,
  StickyNote,
  Check,
  Target
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/Popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/Select';

const chartData = [
  { name: 'Mon', habits: 80, tasks: 60, focus: 40 },
  { name: 'Tue', habits: 100, tasks: 80, focus: 60 },
  { name: 'Wed', habits: 70, tasks: 90, focus: 50 },
  { name: 'Thu', habits: 90, tasks: 70, focus: 80 },
  { name: 'Fri', habits: 110, tasks: 100, focus: 90 },
  { name: 'Sat', habits: 60, tasks: 40, focus: 100 },
  { name: 'Sun', habits: 50, tasks: 30, focus: 70 },
];

const StatCard = ({ icon: Icon, label, value, subValue, colorClass }: any) => (
  <div className="flowos-card flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("size-10 rounded-full flex items-center justify-center", colorClass)}>
        <Icon className="size-5" />
      </div>
      <button className="text-text-4 hover:text-text-2 transition-colors">
        <MoreHorizontal className="size-4" />
      </button>
    </div>
    <div>
      <p className="font-display text-[28px] font-bold text-text-1 leading-none mb-1">
        {value}
      </p>
      <p className="text-[12px] text-text-3 font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
    {subValue && (
      <div className="mt-4 pt-4 border-t border-white/[0.05]">
        <p className="text-[11px] text-text-3">
          {subValue}
        </p>
      </div>
    )}
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const [habitNote, setHabitNote] = useState('');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[12px] font-medium uppercase tracking-[1px] text-brand-light">
            Tuesday, March 10
          </p>
          <h1 className="font-display text-[36px] font-bold leading-tight tracking-[-1px] text-text-1">
            Good morning, Arjun 👋
          </h1>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-4 bg-surface-1 p-3 rounded-18 border border-white/[0.07] hover:bg-surface-2 transition-all cursor-pointer">
              <div className="relative size-12">
                <svg className="size-full" viewBox="0 0 36 36">
                  <path
                    className="text-white/[0.05]"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-brand"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="82, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[14px] font-bold text-text-1">82</span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-[13px] font-bold text-text-1">Productivity Score</p>
                <p className="text-[11px] text-success font-medium flex items-center gap-1">
                  <ArrowUpRight className="size-3" /> +12% from yesterday
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-5 bg-surface-2 border border-white/[0.07] rounded-[18px] shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-text-1">Productivity Score</h4>
                  <p className="text-[11px] text-text-3">Tuesday, March 10</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-[24px] font-bold text-brand">82</span>
                </div>
              </div>

              <div className="space-y-1">
                {[
                  { name: 'Habits', icon: Flame, pct: 78, delta: '+5 pts', color: 'bg-brand' },
                  { name: 'Focus', icon: Timer, pct: 94, delta: '+8 pts', color: 'bg-accent-cyan' },
                  { name: 'Tasks', icon: CheckCircle2, pct: 62, delta: '+6 pts', color: 'bg-success' },
                  { name: 'Screen Time', icon: Target, pct: 80, delta: '+3 pts', color: 'bg-warning' },
                ].map((factor) => (
                  <div key={factor.name} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-[14px] w-5"><factor.icon size={14} className="text-text-3" /></span>
                    <span className="text-[13px] text-text-2 w-[90px]">{factor.name}</span>
                    <div className="h-1.5 flex-1 bg-surface-3 rounded-full">
                      <div className={cn("h-full rounded-full", factor.color)} style={{width:`${factor.pct}%`}}/>
                    </div>
                    <span className="text-[12px] text-text-3 w-[32px] text-right">{factor.pct}%</span>
                    <span className="text-[11px] text-success w-[44px] text-right">{factor.delta}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="text-[11px] text-success font-bold">vs yesterday: ↑ +12 pts</p>
                <Link href="/analytics" className="text-[11px] text-brand-light font-bold hover:underline">View full analytics →</Link>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Flame} 
          label="Habits Today" 
          value="6 / 8" 
          subValue="75% completion rate"
          colorClass="bg-brand/10 text-brand"
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Tasks Done" 
          value="12" 
          subValue="+4 more than yesterday"
          colorClass="bg-success/10 text-success"
        />
        <StatCard 
          icon={Timer} 
          label="Focus Time" 
          value="4h 20m" 
          subValue="2 sessions remaining"
          colorClass="bg-accent-cyan/10 text-accent-cyan"
        />
        <StatCard 
          icon={CalendarIcon} 
          label="Current Streak" 
          value="14 Days" 
          subValue="Personal best: 21 days"
          colorClass="bg-warning/10 text-warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity */}
        <div className="lg:col-span-2 flowos-card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-[18px] font-bold text-text-1">Weekly Activity</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-brand" />
                <span className="text-[11px] text-text-3 font-medium uppercase tracking-wider">Habits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-success" />
                <span className="text-[11px] text-text-3 font-medium uppercase tracking-wider">Tasks</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'oklch(45% 0.028 258)', fontSize: 11, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ 
                    backgroundColor: 'oklch(17% 0.032 260)', 
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="habits" stackId="a" fill="oklch(55% 0.22 264)" radius={[0, 0, 0, 0]} barSize={32} />
                <Bar dataKey="tasks" stackId="a" fill="oklch(78% 0.15 160)" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Focus Widget */}
        <div className="flowos-card flex flex-col items-center justify-center text-center relative group">
          <div className="flex items-center justify-between w-full mb-8">
            <h3 className="font-display text-[18px] font-bold text-text-1">Focus Mode</h3>
            <span className="flowos-badge text-accent-cyan border-accent-cyan/20 bg-accent-cyan/5">Pomodoro</span>
          </div>

          <div className="relative size-48 mb-8">
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-white/[0.05]"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className="text-brand transition-all duration-1000 ease-linear"
                strokeWidth="4"
                strokeDasharray="282.7"
                strokeDashoffset="70"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-[42px] font-bold text-text-1 leading-none">25:00</span>
              <span className="text-[12px] text-text-3 font-medium mt-1">Deep Work</span>
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flowos-shadcn-btn-primary group">
                <Play className="size-4 mr-2 fill-current" />
                Start Session
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-5 bg-surface-2 border border-white/[0.07] rounded-[18px] shadow-2xl">
              <div className="space-y-4">
                <h4 className="text-[14px] font-bold text-text-1">Start a focus session</h4>
                <div className="space-y-1.5">
                  <label className="flowos-label">Working on</label>
                  <Select>
                    <SelectTrigger className="h-9 text-[13px]">
                      <SelectValue placeholder="Select a task (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Design FlowOS Dashboard</SelectItem>
                      <SelectItem value="2">Review analytics report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="flowos-label">Duration</label>
                  <div className="flex gap-1.5">
                    {['25m', '50m', 'Custom'].map(d => (
                      <button key={d} className={cn(
                        "flex-1 h-8 rounded-[6px] text-[12px] font-medium transition-all",
                        d === '25m' ? "bg-brand text-white" : "bg-surface-3 text-text-2 hover:bg-surface-4"
                      )}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/focus')}
                  className="flowos-shadcn-btn-primary w-full h-9 text-[13px]"
                >
                  Start session
                </button>
              </div>
            </PopoverContent>
          </Popover>
          
          <p className="text-[12px] text-text-3 mt-6">
            Next: <span className="text-text-2 font-medium">Short Break (5m)</span>
          </p>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Habits */}
        <div className="flowos-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-[18px] font-bold text-text-1">Today's Habits</h3>
            <Link href="/habits" className="text-[12px] text-brand-light font-medium hover:underline">View all</Link>
          </div>
          
          <div className="space-y-3">
            {[
              { id: '1', name: 'Morning Meditation', streak: 12, done: true, color: 'bg-brand', emoji: '🧘' },
              { id: '2', name: 'Read 20 Pages', streak: 5, done: true, color: 'bg-accent-cyan', emoji: '📚' },
              { id: '3', name: 'Deep Work Session', streak: 28, done: false, color: 'bg-warning', emoji: '🎯' },
              { id: '4', name: 'Evening Walk', streak: 0, done: false, color: 'bg-success', emoji: '🚶' },
            ].map((habit) => (
              <div key={habit.id} className="flex items-center justify-between p-3 rounded-10 bg-surface-3/50 border border-white/[0.03] group hover:bg-surface-3 transition-colors">
                <Link href={`/habits/${habit.id}`} className="flex items-center gap-3 flex-1">
                  <div className={cn("size-2.5 rounded-full", habit.color)} />
                  <div>
                    <p className={cn("text-[14px] font-medium transition-colors", habit.done ? "text-text-4 line-through" : "text-text-1")}>
                      {habit.name}
                    </p>
                    <p className="text-[11px] text-text-3">{habit.streak} day streak</p>
                  </div>
                </Link>
                
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="size-8 rounded-full flex items-center justify-center text-text-4 hover:text-text-2 opacity-0 group-hover:opacity-100 transition-all">
                        <StickyNote size={14} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[260px] p-4 bg-surface-2 border border-white/[0.07] rounded-[14px] shadow-2xl">
                      <div className="space-y-4">
                        <h4 className="text-[13px] font-bold text-text-1 truncate">{habit.name}</h4>
                        <textarea 
                          className="w-full bg-surface-3 border border-white/[0.07] rounded-[8px] p-2.5 text-[13px] text-text-1 placeholder:text-text-4 focus:outline-none focus:border-brand transition-colors resize-none"
                          rows={2}
                          placeholder="Add a note for today..."
                          value={habitNote}
                          onChange={(e) => setHabitNote(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button className="flowos-shadcn-btn-primary flex-1 h-8 text-[12px]">Log with note</button>
                          <button className="text-[11px] text-text-3 hover:text-text-1 transition-colors px-2">Skip</button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <button className={cn(
                    "size-6 rounded-full border flex items-center justify-center transition-all",
                    habit.done 
                      ? "bg-success border-success text-white" 
                      : "border-white/10 text-transparent hover:border-brand hover:text-brand/50"
                  )}>
                    <CheckCircle2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Tasks */}
        <div className="flowos-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-[18px] font-bold text-text-1">Active Tasks</h3>
            <button className="size-8 rounded-full bg-brand/10 text-brand flex items-center justify-center hover:bg-brand/20 transition-colors">
              <Plus className="size-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { id: '1', title: 'Design FlowOS Dashboard', priority: 'high', due: 'Today', done: false },
              { id: '2', title: 'Review analytics report', priority: 'medium', due: 'Tomorrow', done: false },
              { id: '3', title: 'Update project documentation', priority: 'low', due: 'Mar 12', done: true },
              { id: '4', title: 'Team sync meeting', priority: 'high', due: 'Today', done: false },
            ].map((task) => (
              <Link href={`/tasks/${task.id}`} key={task.id} className="flex items-center justify-between p-3 rounded-10 bg-surface-3/50 border border-white/[0.03] group hover:bg-surface-3 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "size-2 rounded-full",
                    task.priority === 'high' ? "bg-danger" : task.priority === 'medium' ? "bg-warning" : "bg-text-4"
                  )} />
                  <div>
                    <p className={cn("text-[14px] font-medium transition-colors", task.done ? "text-text-4 line-through" : "text-text-1")}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px]",
                        task.due === 'Today' ? "bg-danger/10 text-danger" : "bg-white/5 text-text-3"
                      )}>
                        {task.due}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="size-5 rounded-full border border-white/10" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
