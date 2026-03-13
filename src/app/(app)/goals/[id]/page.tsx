import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Target, 
  Calendar, 
  TrendingUp, 
  MoreHorizontal, 
  Pencil, 
  Plus, 
  CheckCircle2, 
  BookOpen,
  ArrowUpRight,
  Flame
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const chartData = [
  { name: 'Mar 01', progress: 10 },
  { name: 'Mar 03', progress: 15 },
  { name: 'Mar 05', progress: 25 },
  { name: 'Mar 07', progress: 40 },
  { name: 'Mar 09', progress: 45 },
  { name: 'Mar 10', progress: 45 },
];

export const GoalDetailPage = () => {
  const { id } = useParams();

  const goal = {
    id,
    title: 'Launch SaaS Product',
    category: 'Career',
    categoryEmoji: '💼',
    status: 'Active',
    targetDate: 'Aug 01, 2026',
    createdDate: 'Jan 15, 2026',
    daysRemaining: 144,
    progress: 45,
    description: 'Build and launch a fully functional productivity platform for creative professionals. This includes MVP features, beta testing, and marketing strategy.',
    keyResults: [
      { id: '1', title: 'Complete MVP features', current: 8, target: 10, unit: 'features', pct: 80, lastUpdated: '2 days ago' },
      { id: '2', title: 'Beta test with 50 users', current: 12, target: 50, unit: 'users', pct: 24, lastUpdated: 'Yesterday' },
      { id: '3', title: 'Finalize pricing model', current: 1, target: 1, unit: 'model', pct: 100, lastUpdated: '1 week ago' },
    ]
  };

  return (
    <div className="max-w-[960px] mx-auto space-y-8 animate-fade-in">
      {/* Back Navigation */}
      <Link to="/goals" className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 transition-colors">
        <ChevronLeft size={16} />
        Back to Goals
      </Link>

      {/* Header Section */}
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flowos-badge">{goal.categoryEmoji} {goal.category}</span>
            <span className="flowos-badge text-brand border-brand/20 bg-brand/5">{goal.status}</span>
          </div>
          <h1 className="font-display text-[36px] font-bold tracking-[-1px] text-text-1 leading-tight">
            {goal.title}
          </h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[13px] text-text-3">
              <Calendar size={14} /> Target: {goal.targetDate}
            </span>
            <span className="text-text-4">•</span>
            <span className="text-[13px] text-text-3 font-bold text-brand-light">{goal.daysRemaining} days left</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="flowos-shadcn-btn-primary h-10 px-6 text-[13px] w-auto">
            <TrendingUp size={16} className="mr-2" /> Update Progress
          </button>
          <button className="flowos-shadcn-btn-secondary h-10 px-4 text-[13px] w-auto">
            <Pencil size={16} className="mr-2" /> Edit
          </button>
          <button className="size-10 rounded-10 border border-white/[0.07] flex items-center justify-center text-text-3 hover:text-text-1 transition-all">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Progress Overview Card */}
      <div className="flowos-card p-8 flex items-center gap-12">
        <div className="relative size-32 shrink-0">
          <svg className="size-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" className="text-white/[0.03]" strokeWidth="10"/>
            <circle 
              cx="60" cy="60" r="54" fill="none" stroke="currentColor" 
              className="text-brand transition-all duration-1000" 
              strokeWidth="10"
              strokeDasharray="339.3"
              strokeDashoffset={339.3 - (goal.progress / 100) * 339.3}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[32px] font-bold text-text-1">{goal.progress}%</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="font-display text-[20px] font-bold text-text-1">1 of 3 key results complete</h3>
            <p className="text-[14px] text-text-2 mt-1 leading-relaxed">{goal.description}</p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-[11px] text-text-4 uppercase tracking-wider font-bold">Last Updated</p>
              <p className="text-[14px] text-text-1 font-medium">Yesterday</p>
            </div>
            <div>
              <p className="text-[11px] text-text-4 uppercase tracking-wider font-bold">Created</p>
              <p className="text-[14px] text-text-1 font-medium">{goal.createdDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Key Results */}
          <div className="space-y-4">
            <span className="flowos-label">Key Results</span>
            <div className="space-y-3">
              {goal.keyResults.map(kr => (
                <div key={kr.id} className="flowos-card p-5 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <button className={cn(
                        "size-5 rounded-full border flex items-center justify-center transition-all shrink-0 mt-0.5",
                        kr.pct >= 100 ? "bg-success border-success text-white" : "border-white/20 text-transparent hover:border-brand"
                      )}>
                        <CheckCircle2 size={12} />
                      </button>
                      <span className={cn("text-[15px] font-bold", kr.pct >= 100 ? "text-text-4 line-through" : "text-text-1")}>
                        {kr.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-[12px] font-bold px-2 py-0.5 rounded-full",
                        kr.pct >= 100 ? "bg-success/10 text-success" : "bg-white/5 text-text-3"
                      )}>
                        {kr.pct}%
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 text-text-4 hover:text-text-1 transition-all">
                        <Pencil size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden mb-3">
                    <div 
                      className={cn("h-full transition-all duration-700", kr.pct >= 100 ? "bg-success" : "bg-brand")} 
                      style={{ width: `${kr.pct}%` }} 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-text-3 font-medium">{kr.current} / {kr.target} {kr.unit}</span>
                    <span className="text-[11px] text-text-4 italic">Updated {kr.lastUpdated}</span>
                  </div>
                </div>
              ))}
              <button className="flowos-shadcn-btn-secondary h-11 border-dashed border-white/10 bg-transparent hover:bg-white/[0.02]">
                <Plus size={16} className="mr-2" /> Add Key Result
              </button>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="space-y-4">
            <span className="flowos-label">Progress Over Time</span>
            <div className="flowos-card p-6 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(55% 0.22 264)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="oklch(55% 0.22 264)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'oklch(45% 0.028 258)', fontSize: 11 }} dy={10} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'oklch(17% 0.032 260)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="progress" stroke="oklch(55% 0.22 264)" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-surface-1 rounded-14 border border-white/[0.07] p-6 sticky top-6 space-y-8">
            <div className="space-y-6">
              <h3 className="flowos-label">Quick Update</h3>
              <div className="space-y-4">
                {goal.keyResults.map(kr => (
                  <div key={kr.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[12px] text-text-2 truncate flex-1 mr-4">{kr.title}</span>
                      <span className="text-[11px] text-text-4">{kr.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        defaultValue={kr.current} 
                        className="flowos-shadcn-input h-9 text-center font-bold"
                      />
                      <span className="text-text-4">/</span>
                      <span className="text-[13px] text-text-3 w-10">{kr.target}</span>
                    </div>
                  </div>
                ))}
                <button className="flowos-shadcn-btn-primary h-10 text-[13px] mt-2">Save Update</button>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/[0.07]">
              <h3 className="flowos-label">Linked Habits</h3>
              <div className="space-y-2">
                {[
                  { name: 'Morning Meditation', emoji: '🧘', color: '#556eff', streak: 12 },
                  { name: 'Read 20 Pages', emoji: '📚', color: '#00f2ff', streak: 5 },
                ].map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-10 hover:bg-white/[0.03] transition-all cursor-pointer group">
                    <div className="size-8 rounded-full flex items-center justify-center text-sm shrink-0" style={{ background: `${h.color}20` }}>
                      {h.emoji}
                    </div>
                    <span className="text-[13px] text-text-1 font-medium flex-1 truncate">{h.name}</span>
                    <span className="text-[11px] text-success font-bold">{h.streak}d</span>
                  </div>
                ))}
                <button className="w-full py-2 text-[12px] text-brand-light font-bold hover:underline flex items-center justify-center gap-2">
                  <Plus size={14} /> Link a habit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
