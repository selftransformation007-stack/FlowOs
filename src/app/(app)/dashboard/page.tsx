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
  Zap,
  Target,
  ArrowRight,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
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
import { motion } from 'motion/react';
import { NewTaskModal } from '@/src/components/modals/NewTaskModal';

const chartData = [
  { name: 'MON', habits: 80, tasks: 60 },
  { name: 'TUE', habits: 100, tasks: 80 },
  { name: 'WED', habits: 70, tasks: 90 },
  { name: 'THU', habits: 90, tasks: 70 },
  { name: 'FRI', habits: 110, tasks: 100 },
  { name: 'SAT', habits: 60, tasks: 40 },
  { name: 'SUN', habits: 50, tasks: 30 },
];

const StatCard = ({ icon: Icon, label, value, subValue, trend, trendColor }: any) => (
  <motion.div 
    whileHover={{ y: -4, scale: 1.02 }}
    className="flowos-card relative overflow-hidden group border border-white/[0.04]"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex items-center justify-between mb-8">
      <div className="size-12 rounded-2xl bg-surface-3 flex items-center justify-center text-brand border border-white/[0.03]">
        <Icon className="size-5" />
      </div>
      {trend && (
        <span className={cn("text-[11px] font-black px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.04] flex items-center gap-1", trendColor)}>
           <TrendingUp size={10} /> {trend}
        </span>
      )}
    </div>
    <div className="space-y-1">
      <h3 className="font-display text-[32px] font-black text-white italic tracking-tighter leading-none mb-2">
        {value}
      </h3>
      <p className="label-section text-text-4">
        {label}
      </p>
    </div>
    {subValue && (
      <p className="text-[11px] text-text-4 mt-6 pt-4 border-t border-white/[0.03] font-medium italic opacity-60">
        {subValue}
      </p>
    )}
  </motion.div>
);

