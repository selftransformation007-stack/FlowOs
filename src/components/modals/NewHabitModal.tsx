import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/src/components/ui/Dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/Select';
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/RadioGroup';
import { Switch } from '@/src/components/ui/Switch';
import { Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NewHabitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colors = [
  '#2563EB', // Brand Blue
  '#06B6D4', // Cyan
  '#22C55E', // Success
  '#F59E0B', // Amber
  '#EF4444', // Danger Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F97316', // Orange
  '#14B8A6', // Teal
  '#64748B', // Slate
];

const emojis = ['🧘', '📚', '🏃', '💧', '🥗', '💻', '🎨', '🎸', '🌱', '☀️', '🌙', '🚶', '🍎', '🧠', '✍️', '🧹', '🍵', '🔋', '🚲', '🏊', '🏀', '⚽', '🎾', '♟️'];

export const NewHabitModal: React.FC<NewHabitModalProps> = ({ open, onOpenChange }) => {
  const [name, setName] = React.useState('');
  const [selectedEmoji, setSelectedEmoji] = React.useState('✦');
  const [selectedColor, setSelectedColor] = React.useState(colors[0]);
  const [category, setCategory] = React.useState('');
  const [frequency, setFrequency] = React.useState('daily');
  const [customDays, setCustomDays] = React.useState<string[]>([]);
  const [reminder, setReminder] = React.useState(false);

  const toggleDay = (day: string) => {
    setCustomDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Create a habit</DialogTitle>
          <DialogDescription>Small daily actions compound into big results.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4">
            <div 
              className="size-12 rounded-full flex items-center justify-center text-xl shrink-0 border-2 border-dashed border-white/10"
              style={{ backgroundColor: `${selectedColor}20`, borderColor: `${selectedColor}40` }}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <button className="size-full flex items-center justify-center">{selectedEmoji}</button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-2">
                  <div className="grid grid-cols-6 gap-1">
                    {emojis.map(e => (
                      <button 
                        key={e} 
                        onClick={() => setSelectedEmoji(e)}
                        className="size-10 flex items-center justify-center rounded-md hover:bg-surface-4 text-xl"
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1">
              <label className="flowos-label mb-1.5 block">Habit Name</label>
              <input 
                autoFocus
                type="text" 
                placeholder="e.g. Morning run, Read 20 pages" 
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
                    "size-8 rounded-full transition-all",
                    selectedColor === c ? "ring-2 ring-white ring-offset-2 ring-offset-surface-2 scale-110" : "hover:scale-110"
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="flowos-label mb-1.5 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {['Health', 'Fitness', 'Learning', 'Mindfulness', 'Social', 'Creative', 'Work', 'Finance', 'Other'].map(cat => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-t border-white/[0.07] pt-6">
            <label className="flowos-label mb-3 block">Frequency</label>
            <RadioGroup value={frequency} onValueChange={setFrequency} className="flex gap-2">
              {['Daily', 'Weekdays', 'Custom'].map(f => (
                <div key={f} className="flex-1">
                  <RadioGroupItem value={f.toLowerCase()} id={f} className="sr-only" />
                  <label 
                    htmlFor={f}
                    className={cn(
                      "flex items-center justify-center h-10 rounded-10 border text-[13px] font-medium cursor-pointer transition-all",
                      frequency === f.toLowerCase() ? "bg-brand/15 border-brand/40 text-brand" : "bg-surface-3 border-white/[0.07] text-text-3 hover:text-text-2"
                    )}
                  >
                    {f}
                  </label>
                </div>
              ))}
            </RadioGroup>

            {frequency === 'custom' && (
              <div className="flex justify-between mt-4">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                  const dayId = `${day}-${i}`;
                  const isActive = customDays.includes(dayId);
                  return (
                    <button
                      key={dayId}
                      onClick={() => toggleDay(dayId)}
                      className={cn(
                        "size-9 rounded-full flex items-center justify-center text-[12px] font-bold transition-all",
                        isActive ? "bg-brand text-white" : "bg-surface-3 text-text-3 hover:bg-surface-4"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-white/[0.07] pt-6 flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="flowos-label">Set a daily reminder</label>
              <p className="text-[12px] text-text-3">Get a notification at a specific time.</p>
            </div>
            <Switch checked={reminder} onCheckedChange={setReminder} />
          </div>

          {reminder && (
            <div className="flex gap-2">
              <Select defaultValue="08">
                <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                <SelectContent>{Array.from({ length: 12 }).map((_, i) => <SelectItem key={i} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</SelectItem>)}</SelectContent>
              </Select>
              <Select defaultValue="00">
                <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                <SelectContent>{['00', '15', '30', '45'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
              </Select>
              <Select defaultValue="AM">
                <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="AM">AM</SelectItem><SelectItem value="PM">PM</SelectItem></SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="flowos-shadcn-btn-secondary w-auto px-6">Cancel</button>
          <button className="flowos-shadcn-btn-primary w-auto px-6">
            <Plus size={16} className="mr-2" /> Create Habit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/Popover';
