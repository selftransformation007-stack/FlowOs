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
import { Calendar as CalendarIcon, Flag, FolderOpen, Clock, Tag, User, Inbox, Layers } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NewTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ open, onOpenChange }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [project, setProject] = React.useState('inbox');
  const [priority, setPriority] = React.useState('none');
  const [date, setDate] = React.useState<Date>();
  const [estimate, setEstimate] = React.useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] p-0 overflow-hidden border-white/[0.07] bg-surface-1 shadow-2xl">
        <div className="px-8 pt-8 pb-4 space-y-6">
          {/* Main Input Section */}
          <div className="space-y-4">
            <input 
              autoFocus
              type="text" 
              placeholder="What's the protocol?" 
              className="w-full bg-transparent border-none outline-none text-[28px] font-display font-black text-white placeholder:text-text-4 tracking-tight"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
              placeholder="Context, references, or instructions..." 
              className="w-full bg-transparent border-none outline-none text-[15px] text-text-3 font-medium placeholder:text-text-4 resize-none min-h-[80px] leading-relaxed"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="divider opacity-30" />

          {/* Metadata Matrix */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 py-2">
            <div className="space-y-3">
              <label className="label-section px-1">Allocation (Project)</label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger className="h-11 bg-surface-2 border-white/[0.04] hover:bg-surface-3 transition-all rounded-xl">
                  <SelectValue placeholder="Inbox" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbox">
                    <div className="flex items-center gap-3">
                      <Inbox size={14} className="text-brand" /> 
                      <span className="text-[14px] font-bold">Inbox</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="work">
                    <div className="flex items-center gap-3">
                      <div className="size-2 rounded-full bg-danger" /> 
                      <span className="text-[14px] font-bold">Work Project</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="personal">
                    <div className="flex items-center gap-3">
                      <div className="size-2 rounded-full bg-success" /> 
                      <span className="text-[14px] font-bold">Personal</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="label-section px-1">Criticality (Priority)</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="h-11 bg-surface-2 border-white/[0.04] hover:bg-surface-3 transition-all rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p1"><div className="flex items-center gap-3"><div className="size-2.5 rounded-full bg-danger" /> <span className="text-[14px] font-bold">P1 — URGENT</span></div></SelectItem>
                  <SelectItem value="p2"><div className="flex items-center gap-3"><div className="size-2.5 rounded-full bg-warning" /> <span className="text-[14px] font-bold">P2 — HIGH</span></div></SelectItem>
                  <SelectItem value="p3"><div className="flex items-center gap-3"><div className="size-2.5 rounded-full bg-brand" /> <span className="text-[14px] font-bold">P3 — NORMAL</span></div></SelectItem>
                  <SelectItem value="none"><div className="flex items-center gap-3"><span className="text-[14px] font-bold text-text-4">NONE</span></div></SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="label-section px-1">Temporal Deadline</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn(
                    "flex h-11 w-full items-center gap-3 rounded-xl border border-white/[0.04] bg-surface-2 px-4 text-[14px] font-bold text-text-2 transition-all hover:bg-surface-3 outline-none group",
                    !date && "text-text-4"
                  )}>
                    <CalendarIcon size={14} className="text-text-4 group-hover:text-brand transition-colors" />
                    {date ? format(date, "PPP") : <span>No deadline set</span>}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-3">
              <label className="label-section px-1">Effort Estimate</label>
              <Select value={estimate} onValueChange={setEstimate}>
                <SelectTrigger className="h-11 bg-surface-2 border-white/[0.04] hover:bg-surface-3 transition-all rounded-xl">
                  <SelectValue placeholder="Unestimated" />
                </SelectTrigger>
                <SelectContent>
                  {['15m', '30m', '1h', '2h', '4h', '1d'].map(e => (
                    <SelectItem key={e} value={e}><span className="text-[14px] font-bold">{e}</span></SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="bg-surface-2/40 px-8 py-5 mt-4 border-t border-white/[0.06] backdrop-blur-md">
          <div className="flex-1 hidden sm:flex items-center text-[10px] font-bold text-text-4 uppercase tracking-[0.2em] opacity-40">
            ENTER TO SYNCHRONIZE
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => onOpenChange(false)} 
              className="btn-ghost"
            >
              DISCARD
            </button>
            <button className="btn-primary px-10">
              CREATE PROTOCOL
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

