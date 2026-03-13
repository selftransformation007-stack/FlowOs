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
      <DialogContent className="max-w-[520px]">
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <input 
              autoFocus
              type="text" 
              placeholder="What needs to be done?" 
              className="flowos-shadcn-input h-12 text-[16px] font-medium"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
              placeholder="Add details, links, or context..." 
              className="flowos-shadcn-input min-h-[80px] text-sm resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flowos-label">Project</label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Inbox" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbox">
                    <div className="flex items-center gap-2">
                      <FolderOpen size={14} className="text-text-4" /> Inbox
                    </div>
                  </SelectItem>
                  <SelectItem value="work">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-brand" /> Work Project
                    </div>
                  </SelectItem>
                  <SelectItem value="personal">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-success" /> Personal
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="flowos-label">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p1"><div className="flex items-center gap-2"><div className="size-2 rounded-full bg-danger" /> P1 — Urgent</div></SelectItem>
                  <SelectItem value="p2"><div className="flex items-center gap-2"><div className="size-2 rounded-full bg-warning" /> P2 — High</div></SelectItem>
                  <SelectItem value="p3"><div className="flex items-center gap-2"><div className="size-2 rounded-full bg-brand" /> P3 — Medium</div></SelectItem>
                  <SelectItem value="none"><div className="flex items-center gap-2">None</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flowos-label">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn(
                    "flowos-shadcn-input flex items-center justify-start text-left font-normal",
                    !date && "text-text-4"
                  )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
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

            <div className="space-y-1.5">
              <label className="flowos-label">Estimate</label>
              <Select value={estimate} onValueChange={setEstimate}>
                <SelectTrigger>
                  <SelectValue placeholder="No estimate" />
                </SelectTrigger>
                <SelectContent>
                  {['15m', '30m', '1h', '2h', '4h', '1 day', '2 days'].map(e => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flowos-label">Labels</label>
            <div className="flowos-shadcn-input flex items-center gap-2 min-h-[40px] flex-wrap py-2">
              <Tag size={14} className="text-text-4" />
              <span className="text-text-4 text-sm">Add labels...</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex-1 flex items-center text-[12px] text-text-4">
            Press ⌘↵ to save
          </div>
          <button onClick={() => onOpenChange(false)} className="flowos-shadcn-btn-secondary w-auto px-6">Cancel</button>
          <button className="flowos-shadcn-btn-primary w-auto px-6">Add Task</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
