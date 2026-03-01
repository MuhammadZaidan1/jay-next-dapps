import { BarChart3, Activity } from 'lucide-react';

export default function DashboardStats({ tokenRate, totalSupply, tokensSold, progressPercent }) {
  return (
    <div className="lg:col-span-2 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_black]">
      <div className="flex items-center justify-between mb-8 border-b-4 border-black pb-2">
        <h2 className="font-black text-3xl uppercase italic flex items-center gap-3">
          <BarChart3 size={32} /> Protocol Metrics
        </h2>
        <div className="flex items-center gap-2 font-mono text-xs font-bold bg-black text-white px-3 py-1 uppercase">
          <div className="w-2 h-2 bg-green-400 animate-pulse rounded-full"></div>
          Live_Network
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 border-4 border-black bg-gray-50 flex flex-col justify-center">
          <p className="font-mono text-[10px] font-black uppercase text-gray-400 mb-1">Exchange Rate</p>
          <p className="text-3xl font-black italic">1:{tokenRate}</p>
        </div>
        <div className="p-5 border-4 border-black bg-gray-50 flex flex-col justify-center">
          <p className="font-mono text-[10px] font-black uppercase text-gray-400 mb-1">Max Fixed Supply</p>
          <p className="text-3xl font-black italic">{Number(totalSupply).toLocaleString()}</p>
        </div>
        <div className="p-5 border-4 border-black bg-brand-cyan flex flex-col justify-center shadow-[4px_4px_0px_black]">
          <p className="font-mono text-[10px] font-black uppercase text-black/60 mb-1">Total Distributed</p>
          <p className="text-3xl font-black italic">{Number(tokensSold).toLocaleString()} JAY</p>
        </div>
        <div className="p-5 border-4 border-black bg-brand-pink flex flex-col justify-center text-white shadow-[4px_4px_0px_black]">
          <p className="font-mono text-[10px] font-black uppercase text-white/60 mb-1">Emission Progress</p>
          <p className="text-3xl font-black italic">{progressPercent}%</p>
        </div>
      </div>
      <div className="mt-8 border-4 border-black h-12 bg-gray-200 relative overflow-hidden">
        <div 
          className="h-full bg-brand-yellow border-r-4 border-black transition-all duration-1000 ease-in-out" 
          style={{ width: `${progressPercent}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center font-black text-sm italic mix-blend-difference text-white">
          SUPPLY UTILIZATION: {progressPercent}%
        </div>
      </div>
    </div>
  );
}