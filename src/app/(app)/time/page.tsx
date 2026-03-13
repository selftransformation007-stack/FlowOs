import React from 'react';
import { Plus, Clock, Calendar, BarChart2, MoreHorizontal, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const mockEntries = [
  { id: '1', project: 'Work Project', task: 'Design FlowOS Dashboard', duration: '2h 30m', time: '09:00 – 11:30 AM', color: 'bg-danger' },
  { id: '2', project: 'Personal', task: 'Morning Meditation', duration: '30m', time: '07:30 – 08:00 AM', color: 'bg-success' },
  { id: '3', project: 'Side Hustle', task: 'Research new UI patterns', duration: '1h 15m', time: '01:00 – 02:15 PM', color: 'bg-warning' },
  { id: '4', project: 'Work Project', task: 'Team Sync', duration: '45m', time: '03:00 – 03:45 PM', color: 'bg-danger' },
];

import { LogTimeModal } from '@/src/components/modals/LogTimeModal';

export const TimePage = () => {
  const [isLogTimeModalOpen, setIsLogTimeModalOpen] = React.useState(false);

  return (
    <div className="space-y-8">
      <LogTimeModal open={isLogTimeModalOpen} onOpenChange={setIsLogTimeModalOpen} />
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[12px] font-medium uppercase tracking-[1px] text-brand-light">
            Time Tracking
          </p>
          <h1 className="font-display text-[36px] font-bold leading-tight tracking-[-1px] text-text-1">
            Time
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface-2 rounded-10 border border-white/[0.07] p-1">
            <button className="px-4 py-1.5 text-[13px] font-bold text-text-1 bg-surface-3 rounded-[8px] shadow-sm">This Week</button>
            <button className="px-4 py-1.5 text-[13px] font-medium text-text-3 hover:text-text-2">Last Week</button>
          </div>
          <button 
            onClick={() => setIsLogTimeModalOpen(true)}
            className="flowos-shadcn-btn-primary w-auto px-6"
          >
            <Plus className="size-4 mr-2" />
            Log Time
          </button>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="flowos-card p-6 bg-surface-1 border-white/[0.07]">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[12px] text-text-3 font-medium uppercase tracking-wider mb-1">Total Hours This Week</p>
            <p className="font-display text-[42px] font-bold text-text-1 leading-none">32h 45m</p>
          </div>
          <div className="flex gap-8 text-right">
            <div>
              <p className="text-[11px] text-text-3 uppercase tracking-wider">Avg. Daily</p>
              <p className="text-[18px] font-display font-bold text-text-1">4h 40m</p>
            </div>
            <div>
              <p className="text-[11px] text-text-3 uppercase tracking-wider">Billable</p>
              <p className="text-[18px] font-display font-bold text-success">85%</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="h-3 w-full bg-white/[0.05] rounded-full flex overflow-hidden">
            <div className="h-full bg-danger" style={{ width: '60%' }} />
            <div className="h-full bg-success" style={{ width: '25%' }} />
            <div className="h-full bg-warning" style={{ width: '15%' }} />
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-danger" />
              <span className="text-[12px] text-text-2">Work Project</span>
              <span className="text-[11px] text-text-4">18h 30m</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-success" />
              <span className="text-[12px] text-text-2">Personal</span>
              <span className="text-[11px] text-text-4">8h 15m</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-warning" />
              <span className="text-[12px] text-text-2">Side Hustle</span>
              <span className="text-[11px] text-text-4">6h 00m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Time Entry List */}
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-bold text-text-1">Today, March 10</span>
              <span className="text-[12px] text-text-3">5h 00m</span>
            </div>
            <div className="h-px flex-1 bg-white/[0.05] mx-4" />
          </div>

          <div className="space-y-2">
            {mockEntries.map((entry) => (
              <div key={entry.id} className="flowos-card p-4 flex items-center justify-between group hover:bg-surface-3 transition-all cursor-pointer border-white/[0.03]">
                <div className="flex items-center gap-4 flex-1">
                  <div className={cn("w-1 h-10 rounded-full", entry.color)} />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] bg-white/5", entry.color.replace('bg-', 'text-'))}>
                        {entry.project}
                      </span>
                      <span className="text-[14px] font-bold text-text-1">{entry.task}</span>
                    </div>
                    <span className="text-[12px] text-text-3 mt-1">{entry.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="font-display text-[20px] font-bold text-text-1">{entry.duration}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="size-8 rounded-full hover:bg-white/5 flex items-center justify-center text-text-4 hover:text-text-2">
                      <Pencil className="size-4" />
                    </button>
                    <button className="size-8 rounded-full hover:bg-white/5 flex items-center justify-center text-text-4 hover:text-danger">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-bold text-text-1">Yesterday, March 9</span>
              <span className="text-[12px] text-text-3">6h 30m</span>
            </div>
            <div className="h-px flex-1 bg-white/[0.05] mx-4" />
          </div>
          <div className="text-center py-8 border border-dashed border-white/10 rounded-14">
            <p className="text-[13px] text-text-4">No entries for this day</p>
          </div>
        </div>
      </div>
    </div>
  );
};
