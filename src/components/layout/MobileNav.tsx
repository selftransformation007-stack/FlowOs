import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Flame, 
  CheckSquare, 
  Timer, 
  MoreHorizontal,
  Calendar,
  Target,
  Clock,
  Monitor,
  BarChart2,
  Settings
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/Sheet';

const MOBILE_NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Home",    href: "/dashboard"    },
  { icon: Flame,           label: "Habits",  href: "/habits",  badge: '2' },
  { icon: CheckSquare,     label: "Tasks",   href: "/tasks",   badge: '5' },
  { icon: Timer,           label: "Focus",   href: "/focus"        },
  { icon: MoreHorizontal,  label: "More",    href: null            },
];

const MORE_ITEMS = [
  { icon: Calendar,  label: "Planner",     href: "/planner"      },
  { icon: Target,    label: "Goals",       href: "/goals"        },
  { icon: Clock,     label: "Time",        href: "/time"         },
  { icon: Monitor,   label: "Screen Time", href: "/screen-time"  },
  { icon: BarChart2, label: "Analytics",   href: "/analytics"    },
  { icon: Settings,  label: "Settings",    href: "/settings"     },
];

export const MobileNav = () => {
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = React.useState(false);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-surface-1/95 backdrop-blur-md border-t border-white/[0.07] flex items-center justify-around px-2 pb-safe">
      {MOBILE_NAV_ITEMS.map((item) => {
        const isActive = item.href ? location.pathname === item.href : false;
        
        if (!item.href) {
          return (
            <Sheet key="more" open={isMoreOpen} onOpenChange={setIsMoreOpen}>
              <SheetTrigger asChild>
                <button className="flex flex-col items-center gap-1 px-4 py-2 relative">
                  <item.icon size={22} className="text-text-3" />
                  <span className="text-[10px] font-medium text-text-3">{item.label}</span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto max-h-[80vh] rounded-t-[24px] p-0 border-none bg-surface-1 overflow-hidden">
                <div className="w-12 h-1.5 bg-surface-3 rounded-full mx-auto mt-4 mb-6" />
                <div className="px-6 mb-4 flex items-center justify-between">
                  <p className="font-display text-[18px] font-bold text-text-1">Modules</p>
                  <button onClick={() => setIsMoreOpen(false)} className="text-[13px] font-bold text-brand">Done</button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 px-6 pb-12">
                  {MORE_ITEMS.map((moreItem) => (
                    <NavLink
                      key={moreItem.href}
                      to={moreItem.href}
                      onClick={() => setIsMoreOpen(false)}
                      className="flex flex-col items-center gap-2 p-4 rounded-[16px] bg-surface-2 border border-white/[0.05] active:scale-95 transition-all"
                    >
                      <div className="size-10 rounded-full bg-surface-3 flex items-center justify-center text-text-2">
                        <moreItem.icon size={20} />
                      </div>
                      <span className="text-[11px] font-bold text-text-2">{moreItem.label}</span>
                    </NavLink>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          );
        }

        return (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 px-4 py-2 relative transition-all",
              isActive ? "text-brand" : "text-text-3"
            )}
          >
            <item.icon size={22} className={cn(isActive ? "text-brand" : "text-text-3")} />
            <span className={cn("text-[10px] font-bold", isActive ? "text-brand" : "text-text-3")}>
              {item.label}
            </span>
            {item.badge && (
              <span className="absolute top-2 right-4 size-4 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-surface-1">
                {item.badge}
              </span>
            )}
            {isActive && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-brand rounded-full" />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
