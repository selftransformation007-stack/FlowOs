import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
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
import { Logo } from '@/src/components/ui/Logo';
import { cn } from '@/src/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', route: '/dashboard' },
  { icon: Flame, label: 'Habits', route: '/habits', badge: '2' },
  { icon: CheckSquare, label: 'Tasks', route: '/tasks', badge: '5' },
  { icon: Calendar, label: 'Planner', route: '/planner' },
  { icon: Target, label: 'Goals', route: '/goals' },
  { icon: Timer, label: 'Focus', route: '/focus' },
  { icon: Clock, label: 'Time', route: '/time' },
  { icon: Monitor, label: 'Screen Time', route: '/screen-time' },
  { icon: BarChart2, label: 'Analytics', route: '/analytics' },
];

interface SidebarProps {
  onOpenShortcuts?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenShortcuts }) => {
  const { pathname } = useLocation();

  const user = {
    name: "Arjun Singh",
    email: "arjun@flowos.com",
    image: null,
    plan: "PRO"
  };

  return (
    <aside className="hidden lg:flex w-[240px] shrink-0 flex-col bg-surface-1 border-r border-white/[0.07] h-screen sticky top-0">
      {/* Logo area */}
      <div className="flex items-center gap-3 px-5 h-14 border-b border-white/[0.07]">
        <Logo />
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <NavLink
              key={item.route}
              to={item.route}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[10px]",
                "text-[13px] font-medium transition-colors duration-150",
                isActive
                  ? "bg-brand/10 text-brand"
                  : "text-text-3 hover:text-text-1 hover:bg-surface-3"
              )}
            >
              <item.icon size={17} className={isActive ? "text-brand" : "text-text-3"} />
              {item.label}
              {item.badge && (
                <span className="ml-auto text-[10px] bg-danger text-white rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-white/[0.07] space-y-1">
        <button 
          onClick={onOpenShortcuts}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-surface-3 text-text-3 hover:text-text-1 transition-colors text-[13px] font-medium group"
        >
          <Keyboard size={17} className="text-text-4 group-hover:text-text-1 transition-colors" />
          Shortcuts
          <div className="ml-auto flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded-4 bg-surface-3 border border-white/10 text-[9px] font-mono text-text-4">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded-4 bg-surface-3 border border-white/10 text-[9px] font-mono text-text-4">K</kbd>
          </div>
        </button>

        <Link 
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-surface-3 cursor-pointer transition-colors group"
        >
          <div className="size-9 rounded-full bg-brand/20 flex items-center justify-center text-brand-light font-bold text-xs shrink-0 ring-2 ring-transparent group-hover:ring-brand/30 transition-all">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-text-1 truncate">{user.name}</p>
            <p className="text-[11px] text-text-3 truncate">{user.email}</p>
          </div>
          <span className={cn(
            "text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 tracking-wider",
            user.plan === "PRO"
              ? "text-brand border-brand/30 bg-brand/10"
              : "text-text-3 border-white/[0.07] bg-surface-3"
          )}>
            {user.plan}
          </span>
        </Link>
      </div>
    </aside>
  );
};
