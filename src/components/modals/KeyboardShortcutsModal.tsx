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
      <DialogContent className="max-w-[560px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-brand/10 text-brand flex items-center justify-center">
              <Keyboard size={18} />
            </div>
            <DialogTitle>Keyboard shortcuts</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 py-4">
          {shortcutSections.map((section, idx) => (
            <div key={idx} className="mb-5">
              <p className="flowos-label mb-2">{section.title}</p>
              <div className="space-y-1">
                {section.shortcuts.map((s, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-[13px] text-text-2">{s.description}</span>
                    <div className="flex gap-1">
                      {s.keys.map((key, kIdx) => (
                        <kbd key={kIdx} className="px-2 py-0.5 bg-surface-3 border border-white/[0.10] rounded-[6px] text-[11px] font-mono text-text-2 min-w-[28px] text-center">
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
      </DialogContent>
    </Dialog>
  );
};
