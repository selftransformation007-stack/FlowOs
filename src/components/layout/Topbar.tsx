import React from 'react';
import { Search, Bell, User, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Logo } from '@/src/components/ui/Logo';

interface TopbarProps {
  title: string;
  onOpenNotifications?: () => void;
  onOpenShortcuts?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ title, onOpenNotifications, onOpenShortcuts }) => {
  const unreadCount = 3;

  return (
    <header className="h-14 sticky top-0 z-40 bg-surface-0/80 backdrop-blur-md border-b border-white/[0.07] flex items-center px-4 lg:px-6 gap-3 lg:gap-4">
      {/* Mobile Logo mark only */}
      <div className="lg:hidden shrink-0">
        <Logo className="size-8" />
      </div>

      {/* Page title */}
      <h1 className="flex-1 lg:flex-none text-center lg:text-left font-display text-[16px] lg:text-[17px] font-semibold text-text-1 truncate">
        {title}
      </h1>

      {/* Spacer for desktop */}
      <div className="hidden lg:block flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1 lg:gap-2">
        <button 
          onClick={onOpenShortcuts}
          className="size-9 rounded-full flex items-center justify-center text-text-3 hover:text-text-1 hover:bg-surface-3 transition-all" 
          aria-label="Search"
        >
          <Search className="size-4.5" />
        </button>
        
        <div className="relative">
          <button 
            onClick={onOpenNotifications}
            className="size-9 rounded-full flex items-center justify-center text-text-3 hover:text-text-1 hover:bg-surface-3 transition-all" 
            aria-label="Open notifications"
          >
            <Bell className="size-4.5" />
          </button>
          {unreadCount > 0 && (
            <div className="absolute top-1 right-1 size-2.5 rounded-full bg-danger border-2 border-surface-0 animate-pulse" />
          )}
        </div>
        
        <div className="hidden lg:block h-6 w-px bg-white/[0.07] mx-2" />

        <button className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-3 transition-all group">
          <div className="size-8 rounded-full bg-brand/20 flex items-center justify-center text-brand-light font-bold text-[11px] shrink-0 ring-2 ring-transparent group-hover:ring-brand/30 transition-all">
            AS
          </div>
        </button>
      </div>
    </header>
  );
};
