"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  X, 
  MoreHorizontal, 
  Pencil, 
  CheckCircle2, 
  Trash2, 
  FolderOpen, 
  Flag, 
  Calendar, 
  Clock, 
  Tag, 
  Timer, 
  Link2, 
  Plus, 
  GitCommit,
  MessageSquare,
  ExternalLink,
  Archive,
  Copy,
  RotateCcw,
  ArrowRightLeft
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
import { Checkbox } from '@/src/components/ui/Checkbox';

const mockTask = {
  id: '1',
  title: 'Design FlowOS Dashboard',
  description: 'Create a high-fidelity design for the main dashboard including all widgets and navigation elements. Focus on the luxury-minimal dark aesthetic.',
  status: 'In Progress',
  project: 'FlowOS',
  priority: 'P1 — Urgent',
  dueDate: 'Tomorrow · Dec 10',
  estimate: '2 hours',
  labels: ['Design', 'UI/UX'],
  timeLogged: '1h 30m',
  goal: 'Launch SaaS Product',
  subtasks: [
    { id: '1', title: 'Define color palette', done: true },
    { id: '2', title: 'Create layout grid', done: true },
    { id: '3', title: 'Design widgets', done: false },
    { id: '4', title: 'Finalize navigation', done: false },
  ],
  plannerBlocks: [
    { id: '1', date: 'Mon, Dec 9', time: '9:00 – 10:30 AM' }
  ],
  activity: [
    { id: '1', type: 'comment', user: 'Arjun', initials: 'AK', time: '2 hours ago', content: 'Almost done with the layout grid. Moving to widgets now.' },
    { id: '2', type: 'system', user: 'Arjun', action: 'changed status to', value: 'In Progress', time: '3 hours ago' },
    { id: '3', type: 'system', user: 'Arjun', action: 'added to project', value: 'FlowOS', time: '5 hours ago' },
  ]
};

