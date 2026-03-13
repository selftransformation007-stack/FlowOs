import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Pencil, 
  MoreHorizontal, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/src/components/ui/DropdownMenu';
import { TasksPage } from '@/src/app/(app)/tasks/page';

const mockProject = {
  id: '1',
  name: 'FlowOS Platform',
  emoji: '🚀',
  color: '#556eff',
  description: 'Building the ultimate productivity workspace for creative professionals.',
  total: 24,
  done: 18,
  overdue: 2,
  pct: 75
};

export const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in pb-20">
      <button 
        onClick={() => navigate('/tasks')}
        className="flex items-center gap-1.5 text-[13px] text-text-3 hover:text-text-1 transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        Back to Tasks
      </button>

      {/* Project Header */}
      <div className="flowos-card p-6 mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 bg-surface-1 border-white/[0.07]">
        <div className="flex items-center gap-5">
          <div 
            className="size-14 rounded-[14px] flex items-center justify-center text-[28px] shrink-0"
            style={{ background: `${mockProject.color}20`, border: `2px solid ${mockProject.color}40` }}
          >
            {mockProject.emoji}
          </div>
          <div>
            <h1 className="font-display text-[28px] font-bold text-text-1 tracking-[-0.5px] leading-tight">
              {mockProject.name}
            </h1>
            {mockProject.description && (
              <p className="text-[14px] text-text-3 mt-1 font-medium leading-relaxed">{mockProject.description}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8 shrink-0">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="font-display text-[22px] font-bold text-text-1">{mockProject.total}</p>
              <p className="text-[11px] text-text-4 font-bold uppercase tracking-wider">Total</p>
            </div>
            <div className="text-center">
              <p className="font-display text-[22px] font-bold text-success">{mockProject.done}</p>
              <p className="text-[11px] text-text-4 font-bold uppercase tracking-wider">Done</p>
            </div>
            <div className="text-center">
              <p className="font-display text-[22px] font-bold text-danger">{mockProject.overdue}</p>
              <p className="text-[11px] text-text-4 font-bold uppercase tracking-wider">Overdue</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[160px]">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-text-4 font-bold uppercase tracking-wider">Progress</span>
              <span className="text-[12px] text-brand-light font-bold">{mockProject.pct}%</span>
            </div>
            <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-brand rounded-full transition-all duration-1000" style={{ width: `${mockProject.pct}%` }}/>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flowos-shadcn-btn-secondary h-10 px-4 font-bold">
              <Pencil size={16} className="mr-2"/> Edit
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="size-10 flex items-center justify-center rounded-10 text-text-3 hover:text-text-1 hover:bg-surface-3 transition-all">
                  <MoreHorizontal size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Archive Project</DropdownMenuItem>
                <DropdownMenuItem className="text-danger">Delete Project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Reusing TasksPage but with project filter context */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flowos-label">Project Tasks</h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center text-[12px] text-text-3 font-bold hover:text-text-1 px-3 py-1.5 rounded-8 hover:bg-surface-3 transition-all">
              <Filter size={14} className="mr-2"/> Filter
            </button>
            <button className="flex items-center text-[12px] text-text-3 font-bold hover:text-text-1 px-3 py-1.5 rounded-8 hover:bg-surface-3 transition-all">
              <ArrowUpDown size={14} className="mr-2"/> Sort
            </button>
          </div>
        </div>
        
        {/* We can't easily "filter" the TasksPage without props, so I'll just render it. 
            In a real app, we'd pass a projectId prop to TasksPage. */}
        <TasksPage />
      </div>
    </div>
  );
};