export default function DashboardPage() {
  const router = useRouter();
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  return (
    <div className="space-y-12 pb-24">
      <NewTaskModal open={isNewTaskModalOpen} onOpenChange={setIsNewTaskModalOpen} />

      {/* Immersive Header Block */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flowos-card relative overflow-hidden bg-surface-1 shadow-2xl"
      >
        <div className="absolute inset-0 bg-linear-to-br from-brand/10 via-brand/5 to-transparent blur-3xl opacity-50 -z-10" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
          <div className="space-y-8 flex-1">
            <div className="flex flex-wrap items-center gap-4">
               <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-2 border border-white/[0.06]">
                 <div className="size-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_var(--color-success)]" />
                 <span className="text-[10px] font-black text-text-2 tracking-widest uppercase italic">Neural Sync Active</span>
               </div>
               <span className="bg-brand/10 text-brand text-[10px] font-black px-3 py-1.5 rounded-full border border-brand/20 tracking-[0.2em] uppercase">V.4.2 — ALPHA</span>
            </div>
            <div className="space-y-4">
              <h1 className="font-display text-[48px] lg:text-[64px] font-black tracking-tighter text-white leading-[0.9] italic">
                GOOD MORNING,<br /> 
                <span className="text-gradient">OPERATOR.</span>
              </h1>
              <p className="text-[15px] md:text-[18px] text-text-3 font-medium max-w-[540px] leading-relaxed">
                Biological telemetry indicates peak performance capacity. You have <span className="text-white font-black underline underline-offset-8 decoration-brand/50">4 protocols</span> awaiting immediate synchronization.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button 
              onClick={() => setIsNewTaskModalOpen(true)}
              className="btn-primary h-14 px-8 rounded-2xl shadow-xl shadow-brand/20 text-[14px]"
            >
              <Zap size={20} className="fill-brand-light" />
              <span>INITIALIZE PROTOCOL</span>
            </button>
            <button className="btn-secondary h-14 px-8 rounded-2xl group border-white/[0.08] text-[14px]">
              <span>AUDIT SYSTEM</span>
              <ArrowUpRight size={18} className="ml-3 text-text-4 group-hover:text-text-1 transition-all" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Primary Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          icon={Flame} 
          label="Habitual Cycles" 
          value="6 / 8" 
          trend="+12%"
          trendColor="text-success"
          subValue="75% Synchronization Rate"
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Protocols Resolved" 
          value="12" 
          trend="+4"
          trendColor="text-success"
          subValue="Efficiency Peak Today"
        />
        <StatCard 
          icon={Timer} 
          label="Deep Sync Time" 
          value="4h 20m" 
          trend="+22m"
          trendColor="text-brand"
          subValue="2 Segments Remaining"
        />
        <StatCard 
          icon={CalendarIcon} 
          label="Consistency Pulse" 
          value="14D" 
          subValue="Personal Record: 21D"
        />
      </div>

      {/* Analytical Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="lg:col-span-2 flowos-card relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-10 blur-xl pointer-events-none">
             <TrendingUp size={120} className="text-brand" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="space-y-2">
              <h3 className="font-display text-[22px] font-black text-white italic tracking-tight uppercase">Performance Mapping</h3>
              <p className="label-section">Weekly Cycle Analysis</p>
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]" />
                <span className="text-[10px] font-black text-text-4 tracking-widest uppercase italic">Habits</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-white/10" />
                <span className="text-[10px] font-black text-text-4 tracking-widest uppercase italic">Tasks</span>
              </div>
            </div>
          </div>
          
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="12 12" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'oklch(45% 0.028 258)', fontSize: 10, fontWeight: 900, letterSpacing: '0.1em' }}
                  dy={20}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ 
                    backgroundColor: 'oklch(15% 0.032 260)', 
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#fff',
                    padding: '12px'
                  }}
                />
                <Bar dataKey="habits" stackId="a" fill="var(--color-brand)" radius={[0, 0, 0, 0]} barSize={40} />
                <Bar dataKey="tasks" stackId="a" fill="rgba(255,255,255,0.08)" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Temporal Matrix Control */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flowos-card flex flex-col items-center border border-brand/10 bg-brand-dim/5"
        >
          <div className="w-full flex items-center justify-between mb-12">
            <h3 className="font-display text-[20px] font-black text-white italic tracking-tight uppercase">Deep Sync</h3>
            <div className="px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[9px] font-black tracking-widest uppercase italic">POMODORO</div>
          </div>

          <div className="relative size-56 mb-12">
            <div className="absolute inset-0 rounded-full border border-white/[0.04] p-4">
              <div className="size-full rounded-full border-4 border-dashed border-white/[0.02]" />
            </div>
            <svg className="size-full -rotate-90 relative z-10" viewBox="0 0 100 100">
              <circle
                className="text-white/[0.03]"
                strokeWidth="3"
                stroke="currentColor"
                fill="transparent"
                r="46"
                cx="50"
                cy="50"
              />
              <circle
                className="text-brand transition-all duration-1000 ease-linear shadow-[0_0_20px_var(--color-brand)]"
                strokeWidth="3"
                strokeDasharray="289"
                strokeDashoffset="72.25"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="46"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center relative z-20">
              <span className="font-display text-[48px] font-black text-white italic tracking-tighter leading-none">25:00</span>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-text-4 mt-2 italic">Cycle Active</span>
            </div>
          </div>

          <button className="btn-primary w-full h-14 rounded-2xl group flex items-center justify-center gap-3 shadow-2xl shadow-brand/20">
            <Play className="size-5 fill-brand-light" />
            <span className="font-black text-[14px]">RESUME FOCUS</span>
          </button>
          
          <div className="mt-8 flex items-center gap-4 py-4 px-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] w-full group hover:bg-white/[0.05] transition-all cursor-pointer">
            <div className="size-10 rounded-xl bg-surface-3 flex items-center justify-center text-text-3 group-hover:text-brand transition-colors">
               <Target size={18} />
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-[9px] font-black text-text-4 tracking-widest uppercase italic mb-1">Target Module</p>
               <p className="text-[12px] font-black text-white truncate uppercase italic tracking-tight">System Synthesis V4</p>
            </div>
            <ChevronRight size={16} className="text-text-4" />
          </div>
        </motion.div>
      </div>

      {/* Modular Status Rails */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flowos-card">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-display text-[24px] font-black text-white italic tracking-tight uppercase">Habitual Cycles</h3>
            <button className="text-[11px] font-black text-brand tracking-widest uppercase italic hover:underline">AUDIT ALL</button>
          </div>
          
          <div className="space-y-4">
            {[
              { id: '1', name: 'Neural Expansion (Reading)', streak: 12, done: true, color: 'bg-brand', emoji: '🧠' },
              { id: '2', name: 'Physical Maintenance', streak: 5, done: true, color: 'bg-accent', emoji: '⚡' },
              { id: '3', name: 'Biological Optimization', streak: 28, done: false, color: 'bg-warning', emoji: '🧬' },
              { id: '4', name: 'Environmental Audit', streak: 0, done: false, color: 'bg-success', emoji: '🌿' },
            ].map((habit) => (
              <motion.div 
                whileHover={{ x: 4 }}
                key={habit.id} 
                className="flex items-center justify-between p-6 rounded-2xl bg-surface-2 border border-white/[0.04] group hover:bg-surface-3 transition-all relative overflow-hidden"
              >
                {habit.done && <div className="absolute inset-0 bg-brand/5 pointer-events-none" />}
                <div className="flex items-center gap-5 relative z-10">
                  <div className={cn("size-2.5 rounded-full shadow-lg", habit.color)} />
                  <div>
                    <p className={cn("text-[15px] font-black uppercase italic tracking-tight transition-colors", habit.done ? "text-text-4 line-through opacity-40" : "text-text-1")}>
                      {habit.name}
                    </p>
                    <p className="text-[10px] font-black text-text-4 tracking-widest opacity-60 mt-1 uppercase italic">Cycle: {habit.streak} Days</p>
                  </div>
                </div>
                
                <button className={cn(
                  "size-11 rounded-xl border flex items-center justify-center transition-all relative z-10",
                  habit.done 
                    ? "bg-success border-success text-white shadow-lg shadow-success/20" 
                    : "border-white/10 text-transparent hover:border-brand hover:text-brand"
                )}>
                  <CheckCircle2 size={20} strokeWidth={3} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flowos-card">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-display text-[24px] font-black text-white italic tracking-tight uppercase">Pending Protocols</h3>
            <button className="btn-icon bg-brand/10 text-brand border-brand/20">
              <Plus size={20} strokeWidth={3} />
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { id: '1', title: 'Synthesize Dashboard UI', priority: 'high', due: 'Awaiting', done: false },
              { id: '2', title: 'Audit Analytics Module', priority: 'med', due: 'Tomorrow', done: false },
              { id: '3', title: 'Calibrate Notification Hub', priority: 'low', due: 'Processed', done: true },
              { id: '4', title: 'Team Sync Sync-Point', priority: 'high', due: 'Awaiting', done: false },
            ].map((task) => (
              <motion.div 
                whileHover={{ x: 4 }}
                key={task.id} 
                className="flex items-center justify-between p-6 rounded-2xl bg-surface-2 border border-white/[0.04] group hover:bg-surface-3 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center gap-5 relative z-10">
                  <div className={cn(
                    "size-2.5 rounded-full",
                    task.priority === 'high' ? "bg-danger shadow-[0_0_8px_var(--color-danger)]" : task.priority === 'med' ? "bg-warning shadow-[0_0_8px_var(--color-warning)]" : "bg-text-4"
                  )} />
                  <div>
                    <h4 className={cn("text-[15px] font-black uppercase italic tracking-tight transition-colors", task.done ? "text-text-4 line-through opacity-40" : "text-text-1")}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5 opacity-60">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-md border",
                        task.due === 'Awaiting' ? "bg-danger-dim border-danger/20 text-danger" : "bg-white/5 border-white/10 text-text-4"
                      )}>
                        {task.due}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="size-6 rounded-lg border-2 border-white/10 group-hover:border-brand transition-all font-black text-[10px] flex items-center justify-center text-transparent group-hover:text-brand">
                   {task.priority[0].toUpperCase()}
                </div>
              </motion.div>
            ))}
          </div>
          
          <button className="w-full h-14 mt-10 bg-white/[0.02] border border-dashed border-white/[0.08] rounded-2xl text-[11px] font-black text-text-4 uppercase tracking-[0.2em] hover:bg-white/[0.04] hover:text-text-2 transition-all italic">
            LOAD ALL PROTOCOLS
          </button>
        </div>
      </div>
    </div>

  );
}

