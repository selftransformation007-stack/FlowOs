import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Timer, 
  TrendingUp, 
  BarChart2, 
  Target, 
  Clock 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const mockReport = {
  id: '1',
  weekStartDate: 'Mar 2, 2026',
  weekEndDate: 'Mar 8, 2026',
  generatedDate: 'Mar 9, 2026',
  overallScore: 84,
  vsLastWeek: '+12%',
  factors: [
    { name: 'Habit Consistency', score: 92, color: 'text-success' },
    { name: 'Task Completion', score: 78, color: 'text-brand' },
    { name: 'Focus Intensity', score: 85, color: 'text-accent-cyan' },
    { name: 'Wellbeing Balance', score: 81, color: 'text-warning' },
  ],
  habits: [
    { name: 'Morning Meditation', days: [1, 1, 1, 0, 1, 1, 1], rate: 85, streak: 12, color: 'bg-brand' },
    { name: 'Read 30 mins', days: [1, 1, 0, 1, 1, 0, 1], rate: 71, streak: 5, color: 'bg-success' },
    { name: 'Exercise', days: [0, 1, 0, 1, 0, 1, 0], rate: 43, streak: 1, color: 'bg-danger' },
  ],
  focusData: [
    { name: 'Mon', focus: 120, break: 30 },
    { name: 'Tue', focus: 180, break: 45 },
    { name: 'Wed', focus: 150, break: 30 },
    { name: 'Thu', focus: 210, break: 60 },
    { name: 'Fri', focus: 90, break: 20 },
    { name: 'Sat', focus: 45, break: 15 },
    { name: 'Sun', focus: 0, break: 0 },
  ],
  aiSummary: 'This was a highly productive week with strong habit consistency. Your focus sessions were 15% longer on average compared to last week. However, your exercise habit dropped slightly on Wednesday and Friday.',
  highlights: [
    'Completed 18 tasks, exceeding your weekly goal by 3.',
    'Maintained a 12-day streak for Morning Meditation.',
    'Achieved deep focus for over 14 hours total.',
    'Successfully launched the FlowOS Beta.'
  ]
};

