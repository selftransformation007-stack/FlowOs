import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Target, 
  CalendarDays, 
  TrendingUp, 
  Pencil, 
  MoreHorizontal, 
  CheckCircle2, 
  BookOpen, 
  Plus, 
  Activity,
  CalendarCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/src/components/ui/DropdownMenu';
import { Checkbox } from '@/src/components/ui/Checkbox';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const mockGoal = {
  id: '1',
  title: 'Run a 5K Marathon',
  category: 'Fitness',
  categoryEmoji: '🏃',
  status: 'In Progress',
  targetDate: 'Jun 15, 2026',
  daysRemaining: 97,
  progress: 65,
  description: 'Improve cardiovascular health and complete a full 5K race under 25 minutes.',
  lastUpdated: '2 days ago',
  createdDate: 'Jan 1, 2026',
  keyResults: [
    { id: '1', title: 'Run 3 times a week', current: 3, target: 3, unit: 'times', pct: 100, lastUpdated: 'Today' },
    { id: '2', title: 'Complete 4km run', current: 3.2, target: 4, unit: 'km', pct: 80, lastUpdated: 'Yesterday' },
    { id: '3', title: 'Weight training sessions', current: 8, target: 12, unit: 'sessions', pct: 66, lastUpdated: '3 days ago' },
  ],
  chartData: [
    { date: 'Jan 1', pct: 0 },
    { date: 'Jan 15', pct: 15 },
    { date: 'Feb 1', pct: 25 },
    { date: 'Feb 15', pct: 40 },
    { date: 'Mar 1', pct: 55 },
    { date: 'Mar 10', pct: 65 },
  ],
  notes: [
    { id: '1', date: 'Mar 8, 2026', note: 'Feeling much stronger. Completed a 3.2km run without stopping.', krChanges: [{ title: 'Complete 4km run', prev: 70, new: 80 }] },
    { id: '2', date: 'Mar 1, 2026', note: 'Started the new weight training program.', krChanges: [{ title: 'Weight training sessions', prev: 50, new: 66 }] },
  ]
};

