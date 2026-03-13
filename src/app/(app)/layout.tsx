import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Topbar } from '@/src/components/layout/Topbar';
import { MobileNav } from '@/src/components/layout/MobileNav';

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/habits': 'Habits',
  '/tasks': 'Tasks',
  '/planner': 'Planner',
  '/goals': 'Goals',
  '/focus': 'Focus',
  '/focus/history': 'Focus History',
  '/time': 'Time',
  '/screen-time': 'Screen Time',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

import { QuickAddTaskModal } from '@/src/components/modals/QuickAddTaskModal';
import { NotificationCenterDrawer } from '@/src/components/modals/NotificationCenterDrawer';
import { KeyboardShortcutsModal } from '@/src/components/modals/KeyboardShortcutsModal';
import { useNavigate } from 'react-router-dom';

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isQuickAddOpen, setIsQuickAddOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette: Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsQuickAddOpen(true);
      }
      
      // Shortcuts: ? or Cmd+/
      if (e.key === '?' || ((e.metaKey || e.ctrlKey) && e.key === '/')) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        e.preventDefault();
        setIsShortcutsOpen(true);
      }

      // Navigation shortcuts: G + [key]
      if (e.key === 'g') {
        const nextKeyHandler = (nextE: KeyboardEvent) => {
          if (nextE.key === 'h') navigate('/habits');
          if (nextE.key === 't') navigate('/tasks');
          if (nextE.key === 'p') navigate('/planner');
          if (nextE.key === 'f') navigate('/focus');
          if (nextE.key === 'a') navigate('/analytics');
          if (nextE.key === 's') navigate('/settings');
          if (nextE.key === 'd') navigate('/dashboard');
          window.removeEventListener('keydown', nextKeyHandler);
        };
        window.addEventListener('keydown', nextKeyHandler, { once: true });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
  
  const getTitle = (pathname: string) => {
    if (pathname.startsWith('/habits/')) return 'Habit Details';
    if (pathname.startsWith('/tasks/projects/')) return 'Project Details';
    if (pathname.startsWith('/tasks/')) return 'Task Details';
    if (pathname.startsWith('/goals/')) return 'Goal Details';
    if (pathname.startsWith('/analytics/reports/')) return 'Analytics Report';
    return routeTitles[pathname] || 'FlowOS';
  };

  const title = getTitle(location.pathname);

  return (
    <div className="flex h-screen w-full bg-surface-0 overflow-hidden">
      <Sidebar onOpenShortcuts={() => setIsShortcutsOpen(true)} />
      <MobileNav />
      <QuickAddTaskModal open={isQuickAddOpen} onOpenChange={setIsQuickAddOpen} />
      <NotificationCenterDrawer open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen} />
      <KeyboardShortcutsModal open={isShortcutsOpen} onOpenChange={setIsShortcutsOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar 
          title={title} 
          onOpenNotifications={() => setIsNotificationsOpen(true)} 
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-8 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
