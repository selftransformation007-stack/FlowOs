"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
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

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
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
          if (nextE.key === 'h') router.push('/habits');
          if (nextE.key === 't') router.push('/tasks');
          if (nextE.key === 'p') router.push('/planner');
          if (nextE.key === 'f') router.push('/focus');
          if (nextE.key === 'a') router.push('/analytics');
          if (nextE.key === 's') router.push('/settings');
          if (nextE.key === 'd') router.push('/dashboard');
          window.removeEventListener('keydown', nextKeyHandler);
        };
        window.addEventListener('keydown', nextKeyHandler, { once: true });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);
  
  const getTitle = (pathname: string) => {
    if (pathname.startsWith('/habits/')) return 'Habit Details';
    if (pathname.startsWith('/tasks/projects/')) return 'Project Details';
    if (pathname.startsWith('/tasks/')) return 'Task Details';
    if (pathname.startsWith('/goals/')) return 'Goal Details';
    if (pathname.startsWith('/analytics/reports/')) return 'Analytics Report';
    return routeTitles[pathname] || 'FlowOS';
  };

  const title = getTitle(pathname || '');

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
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
