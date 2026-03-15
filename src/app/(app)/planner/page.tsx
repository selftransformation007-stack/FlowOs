"use client";

import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckSquare, Flame, Video, Coffee, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 6am to 11pm

const mockBlocks = [
  { id: '1', title: 'Deep Work: FlowOS', start: 9, duration: 2, type: 'task', color: 'bg-brand' },
  { id: '2', title: 'Team Sync', start: 11.5, duration: 0.5, type: 'meeting', color: 'bg-accent-cyan' },
  { id: '3', title: 'Lunch Break', start: 12.5, duration: 1, type: 'break', color: 'bg-success' },
  { id: '4', title: 'Habit: Reading', start: 14, duration: 0.5, type: 'habit', color: 'bg-warning' },
  { id: '5', title: 'Client Call', start: 15, duration: 1, type: 'meeting', color: 'bg-accent-cyan' },
];

const BlockIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'task': return <CheckSquare className="size-3.5" />;
    case 'habit': return <Flame className="size-3.5" />;
    case 'meeting': return <Video className="size-3.5" />;
    case 'break': return <Coffee className="size-3.5" />;
    default: return <Zap className="size-3.5" />;
  }
};

import { AddPlannerBlockModal } from '@/src/components/modals/AddPlannerBlockModal';

export default function PlannerPage() {
  const [isAddBlockModalOpen, setIsAddBlockModalOpen] = useState(false);

  return (
    <div className="flex gap-8 h-full">
      <AddPlannerBlockModal open={isAddBlockModalOpen} onOpenChange={setIsAddBlockModalOpen} />
      {/* Left Sidebar: Mini Calendar */}
      <div className="w-64 shrink-0 space-y-8">
        <div className="flowos-card p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-bold text-text-1">March 2026</span>
            <div className="flex gap-1">
              <button className="size-6 rounded-full hover:bg-surface-3 flex items-center justify-center text-text-3">
                <ChevronLeft className="size-4" />
              </button>
              <button className="size-6 rounded-full hover:bg-surface-3 flex items-center justify-center text-text-3">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <span key={`${d}-${i}`} className="text-[10px] font-bold text-text-4">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, i) => (
              <button 
                key={i} 
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-full text-[11px] font-medium transition-all",
                  i + 1 === 10 ? "bg-brand text-white" : "text-text-2 hover:bg-surface-3"
                )}
              >
                {i + 1}
                {Math.random() > 0.7 && <div className="size-1 bg-brand rounded-full mt-0.5" />}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <span className="flowos-label px-2">Unscheduled Tasks</span>
          <div className="space-y-2">
            {[
              { title: 'Update project documentation', priority: 'P2', time: '45m' },
              { title: 'Research new UI patterns', priority: 'P3', time: '1h' },
              { title: 'Fix navigation bugs', priority: 'P1', time: '30m' },
            ].map((task, i) => (
              <div key={i} className="flowos-card p-3 bg-surface-2/50 hover:bg-surface-3 transition-all cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "size-2 rounded-full mt-1.5",
                    task.priority === 'P1' ? "bg-danger" : task.priority === 'P2' ? "bg-warning" : "bg-brand"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-text-1 truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-text-3 bg-white/5 px-1.5 py-0.5 rounded-[4px] flex items-center gap-1">
                        <Clock className="size-2.5" /> {task.time}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAddBlockModalOpen(true)}
                    className="size-6 rounded-full bg-brand/10 text-brand flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Timeline */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-[24px] font-bold text-text-1">Tuesday, March 10</h1>
            <div className="flex gap-2">
              <button className="flowos-shadcn-btn-secondary w-auto px-3 h-8 text-[12px]">Today</button>
              <div className="flex items-center bg-surface-2 rounded-10 border border-white/[0.07] p-0.5">
                <button className="size-7 flex items-center justify-center text-text-3 hover:text-text-1"><ChevronLeft className="size-4" /></button>
                <button className="size-7 flex items-center justify-center text-text-3 hover:text-text-1"><ChevronRight className="size-4" /></button>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsAddBlockModalOpen(true)}
            className="flowos-shadcn-btn-primary w-auto px-4 h-10"
          >
            <Plus className="size-4 mr-2" />
            Add Block
          </button>
        </div>

        <div className="flowos-card p-0 overflow-hidden bg-surface-1 border-white/[0.07]">
          <div className="relative">
            {/* Hour Rows */}
            {hours.map(hour => (
              <div key={hour} className="flex h-20 border-b border-white/[0.03] group">
                <div className="w-20 shrink-0 flex justify-center pt-2 border-r border-white/[0.03]">
                  <span className="text-[11px] font-bold text-text-4 uppercase tracking-wider">
                    {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                  </span>
                </div>
                <div 
                  onClick={() => setIsAddBlockModalOpen(true)}
                  className="flex-1 relative hover:bg-white/[0.01] transition-colors cursor-pointer" 
                />
              </div>
            ))}

            {/* Current Time Indicator */}
            <div className="absolute left-20 right-0 border-t-2 border-danger z-10 pointer-events-none" style={{ top: '320px' }}>
              <div className="absolute -left-1.5 -top-1.5 size-3 bg-danger rounded-full shadow-[0_0_8px_rgba(234,67,53,0.5)]" />
            </div>

            {/* Blocks */}
            {mockBlocks.map(block => (
              <div 
                key={block.id}
                className={cn(
                  "absolute left-[88px] right-4 rounded-10 border-l-4 p-3 shadow-lg cursor-pointer hover:brightness-110 transition-all z-20",
                  block.color,
                  block.color.replace('bg-', 'border-')
                )}
                style={{ 
                  top: `${(block.start - 6) * 80 + 4}px`, 
                  height: `${block.duration * 80 - 8}px` 
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <BlockIcon type={block.type} />
                      <span className="text-[13px] font-bold text-white">{block.title}</span>
                    </div>
                    <span className="text-[11px] text-white/70 font-medium">
                      {block.start > 12 ? block.start - 12 : block.start}:00 – {block.start + block.duration > 12 ? block.start + block.duration - 12 : block.start + block.duration}:00
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
