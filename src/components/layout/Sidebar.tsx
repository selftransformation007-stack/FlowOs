"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Flame, 
  CheckSquare, 
  Calendar, 
  Target, 
  Timer, 
  Clock, 
  Monitor, 
  BarChart2, 
  Settings,
  ChevronRight,
  User,
  Keyboard
} from 'lucide-react';
import { motion } from 'motion/react';
import { Logo } from '@/src/components/ui/Logo';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'COMMAND', route: '/dashboard' },
  { icon: CheckSquare, label: 'PROTOCOLS', route: '/tasks', badge: '5' },
  { icon: Calendar, label: 'TEMPORAL', route: '/planner' },
  { icon: Flame, label: 'HABITUAL', route: '/habits', badge: '2' },
  { icon: Target, label: 'OBJECTIVES', route: '/goals' },
  { icon: Timer, label: 'NEURAL', route: '/focus' },
  { icon: Clock, label: 'TELEMETRY', route: '/time' },
  { icon: Monitor, label: 'EXPOSURE', route: '/screen-time' },
  { icon: BarChart2, label: 'ANALYSIS', route: '/analytics' },
];

interface SidebarProps {
  onOpenShortcuts?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenShortcuts }) => {
  const pathname = usePathname();

  const user = {
    name: "Arjun Singh",
    email: "arjun@flowos.com",
    image: null,
    plan: "LEVEL 04"
  };

  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col bg-surface-1 border-r border-white/[0.05] h-screen sticky top-0 shadow-2xl z-50">
      {/* Branding area */}
      <div className="flex items-center gap-4 px-6 h-20 border-b border-white/[0.05]">
        <div className="size-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
           <Logo className="size-5" />
        </div>
        <div className="flex flex-col">
           <span className="font-display font-black text-[16px] tracking-tight text-white leading-none">FLOW<span className="text-brand">OS</span></span>
           <span className="text-[9px] font-black text-white/30 tracking-[0.2em] uppercase mt-1">v4.0.1 Stable</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1.5 scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link
              key={item.route}
              href={item.route}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl group relative transition-all duration-300",
                isActive
                  ? "bg-white/[0.03] border border-white/[0.06] text-white shadow-lg"
                  : "text-text-4 hover:text-text-2 hover:bg-white/[0.01]"
              )}
            >
              {isActive && (
                 <motion.div 
                   layoutId="activeNavIndicator"
                   className="absolute left-0 w-1 h-6 bg-brand rounded-r-full"
                 />
              )}
              <item.icon size={18} className={cn("transition-colors duration-300", isActive ? "text-brand" : "text-text-4 group-hover:text-text-2")} />
              <span className={cn(
                "text-[11px] font-black tracking-[0.15em] uppercase italic transition-colors duration-300",
                isActive ? "text-white" : "text-text-4 group-hover:text-text-2"
              )}>
                {item.label}
              </span>
              {item.badge && (
                <span className="ml-auto text-[9px] bg-brand text-white border border-brand shadow-[0_0_8px_rgba(85,110,255,0.4)] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-black">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/[0.05] space-y-2">
        <button 
          onClick={onOpenShortcuts}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/[0.02] text-text-4 hover:text-text-2 transition-all group"
        >
          <Keyboard size={18} className="text-text-4 group-hover:text-text-2 transition-colors" />
          <span className="text-[10px] font-black tracking-widest uppercase italic pt-0.5">Neural Links</span>
          <div className="ml-auto flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
            <kbd className="px-1.5 py-0.5 rounded-lg bg-surface-3 border border-white/10 text-[9px] font-mono font-black">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded-lg bg-surface-3 border border-white/10 text-[9px] font-mono font-black">K</kbd>
          </div>
        </button>

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-4 group">
          <Link 
            href="/settings"
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="size-11 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center scale-95 group-hover:scale-100 transition-transform">
              <User size={20} className="text-brand" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-black text-white italic truncate tracking-tight">{user.name.toUpperCase()}</p>
              <div className="flex items-center gap-2 mt-0.5">
                 <div className="size-1.5 rounded-full bg-success animate-pulse" />
                 <p className="text-[9px] font-black text-text-4 uppercase tracking-widest opacity-60">Authorized</p>
              </div>
            </div>
          </Link>
          
          <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
             <span className="text-[9px] font-black text-brand tracking-widest uppercase italic">{user.plan}</span>
             <Settings size={14} className="text-text-4 hover:text-brand cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </aside>
  );
};

