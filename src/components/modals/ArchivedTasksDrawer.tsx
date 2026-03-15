import React from 'react';
import { X, Archive, RotateCcw, Trash2, CheckCircle2 } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from '@/src/components/ui/Sheet';
import { cn } from '@/src/lib/utils';

interface ArchivedTasksDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const archivedTasks = [
  { id: '201', title: 'Research competitors', project: 'Marketing', priority: 'High', archivedDate: 'Mar 5, 2026' },
  { id: '202', title: 'Update documentation', project: 'Product', priority: 'Medium', archivedDate: 'Mar 2, 2026' },
];

export const ArchivedTasksDrawer: React.FC<ArchivedTasksDrawerProps> = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[380px] p-0 bg-surface-1 border-l border-white/[0.07]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-8 border-b border-white/[0.05] shrink-0 bg-surface-1/50 backdrop-blur-md">
            <div className="space-y-1">
              <SheetTitle className="text-[20px] font-display font-bold text-text-1">Archive</SheetTitle>
              <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-text-4">{archivedTasks.length} tasks stored</p>
            </div>
            <SheetClose className="size-10 rounded-full flex items-center justify-center text-text-4 hover:text-text-2 hover:bg-white/5 transition-all">
              <X size={20} />
            </SheetClose>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide bg-surface-1">
            {archivedTasks.length > 0 ? (
              <div className="divide-y divide-white/[0.03]">
                {archivedTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center gap-4 px-6 py-5 hover:bg-white/[0.02] transition-all group relative overflow-hidden"
                  >
                    <div className="size-5 rounded-full border border-white/10 flex items-center justify-center shrink-0 opacity-30 group-hover:opacity-100 transition-all">
                      <CheckCircle2 size={12} className="text-transparent group-hover:text-text-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-[14px] font-medium text-text-2 group-hover:text-text-1 transition-colors truncate">{task.title}</p>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-4 bg-white/5 px-1.5 py-0.5 rounded-[4px]">{task.project}</span>
                        <span className="text-[10px] text-text-4 font-medium italic opacity-60">Archived {task.archivedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <button 
                        title="Restore"
                        className="size-9 rounded-full flex items-center justify-center text-text-3 hover:text-brand hover:bg-brand/10 transition-all"
                      >
                        <RotateCcw size={16} />
                      </button>
                      <button 
                        title="Delete permanently"
                        className="size-9 rounded-full flex items-center justify-center text-text-3 hover:text-danger hover:bg-danger/10 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center px-8">
                <div className="size-16 rounded-full bg-surface-2 flex items-center justify-center mb-4">
                  <Archive className="size-8 text-text-4" />
                </div>
                <h3 className="text-[16px] font-bold text-text-2">No archived tasks</h3>
                <p className="text-[13px] text-text-4 mt-1">Tasks you archive will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
