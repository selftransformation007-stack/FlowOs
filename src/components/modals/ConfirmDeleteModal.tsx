import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/src/components/ui/Dialog';
import { Trash2 } from 'lucide-react';

interface ConfirmDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  confirmText?: string;
  requireEmail?: string;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ 
  open, 
  onOpenChange, 
  title = "Delete item?", 
  description = "This action cannot be undone. This will permanently delete the item and all associated data.",
  onConfirm,
  confirmText = "Delete",
  requireEmail
}) => {
  const [emailInput, setEmailInput] = React.useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="mt-2">{description}</DialogDescription>
        </DialogHeader>

        {requireEmail && (
          <div className="py-4 space-y-2">
            <label className="flowos-label">Type your email to confirm</label>
            <input 
              type="text" 
              placeholder={requireEmail}
              className="flowos-shadcn-input"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>
        )}

        <DialogFooter className="sm:justify-between">
          <button onClick={() => onOpenChange(false)} className="flowos-shadcn-btn-secondary w-auto px-6">Cancel</button>
          <button 
            onClick={() => {
              onConfirm?.();
              onOpenChange(false);
            }} 
            disabled={requireEmail ? emailInput !== requireEmail : false}
            className="flowos-shadcn-btn-primary bg-danger hover:bg-danger/80 border-danger/20 w-auto px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={16} className="mr-2" /> {confirmText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
