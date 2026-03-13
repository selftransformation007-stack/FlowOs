import React from 'react';
import { X, Bell, Check, CheckCircle2, Flame, Timer, Monitor, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from '@/src/components/ui/Sheet';
import { Tabs, TabsList, TabsTrigger } from '@/src/components/ui/Tabs';

interface NotificationCenterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const notifications = [
  {
    id: '1',
    type: 'habit',
    title: 'Habit Streak: 14 Days!',
    body: "You've completed 'Morning Meditation' for 14 days in a row. Keep it up!",
    timeAgo: '2m ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'task',
    title: 'Task Due Soon',
    body: "'Design FlowOS Dashboard' is due in 2 hours.",
    timeAgo: '1h ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'goal',
    title: 'Goal Progress Update',
    body: "You've reached 65% of your 'Run a 5K Marathon' goal.",
    timeAgo: '3h ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'focus',
    title: 'Focus Session Complete',
    body: "Great job! You just finished a 25-minute focus session.",
    timeAgo: 'Yesterday',
    isRead: true,
  },
];

const typeStyles: Record<string, string> = {
  habit: 'bg-success/15',
  task: 'bg-brand/15',
  goal: 'bg-warning/15',
  focus: 'bg-accent-cyan/15',
};

const typeIconColor: Record<string, string> = {
  habit: 'text-success',
  task: 'text-brand',
  goal: 'text-warning',
  focus: 'text-accent-cyan',
};

const typeIcons: Record<string, any> = {
  habit: Flame,
  task: CheckCircle2,
  goal: Target,
  focus: Timer,
};

import { Target } from 'lucide-react';

export const NotificationCenterDrawer: React.FC<NotificationCenterDrawerProps> = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = React.useState('all');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 bg-surface-1 border-l border-white/[0.07]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 h-14 border-b border-white/[0.07] shrink-0">
            <h2 className="font-display text-[17px] font-semibold text-text-1">Notifications</h2>
            <div className="flex items-center gap-2">
              <button className="text-[12px] text-brand-light font-bold hover:text-brand transition-colors h-7 px-2">
                Mark all read
              </button>
              <SheetClose className="size-8 flex items-center justify-center text-text-4 hover:text-text-2 transition-colors">
                <X size={16} />
              </SheetClose>
            </div>
          </div>

          <div className="px-5 py-3 border-b border-white/[0.07] shrink-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-surface-2 p-1 rounded-full h-9">
                <TabsTrigger value="all" className="rounded-full text-[11px] font-bold uppercase tracking-wider">All</TabsTrigger>
                <TabsTrigger value="unread" className="rounded-full text-[11px] font-bold uppercase tracking-wider">Unread</TabsTrigger>
                <TabsTrigger value="habits" className="rounded-full text-[11px] font-bold uppercase tracking-wider">Habits</TabsTrigger>
                <TabsTrigger value="tasks" className="rounded-full text-[11px] font-bold uppercase tracking-wider">Tasks</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="py-2">
              <div className="px-5 py-2">
                <span className="flowos-label">Today</span>
              </div>
              {notifications.map((notification) => {
                const Icon = typeIcons[notification.type] || Bell;
                return (
                  <div 
                    key={notification.id} 
                    className="flex items-start gap-3 px-5 py-4 border-b border-white/[0.04] hover:bg-surface-3 cursor-pointer group transition-all"
                  >
                    <div className={cn(
                      "size-9 rounded-full flex items-center justify-center shrink-0",
                      typeStyles[notification.type]
                    )}>
                      <Icon size={16} className={typeIconColor[notification.type]} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-text-1 leading-snug">{notification.title}</p>
                      <p className="text-[12px] text-text-2 mt-0.5 leading-relaxed">{notification.body}</p>
                      <p className="text-[11px] text-text-3 mt-1">{notification.timeAgo}</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 shrink-0 pt-1">
                      {!notification.isRead && <div className="size-2 rounded-full bg-brand" />}
                      <button className="size-6 opacity-0 group-hover:opacity-100 text-text-4 hover:text-text-2 transition-all flex items-center justify-center">
                        <Check size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="py-2">
              <div className="px-5 py-2">
                <span className="flowos-label">Earlier</span>
              </div>
              <div className="flex flex-col items-center justify-center py-12 text-center px-8">
                <div className="size-12 rounded-full bg-surface-2 flex items-center justify-center mb-3">
                  <Bell className="size-6 text-text-4" />
                </div>
                <p className="text-[14px] font-bold text-text-2">No more notifications</p>
                <p className="text-[12px] text-text-4 mt-1">You're all caught up for now.</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
