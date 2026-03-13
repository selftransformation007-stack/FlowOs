import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  CheckCircle2, 
  X, 
  MoreHorizontal, 
  FolderOpen, 
  Flag, 
  Calendar, 
  Clock, 
  Tag, 
  Timer, 
  Link2, 
  Plus, 
  Trash2, 
  GitCommit,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const TaskDetailPage = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('In Progress');
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState('Design FlowOS Dashboard');

  const subtasks = [
    { id: '1', title: 'Create low-fidelity wireframes', done: true },
    { id: '2', title: 'Define color palette and typography', done: true },
    { id: '3', title: 'Design high-fidelity mockups', done: false },
    { id: '4', title: 'Prototyping interactions', done: false },
  ];

  const doneCount = subtasks.filter(s => s.done).length;
  const pct = (doneCount / subtasks.length) * 100;

  return (
    <div className="max-w-[800px] mx-auto animate-fade-in">
      {/* Back Navigation */}
      <Link to="/tasks" className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 transition-colors mb-6">
        <ChevronLeft size={16} />
        Back to Tasks
      </Link>

      <div className="flowos-card p-0 overflow-hidden bg-surface-1 border-white/[0.07]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.07] bg-surface-2/50">
          <div className="flex items-center gap-1 bg-surface-3 rounded-[10px] p-1">
            {["To Do", "In Progress", "Done"].map(s => (
              <button 
                key={s} 
                onClick={() => setStatus(s)}
                className={cn(
                  "px-4 py-1.5 rounded-[8px] text-[12px] font-bold transition-all",
                  status === s ? "bg-surface-0 text-text-1 shadow-sm" : "text-text-3 hover:text-text-2"
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
            <Link to="/tasks" className="size-9 rounded-10 border border-white/[0.07] flex items-center justify-center text-text-3 hover:text-text-1 transition-all">
              <X size={16} />
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-10">
          {/* Title & Description */}
          <div className="space-y-4">
            {!editingTitle ? (
              <h1 
                onClick={() => setEditingTitle(true)}
                className="font-display text-[32px] font-bold tracking-[-1px] text-text-1 cursor-text hover:bg-white/5 rounded-lg px-2 -mx-2 transition-all leading-tight"
              >
                {title}
              </h1>
            ) : (
              <textarea
                autoFocus
                className="flowos-shadcn-input w-full font-display text-[32px] font-bold resize-none h-auto bg-transparent border-none p-0 focus-visible:ring-0"
                rows={1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setEditingTitle(false)}
              />
            )}
            <p className="text-[15px] text-text-2 leading-relaxed">
              Create a comprehensive dashboard design that includes habit tracking, task management, and focus session metrics. Ensure the UI is minimal and dark-themed.
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 border-t border-white/[0.07] pt-8">
            {[
              { icon: FolderOpen, label: 'Project', value: 'Work Project', color: 'bg-brand' },
              { icon: Flag, label: 'Priority', value: 'P1 — Urgent', color: 'bg-danger' },
              { icon: Calendar, label: 'Due Date', value: 'Today', sub: 'Mar 10' },
              { icon: Clock, label: 'Estimate', value: '4 hours' },
              { icon: Tag, label: 'Labels', value: ['Design', 'UI'] },
              { icon: Timer, label: 'Time Logged', value: '2h 30m', link: true },
              { icon: Link2, label: 'Goal', value: 'Launch SaaS Product' },
            ].map((prop, i) => (
              <div key={i} className="flex items-center gap-4 py-2.5 hover:bg-white/[0.02] px-3 -mx-3 rounded-lg transition-all cursor-pointer group">
                <prop.icon size={15} className="text-text-4 shrink-0" />
                <span className="text-[13px] text-text-3 w-24 shrink-0">{prop.label}</span>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {prop.color && <div className={cn("size-2 rounded-full", prop.color)} />}
                  {Array.isArray(prop.value) ? (
                    <div className="flex gap-1.5">
                      {prop.value.map(v => <span key={v} className="text-[11px] bg-white/5 px-1.5 py-0.5 rounded-[4px] text-text-2">{v}</span>)}
                    </div>
                  ) : (
                    <span className="text-[13px] text-text-1 font-medium truncate">
                      {prop.value} {prop.sub && <span className="text-text-4 ml-1 font-normal">· {prop.sub}</span>}
                    </span>
                  )}
                  {prop.link && <ExternalLink size={12} className="text-text-4 group-hover:text-brand transition-colors" />}
                </div>
              </div>
            ))}
          </div>

          {/* Subtasks */}
          <div className="space-y-4 border-t border-white/[0.07] pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flowos-label">Subtasks</span>
                <span className="bg-surface-3 text-text-3 text-[11px] px-2 py-0.5 rounded-full font-bold">{doneCount}/{subtasks.length}</span>
              </div>
            </div>
            <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
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
                  <span className={cn("text-[14px] flex-1", s.done ? "text-text-4 line-through" : "text-text-1")}>{s.title}</span>
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
                  className="bg-transparent border-none outline-none text-[14px] text-text-2 placeholder:text-text-4 w-full"
                />
              </div>
            </div>
          </div>

          {/* Activity Feed */}
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
                    <p className="text-[14px] text-text-2 leading-relaxed">
                      I've finished the initial wireframes. Moving on to the color palette now.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-text-4">
                  <div className="size-8 flex items-center justify-center shrink-0">
                    <GitCommit size={14} />
                  </div>
                  <p className="text-[12px]">
                    <span className="text-text-2 font-bold">Arjun Singh</span> changed status to <span className="text-text-2 font-bold">In Progress</span> • 3 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 h-20 border-t border-white/[0.07] bg-surface-2/30">
          <button className="flex items-center gap-2 text-[13px] text-text-4 hover:text-danger transition-colors font-medium">
            <Trash2 size={16} /> Delete Task
          </button>
          <button className="flowos-shadcn-btn-primary h-11 px-8 w-auto">
            <CheckCircle2 size={18} className="mr-2" /> Mark as Done
          </button>
        </div>
      </div>
    </div>
  );
};
