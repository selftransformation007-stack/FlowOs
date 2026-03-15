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
import { Calendar as CalendarIcon, Flag, FolderOpen, Clock, Tag, User } from 'lucide-react';
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
      <DialogContent className="max-w-[560px] p-0 overflow-hidden border-white/[0.07] bg-surface-1">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-[20px] font-display font-bold text-text-1">New Task</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-6 space-y-8">
          {/* Main Input Section */}
          <div className="space-y-3">
            <input 
              autoFocus
              type="text" 
              placeholder="What needs to be done?" 
              className="w-full bg-transparent border-none outline-none text-[22px] font-display font-bold text-text-1 placeholder:text-text-4 tracking-tight"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
              placeholder="Add details, links, or context..." 
              className="w-full bg-transparent border-none outline-none text-[14px] text-text-2 placeholder:text-text-4 resize-none min-h-[60px] leading-relaxed"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-6 pt-6 border-t border-white/[0.05]">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-text-4">Project</label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger className="h-10 bg-surface-2 border-white/[0.07] hover:bg-surface-3 transition-colors">
                  <SelectValue placeholder="Inbox" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbox">
                    <div className="flex items-center gap-2.5">
                      <FolderOpen size={14} className="text-brand" /> 
                      <span className="text-[13px] font-medium">Inbox</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="work">
                    <div className="flex items-center gap-2.5">
                      <div className="size-2 rounded-full bg-danger" /> 
                      <span className="text-[13px] font-medium">Work Project</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="personal">
                    <div className="flex items-center gap-2.5">
                      <div className="size-2 rounded-full bg-success" /> 
                      <span className="text-[13px] font-medium">Personal</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-text-4">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="h-10 bg-surface-2 border-white/[0.07] hover:bg-surface-3 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p1"><div className="flex items-center gap-2.5"><div className="size-2 rounded-full bg-danger" /> <span className="text-[13px] font-medium">P1 — Urgent</span></div></SelectItem>
                  <SelectItem value="p2"><div className="flex items-center gap-2.5"><div className="size-2 rounded-full bg-warning" /> <span className="text-[13px] font-medium">P2 — High</span></div></SelectItem>
                  <SelectItem value="p3"><div className="flex items-center gap-2.5"><div className="size-2 rounded-full bg-brand" /> <span className="text-[13px] font-medium">P3 — Medium</span></div></SelectItem>
                  <SelectItem value="none"><div className="flex items-center gap-2.5"><span className="text-[13px] font-medium">None</span></div></SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-text-4">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn(
                    "flex h-10 w-full items-center gap-2.5 rounded-10 border border-white/[0.07] bg-surface-2 px-3 py-2 text-[13px] font-medium text-text-1 transition-colors hover:bg-surface-3 outline-none focus:ring-1 focus:ring-brand",
                    !date && "text-text-4"
                  )}>
                    <CalendarIcon size={14} className="text-text-4" />
                    {date ? format(date, "PPP") : <span>No due date</span>}
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

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-text-4">Estimate</label>
              <Select value={estimate} onValueChange={setEstimate}>
                <SelectTrigger className="h-10 bg-surface-2 border-white/[0.07] hover:bg-surface-3 transition-colors">
                  <SelectValue placeholder="No estimate" />
                </SelectTrigger>
                <SelectContent>
                  {['15m', '30m', '1h', '2h', '4h', '1 day', '2 days'].map(e => (
                    <SelectItem key={e} value={e}><span className="text-[13px] font-medium">{e}</span></SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-text-4">Labels</label>
            <button className="flex items-center gap-2.5 w-full h-10 bg-surface-2 border border-white/[0.07] rounded-10 px-3 hover:bg-surface-3 transition-colors text-text-4 group">
              <Tag size={14} className="group-hover:text-text-2 transition-colors" />
              <span className="text-[13px] font-medium group-hover:text-text-2 transition-colors">Add labels...</span>
            </button>
          </div>
        </div>

        <DialogFooter className="bg-surface-2/50 px-6 py-4 mt-0 border-t border-white/[0.07]">
          <div className="flex-1 hidden sm:flex items-center text-[11px] font-medium text-text-4 uppercase tracking-wider">
            ⌘ + Enter to save
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => onOpenChange(false)} 
              className="flex-1 sm:flex-none h-10 px-6 rounded-10 text-[13px] font-bold text-text-3 hover:text-text-1 hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button className="flex-1 sm:flex-none flowos-shadcn-btn-primary h-10 px-8 w-auto">
              Create Task
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
