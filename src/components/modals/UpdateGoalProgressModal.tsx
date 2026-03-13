import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/src/components/ui/Dialog';
import { TrendingUp } from 'lucide-react';

interface UpdateGoalProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal?: {
    title: string;
    keyResults: { id: string; title: string; current: number; target: number; unit: string }[];
  };
}

export const UpdateGoalProgressModal: React.FC<UpdateGoalProgressModalProps> = ({ open, onOpenChange, goal }) => {
  if (!goal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Update progress</DialogTitle>
          <DialogDescription className="mt-1">{goal.title}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {goal.keyResults.map((kr) => (
            <div key={kr.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flowos-label text-text-1">{kr.title}</label>
                <span className="text-[11px] text-text-4 uppercase tracking-wider font-bold">{kr.unit}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-surface-3 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand transition-all duration-500" 
                    style={{ width: `${(kr.current / kr.target) * 100}%` }} 
                  />
                </div>
                <div className="flex items-center gap-2 w-32">
                  <input 
                    type="number" 
                    defaultValue={kr.current}
                    className="flowos-shadcn-input h-9 text-center font-bold"
                  />
                  <span className="text-text-4">/</span>
                  <span className="text-[13px] text-text-3 w-10">{kr.target}</span>
                </div>
              </div>
              <p className="text-[11px] text-text-4 italic">Last updated 2 days ago</p>
            </div>
          ))}

          <div className="border-t border-white/[0.07] pt-6">
            <label className="flowos-label mb-1.5 block">What did you work on?</label>
            <textarea 
              placeholder="Quick note on your progress this week..." 
              className="flowos-shadcn-input min-h-[80px] text-sm resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="flowos-shadcn-btn-secondary w-auto px-6">Cancel</button>
          <button className="flowos-shadcn-btn-primary w-auto px-6">
            <TrendingUp size={16} className="mr-2" /> Save Progress
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
