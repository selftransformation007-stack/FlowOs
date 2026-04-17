import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/src/components/ui/Dialog';
import { Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcutSections = [
  {
    title: "Navigation",
    shortcuts: [
      { description: "Go to Habits", keys: ["G", "H"] },
      { description: "Go to Tasks", keys: ["G", "T"] },
      { description: "Go to Planner", keys: ["G", "P"] },
      { description: "Go to Focus", keys: ["G", "F"] },
      { description: "Go to Analytics", keys: ["G", "A"] },
    ]
  },
  {
    title: "Actions",
    shortcuts: [
      { description: "New task", keys: ["N"] },
      { description: "Command palette", keys: ["⌘", "K"] },
      { description: "Shortcuts", keys: ["⌘", "/"] },
      { description: "Shortcuts", keys: ["?"] },
    ]
  },
  {
    title: "Tasks",
    shortcuts: [
      { description: "Edit selected", keys: ["E"] },
      { description: "Set due date", keys: ["D"] },
      { description: "Set priority", keys: ["P"] },
      { description: "Delete", keys: ["Del"] },
    ]
  },
  {
    title: "Focus",
    shortcuts: [
      { description: "Play/pause", keys: ["Space"] },
      { description: "Skip", keys: ["S"] },
      { description: "Reset", keys: ["R"] },
    ]
  }
];

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px] bg-surface-1 border border-white/[0.06] p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-4">
             <div className="size-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center border border-brand/20">
                <Keyboard size={20} />
             </div>
             <div className="space-y-1">
                <DialogTitle className="font-display font-black text-[22px] tracking-tight text-white uppercase italic">Neural Modalities</DialogTitle>
                <p className="text-[10px] font-bold text-text-4 tracking-widest uppercase opacity-60">Input Synthesis / Keyboard Offsets</p>
             </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 p-8 pt-4">
          {shortcutSections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                 <span className="label-section text-brand">{section.title}</span>
                 <div className="h-px flex-1 bg-white/[0.04]" />
              </div>
              <div className="space-y-1">
                {section.shortcuts.map((s, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between py-2.5 border-b border-white/[0.03] group hover:bg-white/[0.01] px-2 -mx-2 rounded transition-colors">
                    <span className="text-[12px] font-bold text-text-3 group-hover:text-text-1 transition-colors">{s.description.toUpperCase()}</span>
                    <div className="flex gap-1.5">
                      {s.keys.map((key, kIdx) => (
                        <kbd key={kIdx} className="px-2 py-1 bg-surface-3 border border-white/[0.08] rounded-lg text-[10px] font-mono font-black text-white min-w-[24px] text-center shadow-sm">
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-2/40 border-t border-white/[0.06] py-4 px-8 flex justify-between items-center group cursor-pointer hover:bg-surface-2/60 transition-all">
           <span className="text-[10px] font-black text-text-4 tracking-[0.2em] group-hover:text-text-2 transition-colors">OS VERSION 4.2.1 // FLOW-SYNTHESIS</span>
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-brand tracking-widest">CALIBRATED</span>
              <div className="size-1.5 rounded-full bg-brand animate-pulse" />
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
