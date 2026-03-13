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
          <div className="flex items-center justify-between p-5 border-b border-white/[0.07] shrink-0">
            <div>
              <SheetTitle>Archived Tasks</SheetTitle>
              <p className="text-[12px] text-text-3 mt-0.5">{archivedTasks.length} tasks archived</p>
            </div>
            <SheetClose className="size-8 flex items-center justify-center text-text-4 hover:text-text-2 transition-colors">
              <X size={16} />
            </SheetClose>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {archivedTasks.length > 0 ? (
              <div className="divide-y divide-white/[0.04]">
                {archivedTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center gap-3 px-5 py-4 hover:bg-surface-3 transition-colors group"
                  >
                    <div className="size-5 rounded-full border border-white/20 flex items-center justify-center shrink-0 opacity-50">
                      <CheckCircle2 size={12} className="text-transparent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-text-1 truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-4">{task.project}</span>
                        <span className="size-1 rounded-full bg-white/10" />
                        <span className="text-[11px] text-text-4">Archived {task.archivedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        title="Restore"
                        className="size-8 rounded-full flex items-center justify-center text-text-3 hover:text-brand hover:bg-brand/10 transition-all"
                      >
                        <RotateCcw size={14} />
                      </button>
                      <button 
                        title="Delete permanently"
                        className="size-8 rounded-full flex items-center justify-center text-text-3 hover:text-danger hover:bg-danger/10 transition-all"
                      >
                        <Trash2 size={14} />
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
