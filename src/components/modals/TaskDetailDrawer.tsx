"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/src/components/ui/Dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/Select';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/Popover';
import { Calendar } from '@/src/components/ui/Calendar';
import { format } from 'date-fns';
import { 
  X, 
  MoreHorizontal, 
  FolderOpen, 
  Flag, 
  Calendar as CalendarIcon, 
  Clock, 
  Tag, 
  User, 
  Timer, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  GitCommit 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface TaskDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: any;
}

export const TaskDetailDrawer: React.FC<TaskDetailDrawerProps> = ({ open, onOpenChange, task }) => {
  const [status, setStatus] = React.useState('todo');
  const [date, setDate] = React.useState<Date>();
  const [subtasks, setSubtasks] = React.useState([
    { id: '1', title: 'Synthesize low-fidelity wireframes', done: true },
    { id: '2', title: 'Define chromatic hierarchy', done: true },
    { id: '3', title: 'Render high-fidelity prototypes', done: false },
  ]);

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed right-0 top-0 h-full w-[540px] translate-x-0 translate-y-0 rounded-none border-l border-white/[0.07] p-0 overflow-hidden flex flex-col animate-in slide-in-from-right duration-500 bg-surface-1 shadow-2xl">
        <DialogTitle className="sr-only">Protocol Details</DialogTitle>
        
        {/* Header Rail */}
        <div className="flex items-center justify-between px-8 h-20 border-b border-white/[0.06] bg-surface-1/40 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-1.5 p-1 bg-surface-2 rounded-xl border border-white/[0.04]">
            {["To Do", "In Progress", "Done"].map(s => (
              <button 
                key={s} 
                onClick={() => setStatus(s.toLowerCase().replace(' ', ''))}
                className={cn(
                  "px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all",
                  status === s.toLowerCase().replace(' ', '') ? "bg-surface-4 text-text-1 shadow-inner" : "text-text-4 hover:text-text-2"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="btn-icon size-10">
              <MoreHorizontal size={18} />
            </button>
            <button onClick={() => onOpenChange(false)} className="btn-icon size-10 bg-brand/10 text-brand">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic Body */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
          <div className="space-y-6">
            <h1 className="font-display text-[32px] font-black tracking-tight text-white leading-tight outline-none focus:bg-white/[0.03] rounded-xl px-3 -mx-3 transition-all cursor-text" contentEditable suppressContentEditableWarning>
              {task.title.toUpperCase()}
            </h1>
            <p className="text-[15px] text-text-3 font-medium leading-relaxed outline-none focus:bg-white/[0.03] rounded-xl px-3 -mx-3 transition-all cursor-text" contentEditable suppressContentEditableWarning>
              {task.description || "Deploying a comprehensive environment redesign including habit synthesis, protocol management, and temporal focus metrics."}
            </p>
          </div>

          <div className="divider opacity-30" />

          {/* Configuration Matrix */}
          <div className="space-y-1">
            {[
              { icon: FolderOpen, label: 'Allocation', value: 'Work Project', color: 'bg-danger' },
              { icon: Flag, label: 'Criticality', value: 'P1 — URGENT', color: 'bg-danger' },
              { icon: CalendarIcon, label: 'Temporal', value: 'Today', sub: 'Mar 10' },
              { icon: Clock, label: 'Effort', value: '4 hours' },
              { icon: Tag, label: 'Metadata', value: ['Core', 'System'] },
              { icon: Timer, label: 'Telemetry', value: '2.5h Recorded' },
            ].map((prop, i) => (
              <div key={i} className="flex items-center gap-6 py-3.5 hover:bg-white/[0.02] px-3 -mx-3 rounded-xl transition-all cursor-pointer group">
                <div className="size-8 rounded-lg bg-surface-2 flex items-center justify-center text-text-4 group-hover:text-brand transition-colors">
                   <prop.icon size={14} className="shrink-0" />
                </div>
                <span className="label-section text-text-4 w-24 shrink-0">{prop.label}</span>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {prop.color && <div className={cn("size-2.5 rounded-full", prop.color)} />}
                  {Array.isArray(prop.value) ? (
                    <div className="flex gap-2">
                      {prop.value.map(v => <span key={v} className="badge bg-surface-3">{v}</span>)}
                    </div>
                  ) : (
                    <span className="text-[14px] font-bold text-text-2 group-hover:text-text-1 truncate transition-colors">
                      {prop.value} {prop.sub && <span className="text-text-4 ml-2 font-medium opacity-50">• {prop.sub}</span>}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="divider opacity-30" />

          {/* Sub-Protocols */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="label-section">Sub-Protocols</span>
                <span className="bg-brand-dim text-brand text-[10px] px-2 py-0.5 rounded-full font-black tracking-widest">2 / 3</span>
              </div>
              <button className="text-[10px] font-black text-white/40 hover:text-brand uppercase tracking-widest transition-colors">BATCH RESOLVE</button>
            </div>
            
            <div className="flex flex-col gap-2">
              {subtasks.map(s => (
                <div key={s.id} className="flex items-center gap-5 px-4 py-4 rounded-2xl bg-surface-2 border border-white/[0.04] hover:bg-surface-3 transition-all group overflow-hidden relative">
                   {s.done && <div className="absolute inset-0 bg-brand/5 pointer-events-none" />}
                  <button className={cn(
                    "size-6 rounded-full border flex items-center justify-center transition-all shrink-0 z-10",
                    s.done ? "bg-success border-success text-white shadow-lg shadow-success/20 scale-110" : "border-white/20 text-transparent hover:border-brand"
                  )}>
                    <CheckCircle2 size={12} strokeWidth={3} />
                  </button>
                  <span className={cn(
                    "text-[14px] font-bold flex-1 transition-all z-10", 
                    s.done ? "text-text-4 line-through italic" : "text-text-1"
                  )}>
                    {s.title}
                  </span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all z-10">
                    <button className="btn-icon size-8"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.08] mt-2">
                <Plus size={16} className="text-brand shrink-0" />
                <input 
                  type="text" 
                  placeholder="Initialize new sub-protocol..." 
                  className="bg-transparent border-none outline-none text-[14px] font-bold text-text-1 placeholder:text-text-4 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Rail */}
        <div className="flex items-center justify-between px-10 h-24 border-t border-white/[0.06] bg-surface-2/40 backdrop-blur-md shrink-0">
          <button className="flex items-center gap-3 text-[12px] font-black text-text-4 hover:text-danger transition-all uppercase tracking-widest">
            <Trash2 size={18} /> TERMINATE
          </button>
          <button className="btn-primary h-12 px-10">
            <CheckCircle2 size={20} /> MARK AS RESOLVED
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
