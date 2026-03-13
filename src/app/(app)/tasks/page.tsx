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
import { ArchivedTasksDrawer } from '@/src/components/modals/ArchivedTasksDrawer';
import { ConfirmDialog } from '@/src/components/ui/ConfirmDialog';
import { NewTaskModal } from '@/src/components/modals/NewTaskModal';
import { NewProjectModal } from '@/src/components/modals/NewProjectModal';
import { TaskDetailDrawer } from '@/src/components/modals/TaskDetailDrawer';
import { Link } from 'react-router-dom';

const projects = [
  { id: 'inbox', name: 'Inbox', icon: Inbox, color: 'text-brand', count: 12 },
  { id: 'work', name: 'Work Project', color: 'text-danger', count: 5 },
  { id: 'personal', name: 'Personal', color: 'text-success', count: 8 },
  { id: 'side', name: 'Side Hustle', color: 'text-warning', count: 3 },
];

const tasks = [
  { id: '1', title: 'Design FlowOS Dashboard', project: 'Work', priority: 'P1', due: 'Today', labels: ['Design', 'UI'], done: false },
  { id: '2', title: 'Review analytics report', project: 'Work', priority: 'P2', due: 'Tomorrow', labels: ['Research'], done: false },
  { id: '3', title: 'Buy groceries', project: 'Personal', priority: 'P3', due: 'Mar 12', labels: ['Shopping'], done: false },
  { id: '4', title: 'Update project documentation', project: 'Work', priority: 'P2', due: 'Mar 15', labels: ['Docs'], done: true },
  { id: '5', title: 'Call the bank', project: 'Personal', priority: 'P1', due: 'Today', labels: ['Finance'], done: false },
];

const TaskRow: React.FC<{ task: any; onClick: () => void; onArchive: (task: any) => void }> = ({ task, onClick, onArchive }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-4 rounded-14 bg-surface-2 border border-white/[0.07] hover:bg-surface-3 hover:border-white/[0.14] transition-all group cursor-pointer"
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
            ? "bg-success border-success text-white" 
            : "border-white/10 text-transparent hover:border-brand hover:text-brand/50"
        )}
      >
        <CheckCircle2 className="size-4" />
      </button>
      
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={cn(
          "size-2 rounded-full shrink-0",
          task.priority === 'P1' ? "bg-danger" : task.priority === 'P2' ? "bg-warning" : task.priority === 'P3' ? "bg-brand" : "bg-text-4"
        )} />
        <div className="flex flex-col min-w-0">
          <p className={cn(
            "text-[14px] font-medium truncate transition-all",
            task.done ? "text-text-4 line-through" : "text-text-1"
          )}>
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-text-3 font-medium uppercase tracking-wider flex items-center gap-1">
              <FolderOpen className="size-3" /> {task.project}
            </span>
            <span className="text-text-4 text-[10px]">•</span>
            {task.labels.map(label => (
              <span key={label} className="text-[10px] text-text-3 bg-white/5 px-1.5 py-0.5 rounded-[4px]">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4 ml-4">
      <Link 
        to={`/tasks/${task.id}`}
        onClick={(e) => e.stopPropagation()}
        className="text-text-4 hover:text-brand-light opacity-0 group-hover:opacity-100 transition-all p-1"
      >
        <ChevronRight className="size-4" />
      </Link>
      <div className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-[6px] text-[11px] font-bold uppercase tracking-wider",
        task.due === 'Today' ? "bg-danger/10 text-danger" : "bg-white/5 text-text-3"
      )}>
        <Calendar className="size-3" />
        {task.due}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            onClick={(e) => e.stopPropagation()}
            className="size-8 flex items-center justify-center rounded-full text-text-4 hover:text-text-2 hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all"
          >
            <MoreHorizontal className="size-4" />
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
          <DropdownMenuItem 
            className="gap-2 text-warning focus:text-warning"
            onClick={(e) => {
              e.stopPropagation();
              onArchive(task);
            }}
          >
            <Archive size={14} />
            Archive Task
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-danger focus:text-danger">
            <Trash2 size={14} />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);

