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
import { Switch } from '@/src/components/ui/Switch';
import { Smartphone, Globe, MessageCircle, Play, ShieldAlert } from 'lucide-react';

interface SetScreenTimeLimitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  app?: { name: string; icon: any; category: string };
}

export const SetScreenTimeLimitModal: React.FC<SetScreenTimeLimitModalProps> = ({ open, onOpenChange, app }) => {
  const [notify, setNotify] = React.useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Set daily limit</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-1.5">
            <label className="flowos-label">Limit for</label>
            <Select defaultValue={app?.name.toLowerCase() || 'instagram'}>
              <SelectTrigger>
                <SelectValue placeholder="Select app or category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram"><div className="flex items-center gap-2"><Smartphone size={14} /> Instagram</div></SelectItem>
                <SelectItem value="twitter"><div className="flex items-center gap-2"><Smartphone size={14} /> Twitter</div></SelectItem>
                <SelectItem value="youtube"><div className="flex items-center gap-2"><Play size={14} /> YouTube</div></SelectItem>
                <SelectItem value="social"><div className="flex items-center gap-2"><MessageCircle size={14} /> Social Category</div></SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="flowos-label">Daily Limit</label>
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center gap-2">
                <input 
                  type="number" 
                  defaultValue="1"
                  className="flowos-shadcn-input text-center font-bold"
                />
                <span className="text-text-3 font-medium">h</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <Select defaultValue="30">
                  <SelectTrigger className="font-bold text-center"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['00', '15', '30', '45'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
                <span className="text-text-3 font-medium">min</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.07] pt-6 flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="flowos-label">Notify me</label>
              <p className="text-[12px] text-text-3">Alert when approaching limit.</p>
            </div>
            <Switch checked={notify} onCheckedChange={setNotify} />
          </div>

          {notify && (
            <div className="space-y-1.5">
              <label className="flowos-label">Alert at</label>
              <Select defaultValue="80">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="80">80% of limit</SelectItem>
                  <SelectItem value="90">90% of limit</SelectItem>
                  <SelectItem value="15">15 min before</SelectItem>
                  <SelectItem value="30">30 min before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="flowos-shadcn-btn-secondary w-auto px-6">Cancel</button>
          <button className="flowos-shadcn-btn-primary w-auto px-6">
            <ShieldAlert size={16} className="mr-2" /> Set Limit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
