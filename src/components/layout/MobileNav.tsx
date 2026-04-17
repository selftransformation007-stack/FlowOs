"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Flame, 
  CheckSquare, 
  Timer, 
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const MOBILE_NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Home",    href: "/dashboard"    },
  { icon: Flame,           label: "Habits",  href: "/habits"       },
  { icon: CheckSquare,     label: "Tasks",   href: "/tasks"        },
  { icon: Timer,           label: "Focus",   href: "/focus"        },
  { icon: MoreHorizontal,  label: "More",    href: "/settings"     },
];

export const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface-1 border-t
                   border-white/[0.06] flex items-center justify-around
                   px-2 md:hidden z-40">
      {MOBILE_NAV_ITEMS.map(item => (
        <Link 
          key={item.label}
          href={item.href} 
          className={cn(
            "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
            pathname === item.href ? "text-brand" : "text-text-4 hover:text-text-3"
          )}
        >
          <item.icon size={20}/>
          <span className="text-[10px] font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};
