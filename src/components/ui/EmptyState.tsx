import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/Button';
import Link from 'next/link';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; href: string };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  action, 
  secondaryAction,
  className
}) => {
  return (
    <div className={cn("flex flex-col items-center gap-3 py-16 text-center", className)}>
      <div className="size-14 rounded-full bg-surface-3 flex items-center justify-center">
        <Icon size={24} className="text-text-4" />
      </div>
      <div className="space-y-1">
        <p className="text-[15px] font-semibold text-text-2">{title}</p>
        <p className="text-[13px] text-text-3 max-w-[280px] mx-auto leading-relaxed">{subtitle}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
        {action && (
          <Button onClick={action.onClick} className="flowos-shadcn-btn-primary h-9 px-4 text-[13px]">
            {action.label}
          </Button>
        )}
        {secondaryAction && (
          <Button asChild variant="ghost" className="h-9 px-4 text-[13px] text-text-2">
            <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
