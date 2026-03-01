'use client';

import { JAY_TOKEN_ADDRESS } from '@/constants';
import { Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function StatsSection() {
  const copyContract = () => {
    navigator.clipboard.writeText(JAY_TOKEN_ADDRESS);
    toast.success('Address copied to clipboard');
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full border-t-4 border-black">
      <div className="border-b-4 md:border-b-0 md:border-r-4 border-black px-8 py-12 flex flex-col justify-center bg-white">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="font-mono text-[10px] text-black/50 uppercase tracking-widest font-black">
            Total Fixed Supply
          </p>
        </div>
        <p className="font-black text-5xl md:text-6xl text-black leading-none tracking-tighter italic">
          1,000,000,000
        </p>
        <a
          href={`https://sepolia.etherscan.io/address/${JAY_TOKEN_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-green-600 mt-6 flex items-center gap-2 hover:bg-green-50 w-fit px-2 py-1 border-2 border-transparent hover:border-green-600 transition-all font-black uppercase"
        >
          <ExternalLink size={14} /> VERIFIED_CONTRACT_SOURCE
        </a>
      </div>
      <div className="px-8 py-12 flex flex-col justify-center bg-gray-50">
        <p className="font-mono text-[10px] text-black/50 uppercase tracking-widest mb-2 font-black">
          Smart Contract Identifier
        </p>
        <p className="font-mono text-sm md:text-lg font-black text-black break-all leading-none mb-6 tracking-tight">
          {JAY_TOKEN_ADDRESS}
        </p>        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={copyContract}
            className="flex items-center gap-2 bg-brand-yellow border-4 border-black px-5 py-3 font-black text-xs uppercase shadow-brutal hover:bg-white transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <Copy size={16} strokeWidth={3} />
            COPY_ADDRESS
          </button>          
          <a
            href={`https://sepolia.etherscan.io/address/${JAY_TOKEN_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black text-white border-4 border-black px-5 py-3 font-black text-xs uppercase shadow-brutal hover:bg-brand-pink hover:text-black transition-all"
          >
            EXPLORER ↗
          </a>
        </div>
      </div>
    </div>
  );
}