"use client";

import React, { useState } from 'react';
import { Monitor, ArrowUpRight, ArrowDownRight, Smartphone, Globe, MessageCircle, Play as PlayIcon, Briefcase, Plus, MoreHorizontal, Pencil } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const categoryData = [
  { name: 'Productive', value: 45, color: 'oklch(78% 0.15 160)' },
  { name: 'Neutral', value: 25, color: 'oklch(75% 0.15 220)' },
  { name: 'Distracting', value: 30, color: 'oklch(63% 0.23 25)' },
];

const hourlyData = Array.from({ length: 12 }, (_, i) => ({
  name: `${i * 2}h`,
  value: Math.floor(Math.random() * 60) + 10,
}));

const appUsage = [
  { name: 'VS Code', category: 'Productive', time: '3h 15m', pct: 45, icon: <Briefcase className="size-4" />, color: 'bg-success' },
  { name: 'Chrome', category: 'Neutral', time: '1h 45m', pct: 25, icon: <Globe className="size-4" />, color: 'bg-accent-cyan' },
  { name: 'Slack', category: 'Social', time: '1h 10m', pct: 15, icon: <MessageCircle className="size-4" />, color: 'bg-brand' },
  { name: 'YouTube', category: 'Entertainment', time: '45m', pct: 10, icon: <PlayIcon className="size-4" />, color: 'bg-danger' },
  { name: 'Twitter', category: 'Distracting', time: '15m', pct: 5, icon: <Smartphone className="size-4" />, color: 'bg-danger' },
];

import { SetScreenTimeLimitModal } from '@/src/components/modals/SetScreenTimeLimitModal';

export default function ScreenTimePage() {
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const handleSetLimit = (app?: any) => {
    setSelectedApp(app || null);
    setIsLimitModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <SetScreenTimeLimitModal open={isLimitModalOpen} onOpenChange={setIsLimitModalOpen} app={selectedApp} />
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[12px] font-medium uppercase tracking-[1px] text-brand-light">
            Digital Wellbeing
          </p>
          <h1 className="font-display text-[36px] font-bold leading-tight tracking-[-1px] text-text-1">
            Screen Time
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface-2 rounded-10 border border-white/[0.07] p-1">
            <button className="px-4 py-1.5 text-[13px] font-bold text-text-1 bg-surface-3 rounded-[8px] shadow-sm">Today</button>
            <button className="px-4 py-1.5 text-[13px] font-medium text-text-3 hover:text-text-2">Yesterday</button>
          </div>
          <button 
            onClick={() => handleSetLimit()}
            className="flowos-shadcn-btn-primary w-auto px-6"
          >
            <Plus className="size-4 mr-2" />
            Set Limit
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flowos-card flex flex-col justify-between p-6">
          <div>
            <p className="text-[12px] text-text-3 font-medium uppercase tracking-wider mb-2">Total Screen Time</p>
            <p className="font-display text-[48px] font-bold text-text-1 leading-none mb-4">6h 14m</p>
            <div className="flex items-center gap-2">
              <span className="text-danger flex items-center gap-1 text-[13px] font-bold">
                <ArrowUpRight className="size-4" /> 1h 22m
              </span>
              <span className="text-[13px] text-text-3">vs yesterday</span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.05]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] text-text-3 font-medium">Daily Goal: 5h 00m</span>
              <span className="text-[12px] text-danger font-bold">Over limit</span>
            </div>
            <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-danger" style={{ width: '124%' }} />
            </div>
          </div>
        </div>

        <div className="flowos-card flex flex-col p-0 overflow-hidden">
          <div className="p-6 pb-0">
            <p className="text-[12px] text-text-3 font-medium uppercase tracking-wider mb-4">Category Breakdown</p>
          </div>
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(17% 0.032 260)', 
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-display text-[24px] font-bold text-text-1">100%</span>
              <span className="text-[10px] text-text-3 uppercase tracking-wider">Usage</span>
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-white/[0.05]">
            {categoryData.map(cat => (
              <div key={cat.name} className="p-3 text-center border-r border-white/[0.05] last:border-0">
                <p className="text-[10px] text-text-4 uppercase tracking-wider mb-1">{cat.name}</p>
                <p className="text-[13px] font-bold text-text-1">{cat.value}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flowos-card p-6">
          <p className="text-[12px] text-text-3 font-medium uppercase tracking-wider mb-6">Hourly Usage</p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'oklch(45% 0.028 258)', fontSize: 10 }}
                />
                <YAxis hide />
                <Bar dataKey="value" fill="oklch(55% 0.22 264)" radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* App Usage List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flowos-card p-0 overflow-hidden">
          <div className="p-6 border-b border-white/[0.07] flex items-center justify-between">
            <h3 className="font-display text-[18px] font-bold text-text-1">App Usage</h3>
            <button className="text-[12px] text-brand-light font-medium hover:underline">View all</button>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {appUsage.map((app, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-surface-3 transition-all cursor-pointer group">
                <div className="flex items-center gap-4 flex-1">
                  <div className={cn("size-10 rounded-full flex items-center justify-center text-white", app.color)}>
                    {app.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[14px] font-bold text-text-1">{app.name}</span>
                      <span className="text-[10px] text-text-3 uppercase tracking-wider bg-white/5 px-1.5 py-0.5 rounded-[4px]">
                        {app.category}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all duration-500", app.color)} style={{ width: `${app.pct}%` }} />
                    </div>
                  </div>
                </div>
                <div className="text-right ml-6">
                  <p className="font-display text-[18px] font-bold text-text-1">{app.time}</p>
                  <p className="text-[11px] text-text-3">{app.pct}% of total</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flowos-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-[18px] font-bold text-text-1">Daily Limits</h3>
              <button className="size-8 rounded-full bg-brand/10 text-brand flex items-center justify-center hover:bg-brand/20 transition-colors">
                <Plus className="size-4" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Social Media', limit: '1h 00m', current: '1h 25m', pct: 141, status: 'Over' },
                { name: 'Entertainment', limit: '2h 00m', current: '0h 45m', pct: 37, status: 'Under' },
                { name: 'News', limit: '0h 30m', current: '0h 25m', pct: 83, status: 'Approaching' },
              ].map((limit, i) => (
                <div key={i} className="p-4 rounded-14 bg-surface-3/50 border border-white/[0.03] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-bold text-text-1">{limit.name}</p>
                      <p className="text-[11px] text-text-3">Limit: {limit.limit}</p>
                    </div>
                    <span className={cn(
                      "flowos-badge",
                      limit.status === 'Over' ? "text-danger border-danger/20 bg-danger/5" :
                      limit.status === 'Approaching' ? "text-warning border-warning/20 bg-warning/5" :
                      "text-success border-success/20 bg-success/5"
                    )}>
                      {limit.status}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-medium">
                      <span className="text-text-2">{limit.current} used</span>
                      <span className="text-text-3">{limit.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full transition-all duration-500", limit.pct > 100 ? "bg-danger" : limit.pct > 80 ? "bg-warning" : "bg-brand")} 
                        style={{ width: `${Math.min(limit.pct, 100)}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flowos-card bg-brand/5 border-brand/20 p-6 flex items-center gap-6">
            <div className="size-14 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Monitor className="size-8" />
            </div>
            <div>
              <h4 className="font-display text-[16px] font-bold text-text-1 mb-1">Auto-track your usage</h4>
              <p className="text-[13px] text-text-2 leading-relaxed mb-3">
                Install the FlowOS browser extension to automatically monitor your screen time across all websites.
              </p>
              <button className="text-[13px] text-brand-light font-bold hover:underline">Install Extension →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
