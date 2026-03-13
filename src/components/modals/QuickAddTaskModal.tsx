import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
} from '@/src/components/ui/Dialog';
import { Search, Plus, CheckSquare, Flame, Target, Layout, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';

interface QuickAddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickAddTaskModal: React.FC<QuickAddTaskModalProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();

  const mockTasks = [
    { id: '1', title: 'Design FlowOS Dashboard', project: 'Work Project', priority: 'P1' },
    { id: '2', title: 'Review analytics report', project: 'Work Project', priority: 'P2' },
  ];

  const mockHabits = [
    { id: '1', title: 'Morning run', streak: '14-day streak', emoji: '🔥' },
    { id: '2', title: 'Read 20 pages', streak: '5-day streak', emoji: '📚' },
  ];

  const mockGoals = [
    { id: '1', title: 'Run a 5K', progress: '62% complete', emoji: '🏆' },
  ];

  const pages = [
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Habits', path: '/habits' },
    { title: 'Analytics', path: '/analytics' },
    { title: 'Settings', path: '/settings' },
  ];

  const filteredTasks = query ? mockTasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredHabits = query ? mockHabits.filter(h => h.title.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredGoals = query ? mockGoals.filter(g => g.title.toLowerCase().includes(query.toLowerCase())) : [];
  const filteredPages = query ? pages.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : [];

  const handleNavigate = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] p-0 overflow-hidden border-none shadow-2xl shadow-black/60 top-[20%] translate-y-0">
        <DialogTitle className="sr-only">Quick Search and Add</DialogTitle>
        <div className="flex items-center px-6 h-16 border-b border-white/[0.07] bg-surface-2">
          <Search size={20} className="text-text-4 mr-4" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search or create..." 
            className="flex-1 bg-transparent border-none outline-none text-[18px] text-text-1 placeholder:text-text-4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-text-4 font-bold uppercase tracking-wider">
            ESC to close
          </div>
        </div>

        <div className="max-h-[480px] overflow-y-auto p-2 scrollbar-hide">
          {query ? (
            <div className="space-y-4">
              {filteredTasks.length > 0 && (
                <div>
                  <p className="px-3 py-1.5 text-[11px] text-text-4 font-bold uppercase tracking-wider">Tasks</p>
                  {filteredTasks.map(task => (
                    <button 
                      key={task.id}
                      onClick={() => handleNavigate(`/tasks/${task.id}`)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] hover:bg-surface-3 transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "size-2 rounded-full",
                          task.priority === 'P1' ? "bg-danger" : task.priority === 'P2' ? "bg-warning" : "bg-brand"
                        )} />
                        <span className="text-[14px] text-text-1 font-medium">{task.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-text-4 bg-white/5 px-2 py-0.5 rounded-full">{task.project}</span>
                        <ArrowRight size={14} className="text-text-4 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {filteredHabits.length > 0 && (
                <div>
                  <p className="px-3 py-1.5 text-[11px] text-text-4 font-bold uppercase tracking-wider">Habits</p>
                  {filteredHabits.map(habit => (
                    <button 
                      key={habit.id}
                      onClick={() => handleNavigate(`/habits/${habit.id}`)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] hover:bg-surface-3 transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{habit.emoji}</span>
                        <span className="text-[14px] text-text-1 font-medium">{habit.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-text-4">{habit.streak}</span>
                        <ArrowRight size={14} className="text-text-4 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {filteredGoals.length > 0 && (
                <div>
                  <p className="px-3 py-1.5 text-[11px] text-text-4 font-bold uppercase tracking-wider">Goals</p>
                  {filteredGoals.map(goal => (
                    <button 
                      key={goal.id}
                      onClick={() => handleNavigate(`/goals/${goal.id}`)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] hover:bg-surface-3 transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{goal.emoji}</span>
                        <span className="text-[14px] text-text-1 font-medium">{goal.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-text-4">{goal.progress}</span>
                        <ArrowRight size={14} className="text-text-4 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {filteredPages.length > 0 && (
                <div>
                  <p className="px-3 py-1.5 text-[11px] text-text-4 font-bold uppercase tracking-wider">Pages</p>
                  {filteredPages.map(page => (
                    <button 
                      key={page.path}
                      onClick={() => handleNavigate(page.path)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] hover:bg-surface-3 transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Layout size={16} className="text-text-4" />
                        <span className="text-[14px] text-text-1 font-medium">{page.title}</span>
                      </div>
                      <ArrowRight size={14} className="text-text-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              )}

              <div>
                <p className="px-3 py-1.5 text-[11px] text-text-4 font-bold uppercase tracking-wider">Create</p>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] hover:bg-surface-3 transition-all group text-left">
                  <Plus size={16} className="text-brand" />
                  <span className="text-[14px] text-text-1">Create task "{query}"</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] hover:bg-surface-3 transition-all group text-left">
                  <Plus size={16} className="text-success" />
                  <span className="text-[14px] text-text-1">Create habit "{query}"</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="size-12 rounded-full bg-surface-3 flex items-center justify-center text-text-4">
                <Search size={24} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-text-2">Type to search or create</p>
                <p className="text-[13px] text-text-4">Find tasks, habits, goals, and more instantly.</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 h-12 border-t border-white/[0.07] bg-surface-2/50 text-[11px] text-text-4">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">↑↓</kbd> Navigate</span>
            <span className="flex items-center gap-1.5"><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">↵</kbd> Select</span>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/10">⌘↵</kbd> Create instantly</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
