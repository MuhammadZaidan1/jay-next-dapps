'use client';

import { Shield, Twitter, Send } from 'lucide-react';
import { toast } from 'sonner'; 

export default function JoinCommunitySection() {
  const handleComingSoon = (platform) => {
    toast(`🚧 ${platform} channel is opening in Q3! Stay tuned.`, {
      style: {
        background: '#facc15', 
        color: '#000',
        border: '3px solid #000',
        fontWeight: '900',
        borderRadius: '0px',
        boxShadow: '4px 4px 0px #000'
      },
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-t-4 border-black">
      <div className="relative border-b-4 md:border-b-0 md:border-r-4 border-black bg-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.2] pointer-events-none z-0" 
          style={{
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>
        <div className="relative z-10 w-full p-8 md:p-12 flex flex-col justify-center h-full">          
          <div className="mb-6 w-fit hover:-rotate-6 hover:scale-105 transition-all cursor-pointer">
            <img 
              src="/assets/icon-2.png" 
              alt="Ecosystem Icon"
              className="w-24 h-auto md:w-36 object-contain" 
            />
          </div>          
          <h3 className="font-black text-4xl md:text-6xl text-black mb-3 tracking-tighter uppercase leading-none italic">
            GLOBAL<br/>ECOSYSTEM
          </h3>          
          <p className="font-mono text-sm md:text-base text-gray-700 mb-8 leading-tight font-bold max-w-xs uppercase">
            Join 10k+ verified holders and participate in the $JAY protocol expansion.
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button 
              onClick={() => handleComingSoon('Twitter/X')}
              className="flex items-center justify-center gap-2 bg-brand-cyan border-4 border-black p-3 font-black text-xs uppercase shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Twitter size={18} /> TWITTER / X
            </button>
            <button 
              onClick={() => handleComingSoon('Telegram')}
              className="flex items-center justify-center gap-2 bg-brand-yellow border-4 border-black p-3 font-black text-xs uppercase shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Send size={18} /> TELEGRAM
            </button>
          </div>
        </div>
      </div>
      <div className="bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 10%)', backgroundSize: '20px 20px' }}>
        </div>
        <div className="w-full p-8 md:p-12 flex flex-col justify-center h-full relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-brand-yellow p-3 border-4 border-white shadow-[4px_4px_0px_#fff]">
              <Shield size={40} className="text-black" strokeWidth={3} />
            </div>
            <h3 className="font-black text-3xl md:text-5xl text-brand-yellow leading-none tracking-tighter uppercase italic">
              AUDITED<br/>SECURITY
            </h3>
          </div>
          <p className="font-mono text-sm md:text-base text-gray-400 leading-tight mb-8 max-w-sm font-bold italic uppercase">
            "Immutable smart contracts. Fully non-custodial architecture. Open-source transparency."
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {['VERIFIED_CODE', 'NON_CUSTODIAL', 'LOCKED_LIQUIDITY'].map((tag) => (
                <span key={tag} className="bg-white text-black border-2 border-white px-3 py-1 font-mono text-[10px] md:text-xs font-black tracking-tighter uppercase">
                  ● {tag}
                </span>
              ))}
            </div>
            <div className="bg-brand-yellow text-black border-2 border-brand-yellow w-fit px-4 py-1 font-mono text-xs font-black tracking-widest animate-pulse">
              [ PROTOCOL STATUS: SECURE ]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}