'use client';

import Link from 'next/link';
import { AlertTriangle, Home, Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 selection:bg-brand-pink relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none z-0" 
        style={{
          backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)',
          backgroundSize: '32px 32px'
        }}
      ></div>
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center gap-8">
        <div className="bg-brand-yellow border-10 border-black p-8 md:p-16 shadow-[20px_20px_0px_#000] -rotate-1 hover:rotate-0 transition-all duration-500 w-full group">
          <div className="flex justify-center mb-6 relative">
            <AlertTriangle size={80} strokeWidth={3} className="text-black group-hover:scale-110 transition-transform" />
            <Ghost size={40} className="absolute -top-4 -right-4 text-black animate-bounce opacity-20" />
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4 italic">
            404
          </h1>
          <div className="bg-black text-white inline-block px-6 py-2 mb-8 border-4 border-black transform -skew-x-12">
            <h2 className="font-mono text-xl md:text-2xl font-black uppercase italic tracking-tighter">
              BLOCK_NOT_FOUND
            </h2>
          </div>
          <p className="font-mono font-black text-sm md:text-base text-black/80 max-w-md mx-auto leading-tight uppercase italic">
            The requested block does not exist on this chain. This route may have been burned or moved to a private shard. Re-route immediately to avoid protocol desync.
          </p>
        </div>
        <Link href="/" className="w-full sm:w-auto">
          <button className="flex items-center justify-center gap-4 bg-brand-cyan text-black border-[6px] border-black px-10 py-6 font-black text-xl md:text-2xl uppercase shadow-[10px_10px_0px_#000] hover:bg-brand-pink hover:text-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[14px_14px_0px_#000] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none w-full">
            <Home size={32} strokeWidth={3} />
            BACK TO MAINNET
          </button>
        </Link>
      </div>
    </div>
  );
}