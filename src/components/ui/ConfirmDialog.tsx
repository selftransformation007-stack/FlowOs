import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/src/components/ui/Dialog';
import { cn } from '@/src/lib/utils';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: 'danger' | 'primary';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  variant = 'primary'
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <button 
            onClick={() => onOpenChange(false)}
            className="flowos-shadcn-btn-secondary flex-1 sm:flex-none"
          >
            {cancelText}
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={cn(
              "flex-1 sm:flex-none px-6 py-2 rounded-[10px] font-bold text-[14px] transition-all",
              variant === 'danger' 
                ? "bg-danger text-white hover:bg-danger/90" 
                : "bg-brand text-white hover:bg-brand/90"
            )}
          >
            {confirmText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
