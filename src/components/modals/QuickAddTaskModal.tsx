"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
} from '@/src/components/ui/Dialog';
import { Search, Plus, CheckSquare, Flame, Target, Layout, ArrowRight, Zap, Hash, Command } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

interface QuickAddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockTasks = [
  { id: '1', title: 'System Synthesis: FlowOS', project: 'Work', priority: 'P1' },
  { id: '2', title: 'Review Telemetry Data', project: 'Work', priority: 'P2' },
];

const mockHabits = [
  { id: '1', title: 'Neural Expansion (Reading)', streak: '14D', emoji: '🧠' },
  { id: '2', title: 'Physical Maintenance', streak: '5D', emoji: '⚡' },
];

const mockGoals = [
  { id: '1', title: 'Biological Optimization', progress: '62%', emoji: '🧬' },
];

const pages = [
  { title: 'Home', path: '/dashboard', icon: Layout },
  { title: 'Habits', path: '/habits', icon: Flame },
  { title: 'Tasks', path: '/tasks', icon: CheckSquare },
  { title: 'Settings', path: '/settings', icon: Zap },
];

export const QuickAddTaskModal: React.FC<QuickAddTaskModalProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = React.useState('');
  const router = useRouter();

  const filteredTasks = query ? mockTasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredHabits = query ? mockHabits.filter(h => h.title.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredGoals = query ? mockGoals.filter(g => g.title.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredPages = query ? pages.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : [];

  const handleNavigate = (path: string) => {
    router.push(path);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] p-0 overflow-hidden border border-white/[0.08] bg-surface-1/90 backdrop-blur-2xl shadow-[0_32px_128px_rgba(0,0,0,0.8)] top-[15%] translate-y-0 duration-500">
        <DialogTitle className="sr-only">Neural Command Center</DialogTitle>
        
        {/* Search Header */}
        <div className="flex items-center px-8 h-20 bg-white/[0.02]">
          <Search size={20} className="text-brand mr-4 glow-brand" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search protocols or initialize new tasks..." 
            className="flex-1 bg-transparent border-none outline-none text-[20px] font-display font-medium text-white placeholder:text-text-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface-3 border border-white/5 text-[10px] text-text-4 font-black uppercase tracking-widest">
            ESC
          </div>
        </div>

        <div className="max-h-[520px] overflow-y-auto p-4 scrollbar-hide">
          <AnimatePresence mode="wait">
            {!query ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key="empty"
                className="p-8 flex flex-col items-center justify-center text-center space-y-6 py-20"
              >
                <div className="size-16 rounded-2xl bg-surface-2 border border-white/[0.05] flex items-center justify-center text-text-4 group hover:border-brand/40 transition-all duration-500">
                  <Command size={32} className="group-hover:text-brand transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="font-display font-black text-[18px] text-white uppercase italic tracking-tight">System Ready</p>
                  <p className="text-[13px] text-text-4 font-medium">Type to navigate, search, or initialize new modules.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                key="results"
                className="space-y-6"
              >
                {/* Result Sections */}
                {filteredPages.length > 0 && (
                  <div className="space-y-1">
                    <p className="label-section px-4 pt-2 mb-2 text-brand">Modules</p>
                    {filteredPages.map(page => (
                      <button 
                        key={page.path}
                        onClick={() => handleNavigate(page.path)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-all group overflow-hidden relative"
                      >
                        <div className="flex items-center gap-4 relative z-10">
                          <page.icon size={18} className="text-text-4 group-hover:text-brand transition-colors" />
                          <span className="text-[14px] text-text-1 font-bold tracking-tight">{page.title.toUpperCase()}</span>
                        </div>
                        <ArrowRight size={14} className="text-text-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all z-10" />
                      </button>
                    ))}
                  </div>
                )}

                {filteredTasks.length > 0 && (
                  <div className="space-y-1">
                    <p className="label-section px-4 pt-2 mb-2">Protocols</p>
                    {filteredTasks.map(task => (
                      <button 
                        key={task.id}
                        onClick={() => handleNavigate(`/tasks` /* Mocking path */)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "size-2 rounded-full",
                            task.priority === 'P1' ? "bg-danger shadow-[0_0_8px_var(--color-danger)]" : "bg-brand"
                          )} />
                          <span className="text-[14px] text-text-1 font-bold tracking-tight">{task.title.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="badge">{task.project}</span>
                          <ArrowRight size={14} className="text-text-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Always show create buttons if query exists */}
                <div className="space-y-1 p-2 bg-brand-dim/20 rounded-2xl border border-brand/5">
                  <p className="label-section px-4 pt-2 mb-2 text-brand-light opacity-60">Synthesis</p>
                  <button className="w-full h-11 flex items-center gap-4 px-4 rounded-xl hover:bg-brand/10 group transition-all">
                    <div className="size-7 rounded bg-brand/10 flex items-center justify-center text-brand">
                       <Plus size={16} />
                    </div>
                    <span className="text-[14px] font-bold text-text-1">Initialize Task: <span className="text-brand">"{query}"</span></span>
                  </button>
                  <button className="w-full h-11 flex items-center gap-4 px-4 rounded-xl hover:bg-brand/10 group transition-all">
                    <div className="size-7 rounded bg-success-dim flex items-center justify-center text-success">
                       <Flame size={16} />
                    </div>
                    <span className="text-[14px] font-bold text-text-1">Log Habit: <span className="text-success">"{query}"</span></span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Neural Footer */}
        <div className="flex items-center justify-between px-8 h-14 border-t border-white/[0.06] bg-surface-2/40 text-[10px] font-black text-text-4 tracking-tighter italic">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white">UP/DOWN</kbd> SELECT</span>
            <span className="flex items-center gap-2"><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white">ENTER</kbd> RESOLVE</span>
          </div>
          <div className="flex gap-4">
             <span className="flex items-center gap-2 opacity-50"><Hash size={12}/> SYSTEM V4</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