const KanbanCard: React.FC<{ task: any; onClick: () => void; onArchive: (task: any) => void }> = ({ task, onClick, onArchive }) => (
  <div 
    onClick={onClick}
    className="flowos-card p-4 cursor-pointer hover:border-white/[0.14] active:scale-[0.98] transition-all group"
  >
    <div className="flex items-start justify-between gap-2 mb-2">
      <div className={cn(
        "size-2 rounded-full mt-1 shrink-0",
        task.priority === 'P1' ? "bg-danger" : task.priority === 'P2' ? "bg-warning" : task.priority === 'P3' ? "bg-brand" : "bg-text-4"
      )} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            onClick={(e) => e.stopPropagation()}
            className="size-6 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full text-text-3 hover:text-text-1 hover:bg-white/5 transition-all -mt-0.5 -mr-1"
          >
            <MoreHorizontal size={13} />
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
          <DropdownMenuItem 
            className="gap-2 text-warning focus:text-warning"
            onClick={(e) => {
              e.stopPropagation();
              onArchive(task);
            }}
          >
            <Archive size={14} />
            Archive Task
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-danger focus:text-danger">
            <Trash2 size={14} />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <p className={cn(
      "text-[13px] font-medium leading-snug mb-3 line-clamp-2 transition-all",
      task.done ? "text-text-4 line-through" : "text-text-1"
    )}>
      {task.title}
    </p>

    {task.labels.length > 0 && (
      <div className="flex flex-wrap gap-1 mb-2">
        {task.labels.map(label => (
          <span key={label} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-text-3">
            {label}
          </span>
        ))}
      </div>
    )}

    <div className="flex items-center gap-2 mt-1">
      <span className={cn(
        "text-[11px] flex items-center gap-1",
        task.due === 'Today' ? "text-danger" : "text-text-3"
      )}>
        <Calendar size={10} /> {task.due}
      </span>
      <span className="text-[11px] text-text-3 ml-auto flex items-center gap-1">
        <Clock size={10} /> 30m
      </span>
    </div>
  </div>
);

const KanbanColumn: React.FC<{ 
  title: string; 
  tasks: any[]; 
  statusColor: string;
  onTaskClick: (task: any) => void;
  onArchive: (task: any) => void;
  onAddTask: () => void;
}> = ({ title, tasks, statusColor, onTaskClick, onArchive, onAddTask }) => (
  <div className="flex flex-col min-w-[300px] max-w-[340px] h-full">
    <div className="flex items-center justify-between px-4 py-3 mb-2">
      <div className="flex items-center gap-2">
        <div className={cn("size-2 rounded-full", statusColor)} />
        <span className="text-[13px] font-semibold text-text-1">{title}</span>
        <span className="text-[11px] text-text-3 bg-surface-3 px-1.5 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>
      <button 
        onClick={onAddTask}
        className="size-7 flex items-center justify-center rounded-md text-text-3 hover:text-text-1 hover:bg-surface-3 transition-all"
      >
        <Plus size={14} />
      </button>
    </div>

    <div className="flex-1 overflow-y-auto space-y-2 px-2 pb-4 scrollbar-hide">
      {tasks.map(task => (
        <KanbanCard 
          key={task.id} 
          task={task} 
          onClick={() => onTaskClick(task)} 
          onArchive={onArchive} 
        />
      ))}

      {tasks.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-8 text-center border border-dashed border-white/[0.10] rounded-[12px] mx-2">
          <p className="text-[12px] text-text-4">No tasks</p>
        </div>
      )}

      <button 
        onClick={onAddTask}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-[12px] text-text-3 hover:text-text-1 hover:bg-surface-3 rounded-[8px] transition-colors group"
      >
        <Plus size={13} className="text-text-4 group-hover:text-text-2" />
        Add task
      </button>
    </div>
  </div>
);

