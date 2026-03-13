import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  Flame, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Calendar,
  Target,
  Bell,
  Palette,
  Plus,
  Check
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const HabitDetailPage = () => {
  const { id } = useParams();
  const [loggedToday, setLoggedToday] = React.useState(false);

  // Mock data for the habit
  const habit = {
    id,
    name: 'Morning Meditation',
    emoji: '🧘',
    category: 'Mindfulness',
    color: '#556eff',
    frequency: 'Daily',
    createdDate: 'Dec 1, 2025',
    streak: 12,
    best: 21,
    total: 84,
    rate: 85,
    description: 'A daily practice to clear the mind and improve focus for the day ahead.',
  };

  return (
    <div className="max-w-[900px] mx-auto space-y-8 animate-fade-in">
      {/* Back Navigation */}
      <Link to="/habits" className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 transition-colors">
        <ChevronLeft size={16} />
        Back to Habits
      </Link>

      {/* Header Section */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-5">
          <div 
            className="size-[72px] rounded-[18px] flex items-center justify-center text-[32px] shrink-0"
            style={{ backgroundColor: `${habit.color}20`, border: `2px solid ${habit.color}40` }}
          >
            {habit.emoji}
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-[28px] font-bold tracking-[-0.5px] text-text-1 leading-none">
              {habit.name}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flowos-badge">{habit.category}</span>
              <span className="flowos-badge">{habit.frequency}</span>
              <span className="text-[12px] text-text-3">Since {habit.createdDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flowos-shadcn-btn-secondary h-9 px-4 text-[13px] w-auto">
            <Pencil size={14} className="mr-2" /> Edit
          </button>
          <button className="size-9 rounded-10 border border-white/[0.07] flex items-center justify-center text-text-3 hover:text-text-1 transition-all">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Streak', value: habit.streak, sub: 'day streak', icon: <Flame size={16} className="text-warning" />, color: 'text-success' },
          { label: 'Best Streak', value: habit.best, sub: 'personal best', icon: <Trophy size={16} className="text-warning" />, color: 'text-text-1' },
          { label: 'Total Completions', value: habit.total, sub: 'all time logged', icon: null, color: 'text-text-1' },
          { label: 'Completion Rate', value: `${habit.rate}%`, sub: 'last 30 days', icon: null, color: 'text-success' },
        ].map((stat, i) => (
          <div key={i} className="flowos-card flex flex-col gap-1 p-5">
            <span className="text-[12px] text-text-3">{stat.label}</span>
            <div className="flex items-center gap-2">
              <span className={cn("font-display text-[28px] font-bold leading-none", stat.color)}>{stat.value}</span>
              {stat.icon}
            </div>
            <span className="text-[12px] text-text-3">{stat.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Today's Log */}
          <div className="flowos-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="flowos-label">Today</span>
                <p className="text-[14px] text-text-2">Tuesday, March 10</p>
              </div>
              
              {!loggedToday ? (
                <button 
                  onClick={() => setLoggedToday(true)}
                  className="flowos-shadcn-btn-primary h-10 px-6 w-auto"
                >
                  <CheckCircle2 size={18} className="mr-2" /> Log today
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[14px] font-bold text-success">
                    <CheckCircle2 size={18} /> Logged
                  </span>
                  <button 
                    onClick={() => setLoggedToday(false)}
                    className="text-[12px] text-text-4 hover:text-danger transition-colors font-medium"
                  >
                    Undo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="flowos-card p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="flowos-label">Activity — Full Year</span>
              <div className="flex items-center gap-2 text-[10px] text-text-4">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0.1, 0.3, 0.6, 0.9].map(o => <div key={o} className="size-3 rounded-[2px] bg-brand" style={{ opacity: o }} />)}
                </div>
                <span>More</span>
              </div>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
              {Array.from({ length: 52 }).map((_, weekIndex) => (
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
          </div>

          {/* Monthly Calendar */}
          <div className="flowos-card p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-[16px] font-bold text-text-1">March 2026</span>
              <div className="flex gap-2">
                <button className="size-8 rounded-full hover:bg-surface-3 flex items-center justify-center text-text-3"><ChevronLeft size={16}/></button>
                <button className="size-8 rounded-full hover:bg-surface-3 flex items-center justify-center text-text-3"><ChevronRight size={16}/></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <span key={d} className="text-[11px] font-bold text-text-4 uppercase tracking-wider">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const isToday = day === 10;
                const isDone = Math.random() > 0.4;
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square flex items-center justify-center rounded-full text-[13px] font-medium relative",
                      isToday ? "ring-2 ring-brand ring-offset-2 ring-offset-surface-2 bg-brand text-white" :
                      isDone ? "bg-success/20 text-success border border-success/30" : "text-text-3 border border-white/[0.05]"
                    )}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface-1 rounded-14 border border-white/[0.07] p-6 sticky top-6">
            <h3 className="flowos-label mb-6">About this habit</h3>
            <div className="space-y-4">
              {[
                { icon: <Flame size={14} />, label: 'Frequency', value: habit.frequency },
                { icon: <Bell size={14} />, label: 'Reminder', value: '8:00 AM' },
                { icon: <Target size={14} />, label: 'Category', value: habit.category },
                { icon: <Palette size={14} />, label: 'Color', value: <div className="size-3 rounded-full" style={{ backgroundColor: habit.color }} /> },
                { icon: <Calendar size={14} />, label: 'Created', value: habit.createdDate },
              ].map((prop, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <span className="flex items-center gap-2 text-[12px] text-text-3">
                    {prop.icon} {prop.label}
                  </span>
                  <span className="text-[13px] text-text-1 font-medium">{prop.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <button className={cn(
                "w-full h-11 rounded-10 font-display font-bold text-sm transition-all flex items-center justify-center gap-2",
                loggedToday ? "bg-success/10 text-success border border-success/20" : "bg-brand text-white"
              )}>
                {loggedToday ? <Check size={18}/> : <Plus size={18}/>}
                {loggedToday ? 'Logged today' : 'Log today'}
              </button>
              <button className="flowos-shadcn-btn-secondary h-11">
                <Pencil size={16} className="mr-2" /> Edit habit
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/[0.07]">
              <p className="text-[12px] text-text-3 mb-4 uppercase tracking-wider font-bold">Contributing to</p>
              <div className="flowos-card p-4 bg-surface-2/50 hover:border-brand/40 transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                    <Target size={18} />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-text-1 group-hover:text-brand transition-colors">Improve Health</p>
                    <p className="text-[12px] text-text-3">65% complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
