"use client";

import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckSquare, Flame, Video, Coffee, Zap, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AddPlannerBlockModal } from '@/src/components/modals/AddPlannerBlockModal';

const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 6am to 11pm

const mockBlocks = [
  { id: '1', title: 'Deep Work: System Design', start: 9, duration: 2, type: 'task', color: 'var(--color-brand)' },
  { id: '2', title: 'Core Synthesis', start: 11.5, duration: 0.5, type: 'meeting', color: 'var(--color-accent)' },
  { id: '3', title: 'Biological Maintenance', start: 12.5, duration: 1, type: 'break', color: 'var(--color-success)' },
  { id: '4', title: 'Protocol: Neural Expansion', start: 14, duration: 0.5, type: 'habit', color: 'var(--color-warning)' },
  { id: '5', title: 'External Coordination', start: 15, duration: 1, type: 'meeting', color: 'var(--color-accent)' },
];

const BlockIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'task': return <CheckSquare size={14} />;
    case 'habit': return <Flame size={14} />;
    case 'meeting': return <Video size={14} />;
    case 'break': return <Coffee size={14} />;
    default: return <Zap size={14} />;
  }
};

export default function PlannerPage() {
  const [isAddBlockModalOpen, setIsAddBlockModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(10);

  return (
    <div className="flex flex-col lg:flex-row gap-12 h-full pb-20">
      <AddPlannerBlockModal open={isAddBlockModalOpen} onOpenChange={setIsAddBlockModalOpen} />
      
      {/* Left Column: Context Controls */}
      <div className="w-full lg:w-64 shrink-0 flex flex-col gap-10">
        <div className="card p-5 space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-[15px] text-text-1">MAR 2026</span>
            <div className="flex gap-1">
              <button className="btn-icon size-7 hover:bg-surface-3"><ChevronLeft size={16} /></button>
              <button className="btn-icon size-7 hover:bg-surface-3"><ChevronRight size={16} /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <span key={`${d}-${i}`} className="text-[10px] font-bold text-text-4 text-center pb-2">{d}</span>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedDate(i+1)}
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-lg text-[11px] font-bold transition-all relative group",
                  selectedDate === i + 1 
                    ? "bg-brand text-white shadow-lg shadow-brand/20 scale-110 z-10" 
                    : "text-text-3 hover:bg-white/[0.04] hover:text-text-1"
                )}
              >
                {i + 1}
                {i === 9 || i === 14 || i === 22 ? (
                   <div className={cn("absolute bottom-1 size-1 rounded-full", selectedDate === i + 1 ? "bg-white" : "bg-brand")} />
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="label-section">Staging Area</span>
            <Info size={12} className="text-text-4" />
          </div>
          <div className="flex flex-col gap-3">
            {[
              { title: 'Protocol Documentation', priority: 'P2', time: '45m' },
              { title: 'Interface Synthesis', priority: 'P3', time: '1h' },
              { title: 'Signal Processing Bug', priority: 'P1', time: '30m' },
            ].map((task, i) => (
              <div key={i} className="card p-3 px-4 flex items-center gap-4 group cursor-grab active:cursor-grabbing">
                <div className={cn(
                  "size-2.5 rounded-full shrink-0",
                  task.priority === 'P1' ? "bg-danger" : task.priority === 'P2' ? "bg-warning" : "bg-brand"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-text-2 truncate group-hover:text-text-1 transition-colors">{task.title}</p>
                </div>
                <button 
                  onClick={() => setIsAddBlockModalOpen(true)}
                  className="btn-icon size-8 opacity-0 group-hover:opacity-100 bg-brand-dim text-brand"
                >
                  <Plus size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Column: Temporal Grid */}
      <div className="flex-1 min-w-0 flex flex-col gap-10">
        <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="size-2 rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)] animate-pulse" />
                 <span className="text-[10px] font-black text-text-4 tracking-widest uppercase italic opacity-60">Temporal Allocation Grid v4.0.1</span>
              </div>
              <h1 className="font-display font-black text-[42px] tracking-tighter text-white leading-none italic uppercase">
                 March <span className="text-gradient">10</span>, 2026
              </h1>
              <div className="flex items-center gap-3">
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-black tracking-widest uppercase">
                    <Clock size={12} strokeWidth={3} />
                    06:45 REMAINING
                 </div>
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-text-3 text-[10px] font-black tracking-widest uppercase">
                    <CalendarIcon size={12} strokeWidth={3} />
                    12 EVENTS
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <button className="btn-secondary h-12 px-6 text-[12px] font-bold rounded-xl tracking-widest hover:bg-white/[0.05]">TODAY</button>
              <div className="flex p-1.5 bg-surface-2 rounded-2xl border border-white/[0.05]">
                 <button className="btn-icon size-9 text-text-3 hover:text-white"><ChevronLeft size={20}/></button>
                 <button className="btn-icon size-9 text-text-3 hover:text-white"><ChevronRight size={20}/></button>
              </div>
              <button onClick={() => setIsAddBlockModalOpen(true)} className="btn-primary h-12 px-8 text-[12px] font-black tracking-widest rounded-xl transition-all active:scale-[0.98]">
                 <Plus size={20} className="mr-2"/> PLAN BLOCK
              </button>
           </div>
        </header>

        <div className="flowos-card p-0 h-[850px] overflow-hidden bg-surface-1/50 backdrop-blur-3xl relative border border-white/[0.06] rounded-[32px] shadow-2xl">
          <div className="relative h-full overflow-y-auto scrollbar-hide">
            {/* Grid Rules */}
            {hours.map(hour => (
              <div key={hour} className="flex h-20 border-b border-white/[0.03] group relative">
                <div className="w-24 shrink-0 flex justify-center pt-2 border-r border-white/[0.03] bg-surface-1/20">
                  <span className="text-[10px] font-mono font-bold text-text-4 tracking-widest opacity-60">
                    {hour.toString().padStart(2, '0')}:00
                  </span>
                </div>
                <div 
                  onClick={() => setIsAddBlockModalOpen(true)}
                  className="flex-1 relative hover:bg-white/[0.02] transition-colors cursor-crosshair group/grid" 
                >
                   <div className="absolute inset-0 flex flex-col pointer-events-none">
                      <div className="h-10 border-b border-white/5 border-dashed" />
                   </div>
                </div>
              </div>
            ))}

            {/* Current Time Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-[96px] right-0 border-t-[3px] border-brand z-50 pointer-events-none flex items-center" 
              style={{ top: '320px' }}
            >
              <div className="absolute -left-2 size-4 bg-brand rounded-full shadow-[0_0_15px_var(--color-brand)] border-4 border-surface-0" />
              <div className="ml-4 px-2 py-0.5 rounded-full bg-brand text-white text-[9px] font-black tracking-tighter shadow-xl">
                 LIVE
              </div>
            </motion.div>

            {/* Temporal Blocks */}
            {mockBlocks.map((block, idx) => (
              <motion.div 
                key={block.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="absolute left-[108px] right-4 rounded-2xl border-l-[6px] p-4 shadow-2xl cursor-pointer transition-all z-20 group hover:ring-2 hover:ring-white/20 active:scale-[0.98]"
                style={{ 
                  backgroundColor: `${block.color}15`,
                  borderColor: block.color,
                  top: `${(block.start - 6) * 80 + 6}px`, 
                  height: `${block.duration * 80 - 12}px` 
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                       <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                          <BlockIcon type={block.type} />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-white tracking-tight leading-none mb-1">
                             {block.title.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-white/50 font-mono font-bold tracking-widest">
                             {block.start.toFixed(1)} – {(block.start + block.duration).toFixed(1)}
                          </span>
                       </div>
                    </div>
                    <button className="btn-icon size-6 text-white/40 group-hover:text-white"><Plus size={12}/></button>
                  </div>
                  
                  {block.duration > 1 && (
                     <div className="mt-auto flex gap-2">
                        <div className="badge bg-white/10 border-white/10 text-white/60">WORKSPACE 01</div>
                        <div className="badge bg-white/10 border-white/10 text-white/60">DEEP MODE</div>
                     </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
