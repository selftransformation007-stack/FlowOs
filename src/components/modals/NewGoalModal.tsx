"use client";

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
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/Popover';
import { Calendar } from '@/src/components/ui/Calendar';
import { format } from 'date-fns';
import { Target, Calendar as CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NewGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  { id: 'health', label: 'Health', emoji: '🏃' },
  { id: 'career', label: 'Career', emoji: '💼' },
  { id: 'learning', label: 'Learning', emoji: '📚' },
  { id: 'mindfulness', label: 'Mindfulness', emoji: '🧘' },
  { id: 'finance', label: 'Finance', emoji: '💰' },
  { id: 'personal', label: 'Personal', emoji: '✨' },
];

export const NewGoalModal: React.FC<NewGoalModalProps> = ({ open, onOpenChange }) => {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('career');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState<Date>();
  const [keyResults, setKeyResults] = React.useState([{ id: '1', title: '', target: 1, unit: 'count' }]);

  const addKeyResult = () => {
    if (keyResults.length < 5) {
      setKeyResults([...keyResults, { id: String(Date.now()), title: '', target: 1, unit: 'count' }]);
    }
  };

  const removeKeyResult = (id: string) => {
    if (keyResults.length > 1) {
      setKeyResults(keyResults.filter(kr => kr.id !== id));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Set a new goal</DialogTitle>
          <DialogDescription>Define what success looks like.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto px-1 scrollbar-hide">
          <div className="space-y-4">
            <input 
              autoFocus
              type="text" 
              placeholder="e.g. Read 24 books this year, Run a 5K..." 
              className="flowos-shadcn-input h-12 text-[16px] font-bold"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <div>
              <label className="flowos-label mb-3 block">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 h-16 rounded-10 border transition-all",
                      category === cat.id ? "bg-brand/15 border-brand/40 text-brand" : "bg-surface-3 border-white/[0.07] text-text-2 hover:text-text-1"
                    )}
                  >
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <textarea 
              placeholder="Why does this goal matter? What will achieving it mean for you?" 
              className="flowos-shadcn-input min-h-[100px] text-sm resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="space-y-1.5">
              <label className="flowos-label">Target Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn(
                    "flowos-shadcn-input flex items-center justify-start text-left font-normal",
                    !date && "text-text-4"
                  )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>When will you achieve this?</span>}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="border-t border-white/[0.07] pt-6 space-y-4">
            <div className="flex flex-col gap-0.5">
              <label className="flowos-label">Key Results</label>
              <p className="text-[12px] text-text-3">What milestones define success?</p>
            </div>

            <div className="space-y-3">
              {keyResults.map((kr, i) => (
                <div key={kr.id} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. Read 2 books per month" 
                    className="flowos-shadcn-input flex-1"
                    value={kr.title}
                    onChange={(e) => {
                      const newKRs = [...keyResults];
                      newKRs[i].title = e.target.value;
                      setKeyResults(newKRs);
                    }}
                  />
                  <input 
                    type="number" 
                    className="flowos-shadcn-input w-20 text-center"
                    value={kr.target}
                    onChange={(e) => {
                      const newKRs = [...keyResults];
                      newKRs[i].target = Number(e.target.value);
                      setKeyResults(newKRs);
                    }}
                  />
                  <Select 
                    value={kr.unit}
                    onValueChange={(val) => {
                      const newKRs = [...keyResults];
                      newKRs[i].unit = val;
                      setKeyResults(newKRs);
                    }}
                  >
                    <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['count', '%', 'Books', 'km', 'Hours', 'Sessions', 'kg', 'Custom'].map(u => (
                        <SelectItem key={u} value={u.toLowerCase()}>{u}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {keyResults.length > 1 && (
                    <button 
                      onClick={() => removeKeyResult(kr.id)}
                      className="size-10 rounded-10 flex items-center justify-center text-text-4 hover:text-danger transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              {keyResults.length < 5 && (
                <button 
                  onClick={addKeyResult}
                  className="w-full h-10 rounded-10 border border-dashed border-white/10 text-[12px] text-text-3 hover:text-text-1 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Add Key Result
                </button>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="flowos-shadcn-btn-secondary w-auto px-6">Cancel</button>
          <button className="flowos-shadcn-btn-primary w-auto px-6">
            <Target size={16} className="mr-2" /> Create Goal
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
