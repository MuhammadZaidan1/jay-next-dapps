import { BarChart3 } from 'lucide-react';

export default function DashboardStats({ tokenRate, totalSupply, tokensSold, progressPercent }) {
  return (
    <div className="lg:col-span-2 border-4 border-black bg-white p-4 md:p-6 shadow-[8px_8px_0px_black]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-4 border-black pb-4">
        <h2 className="font-black text-2xl md:text-3xl uppercase italic flex items-center gap-3">
          <BarChart3 className="shrink-0 w-8 h-8 md:w-10 md:h-10" /> 
          <span className="leading-none">Protocol Metrics</span>
        </h2>
        <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs font-black bg-black text-white px-3 py-1.5 uppercase w-fit shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
          <div className="w-2 h-2 bg-green-400 animate-pulse rounded-full shadow-[0_0_8px_#4ade80]"></div>
          LIVE_NETWORK_STATUS
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 border-4 border-black bg-gray-50 flex flex-col justify-center min-w-0 shadow-[4px_4px_0px_black]">
          <p className="font-mono text-[10px] font-black uppercase text-black/40 mb-1">Exchange Rate</p>
          <p className="text-3xl font-black italic">1:{tokenRate}</p>
        </div>
        <div className="p-5 border-4 border-black bg-gray-50 flex flex-col justify-center min-w-0 shadow-[4px_4px_0px_black]">
          <p className="font-mono text-[10px] font-black uppercase text-black/40 mb-1">Max Fixed Supply</p>
          <p className="text-3xl font-black italic break-all sm:break-normal">
            {Number(totalSupply).toLocaleString()}
          </p>
        </div>
        <div className="p-5 border-4 border-black bg-brand-cyan flex flex-col justify-center shadow-[4px_4px_0px_black] min-w-0">
          <p className="font-mono text-[10px] font-black uppercase text-black/60 mb-1">Total Distributed</p>
          <p className="text-3xl font-black italic break-all sm:break-normal">
            {Number(tokensSold).toLocaleString()} <span className="text-xs font-black not-italic">JAY</span>
          </p>
        </div>
        <div className="p-5 border-4 border-black bg-brand-pink flex flex-col justify-center text-white shadow-[4px_4px_0px_black] min-w-0">
          <p className="font-mono text-[10px] font-black uppercase text-white/60 mb-1">Emission Progress</p>
          <p className="text-3xl font-black italic">{progressPercent}%</p>
        </div>
      </div>
      <div className="mt-8 border-4 border-black h-12 bg-gray-200 relative overflow-hidden shadow-[4px_4px_0px_black]">
        <div 
          className="h-full bg-brand-yellow border-r-4 border-black transition-all duration-1000 ease-in-out" 
          style={{ width: `${progressPercent}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center font-black text-xs md:text-sm italic mix-blend-difference text-white uppercase tracking-tighter">
          Supply Utilization: {progressPercent}% Optimized
        </div>
      </div>
    </div>
  );
}