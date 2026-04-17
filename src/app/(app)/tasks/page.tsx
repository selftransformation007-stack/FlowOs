"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle2, 
  Calendar, 
  Flag, 
  Tag,
  FolderOpen,
  ChevronRight,
  Inbox,
  List,
  LayoutGrid,
  Clock,
  Archive,
  Copy,
  RotateCcw,
  Trash2,
  ArrowRightLeft,
  Check,
  Hash
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/src/components/ui/DropdownMenu';
import { ArchivedTasksDrawer } from '@/src/components/modals/ArchivedTasksDrawer';
import { ConfirmDialog } from '@/src/components/ui/ConfirmDialog';
import { NewTaskModal } from '@/src/components/modals/NewTaskModal';
import { NewProjectModal } from '@/src/components/modals/NewProjectModal';
import { TaskDetailDrawer } from '@/src/components/modals/TaskDetailDrawer';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

const projectsData = [
  { id: 'inbox', name: 'Inbox', icon: Inbox, color: 'var(--color-brand)', count: 12 },
  { id: 'work', name: 'Work Project', icon: FolderOpen, color: 'var(--color-danger)', count: 5 },
  { id: 'personal', name: 'Personal', icon: FolderOpen, color: 'var(--color-success)', count: 8 },
  { id: 'side', name: 'Side Hustle', icon: FolderOpen, color: 'var(--color-warning)', count: 3 },
];

const tasksData = [
  { id: '1', title: 'Design FlowOS Dashboard', project: 'Work', priority: 'P1', due: 'Today', labels: ['Design', 'UI'], done: false },
  { id: '2', title: 'Review analytics report', project: 'Work', priority: 'P2', due: 'Tomorrow', labels: ['Research'], done: false },
  { id: '3', title: 'Buy groceries', project: 'Personal', priority: 'P3', due: 'Mar 12', labels: ['Shopping'], done: false },
  { id: '4', title: 'Update project documentation', project: 'Work', priority: 'P2', due: 'Mar 15', labels: ['Docs'], done: true },
  { id: '5', title: 'Call the bank', project: 'Personal', priority: 'P1', due: 'Today', labels: ['Finance'], done: false },
];

const TaskRow: React.FC<{ task: any; onClick: () => void; onArchive: (task: any) => void; i: number }> = ({ task, onClick, onArchive, i }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.05 }}
    onClick={onClick}
    className="flex items-center justify-between p-3 px-4 rounded-xl bg-surface-2 border border-white/[0.04] hover:bg-surface-3 hover:border-white/[0.1] hover:shadow-lg transition-all group cursor-pointer"
  >
    <div className="flex items-center gap-4 flex-1 min-w-0">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          // Toggle done logic here
        }}
        className={cn(
          "size-6 rounded-full border flex items-center justify-center transition-all shrink-0",
          task.done 
            ? "bg-success border-success text-white shadow-lg shadow-success/20 scale-110" 
            : "border-white/10 text-transparent hover:border-brand hover:text-brand/50"
        )}
      >
        <Check size={14} strokeWidth={3} />
      </button>
      
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={cn(
          "size-2 rounded-full shrink-0",
          task.priority === 'P1' ? "bg-danger" : task.priority === 'P2' ? "bg-warning" : "bg-brand"
        )} />
        <div className="flex flex-col min-w-0">
          <p className={cn(
            "text-[14px] font-medium truncate transition-all",
            task.done ? "text-text-4 line-through italic" : "text-text-1"
          )}>
            {task.title}
          </p>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-[10px] text-text-4 font-bold uppercase tracking-wider flex items-center gap-1">
               {task.project}
            </span>
            {task.labels.map(label => (
              <span key={label} className="text-[9px] font-bold text-text-3 opacity-60 flex items-center gap-0.5 bg-white/[0.03] px-1.5 py-0.5 rounded">
                <Hash size={8} /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4 ml-4">
      <div className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider",
        task.due === 'Today' ? "bg-danger-dim text-danger" : "bg-surface-4 text-text-3"
      )}>
        <Calendar size={11} />
        {task.due}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            onClick={(e) => e.stopPropagation()}
            className="btn-icon opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal size={14} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem className="gap-2"><Copy size={14} /> Duplicate</DropdownMenuItem>
          <DropdownMenuItem className="gap-2"><ArrowRightLeft size={14} /> Move</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="gap-2 text-warning focus:text-warning"
            onClick={(e) => { e.stopPropagation(); onArchive(task); }}
          >
            <Archive size={14} /> Archive
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-danger focus:text-danger">
            <Trash2 size={14} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </motion.div>
);