export const AnalyticsReportPage = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-[900px] mx-auto animate-fade-in pb-20">
      <button 
        onClick={() => navigate('/analytics')}
        className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        Back to Analytics
      </button>

      <div className="flex items-start justify-between mb-10">
        <div>
          <span className="flowos-label">Weekly Report</span>
          <h1 className="font-display text-[32px] font-bold text-text-1 tracking-[-0.5px] mt-1">
            Week of {mockReport.weekStartDate} – {mockReport.weekEndDate}
          </h1>
          <p className="text-[14px] text-text-4 mt-1 font-medium">Generated {mockReport.generatedDate}</p>
        </div>
        <button className="flowos-shadcn-btn-secondary h-10 px-6 text-[13px] font-bold">
          <Download size={16} className="mr-2"/> Export PDF
        </button>
      </div>

      <div className="space-y-8">
        {/* Overall Score */}
        <div className="flowos-card p-8 bg-surface-1 border-white/[0.07]">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="relative size-[200px] flex flex-col items-center justify-center shrink-0">
              <svg className="size-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" className="text-surface-3" strokeWidth="8" strokeDasharray="157 314" />
                <circle 
                  cx="60" cy="60" r="50" fill="none" 
                  stroke="var(--brand)" 
                  strokeWidth="8" 
                  strokeDasharray="157 314" 
                  strokeDashoffset={157 - (mockReport.overallScore / 100) * 157} 
                  strokeLinecap="round" 
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                <span className="font-display text-[52px] font-bold text-text-1 leading-none">{mockReport.overallScore}</span>
                <span className="text-[12px] text-text-4 font-bold uppercase tracking-wider mt-1">Flow Score</span>
                <div className="mt-2 px-2 py-0.5 rounded-full bg-success/10 text-success text-[11px] font-bold">
                  {mockReport.vsLastWeek} vs last week
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full">
              {mockReport.factors.map(factor => (
                <div key={factor.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-text-3 font-bold uppercase tracking-wider">{factor.name}</span>
                    <span className={cn("text-[14px] font-bold", factor.color)}>{factor.score}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-1000", factor.color.replace('text-', 'bg-'))} style={{ width: `${factor.score}%` }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="flowos-card p-8 border border-brand/20 bg-brand/5">
          <div className="flex items-start gap-5">
            <div className="size-10 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-0.5 border border-brand/30">
              <Sparkles size={20} className="text-brand-light"/>
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-bold text-text-1 mb-3">Weekly Summary & Insights</p>
              <p className="text-[15px] text-text-2 leading-relaxed mb-6 font-medium">{mockReport.aiSummary}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockReport.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-[12px] border border-white/[0.03]">
                    <CheckCircle2 size={16} className="text-success mt-0.5 shrink-0"/>
                    <span className="text-[13px] text-text-2 font-medium leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Habit Performance Table */}
        <div className="space-y-4">
          <span className="flowos-label">Habit Consistency</span>
          <div className="flowos-card p-0 overflow-hidden border-white/[0.07]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-3/50 border-b border-white/[0.07]">
                    <th className="px-6 py-4 text-[11px] text-text-4 font-bold uppercase tracking-wider">Habit</th>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <th key={i} className="px-2 py-4 text-[11px] text-text-4 font-bold uppercase tracking-wider text-center">{d}</th>
                    ))}
                    <th className="px-6 py-4 text-[11px] text-text-4 font-bold uppercase tracking-wider text-right">Rate</th>
                    <th className="px-6 py-4 text-[11px] text-text-4 font-bold uppercase tracking-wider text-right">Streak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {mockReport.habits.map((habit, i) => (
                    <tr key={i} className="hover:bg-surface-3 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("size-2 rounded-full", habit.color)} />
                          <span className="text-[14px] font-bold text-text-1">{habit.name}</span>
                        </div>
                      </td>
                      {habit.days.map((day, j) => (
                        <td key={j} className="px-2 py-4 text-center">
                          <div className={cn(
                            "size-6 rounded-full mx-auto flex items-center justify-center transition-all",
                            day ? "bg-success/20 text-success border border-success/30" : "bg-white/5 text-text-4 border border-white/5"
                          )}>
                            {day ? <CheckCircle2 size={12} /> : <div className="size-1 rounded-full bg-text-4" />}
                          </div>
                        </td>
                      ))}
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "text-[12px] font-bold px-2 py-0.5 rounded-full",
                          habit.rate > 80 ? "bg-success/15 text-success" : habit.rate > 50 ? "bg-warning/15 text-warning" : "bg-danger/15 text-danger"
                        )}>
                          {habit.rate}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Flame size={14} className="text-warning" />
                          <span className="text-[14px] font-bold text-text-1">{habit.streak}d</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Focus Breakdown */}
        <div className="space-y-4">
          <span className="flowos-label">Focus Breakdown</span>
          <div className="flowos-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="space-y-1">
                <p className="text-[11px] text-text-4 font-bold uppercase tracking-wider">Total Focus</p>
                <p className="font-display text-[28px] font-bold text-text-1">14h 30m</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-text-4 font-bold uppercase tracking-wider">Avg. Session</p>
                <p className="font-display text-[28px] font-bold text-text-1">24m</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-text-4 font-bold uppercase tracking-wider">Intensity Score</p>
                <p className="font-display text-[28px] font-bold text-accent-cyan">85%</p>
              </div>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockReport.focusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'oklch(45% 0.028 258)', fontSize: 11, fontWeight: 600 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    contentStyle={{ 
                      backgroundColor: 'oklch(17% 0.032 260)', 
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  />
                  <Bar dataKey="focus" fill="var(--brand)" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar dataKey="break" fill="var(--success)" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-[3px] bg-brand" />
                <span className="text-[12px] text-text-3 font-bold uppercase tracking-wider">Focus Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-[3px] bg-success" />
                <span className="text-[12px] text-text-3 font-bold uppercase tracking-wider">Break Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
