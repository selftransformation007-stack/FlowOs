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
      <DialogContent className="max-w-[440px] p-0 overflow-hidden border-white/[0.07] bg-surface-1 shadow-2xl">
        <div className="px-8 pt-8 pb-4 space-y-8">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)] animate-pulse" />
                <span className="text-[10px] font-black text-text-4 tracking-widest uppercase italic opacity-60">System Registry</span>
             </div>
             <h2 className="font-display font-black text-[24px] tracking-tighter text-white italic leading-none uppercase">Initialize Project</h2>
          </div>

          <div className="flex items-start gap-6">
            <div 
              className="size-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 border border-white/10 shadow-lg transition-all duration-500"
              style={{ 
                backgroundColor: `${selectedColor}15`, 
                color: selectedColor,
                boxShadow: `0 8px 20px -4px ${selectedColor}30`
              }}
            >
              <FolderOpen size={30} strokeWidth={2.5} />
            </div>
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <label className="label-section">Designation</label>
                <input 
                  autoFocus
                  type="text" 
                  placeholder="PROJECT NAME" 
                  className="w-full bg-transparent border-none outline-none text-[22px] font-display font-black text-white placeholder:text-text-4 tracking-tight uppercase italic"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="label-section">Chroma (Accent)</label>
            <div className="grid grid-cols-5 gap-3">
              {colors.map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={cn(
                    "h-8 rounded-lg transition-all relative group",
                    selectedColor === c ? "ring-2 ring-white ring-offset-4 ring-offset-surface-1 scale-110" : "hover:scale-110 opacity-60 hover:opacity-100"
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

          <div className="space-y-3">
            <label className="label-section">Mission Parameters</label>
            <textarea 
              placeholder="What is the objective of this project?" 
              className="w-full bg-surface-2 border border-white/[0.07] rounded-2xl p-4 text-[14px] text-text-2 placeholder:text-text-4 placeholder:italic resize-none min-h-[100px] focus:outline-none focus:border-brand/40 transition-all leading-relaxed"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="bg-surface-2/40 px-8 py-5 mt-4 border-t border-white/[0.06] backdrop-blur-md">
          <button 
            onClick={() => onOpenChange(false)} 
            className="btn-ghost"
          >
            DISCARD
          </button>
          <button className="btn-primary px-10">
            CREATE PROJECT
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
