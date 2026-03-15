"use client";

import React from 'react';
import { BarChart2, TrendingUp, TrendingDown, ArrowUpRight, Calendar, Download, Sparkles, Flame, CheckCircle2, Timer, Monitor } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const trendData = [
  { name: 'Mar 01', score: 65 },
  { name: 'Mar 02', score: 72 },
  { name: 'Mar 03', score: 68 },
  { name: 'Mar 04', score: 85 },
  { name: 'Mar 05', score: 78 },
  { name: 'Mar 06', score: 92 },
  { name: 'Mar 07', score: 88 },
  { name: 'Mar 08', score: 82 },
  { name: 'Mar 09', score: 95 },
  { name: 'Mar 10', score: 82 },
];

const heatmapData = Array.from({ length: 52 }, (_, week) => 
  Array.from({ length: 7 }, (_, day) => ({
    week,
    day,
    value: Math.random() > 0.3 ? Math.floor(Math.random() * 100) : 0
  }))
).flat();

import Link from 'next/link';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[12px] font-medium uppercase tracking-[1px] text-brand-light">
            Performance Insights
          </p>
          <h1 className="font-display text-[36px] font-bold leading-tight tracking-[-1px] text-text-1">
            Analytics
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface-2 rounded-10 border border-white/[0.07] p-1">
            <button className="px-4 py-1.5 text-[13px] font-bold text-text-1 bg-surface-3 rounded-[8px] shadow-sm">Week</button>
            <button className="px-4 py-1.5 text-[13px] font-medium text-text-3 hover:text-text-2">Month</button>
            <button className="px-4 py-1.5 text-[13px] font-medium text-text-3 hover:text-text-2">Quarter</button>
          </div>
          <button className="flowos-shadcn-btn-secondary w-auto px-4 h-10">
            <Download className="size-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Productivity Score Card */}
      <div className="flowos-card p-8 bg-surface-1 border-white/[0.07]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-[14px] text-text-3 font-medium uppercase tracking-wider mb-2">Overall Productivity Score</p>
              <div className="flex items-baseline gap-4">
                <p className="font-display text-[64px] font-bold text-text-1 leading-none">82</p>
                <span className="text-success flex items-center gap-1 text-[16px] font-bold">
                  <ArrowUpRight className="size-5" /> +12%
                </span>
              </div>
              <p className="text-[14px] text-text-3 mt-2">vs previous week</p>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Habits', value: 78, color: 'bg-brand' },
                { label: 'Focus', value: 94, color: 'bg-accent-cyan' },
                { label: 'Tasks', value: 62, color: 'bg-success' },
                { label: 'Screen', value: 80, color: 'bg-danger' },
              ].map(factor => (
                <div key={factor.label} className="space-y-1.5">
                  <div className="flex justify-between text-[12px] font-medium">
                    <span className="text-text-2">{factor.label}</span>
                    <span className="text-text-1">{factor.value}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className={cn("h-full transition-all duration-500", factor.color)} style={{ width: `${factor.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(55% 0.22 264)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="oklch(55% 0.22 264)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'oklch(45% 0.028 258)', fontSize: 11 }}
                  dy={10}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(17% 0.032 260)', 
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="oklch(55% 0.22 264)" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Habit Heatmap */}
        <div className="flowos-card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-[18px] font-bold text-text-1">Habit Consistency</h3>
            <div className="flex items-center gap-2 text-[11px] text-text-4">
              <span>Less</span>
              <div className="flex gap-1">
                {[0.1, 0.3, 0.6, 0.9].map(o => <div key={o} className="size-3 rounded-[2px] bg-brand" style={{ opacity: o }} />)}
              </div>
              <span>More</span>
            </div>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-4 scrollbar-hide">
            {Array.from({ length: 24 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1 shrink-0">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const val = Math.random();
                  return (
                    <div 
                      key={dayIndex} 
                      className="size-3 rounded-[2px] bg-brand transition-all hover:scale-125 cursor-pointer" 
                      style={{ opacity: val > 0.3 ? val : 0.05 }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[11px] text-text-4 uppercase tracking-widest font-bold">
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
          </div>
        </div>

        {/* Weekly Report Insight */}
        <div className="flowos-card bg-brand/5 border-brand/20 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                <Sparkles className="size-5" />
              </div>
              <h3 className="font-display text-[20px] font-bold text-text-1">Weekly Report</h3>
            </div>
            <p className="text-[15px] text-text-2 leading-relaxed">
              You've had an exceptional week! Your focus time is up by <span className="text-brand font-bold">24%</span> and you've completed <span className="text-success font-bold">100%</span> of your morning habits.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
                <p className="text-[13px] text-text-2">Best focus hours: <span className="text-text-1 font-bold">10:00 AM – 12:00 PM</span></p>
              </div>
              <div className="flex items-start gap-3">
                <Flame className="size-5 text-warning shrink-0 mt-0.5" />
                <p className="text-[13px] text-text-2">Longest streak: <span className="text-text-1 font-bold">14 days (Meditation)</span></p>
              </div>
            </div>
          </div>
          <Link href="/analytics/reports/1" className="flowos-shadcn-btn-primary mt-8 flex items-center justify-center">
            View Full Report
          </Link>
        </div>
      </div>

      {/* Detailed Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Focus', value: '142h', icon: Timer, color: 'text-accent-cyan' },
          { label: 'Habits Logged', value: '842', icon: Flame, color: 'text-warning' },
          { label: 'Tasks Done', value: '156', icon: CheckCircle2, color: 'text-success' },
          { label: 'Screen Time', value: '42h', icon: Monitor, color: 'text-danger' },
        ].map(stat => (
          <div key={stat.label} className="flowos-card p-5">
            <div className={cn("size-10 rounded-full flex items-center justify-center mb-4 bg-white/5", stat.color)}>
              <stat.icon className="size-5" />
            </div>
            <p className="font-display text-[24px] font-bold text-text-1">{stat.value}</p>
            <p className="text-[11px] text-text-3 uppercase tracking-wider font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
