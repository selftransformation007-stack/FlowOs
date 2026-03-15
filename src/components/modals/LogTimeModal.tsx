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
import { Calendar as CalendarIcon, Clock, FolderOpen, CheckSquare } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LogTimeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LogTimeModal: React.FC<LogTimeModalProps> = ({ open, onOpenChange }) => {
  const [project, setProject] = React.useState('');
  const [task, setTask] = React.useState('');
  const [date, setDate] = React.useState<Date>(new Date());
  const [durationMode, setDurationMode] = React.useState('duration');
  const [hours, setHours] = React.useState('1');
  const [minutes, setMinutes] = React.useState('30');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Log time</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flowos-label">Project</label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work"><div className="flex items-center gap-2"><div className="size-2 rounded-full bg-brand" /> Work Project</div></SelectItem>
                  <SelectItem value="personal"><div className="flex items-center gap-2"><div className="size-2 rounded-full bg-success" /> Personal</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="flowos-label">Task</label>
              <Select value={task} onValueChange={setTask} disabled={!project}>
                <SelectTrigger>
                  <SelectValue placeholder="Select task (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t1">Design FlowOS Dashboard</SelectItem>
                  <SelectItem value="t2">Review analytics report</SelectItem>
                </SelectContent>
              </Select>
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

          <div className="space-y-4">
            <div className="flex bg-surface-3 p-1 rounded-10 w-fit">
              {['duration', 'start-end'].map(mode => (
                <button 
                  key={mode}
                  onClick={() => setDurationMode(mode)}
                  className={cn(
                    "px-4 py-1.5 rounded-[8px] text-[12px] font-bold transition-all",
                    durationMode === mode ? "bg-surface-0 text-text-1 shadow-sm" : "text-text-3 hover:text-text-2"
                  )}
                >
                  {mode === 'duration' ? 'Duration' : 'Start & End'}
                </button>
              ))}
            </div>

            {durationMode === 'duration' ? (
              <div className="flex items-center gap-4">
                <div className="flex-1 flex items-center gap-2">
                  <input 
                    type="number" 
                    className="flowos-shadcn-input text-center font-bold"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                  <span className="text-text-3 font-medium">hours</span>
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <Select value={minutes} onValueChange={setMinutes}>
                    <SelectTrigger className="font-bold text-center"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['00', '15', '30', '45'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <span className="text-text-3 font-medium">minutes</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="flowos-label">Start time</label>
                  <input type="time" className="flowos-shadcn-input" defaultValue="09:00" />
                </div>
                <div className="space-y-1.5">
                  <label className="flowos-label">End time</label>
                  <input type="time" className="flowos-shadcn-input" defaultValue="10:30" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="flowos-label">Notes</label>
            <textarea 
              placeholder="What did you work on?" 
              className="flowos-shadcn-input min-h-[80px] text-sm resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="flowos-shadcn-btn-secondary w-auto px-6">Cancel</button>
          <button className="flowos-shadcn-btn-primary w-auto px-6">
            <Clock size={16} className="mr-2" /> Log Time
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
