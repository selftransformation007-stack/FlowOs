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
      <DialogContent className="max-w-[480px] p-0 overflow-hidden border-white/[0.07] bg-surface-1 shadow-2xl">
        <div className="px-8 pt-8 pb-4 space-y-8">
           <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)] animate-pulse" />
                <span className="text-[10px] font-black text-text-4 tracking-widest uppercase italic opacity-60">Temporal Allocation</span>
             </div>
             <input 
                autoFocus
                type="text" 
                placeholder="LABEL TIME BLOCK..." 
                className="w-full bg-transparent border-none outline-none text-[24px] font-display font-black text-white placeholder:text-text-4 tracking-tight uppercase italic"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
          </div>

          <div>
            <label className="label-section mb-4">Module Classification</label>
            <div className="grid grid-cols-5 gap-3">
              {blockTypes.map(bt => (
                <button 
                  key={bt.id}
                  onClick={() => setType(bt.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center gap-2 h-20 rounded-2xl border transition-all group",
                    type === bt.id ? "bg-brand/15 border-brand/40 text-brand" : "bg-surface-2 border-white/[0.04] text-text-4 hover:text-text-2 hover:bg-surface-3"
                  )}
                >
                  <bt.icon size={18} className={cn("transition-transform", type === bt.id ? "scale-110" : "group-hover:scale-110")} />
                  <span className="text-[9px] font-black uppercase tracking-[0.1em] italic">{bt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="label-section">Phase Start</label>
              <input 
                type="time" 
                className="w-full h-11 bg-surface-2 border border-white/[0.06] rounded-xl px-4 text-[14px] font-bold text-text-2 focus:outline-none focus:border-brand/40 transition-all appearance-none"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <label className="label-section">Phase End</label>
              <input 
                type="time" 
                className="w-full h-11 bg-surface-2 border border-white/[0.06] rounded-xl px-4 text-[14px] font-bold text-text-2 focus:outline-none focus:border-brand/40 transition-all appearance-none"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="label-section">Target Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <button className={cn(
                  "flex h-11 w-full items-center gap-3 rounded-xl border border-white/[0.04] bg-surface-2 px-4 text-[14px] font-bold text-text-2 outline-none hover:bg-surface-3 transition-all",
                  !date && "text-text-4"
                )}>
                  <CalendarIcon className="size-4 text-text-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {(type === 'task' || type === 'habit') && (
            <div className="space-y-3">
              <label className="label-section">Associated Record</label>
              <Select>
                <SelectTrigger className="h-11 bg-surface-2 border-white/[0.04] rounded-xl outline-none">
                  <SelectValue placeholder={type === 'task' ? "Inquire task database..." : "Select habitual cycle"} />
                </SelectTrigger>
                <SelectContent>
                  {type === 'task' ? (
                    <>
                      <SelectItem value="t1"><span className="text-[14px] font-bold">Design FlowOS Dashboard</span></SelectItem>
                      <SelectItem value="t2"><span className="text-[14px] font-bold">Review analytics report</span></SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="h1"><span className="text-[14px] font-bold">Morning Meditation</span></SelectItem>
                      <SelectItem value="h2"><span className="text-[14px] font-bold">Read 20 Pages</span></SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter className="bg-surface-2/40 px-8 py-5 mt-4 border-t border-white/[0.06] backdrop-blur-md">
           <button onClick={() => onOpenChange(false)} className="btn-ghost">DISCARD</button>
           <button className="btn-primary px-10">SYNCHRONIZE BLOCK</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
