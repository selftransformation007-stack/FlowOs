"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/src/components/ui/Dialog';
import { cn } from '@/src/lib/utils';
import { FolderOpen } from 'lucide-react';

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colors = [
  '#556eff', // brand blue
  '#00f2ff', // cyan
  '#55ff9e', // success green
  '#ffb800', // warning amber
  '#ff4b4b', // danger red
  '#a855f7', // purple
  '#ec4899', // pink
  '#f97316', // orange
  '#14b8a6', // teal
  '#64748b', // slate
];

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ open, onOpenChange }) => {
  const [name, setName] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState(colors[0]);
  const [description, setDescription] = React.useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px] p-0 overflow-hidden border-white/[0.07] bg-surface-1">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-[18px] font-display font-bold text-text-1">Create Project</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-8 space-y-8">
          <div className="flex items-start gap-6">
            <div 
              className="size-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 border border-white/10 shadow-lg transition-all duration-300"
              style={{ 
                backgroundColor: `${selectedColor}15`, 
                color: selectedColor,
                boxShadow: `0 8px 20px -4px ${selectedColor}30`
              }}
            >
              <FolderOpen size={32} />
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-text-4">Project Name</label>
                <input 
                  autoFocus
                  type="text" 
                  placeholder="e.g. Work, Personal, Side Project" 
                  className="w-full bg-transparent border-none outline-none text-[20px] font-display font-bold text-text-1 placeholder:text-text-4 tracking-tight"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-text-4">Theme Color</label>
            <div className="grid grid-cols-5 gap-3">
              {colors.map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={cn(
                    "h-8 rounded-lg transition-all relative group",
                    selectedColor === c ? "ring-2 ring-white ring-offset-4 ring-offset-surface-1 scale-105" : "hover:scale-110 opacity-60 hover:opacity-100"
                  )}
                  style={{ backgroundColor: c }}
                >
                  {selectedColor === c && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-1.5 rounded-full bg-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-text-4">Description</label>
            <textarea 
              placeholder="What is this project about?" 
              className="w-full bg-surface-2 border border-white/[0.07] rounded-14 p-4 text-[14px] text-text-2 placeholder:text-text-4 resize-none min-h-[100px] focus:ring-1 focus:ring-brand outline-none transition-all"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="bg-surface-2/50 px-6 py-4 mt-0 border-t border-white/[0.07]">
          <button 
            onClick={() => onOpenChange(false)} 
            className="h-10 px-6 rounded-10 text-[13px] font-bold text-text-3 hover:text-text-1 hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button className="flowos-shadcn-btn-primary h-10 px-8 w-auto">
            Create Project
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
