"use client";

import React, { useState } from 'react';
import { User, Palette, Bell, Globe, CreditCard, Database, ChevronRight, Upload, Shield, LogOut, Trash2, Check, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

const settingsNav = [
  { id: 'profile', label: 'Identity', icon: User },
  { id: 'appearance', label: 'Interface', icon: Palette },
  { id: 'notifications', label: 'Signals', icon: Bell },
  { id: 'integrations', label: 'Channels', icon: Globe },
  { id: 'billing', label: 'Subscription', icon: CreditCard },
  { id: 'data', label: 'Security', icon: Database },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col lg:flex-row gap-12 h-full pb-32">
      {/* Settings Navigation Sidebar */}
      <div className="w-full lg:w-64 shrink-0 flex flex-col gap-12">
        <div className="space-y-6">
          <span className="label-section px-3">Configuration</span>
          <div className="flex flex-col gap-1">
            {settingsNav.map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "nav-item px-4 py-2.5 rounded-xl font-bold uppercase tracking-tight italic",
                  activeTab === item.id ? "nav-item-active" : "text-text-4 hover:text-text-1"
                )}
              >
                <item.icon size={16} className={activeTab === item.id ? "text-brand" : "text-text-4 group-hover:text-brand transition-colors"} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divider opacity-50" />

        <div className="flex flex-col gap-2 px-3">
           <button className="flex items-center gap-3 py-2 text-[11px] font-black text-text-4 hover:text-danger-light transition-colors cursor-pointer uppercase italic tracking-widest">
              <LogOut size={16}/> Sign Out
           </button>
           <button className="flex items-center gap-3 py-2 text-[11px] font-black text-danger/60 hover:text-danger transition-colors cursor-pointer uppercase italic tracking-widest">
              <Trash2 size={16}/> Delete Environment
           </button>
        </div>
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 max-w-4xl space-y-16">
        
        {/* Profile / Identity Section */}
        {activeTab === 'profile' && (
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="space-y-3">
              <h2 className="font-display text-[42px] font-black tracking-tighter text-text-1 italic uppercase">Identity</h2>
              <p className="text-[14px] text-text-3 font-medium">Manage your personal signature and public presence within the OS.</p>
            </div>

            <div className="space-y-12">
               {/* Avatar Block */}
               <div className="flex items-center gap-10">
                  <div className="relative group cursor-pointer">
                    <div className="size-24 rounded-2xl bg-brand-dim border-2 border-dashed border-brand/20 flex items-center justify-center text-[28px] font-display font-bold text-brand-light group-hover:border-brand/40 group-hover:bg-brand/10 transition-all duration-500">
                      AS
                    </div>
                    <div className="absolute inset-0 bg-brand/40 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all">
                       <Upload size={24} className="text-white translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[16px] font-bold text-text-1">Workspace Glyph</h3>
                    <p className="text-[13px] text-text-3">Identity icons are rendered at 96x96px.</p>
                    <div className="flex gap-4 pt-1">
                      <button className="btn-primary h-8 px-4 text-[11px]">UPLOAD NEW</button>
                      <button className="btn-ghost h-8 px-3 text-[11px] text-danger/80">RESET</button>
                    </div>
                  </div>
               </div>

               {/* Form Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="label-section ml-1">Full Signature</label>
                    <input type="text" defaultValue="Arjun Singh" className="w-full bg-surface-2 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-text-1 focus:outline-none focus:border-brand/40 focus:bg-surface-3 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="label-section ml-1">Primary Email</label>
                    <input type="email" defaultValue="arjun@flowos.com" className="w-full bg-surface-2 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-text-1 focus:outline-none focus:border-brand/40 focus:bg-surface-3 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="label-section ml-1">Temporal Offset (Timezone)</label>
                    <select className="w-full bg-surface-2 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-text-1 focus:outline-none focus:border-brand/40 transition-all appearance-none cursor-pointer">
                       <option>UTC-08:00 (Pacific Time)</option>
                       <option>UTC+00:00 (London)</option>
                       <option>UTC+05:30 (Mumbai)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="label-section ml-1">Linguistic Profile</label>
                    <select className="w-full bg-surface-2 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-text-1 focus:outline-none focus:border-brand/40 transition-all appearance-none cursor-pointer">
                       <option>English (International)</option>
                       <option>Deutsch</option>
                       <option>日本語</option>
                    </select>
                  </div>
               </div>

               <div className="pt-8 flex justify-end">
                  <button className="btn-primary px-10">SYNCHRONIZE CHANGES</button>
               </div>
            </div>
          </motion.section>
        )}

        {/* Appearance / Interface Section */}
        {activeTab === 'appearance' && (
           <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="space-y-2">
                <h2 className="font-display text-[32px] font-bold tracking-tight text-text-1">Interface</h2>
                <p className="text-[14px] text-text-3 font-medium">Calibrate the visual aesthetics of your FlowOS environment.</p>
              </div>

              <div className="space-y-12">
                 <div className="space-y-6">
                    <span className="label-section">Environment Theme</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                       {['Obsidian', 'Snow', 'Auto'].map(t => (
                         <div key={t} className={cn(
                           "card p-4 flex flex-col gap-4 cursor-pointer group hover:scale-[1.02]",
                           t === 'Obsidian' ? "ring-2 ring-brand ring-offset-4 ring-offset-surface-0 border-transparent" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                         )}>
                            <div className={cn(
                               "h-24 w-full rounded-lg bg-surface-0 border border-white/5 relative overflow-hidden",
                               t === 'Snow' && "bg-white",
                               t === 'Auto' && "bg-gradient-to-br from-surface-0 to-white"
                            )}>
                               <div className="absolute top-2 left-2 size-4 rounded-full bg-brand/30" />
                               <div className="absolute top-8 left-2 right-2 h-2 bg-white/5 rounded" />
                               <div className="absolute top-12 left-2 right-8 h-2 bg-white/5 rounded" />
                            </div>
                            <div className="flex items-center justify-between">
                               <span className="text-[13px] font-bold text-text-1">{t}</span>
                               {t === 'Obsidian' && <Check size={14} className="text-brand" />}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-5">
                    <span className="label-section">Chroma (Accent Color)</span>
                    <div className="flex flex-wrap gap-4">
                       {['oklch(56% 0.27 278)', 'oklch(74% 0.17 192)', 'oklch(75% 0.16 155)', 'oklch(82% 0.17 72)', 'oklch(65% 0.22 25)'].map(c => (
                         <button 
                           key={c}
                           className={cn(
                              "size-10 rounded-full border-4 border-surface-1 shadow-xl transition-all hover:scale-110",
                              c === 'oklch(56% 0.27 278)' ? "ring-2 ring-brand scale-110" : ""
                           )}
                           style={{ backgroundColor: c }}
                         />
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4 pt-10 border-t border-white/[0.05]">
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-surface-2 border border-white/[0.04]">
                       <div className="space-y-1">
                          <p className="text-[14px] font-bold text-text-1">Developer Mode</p>
                          <p className="text-[12px] text-text-4">Show technical metadata and ID fields.</p>
                       </div>
                       <div className="w-12 h-6 bg-surface-4 rounded-full p-1 relative cursor-pointer">
                          <div className="size-4 bg-text-4 rounded-full" />
                       </div>
                    </div>
                 </div>
              </div>
           </motion.section>
        )}

      </div>
    </div>
  );
}
