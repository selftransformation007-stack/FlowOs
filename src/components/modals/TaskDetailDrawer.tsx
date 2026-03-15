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
    { id: '1', title: 'Create low-fidelity wireframes', done: true },
    { id: '2', title: 'Define color palette and typography', done: true },
    { id: '3', title: 'Design high-fidelity mockups', done: false },
  ]);

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed right-0 top-0 h-full w-[520px] translate-x-0 translate-y-0 rounded-none border-l border-white/[0.07] p-0 overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
        <DialogTitle className="sr-only">Task Details</DialogTitle>
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.07] bg-surface-2/50 shrink-0">
          <div className="flex items-center gap-1 bg-surface-3 rounded-[10px] p-1">
            {["To Do", "In Progress", "Done"].map(s => (
              <button 
                key={s} 
                onClick={() => setStatus(s.toLowerCase().replace(' ', ''))}
                className={cn(
                  "px-4 py-1.5 rounded-[8px] text-[12px] font-bold transition-all",
                  status === s.toLowerCase().replace(' ', '') ? "bg-surface-0 text-text-1 shadow-sm" : "text-text-3 hover:text-text-2"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="size-9 rounded-10 border border-white/[0.07] flex items-center justify-center text-text-3 hover:text-text-1 transition-all">
              <MoreHorizontal size={16} />
            </button>
            <button onClick={() => onOpenChange(false)} className="size-9 rounded-10 border border-white/[0.07] flex items-center justify-center text-text-3 hover:text-text-1 transition-all">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
          <div className="space-y-4">
            <h1 className="font-display text-[24px] font-bold tracking-[-0.5px] text-text-1 leading-tight outline-none focus:bg-white/5 rounded-lg px-2 -mx-2 transition-all" contentEditable suppressContentEditableWarning>
              {task.title}
            </h1>
            <p className="text-[14px] text-text-2 leading-relaxed outline-none focus:bg-white/5 rounded-lg px-2 -mx-2 transition-all" contentEditable suppressContentEditableWarning>
              Create a comprehensive dashboard design that includes habit tracking, task management, and focus session metrics.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 border-t border-white/[0.07] pt-8">
            {[
              { icon: FolderOpen, label: 'Project', value: 'Work Project', color: 'bg-brand' },
              { icon: Flag, label: 'Priority', value: 'P1 — Urgent', color: 'bg-danger' },
              { icon: CalendarIcon, label: 'Due Date', value: 'Today', sub: 'Mar 10' },
              { icon: Clock, label: 'Estimate', value: '4 hours' },
              { icon: Tag, label: 'Labels', value: ['Design', 'UI'] },
              { icon: Timer, label: 'Time Logged', value: '2h 30m' },
            ].map((prop, i) => (
              <div key={i} className="flex items-center gap-4 py-2.5 hover:bg-white/[0.02] px-3 -mx-3 rounded-lg transition-all cursor-pointer group">
                <prop.icon size={14} className="text-text-4 shrink-0" />
                <span className="text-[12px] text-text-3 w-20 shrink-0">{prop.label}</span>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {prop.color && <div className={cn("size-2 rounded-full", prop.color)} />}
                  {Array.isArray(prop.value) ? (
                    <div className="flex gap-1.5">
                      {prop.value.map(v => <span key={v} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded-[4px] text-text-2">{v}</span>)}
                    </div>
                  ) : (
                    <span className="text-[13px] text-text-1 font-medium truncate">
                      {prop.value} {prop.sub && <span className="text-text-4 ml-1 font-normal">· {prop.sub}</span>}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-t border-white/[0.07] pt-8">
            <div className="flex items-center justify-between">
              <span className="flowos-label">Subtasks</span>
              <span className="bg-surface-3 text-text-3 text-[10px] px-2 py-0.5 rounded-full font-bold">2/3</span>
            </div>
            <div className="space-y-1">
              {subtasks.map(s => (
                <div key={s.id} className="flex items-center gap-3 py-2 group">
                  <button className={cn(
                    "size-5 rounded-full border flex items-center justify-center transition-all shrink-0",
                    s.done ? "bg-success border-success text-white" : "border-white/20 text-transparent hover:border-brand"
                  )}>
                    <CheckCircle2 size={12} />
                  </button>
                  <span className={cn("text-[13px] flex-1", s.done ? "text-text-4 line-through" : "text-text-1")}>{s.title}</span>
                  <button className="opacity-0 group-hover:opacity-100 text-text-4 hover:text-danger transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-3 py-2">
                <Plus size={16} className="text-text-4 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Add a subtask..." 
                  className="bg-transparent border-none outline-none text-[13px] text-text-2 placeholder:text-text-4 w-full"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t border-white/[0.07] pt-8">
            <span className="flowos-label">Activity</span>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-full bg-brand/20 flex items-center justify-center text-brand-light font-bold text-[10px] shrink-0">AS</div>
                <div className="flex-1 space-y-2">
                  <textarea 
                    placeholder="Add a comment..." 
                    className="flowos-shadcn-input min-h-[80px] text-sm resize-none"
                  />
                  <button className="flowos-shadcn-btn-primary h-9 px-4 text-[12px] w-auto">Post Comment</button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="size-8 rounded-full bg-brand/20 flex items-center justify-center text-brand-light font-bold text-[10px] shrink-0">AS</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-bold text-text-1">Arjun Singh</span>
                      <span className="text-[11px] text-text-4">2 hours ago</span>
                    </div>
                    <p className="text-[13px] text-text-2 leading-relaxed">
                      I've finished the initial wireframes. Moving on to the color palette now.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-text-4">
                  <div className="size-8 flex items-center justify-center shrink-0">
                    <GitCommit size={14} />
                  </div>
                  <p className="text-[11px]">
                    <span className="text-text-2 font-bold">Arjun Singh</span> changed status to <span className="text-text-2 font-bold">In Progress</span> • 3 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 h-20 border-t border-white/[0.07] bg-surface-2 shrink-0">
          <button className="flex items-center gap-2 text-[13px] text-text-4 hover:text-danger transition-colors font-medium">
            <Trash2 size={16} /> Delete Task
          </button>
          <button className="flowos-shadcn-btn-primary h-11 px-8 w-auto">
            <CheckCircle2 size={18} className="mr-2" /> Mark as Done
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
