import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Trophy, 
  MoreHorizontal, 
  Pencil, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  CalendarDays, 
  Bell, 
  Tag, 
  Palette, 
  Plus, 
  Target,
  Check,
  Calendar as CalendarIcon,
  Archive,
  Copy,
  RotateCcw,
  StickyNote
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/src/components/ui/DropdownMenu';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/src/components/ui/Popover';
import { ConfirmDialog } from '@/src/components/ui/ConfirmDialog';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';

const mockHabit = {
  id: '1',
  name: 'Morning Meditation',
  emoji: '🧘',
  category: 'Mindfulness',
  color: '#556eff',
  frequency: 'Daily',
  createdDate: 'Dec 1, 2024',
  streak: 12,
  best: 21,
  total: 85,
  rate: 85,
  reminder: '8:00 AM',
  days: Array(365).fill(0).map(() => Math.random() > 0.3),
  logs: [
    { id: '1', date: new Date(), done: true, note: 'Felt very focused today.' },
    { id: '2', date: new Date(Date.now() - 86400000), done: true, note: 'Quick 10 min session.' },
    { id: '3', date: new Date(Date.now() - 172800000), done: false, note: 'Woke up late.' },
  ]
};

export const HabitDetailPage = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [loggedToday, setLoggedToday] = React.useState(false);
  const [isArchived, setIsArchived] = useState(false);
  
  // Modals state
  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isConfirmUnarchiveOpen, setIsConfirmUnarchiveOpen] = useState(false);
  
  // Log editing state
  const [editingLog, setEditingLog] = useState<any>(null);
  const [logNote, setLogNote] = useState('');

  // Heatmap data generation
  const today = new Date();
  const yearStart = new Date(today.getFullYear(), 0, 1);
  const heatmapDays = eachDayOfInterval({ start: yearStart, end: today });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="max-w-[900px] mx-auto animate-fade-in pb-20">
      <ConfirmDialog 
        open={isConfirmArchiveOpen}
        onOpenChange={setIsConfirmArchiveOpen}
        title="Archive Habit?"
        description="This habit will be hidden from your active dashboard. You can restore it anytime from the Archived Habits drawer."
        confirmText="Archive"
        onConfirm={() => setIsArchived(true)}
      />
      <ConfirmDialog 
        open={isConfirmUnarchiveOpen}
        onOpenChange={setIsConfirmUnarchiveOpen}
        title="Restore Habit?"
        description="This habit will be moved back to your active list."
        confirmText="Restore"
        onConfirm={() => setIsArchived(false)}
      />
      <ConfirmDialog 
        open={isConfirmDeleteOpen}
        onOpenChange={setIsConfirmDeleteOpen}
        title="Delete Habit Permanently?"
        description="This action cannot be undone. All history and data for this habit will be lost forever."
        confirmText="Delete Permanently"
        onConfirm={() => navigate('/habits')}
        variant="danger"
      />

      <button 
        onClick={() => navigate('/habits')}
        className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        Back to Habits
      </button>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 min-w-0 space-y-8">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-5">
              <div 
                className="size-[72px] rounded-[18px] flex items-center justify-center text-[32px] shrink-0"
                style={{ background: `${mockHabit.color}20`, border: `2px solid ${mockHabit.color}40` }}
              >
                {mockHabit.emoji}
              </div>
              <div className="flex flex-col gap-1.5">
                <h1 className="font-display text-[28px] font-bold tracking-[-0.5px] text-text-1 leading-none">
                  {mockHabit.name}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flowos-badge">{mockHabit.category}</span>
                  <span className="flowos-badge">{mockHabit.frequency}</span>
                  <span className="text-[12px] text-text-3">Since {mockHabit.createdDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isArchived ? (
                <button 
                  onClick={() => setIsConfirmUnarchiveOpen(true)}
                  className="flowos-shadcn-btn-secondary h-9 px-4 text-[13px] font-bold text-brand"
                >
                  <RotateCcw size={14} className="mr-2" /> Restore
                </button>
              ) : (
                <button className="flowos-shadcn-btn-secondary h-9 px-4 text-[13px] font-bold">
                  <Pencil size={14} className="mr-2" /> Edit
                </button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="size-9 flex items-center justify-center rounded-10 text-text-3 hover:text-text-1 hover:bg-surface-3 transition-all">
                    <MoreHorizontal size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuItem className="gap-2">
                    <Copy size={14} />
                    Duplicate Habit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isArchived ? (
                    <DropdownMenuItem 
                      className="gap-2 text-brand focus:text-brand"
                      onClick={() => setIsConfirmUnarchiveOpen(true)}
                    >
                      <RotateCcw size={14} />
                      Restore Habit
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem 
                      className="gap-2 text-warning focus:text-warning"
                      onClick={() => setIsConfirmArchiveOpen(true)}
                    >
                      <Archive size={14} />
                      Archive Habit
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    className="gap-2 text-danger focus:text-danger"
                    onClick={() => setIsConfirmDeleteOpen(true)}
                  >
                    <Trash2 size={14} />
                    Delete Habit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flowos-card flex flex-col gap-1 p-5">
              <span className="text-[12px] text-text-3">Current Streak</span>
              <div className="flex items-center gap-2">
                <span className="font-display text-[28px] font-bold text-text-1 leading-none">{mockHabit.streak}</span>
                <Flame size={16} className="text-warning" />
              </div>
              <span className={cn("text-[12px]", mockHabit.streak > 0 ? "text-success" : "text-text-3")}>
                day streak
              </span>
            </div>
            <div className="flowos-card flex flex-col gap-1 p-5">
              <span className="text-[12px] text-text-3">Best Streak</span>
              <div className="flex items-center gap-2">
                <span className="font-display text-[28px] font-bold text-text-1 leading-none">{mockHabit.best}</span>
                <Trophy size={16} className="text-warning" />
              </div>
              <span className="text-[12px] text-text-3">personal best</span>
            </div>
            <div className="flowos-card flex flex-col gap-1 p-5">
              <span className="text-[12px] text-text-3">Total Completions</span>
              <span className="font-display text-[28px] font-bold text-text-1 leading-none">{mockHabit.total}</span>
              <span className="text-[12px] text-text-3">all time logged</span>
            </div>
            <div className="flowos-card flex flex-col gap-1 p-5">
              <span className="text-[12px] text-text-3">Completion Rate</span>
              <span className={cn(
                "font-display text-[28px] font-bold leading-none",
                mockHabit.rate > 80 ? "text-success" : mockHabit.rate > 50 ? "text-warning" : "text-danger"
              )}>
                {mockHabit.rate}%
              </span>
              <span className="text-[12px] text-text-3">last 30 days</span>
            </div>
          </div>

          {/* Today's Log */}
          <div className="flowos-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="flowos-label">Today</span>
                <p className="text-[14px] text-text-2">{format(new Date(), 'EEEE, MMMM do')}</p>
              </div>
              {!loggedToday ? (
                <button 
                  onClick={() => setLoggedToday(true)}
                  className="flowos-shadcn-btn-primary h-9 px-5 font-bold"
                >
                  <CheckCircle2 size={16} className="mr-2" /> Log today
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[13px] text-success font-bold">
                    <CheckCircle2 size={16} /> Logged
                  </span>
                  <button 
                    onClick={() => setLoggedToday(false)}
                    className="text-text-3 hover:text-danger text-[12px] font-bold px-3 py-1.5 rounded-8 hover:bg-surface-3 transition-all"
                  >
                    Undo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="space-y-3">
            <span className="flowos-label">Activity — Full Year</span>
            <div className="flowos-card p-5 overflow-x-auto scrollbar-hide">
              <div className="flex flex-col gap-2 min-w-[700px]">
                <div className="flex gap-[3px]">
                  {/* Month labels would go here */}
                </div>
                <div className="flex gap-[3px]">
                  <div className="flex flex-col gap-[3px] pr-2">
                    {['M', '', 'W', '', 'F', '', 'S'].map((d, i) => (
                      <span key={i} className="text-[10px] text-text-4 h-[14px] flex items-center">{d}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-[3px] flex-1">
                    {heatmapDays.map((date, i) => {
                      const isDone = Math.random() > 0.4;
                      return (
                        <div 
                          key={i}
                          title={`${format(date, 'EEE, MMM d')} · ${isDone ? 'Completed' : 'Missed'}`}
                          className={cn(
                            "size-[14px] rounded-[3px] transition-all duration-300",
                            isDone ? "opacity-100" : "bg-surface-3"
                          )}
                          style={isDone ? { backgroundColor: mockHabit.color } : {}}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4">
                  <span className="text-[11px] text-text-4">Less</span>
                  <div className="flex gap-[3px]">
                    {[0.1, 0.3, 0.5, 0.7, 1].map(o => (
                      <div key={o} className="size-[12px] rounded-[2px]" style={{ backgroundColor: mockHabit.color, opacity: o }} />
                    ))}
                  </div>
                  <span className="text-[11px] text-text-4">More</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Calendar */}
          <div className="space-y-3">
            <span className="flowos-label">This Month</span>
            <div className="flowos-card p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-[15px] font-semibold text-text-1">{format(currentMonth, 'MMMM yyyy')}</span>
                <div className="flex gap-1">
                  <button onClick={prevMonth} className="size-8 flex items-center justify-center rounded-8 text-text-3 hover:text-text-1 hover:bg-surface-4 transition-all"><ChevronLeft size={16}/></button>
                  <button onClick={nextMonth} className="size-8 flex items-center justify-center rounded-8 text-text-3 hover:text-text-1 hover:bg-surface-4 transition-all"><ChevronRight size={16}/></button>
                </div>
              </div>
              <div className="grid grid-cols-7 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <span key={d} className="text-[11px] text-text-3 font-bold uppercase tracking-wider">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* Calendar logic */}
                {Array.from({ length: 35 }).map((_, i) => {
                  const dayNum = (i % 31) + 1;
                  const isCompleted = Math.random() > 0.5;
                  const isToday = i === 9;
                  return (
                    <div key={i} className="aspect-square flex items-center justify-center relative">
                      <div className={cn(
                        "size-9 flex items-center justify-center rounded-full transition-all",
                        isCompleted ? "bg-success/10 border border-success/30 text-success" : "border border-white/[0.05] text-text-3",
                        isToday && "ring-2 ring-brand ring-offset-2 ring-offset-surface-2"
                      )}>
                        <span className="text-[13px] font-medium">{dayNum}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-6 text-[12px] text-text-3">
                <div className="flex items-center gap-1.5"><div className="size-2 rounded-full bg-success" /> Completed</div>
                <div className="flex items-center gap-1.5"><div className="size-2 rounded-full border border-white/20" /> Missed</div>
                <div className="flex items-center gap-1.5"><div className="size-1 rounded-full bg-text-4" /> Not scheduled</div>
              </div>
            </div>
          </div>

          {/* Log History */}
          <div className="space-y-3">
            <span className="flowos-label">Log History</span>
            <div className="flowos-card p-0 overflow-hidden">
              <div className="flex items-center gap-2 p-4 border-b border-white/[0.07]">
                <button className="px-3 py-1 rounded-full bg-brand/10 text-brand text-[12px] font-bold">All</button>
                <button className="px-3 py-1 rounded-full hover:bg-white/5 text-text-3 text-[12px] font-medium">Completed</button>
                <button className="px-3 py-1 rounded-full hover:bg-white/5 text-text-3 text-[12px] font-medium">Missed</button>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {mockHabit.logs.map(log => (
                  <div key={log.id} className="flex items-center justify-between px-4 py-4 hover:bg-surface-3 transition-colors group">
                    <div className="flex items-center gap-3">
                      {log.done ? (
                        <CheckCircle2 size={18} className="text-success" />
                      ) : (
                        <XCircle size={18} className="text-text-4" />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-medium text-text-1">{format(log.date, 'EEEE, MMM do')}</span>
                        {log.note && <span className="text-[12px] text-text-3">{log.note}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button 
                            className="size-8 flex items-center justify-center rounded-8 text-text-3 hover:text-text-1 hover:bg-surface-4 transition-all"
                            onClick={() => {
                              setEditingLog(log);
                              setLogNote(log.note || '');
                            }}
                          >
                            <Pencil size={14} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[280px] p-4">
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <h4 className="text-[14px] font-bold text-text-1">Edit Log</h4>
                              <p className="text-[12px] text-text-3">{format(log.date, 'MMMM do, yyyy')}</p>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[11px] font-bold uppercase tracking-wider text-text-4">Note</label>
                              <textarea 
                                value={logNote}
                                onChange={(e) => setLogNote(e.target.value)}
                                className="w-full h-20 bg-surface-2 border border-white/[0.07] rounded-8 p-2 text-[13px] text-text-2 focus:outline-none focus:border-brand/50 resize-none"
                                placeholder="How did it go?"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="flex-1 flowos-shadcn-btn-secondary h-9 text-[12px]">Cancel</button>
                              <button className="flex-1 flowos-shadcn-btn-primary h-9 text-[12px]">Save Changes</button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <button className="size-8 flex items-center justify-center rounded-8 text-text-3 hover:text-danger hover:bg-danger/10 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 text-[13px] text-text-3 hover:text-text-1 hover:bg-white/[0.02] transition-all font-medium">
                Load more history
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[280px] shrink-0 space-y-6 sticky top-8">
          <div className="flowos-card p-5 space-y-6">
            <h3 className="flowos-label">About this habit</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                <span className="flex items-center gap-2 text-[12px] text-text-3">
                  <Flame size={14} /> Frequency
                </span>
                <span className="text-[13px] text-text-1 font-medium">{mockHabit.frequency}</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                <span className="flex items-center gap-2 text-[12px] text-text-3">
                  <Bell size={14} /> Reminder
                </span>
                <span className="text-[13px] text-text-1 font-medium">{mockHabit.reminder}</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                <span className="flex items-center gap-2 text-[12px] text-text-3">
                  <Tag size={14} /> Category
                </span>
                <span className="flowos-badge">{mockHabit.category}</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                <span className="flex items-center gap-2 text-[12px] text-text-3">
                  <Palette size={14} /> Color
                </span>
                <div className="size-3 rounded-full" style={{ backgroundColor: mockHabit.color }} />
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="flex items-center gap-2 text-[12px] text-text-3">
                  <CalendarDays size={14} /> Created
                </span>
                <span className="text-[13px] text-text-1 font-medium">{mockHabit.createdDate}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button 
                onClick={() => setLoggedToday(!loggedToday)}
                className={cn(
                  "w-full h-10 font-bold rounded-10 border transition-all flex items-center justify-center",
                  loggedToday ? "bg-success/10 text-success border-success/30 hover:bg-success/20" : "bg-brand text-white border-brand hover:bg-brand-light"
                )}
              >
                {loggedToday ? <><Check size={16} className="mr-2"/> Logged today</> : <><Plus size={16} className="mr-2"/> Log today</>}
              </button>
              <button className="flowos-shadcn-btn-secondary w-full h-10 font-bold">
                <Pencil size={14} className="mr-2"/> Edit habit
              </button>
            </div>
          </div>

          <div className="flowos-card p-5 space-y-4">
            <h3 className="flowos-label">Contributing to</h3>
            <div className="flowos-card p-3 bg-surface-2/50 cursor-pointer hover:border-white/[0.14] transition-colors group">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                  <Target size={16} className="text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-text-1 truncate group-hover:text-brand transition-colors">Master Mindfulness</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-text-3">65% complete</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-brand" style={{ width: '65%' }} />
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
