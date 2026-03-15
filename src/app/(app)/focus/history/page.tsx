"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Timer, 
  AlertCircle, 
  ChevronDown, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  BarChart2, 
  Flame 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const mockHistory = [
  {
    id: '1',
    type: 'focus',
    startTime: '09:00 AM',
    endTime: '09:25 AM',
    duration: '25m',
    task: { title: 'Design FlowOS Dashboard' },
    distractionCount: 1,
    distractions: [{ note: 'Checked phone for notifications', category: 'Social' }],
    segments: [{ type: 'focus', pct: 80 }, { type: 'break', pct: 20 }],
    date: 'Today, March 10'
  },
  {
    id: '2',
    type: 'break',
    startTime: '09:25 AM',
    endTime: '09:30 AM',
    duration: '5m',
    task: null,
    distractionCount: 0,
    distractions: [],
    segments: [{ type: 'break', pct: 100 }],
    date: 'Today, March 10'
  },
  {
    id: '3',
    type: 'focus',
    startTime: '09:30 AM',
    endTime: '09:55 AM',
    duration: '25m',
    task: { title: 'Design FlowOS Dashboard' },
    distractionCount: 0,
    distractions: [],
    segments: [{ type: 'focus', pct: 100 }],
    date: 'Today, March 10'
  }
];

export default function FocusHistoryPage() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="max-w-[760px] mx-auto animate-fade-in pb-20">
      <button 
        onClick={() => router.push('/focus')}
        className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        Back to Focus
      </button>

      <div className="mb-8">
        <span className="flowos-label">Focus</span>
        <h1 className="font-display text-[28px] font-bold text-text-1 tracking-[-0.5px] mt-1">Session History</h1>
      </div>

      <div className="flex items-center gap-2 mb-8 bg-surface-2 p-1 rounded-full border border-white/[0.07] w-fit">
        {['This Week', 'This Month', 'All Time'].map(tab => (
          <button 
            key={tab}
            className={cn(
              "px-5 py-2 rounded-full text-[13px] font-bold transition-all",
              tab === 'This Week' ? "bg-surface-3 text-text-1 shadow-sm" : "text-text-3 hover:text-text-2"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total Focus Time', value: '14h 30m', color: 'text-success' },
          { label: 'Sessions Completed', value: '32' },
          { label: 'Average Session', value: '24m' },
          { label: 'Best Day', value: 'Mon Dec 9', sub: '3h 10m' },
        ].map((stat, i) => (
          <div key={i} className="flowos-card flex flex-col gap-1 p-5">
            <span className="text-[12px] text-text-3 font-medium uppercase tracking-wider">{stat.label}</span>
            <span className={cn("font-display text-[24px] font-bold text-text-1 leading-none", stat.color)}>{stat.value}</span>
            {stat.sub && <span className="text-[12px] text-text-4 font-medium">{stat.sub}</span>}
          </div>
        ))}
      </div>

      {/* Session List */}
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[14px] font-bold text-text-1">Today, March 10</span>
            <div className="h-px flex-1 bg-white/[0.06]"/>
            <span className="text-[12px] text-text-3 font-medium">55m focused</span>
          </div>

          <div className="space-y-3">
            {mockHistory.map((session) => {
              const isFocus = session.type === 'focus';
              const isExpanded = expandedId === session.id;

              return (
                <div key={session.id} className="flowos-card p-0 overflow-hidden group border-white/[0.03]">
                  <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-surface-3 transition-all" onClick={() => setExpandedId(isExpanded ? null : session.id)}>
                    <div className={cn(
                      "size-10 rounded-[12px] flex items-center justify-center shrink-0",
                      isFocus ? "bg-brand/15" : "bg-success/15"
                    )}>
                      <Timer size={18} className={isFocus ? "text-brand" : "text-success"}/>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                          isFocus ? "bg-brand/10 text-brand-light" : "bg-success/10 text-success"
                        )}>
                          {isFocus ? "Focus" : "Break"}
                        </span>
                        <span className="text-[12px] text-text-3 font-medium">{session.startTime} – {session.endTime}</span>
                        {session.task && (
                          <span className="text-[12px] bg-white/5 text-text-2 px-2 py-0.5 rounded-full truncate max-w-[180px] font-medium">
                            {session.task.title}
                          </span>
                        )}
                      </div>
                      {session.distractionCount > 0 && (
                        <span className="text-[11px] text-warning flex items-center gap-1 font-bold mt-1">
                          <AlertCircle size={12}/> {session.distractionCount} distraction{session.distractionCount > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <span className="font-display text-[20px] font-bold text-text-1 shrink-0">{session.duration}</span>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="size-8 flex items-center justify-center rounded-8 text-text-3 hover:text-text-1 hover:bg-surface-4 transition-all">
                        <ChevronDown size={16} className={cn("transition-transform", isExpanded && "rotate-180")}/>
                      </button>
                      <button className="size-8 flex items-center justify-center rounded-8 text-text-3 hover:text-danger hover:bg-danger/10 transition-all">
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-6 pt-2 border-t border-white/[0.05] flex flex-col gap-6 animate-slide-down">
                      {session.distractions.length > 0 && (
                        <div>
                          <span className="flowos-label mb-3 block">Distractions</span>
                          <div className="space-y-2">
                            {session.distractions.map((d, i) => (
                              <div key={i} className="flex items-center gap-3 py-2 px-3 bg-surface-2 rounded-[10px] border border-white/[0.03]">
                                <AlertCircle size={14} className="text-warning shrink-0"/>
                                <span className="text-[13px] text-text-2 font-medium">{d.note}</span>
                                <span className="text-[11px] text-text-4 ml-auto font-bold uppercase tracking-wider">{d.category}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="flowos-label mb-3 block">Timeline Breakdown</span>
                        <div className="flex items-center gap-1 h-3 w-full">
                          {session.segments.map((seg, i) => (
                            <div 
                              key={i}
                              className={cn(
                                "h-full rounded-full transition-all",
                                seg.type === 'focus' ? "bg-brand/60" : "bg-white/10"
                              )}
                              style={{ width: `${seg.pct}%` }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-[11px] text-text-4 font-bold">{session.startTime}</span>
                          <span className="text-[11px] text-text-4 font-bold">{session.endTime}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
