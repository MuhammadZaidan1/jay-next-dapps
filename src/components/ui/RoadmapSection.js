'use client';

import { Check, Lock } from 'lucide-react';

const ROADMAP_ITEMS = [
  { 
    q: '01', 
    label: 'PROTOCOL GENESIS', 
    desc: 'Smart contract deployment, initial liquidity provisioning, and community architecture setup.', 
    done: true 
  },
  { 
    q: '02', 
    label: 'NETWORK SCALING', 
    desc: 'Multi-DEX listing, strategic ecosystem partnerships, and global marketing deployment.', 
    done: false 
  },
  { 
    q: '03', 
    label: 'GOVERNANCE V1', 
    desc: 'DAO implementation, protocol staking pools, and native ecosystem utility expansion.', 
    done: false, 
    pending: true 
  },
];

export default function RoadmapSection() {
  return (
    <div className="w-full flex flex-col">
      <div className="mb-8">
        <h2 className="font-black text-4xl md:text-5xl text-black tracking-tighter uppercase leading-none italic">
          PROTOCOL<br/>ROADMAP 2026
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        {ROADMAP_ITEMS.map((item, i) => {
          const isPending = item.pending;          
          return (
            <div 
              key={i} 
              className={`flex flex-col gap-3 px-5 py-6 border-4 border-black transition-all ${
                isPending 
                  ? 'border-dashed bg-gray-50 opacity-50' 
                  : item.done 
                    ? 'bg-brand-cyan shadow-[6px_6px_0px_black]' 
                    : 'bg-white shadow-[6px_6px_0px_black]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`border-4 border-black w-12 h-12 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_black] ${
                    item.done ? 'bg-black' : 'bg-white'
                  }`}
                >
                  {item.done ? (
                    <Check strokeWidth={4} className="text-brand-yellow w-6 h-6" />
                  ) : (
                    isPending && <Lock size={20} className="text-black/30" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] font-black text-black/40 leading-none mb-1 uppercase">
                    PHASE_0{item.q}
                  </span>
                  <h3 className="font-black text-xl md:text-2xl text-black leading-none uppercase italic tracking-tight">
                    {item.label}
                  </h3>
                </div>
              </div>
              <div className="pt-3 border-t-2 border-black/10">
                <p className="font-mono text-xs font-bold text-black/70 leading-tight uppercase">
                  {item.desc}
                </p>
              </div>              
            </div>
          );
        })}
      </div>
    </div>
  );
}