export const GoalDetailPage = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();

  const circumference = 2 * Math.PI * 50;

  return (
    <div className="max-w-[960px] mx-auto animate-fade-in pb-20">
      <button 
        onClick={() => navigate('/goals')}
        className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        Back to Goals
      </button>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 min-w-0 space-y-8">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="flowos-badge">{mockGoal.categoryEmoji} {mockGoal.category}</span>
                <span className="flowos-badge bg-brand/10 text-brand-light border-brand/20">{mockGoal.status}</span>
              </div>
              <h1 className="font-display text-[32px] font-bold tracking-[-1px] text-text-1 leading-tight">
                {mockGoal.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-[13px] text-text-3">
                  <CalendarDays size={14}/> Target: {mockGoal.targetDate}
                </span>
                <span className="text-text-4">·</span>
                <span className="text-[13px] text-text-3">{mockGoal.daysRemaining} days left</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button className="flowos-shadcn-btn-secondary h-9 px-4 text-[13px] font-bold">
                <TrendingUp size={14} className="mr-2"/> Update Progress
              </button>
              <button className="flowos-shadcn-btn-secondary h-9 px-4 text-[13px] font-bold">
                <Pencil size={14} className="mr-2"/> Edit
              </button>
            </div>
          </div>

          {/* Progress Overview Card */}
          <div className="flowos-card p-6 bg-surface-1 border-white/[0.07]">
            <div className="flex items-center gap-8">
              <div className="relative size-[120px] shrink-0">
                <svg className="size-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" className="text-surface-3" strokeWidth="10"/>
                  <circle 
                    cx="60" cy="60" r="50" fill="none" 
                    stroke="var(--brand)" 
                    strokeWidth="10" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={circumference - (mockGoal.progress / 100) * circumference} 
                    strokeLinecap="round" 
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-[28px] font-bold text-text-1 leading-none">{mockGoal.progress}%</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="font-display text-[18px] font-bold text-text-1">1 of 3 key results complete</p>
                  <p className="text-[13px] text-text-2 mt-1 leading-relaxed">{mockGoal.description}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[11px] text-text-3 uppercase tracking-wider font-bold">Last updated</p>
                    <p className="text-[13px] text-text-1 font-medium">{mockGoal.lastUpdated}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-text-3 uppercase tracking-wider font-bold">Created</p>
                    <p className="text-[13px] text-text-1 font-medium">{mockGoal.createdDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Results */}
          <div className="space-y-4">
            <span className="flowos-label">Key Results</span>
            <div className="flex flex-col gap-3">
              {mockGoal.keyResults.map(kr => (
                <div key={kr.id} className="flowos-card p-4 group hover:bg-surface-3 transition-all cursor-pointer border-white/[0.03]">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={kr.pct >= 100}
                          className="mt-0.5 rounded-full border-white/[0.2] data-[state=checked]:bg-success data-[state=checked]:border-success"
                        />
                        <span className={cn(
                          "text-[15px] font-bold",
                          kr.pct >= 100 ? "line-through text-text-4" : "text-text-1"
                        )}>
                          {kr.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={cn(
                          "text-[11px] font-bold px-2 py-0.5 rounded-full",
                          kr.pct >= 100 ? "bg-success/15 text-success" :
                          kr.pct >= 50  ? "bg-warning/15 text-warning" :
                                          "bg-surface-3 text-text-3"
                        )}>
                          {kr.pct}%
                        </span>
                        <button className="size-8 flex items-center justify-center opacity-0 group-hover:opacity-100 text-text-3 hover:text-text-1 transition-all rounded-8 hover:bg-surface-4">
                          <Pencil size={14}/>
                        </button>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden ml-[30px]">
                      <div 
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${kr.pct}%`,
                          background: kr.pct >= 100 ? 'var(--success)' : kr.pct >= 50 ? 'var(--warning)' : 'var(--brand)'
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between ml-[30px]">
                      <span className="text-[12px] text-text-3 font-medium">{kr.current} / {kr.target} {kr.unit}</span>
                      <span className="text-[11px] text-text-4 font-medium">Updated {kr.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button className="flowos-shadcn-btn-secondary h-10 w-full font-bold">
                <Plus size={16} className="mr-2"/> Add Key Result
              </button>
            </div>
          </div>

          {/* Progress Over Time Chart */}
          <div className="space-y-4">
            <span className="flowos-label">Progress over time</span>
            <div className="flowos-card p-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockGoal.chartData}>
                  <defs>
                    <linearGradient id="colorPct" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--brand)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'oklch(45% 0.028 258)', fontSize: 11, fontWeight: 500 }}
                  />
                  <YAxis 
                    hide 
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'oklch(17% 0.032 260)', 
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pct" 
                    stroke="var(--brand)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPct)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Progress Notes */}
          <div className="space-y-4">
            <span className="flowos-label">Progress notes</span>
            <div className="flowos-card p-6">
              <div className="mb-8">
                <textarea
                  placeholder="How's the goal going? What did you work on this week?"
                  rows={3}
                  className="flowos-shadcn-input w-full text-[14px] resize-none bg-surface-2"
                />
                <button className="flowos-shadcn-btn-primary mt-3 h-9 px-6 text-[13px] font-bold">
                  Save note
                </button>
              </div>

              <div className="space-y-0">
                {mockGoal.notes.map((note, i) => (
                  <div key={note.id} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="size-8 rounded-full bg-brand/15 flex items-center justify-center shrink-0 border border-brand/20">
                        <BookOpen size={14} className="text-brand-light"/>
                      </div>
                      {i !== mockGoal.notes.length - 1 && <div className="w-px flex-1 bg-white/[0.06] mt-2 mb-2"/>}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[14px] font-bold text-text-1">Progress update</span>
                        <span className="text-[11px] text-text-4 font-medium">{note.date}</span>
                      </div>
                      <p className="text-[14px] text-text-2 leading-relaxed">{note.note}</p>
                      {note.krChanges && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {note.krChanges.map((change, j) => (
                            <span key={j} className="text-[11px] bg-surface-3 text-text-3 px-2.5 py-1 rounded-full font-bold border border-white/[0.03]">
                              {change.title}: {change.prev}% → {change.new}%
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[300px] shrink-0 space-y-6 sticky top-8">
          <div className="flowos-card p-5 space-y-6">
            <h3 className="flowos-label">About</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                <span className="flex items-center gap-2 text-[12px] text-text-3">
                  <Target size={14} /> Category
                </span>
                <span className="flowos-badge">{mockGoal.category}</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                <span className="flex items-center gap-2 text-[12px] text-text-3">
                  <CalendarDays size={14} /> Created
                </span>
                <span className="text-[13px] text-text-1 font-bold">{mockGoal.createdDate}</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                <span className="flex items-center gap-2 text-[12px] text-text-3">
                  <CalendarCheck size={14} /> Target Date
                </span>
                <span className="text-[13px] text-text-1 font-bold">{mockGoal.targetDate}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="flex items-center gap-2 text-[12px] text-text-3">
                  <Activity size={14} /> Status
                </span>
                <span className="text-[13px] text-brand-light font-bold">{mockGoal.status}</span>
              </div>
            </div>
          </div>

          <div className="flowos-card p-5 space-y-4">
            <h3 className="flowos-label">Quick Update</h3>
            <p className="text-[12px] text-text-3 leading-relaxed">Update key result values</p>
            <div className="space-y-4">
              {mockGoal.keyResults.map(kr => (
                <div key={kr.id} className="space-y-1.5">
                  <span className="text-[12px] text-text-2 font-medium block truncate">{kr.title}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={kr.current}
                      className="flowos-shadcn-input h-8 w-full text-[12px] text-center px-2 bg-surface-2"
                    />
                    <span className="text-[11px] text-text-4 font-bold shrink-0">/{kr.target} {kr.unit}</span>
                  </div>
                </div>
              ))}
              <button className="flowos-shadcn-btn-primary w-full h-10 mt-2 text-[13px] font-bold">
                Save Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
