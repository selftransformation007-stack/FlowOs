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
import { Slider } from '@/src/components/ui/Slider';
import { Play, Settings } from 'lucide-react';

interface FocusSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FocusSettingsModal: React.FC<FocusSettingsModalProps> = ({ open, onOpenChange }) => {
  const [autoStartBreaks, setAutoStartBreaks] = React.useState(false);
  const [autoStartFocus, setAutoStartFocus] = React.useState(false);
  const [volume, setVolume] = React.useState([70]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Focus settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flowos-label">Focus Duration</label>
              <Select defaultValue="25">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['15', '20', '25', '30', '45', '60'].map(m => <SelectItem key={m} value={m}>{m} min</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="flowos-label">Short Break</label>
              <Select defaultValue="5">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['5', '10'].map(m => <SelectItem key={m} value={m}>{m} min</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flowos-label">Long Break</label>
              <Select defaultValue="15">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['15', '20', '30'].map(m => <SelectItem key={m} value={m}>{m} min</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="flowos-label">Long break after</label>
              <Select defaultValue="4">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['3', '4', '5'].map(m => <SelectItem key={m} value={m}>{m} sessions</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t border-white/[0.07] pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="flowos-label">Auto-start breaks</label>
              <Switch checked={autoStartBreaks} onCheckedChange={setAutoStartBreaks} />
            </div>
            <div className="flex items-center justify-between">
              <label className="flowos-label">Auto-start focus after break</label>
              <Switch checked={autoStartFocus} onCheckedChange={setAutoStartFocus} />
            </div>
          </div>

          <div className="border-t border-white/[0.07] pt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="flowos-label">Notification sound</label>
              <div className="flex gap-2">
                <Select defaultValue="ding">
                  <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['None', 'Ding', 'Bell', 'Chime', 'Gong'].map(s => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <button className="size-10 rounded-10 border border-white/[0.07] flex items-center justify-center text-text-3 hover:text-text-1">
                  <Play size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="flowos-label">Volume</label>
                <span className="text-[11px] text-text-4 font-bold">{volume[0]}%</span>
              </div>
              <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="flowos-shadcn-btn-secondary w-auto px-6">Cancel</button>
          <button className="flowos-shadcn-btn-primary w-auto px-6">
            <Settings size={16} className="mr-2" /> Save Settings
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
