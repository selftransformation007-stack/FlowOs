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
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4">
            <div 
              className="size-12 rounded-14 flex items-center justify-center text-xl shrink-0 border border-white/10"
              style={{ backgroundColor: `${selectedColor}20`, color: selectedColor }}
            >
              <FolderOpen size={24} />
            </div>
            <div className="flex-1">
              <label className="flowos-label mb-1.5 block">Project Name</label>
              <input 
                autoFocus
                type="text" 
                placeholder="e.g. Work, Personal, Side Project" 
                className="flowos-shadcn-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="flowos-label mb-3 block">Color</label>
            <div className="flex items-center justify-between">
              {colors.map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={cn(
                    "size-7 rounded-full transition-all",
                    selectedColor === c ? "ring-2 ring-white ring-offset-2 ring-offset-surface-2 scale-110" : "hover:scale-110"
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="flowos-label mb-1.5 block">Description</label>
            <textarea 
              placeholder="What is this project about?" 
              className="flowos-shadcn-input min-h-[80px] text-sm resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="flowos-shadcn-btn-secondary w-auto px-6">Cancel</button>
          <button className="flowos-shadcn-btn-primary w-auto px-6">Create Project</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