export const TasksPage = () => {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = React.useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = React.useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = React.useState(false);
  const [isArchiveDrawerOpen, setIsArchiveDrawerOpen] = React.useState(false);
  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<any>(null);
  const [view, setView] = React.useState<'list' | 'board'>('list');

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsDetailDrawerOpen(true);
  };

  const handleArchiveClick = (task: any) => {
    setSelectedTask(task);
    setIsConfirmArchiveOpen(true);
  };

  const confirmArchive = () => {
    console.log('Archiving task:', selectedTask?.title);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      <NewTaskModal open={isNewTaskModalOpen} onOpenChange={setIsNewTaskModalOpen} />
      <NewProjectModal open={isNewProjectModalOpen} onOpenChange={setIsNewProjectModalOpen} />
      <TaskDetailDrawer open={isDetailDrawerOpen} onOpenChange={setIsDetailDrawerOpen} task={selectedTask} />
      <ArchivedTasksDrawer open={isArchiveDrawerOpen} onOpenChange={setIsArchiveDrawerOpen} />
      <ConfirmDialog 
        open={isConfirmArchiveOpen}
        onOpenChange={setIsConfirmArchiveOpen}
        title="Archive Task?"
        description={`Are you sure you want to archive "${selectedTask?.title}"? It will be hidden from your active list.`}
        confirmText="Archive"
        onConfirm={confirmArchive}
      />

      {/* Project Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 space-y-8">
        <div className="space-y-4">
          <span className="flowos-label px-2">Projects</span>
          <div className="space-y-1">
            {projects.map(project => (
              <Link 
                key={project.id}
                to={project.id === 'inbox' ? '/tasks' : `/tasks/projects/${project.id}`}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-10 text-[14px] font-medium transition-all group",
                  project.id === 'inbox' ? "bg-brand/10 text-brand" : "text-text-3 hover:text-text-2 hover:bg-surface-3"
                )}
              >
                <div className="flex items-center gap-3">
                  {project.icon ? <project.icon className="size-4" /> : <div className={cn("size-2 rounded-full", project.color.replace('text-', 'bg-'))} />}
                  {project.name}
                </div>
                <span className="text-[11px] bg-white/5 px-1.5 py-0.5 rounded-full text-text-4 group-hover:text-text-3">
                  {project.count}
                </span>
              </Link>
            ))}
          </div>
          <button 
            onClick={() => setIsNewProjectModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 text-[13px] text-text-4 hover:text-text-2 transition-colors"
          >
            <Plus className="size-4" />
            New Project
          </button>
        </div>

        <div className="space-y-4">
          <span className="flowos-label px-2">Labels</span>
          <div className="flex flex-wrap gap-2 px-2">
            {['Design', 'UI', 'Research', 'Docs', 'Finance', 'Shopping'].map(label => (
              <button key={label} className="text-[11px] font-medium text-text-3 bg-surface-2 border border-white/[0.07] px-2.5 py-1 rounded-full hover:bg-surface-3 hover:border-white/[0.14] transition-all">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Task List */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 bg-surface-2 border border-white/[0.07] rounded-10 px-3 py-2 w-full max-w-md">
            <Search className="size-4 text-text-4" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="bg-transparent border-none outline-none text-sm text-text-1 placeholder:text-text-4 w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface-3 rounded-[8px] p-0.5">
              <button 
                onClick={() => setView('list')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[12px] font-medium transition-all",
                  view === 'list' ? "bg-surface-2 text-text-1 shadow-sm" : "text-text-3 hover:text-text-2"
                )}
              >
                <List size={14}/> List
              </button>
              <button 
                onClick={() => setView('board')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[12px] font-medium transition-all",
                  view === 'board' ? "bg-surface-2 text-text-1 shadow-sm" : "text-text-3 hover:text-text-2"
                )}
              >
                <LayoutGrid size={14}/> Board
              </button>
            </div>
            <button 
              onClick={() => setIsArchiveDrawerOpen(true)}
              className="flowos-shadcn-btn-secondary size-10 p-0 flex items-center justify-center"
              title="Archived Tasks"
            >
              <Archive className="size-4" />
            </button>
            <button className="flowos-shadcn-btn-secondary w-auto px-4 h-10">
              <Filter className="size-4 mr-2" />
              Filter
            </button>
            <button 
              onClick={() => setIsNewTaskModalOpen(true)}
              className="flowos-shadcn-btn-primary w-auto px-4 h-10"
            >
              <Plus className="size-4 mr-2" />
              New Task
            </button>
          </div>
        </div>

        {view === 'list' ? (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <span className="flowos-label">To Do</span>
                <div className="h-px flex-1 bg-white/[0.05]" />
              </div>
              <div className="space-y-3">
                {tasks.filter(t => !t.done).map(task => (
                  <TaskRow key={task.id} task={task} onClick={() => handleTaskClick(task)} onArchive={handleArchiveClick} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <span className="flowos-label">Completed</span>
                <div className="h-px flex-1 bg-white/[0.05]" />
              </div>
              <div className="space-y-3 opacity-60">
                {tasks.filter(t => t.done).map(task => (
                  <TaskRow key={task.id} task={task} onClick={() => handleTaskClick(task)} onArchive={handleArchiveClick} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-240px)] scrollbar-hide">
            <KanbanColumn 
              title="To Do" 
              tasks={tasks.filter(t => !t.done)} 
              statusColor="bg-brand"
              onTaskClick={handleTaskClick}
              onArchive={handleArchiveClick}
              onAddTask={() => setIsNewTaskModalOpen(true)}
            />
            <KanbanColumn 
              title="In Progress" 
              tasks={[]} 
              statusColor="bg-warning"
              onTaskClick={handleTaskClick}
              onArchive={handleArchiveClick}
              onAddTask={() => setIsNewTaskModalOpen(true)}
            />
            <KanbanColumn 
              title="Completed" 
              tasks={tasks.filter(t => t.done)} 
              statusColor="bg-success"
              onTaskClick={handleTaskClick}
              onArchive={handleArchiveClick}
              onAddTask={() => setIsNewTaskModalOpen(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