export default function TaskDetailPage() {
  const params = useParams();
  const taskId = params?.taskId as string;
  const router = useRouter();
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(mockTask.status);
  const [isArchived, setIsArchived] = useState(false);

  // Modals state
  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isConfirmUnarchiveOpen, setIsConfirmUnarchiveOpen] = useState(false);

  const doneSubtasks = mockTask.subtasks.filter(s => s.done).length;
  const totalSubtasks = mockTask.subtasks.length;
  const subtaskPct = (doneSubtasks / totalSubtasks) * 100;

  return (
    <div className="max-w-[800px] mx-auto animate-fade-in pb-20">
      <ConfirmDialog 
        open={isConfirmArchiveOpen}
        onOpenChange={setIsConfirmArchiveOpen}
        title="Archive Task?"
        description="This task will be hidden from your active list. You can restore it anytime from the Archived Tasks drawer."
        confirmText="Archive"
        onConfirm={() => setIsArchived(true)}
      />
      <ConfirmDialog 
        open={isConfirmUnarchiveOpen}
        onOpenChange={setIsConfirmUnarchiveOpen}
        title="Restore Task?"
        description="This task will be moved back to your active list."
        confirmText="Restore"
        onConfirm={() => setIsArchived(false)}
      />
      <ConfirmDialog 
        open={isConfirmDeleteOpen}
        onOpenChange={setIsConfirmDeleteOpen}
        title="Delete Task Permanently?"
        description="This action cannot be undone. All history and data for this task will be lost forever."
        confirmText="Delete Permanently"
        onConfirm={() => router.push('/tasks')}
        variant="danger"
      />

      <button 
        onClick={() => router.push('/tasks')}
        className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        Back to Tasks
      </button>

      <div className="flowos-card p-0 overflow-hidden bg-surface-1 border-white/[0.07]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.07] bg-surface-1">
          <div className="flex items-center gap-1 bg-surface-3 rounded-[10px] p-1">
            {["To Do", "In Progress", "Done"].map(status => (
              <button 
                key={status} 
                onClick={() => setCurrentStatus(status)}
                className={cn(
                  "px-4 py-1.5 rounded-[8px] text-[13px] font-bold transition-all",
                  currentStatus === status
                    ? "bg-surface-0 text-text-1 shadow-sm"
                    : "text-text-3 hover:text-text-2"
                )}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {isArchived && (
              <button 
                onClick={() => setIsConfirmUnarchiveOpen(true)}
                className="flowos-shadcn-btn-secondary h-9 px-4 text-[13px] font-bold text-brand"
              >
                <RotateCcw size={14} className="mr-2" /> Restore
              </button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="size-9 flex items-center justify-center rounded-10 text-text-3 hover:text-text-1 hover:bg-surface-3 transition-all">
                  <MoreHorizontal size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem className="gap-2">
                  <Copy size={14} />
                  Duplicate Task
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <ArrowRightLeft size={14} />
                  Move to Project
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isArchived ? (
                  <DropdownMenuItem 
                    className="gap-2 text-brand focus:text-brand"
                    onClick={() => setIsConfirmUnarchiveOpen(true)}
                  >
                    <RotateCcw size={14} />
                    Restore Task
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                    className="gap-2 text-warning focus:text-warning"
                    onClick={() => setIsConfirmArchiveOpen(true)}
                  >
                    <Archive size={14} />
                    Archive Task
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  className="gap-2 text-danger focus:text-danger"
                  onClick={() => setIsConfirmDeleteOpen(true)}
                >
                  <Trash2 size={14} />
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Title & Description */}
          <div className="space-y-4">
            {!editingTitle ? (
              <h1 
                onClick={() => setEditingTitle(true)}
                className="font-display text-[28px] font-bold tracking-[-0.5px] text-text-1 cursor-text hover:bg-surface-3 rounded-[8px] px-2 -mx-2 transition-colors leading-tight"
              >
                {mockTask.title}
              </h1>
            ) : (
              <textarea
                autoFocus
                className="flowos-shadcn-input w-full font-display text-[28px] font-bold resize-none bg-surface-2"
                rows={1}
                defaultValue={mockTask.title}
                onBlur={() => setEditingTitle(false)}
              />
            )}

            {!editingDesc ? (
              <div 
                onClick={() => setEditingDesc(true)}
                className="text-[15px] text-text-2 leading-relaxed cursor-text min-h-[60px] hover:bg-surface-3 rounded-[8px] px-2 -mx-2 transition-colors"
              >
                {mockTask.description || <span className="text-text-4 italic">Add a description...</span>}
              </div>
            ) : (
              <textarea
                autoFocus
                className="flowos-shadcn-input w-full text-[15px] resize-none bg-surface-2"
                rows={4}
                placeholder="Add a description..."
                defaultValue={mockTask.description}
                onBlur={() => setEditingDesc(false)}
              />
            )}
          </div>

          {/* Properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 py-6 border-t border-white/[0.07]">
            {[
              { icon: FolderOpen, label: 'Project', value: mockTask.project, color: 'bg-brand' },
              { icon: Flag, label: 'Priority', value: mockTask.priority, color: 'bg-danger' },
              { icon: Calendar, label: 'Due Date', value: mockTask.dueDate, isOverdue: false },
              { icon: Clock, label: 'Estimate', value: mockTask.estimate },
              { icon: Tag, label: 'Labels', value: mockTask.labels.join(', ') },
              { icon: Timer, label: 'Time Logged', value: mockTask.timeLogged, hasLink: true },
              { icon: Link2, label: 'Goal', value: mockTask.goal },
            ].map((prop, i) => (
              <div key={i} className="flex items-center gap-4 py-3 px-3 -mx-3 hover:bg-surface-3 rounded-[10px] transition-colors cursor-pointer group">
                <prop.icon size={16} className="text-text-3 shrink-0" />
                <span className="text-[13px] text-text-3 w-[100px] shrink-0 font-medium">{prop.label}</span>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {prop.color && <div className={cn("size-2 rounded-full", prop.color)} />}
                  <span className={cn(
                    "text-[13px] font-bold truncate",
                    prop.isOverdue ? "text-danger" : "text-text-1"
                  )}>
                    {prop.value}
                  </span>
                  {prop.hasLink && <ExternalLink size={12} className="text-text-4 group-hover:text-text-2 transition-colors" />}
                </div>
              </div>
            ))}
          </div>

          {/* Subtasks */}
          <div className="space-y-4 py-6 border-t border-white/[0.07]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flowos-label">Subtasks</span>
                <span className="bg-surface-3 text-text-3 text-[11px] font-bold px-2 py-0.5 rounded-full">{doneSubtasks}/{totalSubtasks}</span>
              </div>
            </div>
            
            <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full transition-all duration-700" style={{ width: `${subtaskPct}%` }}/>
            </div>

            <div className="space-y-1">
              {mockTask.subtasks.map((sub) => (
                <div key={sub.id} className="flex items-center gap-3 py-2.5 group hover:bg-surface-3 px-3 -mx-3 rounded-[10px] transition-all">
                  <Checkbox
                    checked={sub.done}
                    className="shrink-0 rounded-full border-white/[0.2] data-[state=checked]:bg-success data-[state=checked]:border-success"
                  />
                  <span className={cn(
                    "text-[14px] flex-1 font-medium transition-all",
                    sub.done ? "line-through text-text-4" : "text-text-1"
                  )}>
                    {sub.title}
                  </span>
                  <button className="size-8 flex items-center justify-center opacity-0 group-hover:opacity-100 text-text-4 hover:text-danger shrink-0 transition-all rounded-8 hover:bg-danger/10">
                    <Trash2 size={14}/>
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-3 py-2.5 px-3 -mx-3">
                <Plus size={16} className="text-text-4 shrink-0"/>
                <input
                  placeholder="Add a subtask..."
                  className="bg-transparent text-[14px] text-text-2 placeholder:text-text-4 outline-none flex-1 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Scheduled */}
          <div className="space-y-4 py-6 border-t border-white/[0.07]">
            <span className="flowos-label">Scheduled</span>
            <div className="space-y-3">
              {mockTask.plannerBlocks.map((block) => (
                <div key={block.id} className="flex items-center gap-4 py-1">
                  <div className="size-9 rounded-[10px] bg-brand/10 flex items-center justify-center shrink-0">
                    <Calendar size={16} className="text-brand"/>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-text-1">{block.date}</span>
                    <span className="text-[12px] text-text-3 font-medium">{block.time}</span>
                  </div>
                </div>
              ))}
              <button className="flex items-center gap-2 text-[13px] text-brand-light font-bold hover:underline mt-2">
                <Plus size={14}/> Schedule this task
              </button>
            </div>
          </div>

          {/* Activity */}
          <div className="space-y-6 py-6 border-t border-white/[0.07]">
            <span className="flowos-label">Activity</span>
            
            <div className="flex items-start gap-4">
              <div className="size-9 rounded-full bg-surface-3 flex items-center justify-center text-[13px] font-bold text-text-2 shrink-0">
                AK
              </div>
              <div className="flex-1 space-y-3">
                <textarea
                  placeholder="Add a comment..."
                  rows={2}
                  className="flowos-shadcn-input w-full text-[14px] resize-none bg-surface-2"
                />
                <button className="flowos-shadcn-btn-primary h-9 px-6 text-[13px] font-bold">
                  Post Comment
                </button>
              </div>
            </div>

            <div className="space-y-6 mt-8">
              {mockTask.activity.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  {item.type === 'comment' ? (
                    <>
                      <div className="size-9 rounded-full bg-surface-3 flex items-center justify-center text-[13px] font-bold text-text-2 shrink-0">
                        {item.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[14px] font-bold text-text-1">{item.user}</span>
                          <span className="text-[11px] text-text-4 font-medium">{item.time}</span>
                        </div>
                        <p className="text-[14px] text-text-2 leading-relaxed">{item.content}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="size-9 flex items-center justify-center shrink-0">
                        <div className="size-6 rounded-full bg-surface-3 flex items-center justify-center">
                          <GitCommit size={12} className="text-text-4"/>
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-[13px] text-text-3 font-medium">
                          <span className="text-text-1 font-bold">{item.user}</span> {item.action} <span className="text-text-1 font-bold">{item.value}</span> · {item.time}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 h-16 border-t border-white/[0.07] bg-surface-1">
          <button 
            onClick={() => setIsConfirmDeleteOpen(true)}
            className="text-[13px] text-text-4 hover:text-danger h-9 font-bold px-4 rounded-8 hover:bg-danger/10 transition-all flex items-center"
          >
            <Trash2 size={16} className="mr-2"/> Delete task
          </button>
          <button className="flowos-shadcn-btn-primary h-10 px-8 font-bold">
            <CheckCircle2 size={18} className="mr-2"/> Mark complete
          </button>
        </div>
      </div>
    </div>
  );
};