const KanbanCard: React.FC<{ task: any; onClick: () => void; onArchive: (task: any) => void }> = ({ task, onClick, onArchive }) => (
  <div 
    onClick={onClick}
    className="card p-4 card-hover cursor-pointer group relative overflow-hidden"
  >
     <div className={cn(
        "absolute top-0 left-0 w-1 h-full",
        task.priority === 'P1' ? "bg-danger" : task.priority === 'P2' ? "bg-warning" : "bg-brand"
      )} />
    <div className="flex items-start justify-between gap-2 mb-3">
      <div className="badge">{task.project}</div>
      <button 
        onClick={(e) => e.stopPropagation()}
        className="btn-icon size-6 opacity-0 group-hover:opacity-100"
      >
        <MoreHorizontal size={12} />
      </button>
    </div>

    <p className={cn(
      "text-[13px] font-medium leading-relaxed mb-4 line-clamp-3 transition-all",
      task.done ? "text-text-4 line-through" : "text-text-1"
    )}>
      {task.title}
    </p>

    <div className="flex items-center justify-between">
       <div className="flex items-center gap-2">
          <span className={cn(
            "text-[10px] font-bold flex items-center gap-1",
            task.due === 'Today' ? "text-danger" : "text-text-4"
          )}>
            <Calendar size={10} /> {task.due}
          </span>
       </div>
       <div className="size-6 rounded-full border border-white/[0.08] flex items-center justify-center text-[9px] font-bold text-text-4">
          AS
       </div>
    </div>
  </div>
);

const KanbanColumn: React.FC<{ 
  title: string; 
  tasks: any[]; 
  color: string;
  onTaskClick: (task: any) => void;
  onArchive: (task: any) => void;
  onAddTask: () => void;
}> = ({ title, tasks, color, onTaskClick, onArchive, onAddTask }) => (
  <div className="flex flex-col min-w-[320px] max-w-[340px] h-full">
    <div className="flex items-center justify-between px-2 mb-4">
      <div className="flex items-center gap-3">
        <h4 className="font-display font-bold text-[15px] text-text-1">{title}</h4>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-3 text-text-4">
          {tasks.length}
        </span>
      </div>
      <button onClick={onAddTask} className="btn-icon size-7"><Plus size={14}/></button>
    </div>

    <div className="flex-1 overflow-y-auto space-y-3 px-1 pb-4 scrollbar-hide">
      {tasks.map(task => (
        <KanbanCard key={task.id} task={task} onClick={() => onTaskClick(task)} onArchive={onArchive} />
      ))}

      <button 
        onClick={onAddTask}
        className="w-full flex items-center gap-2 px-4 py-3 text-[12px] font-bold text-text-4 hover:text-text-2 hover:bg-white/[0.03] rounded-xl border border-dashed border-white/[0.08] transition-all group"
      >
        <Plus size={14} className="group-hover:text-brand" /> Add Task
      </button>
    </div>
  </div>
);

