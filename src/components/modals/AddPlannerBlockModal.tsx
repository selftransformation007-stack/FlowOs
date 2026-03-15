"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/src/components/ui/Dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/Select';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/Popover';
import { Calendar } from '@/src/components/ui/Calendar';
import { format } from 'date-fns';
import { CheckSquare, Flame, Video, Coffee, Zap, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface AddPlannerBlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultDate?: Date;
}

const blockTypes = [
  { id: 'task', label: 'Task', icon: CheckSquare },
  { id: 'habit', label: 'Habit', icon: Flame },
  { id: 'meeting', label: 'Meeting', icon: Video },
  { id: 'break', label: 'Break', icon: Coffee },
  { id: 'custom', label: 'Custom', icon: Zap },
];

export const AddPlannerBlockModal: React.FC<AddPlannerBlockModalProps> = ({ open, onOpenChange, defaultDate }) => {
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState('task');
  const [date, setDate] = React.useState<Date | undefined>(defaultDate || new Date());
  const [startTime, setStartTime] = React.useState('09:00');
  const [endTime, setEndTime] = React.useState('10:00');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Add time block</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <label className="flowos-label mb-1.5 block">Block Title</label>
            <input 
              autoFocus
              type="text" 
              placeholder="What are you scheduling?" 
              className="flowos-shadcn-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="flowos-label mb-3 block">Block Type</label>
            <div className="flex gap-2">
              {blockTypes.map(bt => (
                <button 
                  key={bt.id}
                  onClick={() => setType(bt.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center gap-1.5 h-16 rounded-10 border transition-all",
                    type === bt.id ? "bg-brand/15 border-brand/40 text-brand" : "bg-surface-3 border-white/[0.07] text-text-3 hover:text-text-2"
                  )}
                >
                  <bt.icon size={16} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{bt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flowos-label">Start Time</label>
              <input 
                type="time" 
                className="flowos-shadcn-input"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="flowos-label">End Time</label>
              <input 
                type="time" 
                className="flowos-shadcn-input"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flowos-label">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <button className={cn(
                  "flowos-shadcn-input flex items-center justify-start text-left font-normal",
                  !date && "text-text-4"
                )}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
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

          {type === 'task' && (
            <div className="space-y-1.5">
              <label className="flowos-label">Link to Task</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Search tasks..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t1">Design FlowOS Dashboard</SelectItem>
                  <SelectItem value="t2">Review analytics report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {type === 'habit' && (
            <div className="space-y-1.5">
              <label className="flowos-label">Link to Habit</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a habit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">Morning Meditation</SelectItem>
                  <SelectItem value="h2">Read 20 Pages</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="flowos-shadcn-btn-secondary w-auto px-6">Cancel</button>
          <button className="flowos-shadcn-btn-primary w-auto px-6">Save Block</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