export default function TasksPage() {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isArchiveDrawerOpen, setIsArchiveDrawerOpen] = useState(false);
  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [view, setView] = useState<'list' | 'board'>('list');

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsDetailDrawerOpen(true);
  };

  const handleArchiveClick = (task: any) => {
    setSelectedTask(task);
    setIsConfirmArchiveOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 h-full pb-24">
      <NewTaskModal open={isNewTaskModalOpen} onOpenChange={setIsNewTaskModalOpen} />
      <NewProjectModal open={isNewProjectModalOpen} onOpenChange={setIsNewProjectModalOpen} />
      <TaskDetailDrawer open={isDetailDrawerOpen} onOpenChange={setIsDetailDrawerOpen} task={selectedTask} />
      <ArchivedTasksDrawer open={isArchiveDrawerOpen} onOpenChange={setIsArchiveDrawerOpen} />
      <ConfirmDialog 
        open={isConfirmArchiveOpen}
        onOpenChange={setIsConfirmArchiveOpen}
        title="ARCHIVE PROTOCOL?"
        description={`Archive "${selectedTask?.title}"?`}
        confirmText="ARCHIVE"
        onConfirm={() => console.log("Archived")}
      />

      {/* Left Sidebar */}
      <div className="hidden lg:flex flex-col w-64 shrink-0 gap-12">
        <div className="space-y-6">
          <span className="label-section px-3">System Projects</span>
          <div className="flex flex-col gap-1">
            {projectsData.map(project => (
              <Link 
                key={project.id}
                href={project.id === 'inbox' ? '/tasks' : `/tasks/projects/${project.id}`}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all group",
                  project.id === 'inbox' ? "bg-brand/10 text-brand italic" : "text-text-4 hover:text-text-1 hover:bg-white/[0.04]"
                )}
              >
                <div className="flex items-center gap-3">
                  <project.icon size={16} style={{ color: project.color }} />
                  <span className="uppercase tracking-tight">{project.name}</span>
                </div>
                <span className="text-[10px] font-black opacity-30 group-hover:opacity-100">{project.count}</span>
              </Link>
            ))}
            <button 
              onClick={() => setIsNewProjectModalOpen(true)}
              className="flex items-center gap-3 px-4 py-3 text-[11px] font-black text-brand hover:text-brand-light mt-2 uppercase italic tracking-widest"
            >
              <Plus size={16} strokeWidth={3} /> INITIALIZE PROJECT
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <span className="label-section px-3">Telemetry Tags</span>
          <div className="flex flex-wrap gap-2 px-3">
            {['UNREADY', 'STABLE', 'CRITICAL', 'ALPHA'].map(t => (
              <button key={t} className="badge px-3 py-1 hover:bg-surface-4 active:scale-95 transition-all italic tracking-widest">#{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col gap-12">
        {/* Page Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
           <div className="relative flex-1 max-w-xl group">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-4 group-focus-within:text-brand transition-all" />
              <input 
                type="text" 
                placeholder="SEARCH PROTOCOLS..."
                className="w-full h-14 bg-surface-2 border border-white/[0.05] rounded-[20px] pl-14 pr-6 text-[14px] font-bold text-text-1 placeholder:text-text-4 placeholder:italic placeholder:tracking-widest focus:outline-none focus:border-brand/40 focus:bg-surface-3 transition-all"
              />
           </div>

           <div className="flex items-center gap-4">
              <div className="flex p-1.5 bg-surface-2 rounded-2xl border border-white/[0.05]">
                <button onClick={() => setView('list')} className={cn("px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all italic", view === 'list' ? "bg-surface-4 text-brand shadow-xl" : "text-text-4 hover:text-text-2")}>
                  <List size={14}/> List
                </button>
                <button onClick={() => setView('board')} className={cn("px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all italic", view === 'board' ? "bg-surface-4 text-brand shadow-xl" : "text-text-4 hover:text-text-2")}>
                  <LayoutGrid size={14}/> Board
                </button>
              </div>

              <div className="w-px h-8 bg-white/[0.06] mx-2" />

              <button onClick={() => setIsArchiveDrawerOpen(true)} className="btn-icon size-12"><Archive size={18}/></button>
              <button onClick={() => setIsNewTaskModalOpen(true)} className="btn-primary h-12 shadow-xl shadow-brand/20"><Plus size={18} strokeWidth={3}/><span>NEW PROTOCOL</span></button>
           </div>
        </div>

        {/* View Content */}
        {view === 'list' ? (
          <div className="space-y-10">
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="label-section text-brand">Working</span>
                <div className="h-px flex-1 bg-white/[0.04]" />
              </div>
              <div className="space-y-1.5">
                {tasksData.filter(t => !t.done).map((task, idx) => (
                  <TaskRow key={task.id} i={idx} task={task} onClick={() => handleTaskClick(task)} onArchive={handleArchiveClick} />
                ))}
              </div>
            </section>

             <section className="space-y-4 opacity-50 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <span className="label-section">Completed</span>
                <div className="h-px flex-1 bg-white/[0.04]" />
              </div>
              <div className="space-y-1.5">
                {tasksData.filter(t => t.done).map((task, idx) => (
                  <TaskRow key={task.id} i={0} task={task} onClick={() => handleTaskClick(task)} onArchive={handleArchiveClick} />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide -mx-2 px-2">
            <KanbanColumn title="To Do" color="var(--color-brand)" tasks={tasksData.filter(t => !t.done)} onAddTask={() => setIsNewTaskModalOpen(true)} onTaskClick={handleTaskClick} onArchive={handleArchiveClick} />
            <KanbanColumn title="In Progress" color="var(--color-warning)" tasks={[]} onAddTask={() => setIsNewTaskModalOpen(true)} onTaskClick={handleTaskClick} onArchive={handleArchiveClick} />
            <KanbanColumn title="Done" color="var(--color-success)" tasks={tasksData.filter(t => t.done)} onAddTask={() => setIsNewTaskModalOpen(true)} onTaskClick={handleTaskClick} onArchive={handleArchiveClick} />
          </div>
        )}
      </div>
    </div>
  );
}
