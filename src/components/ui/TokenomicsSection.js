'use client';

const BREAKDOWN = [
  { label: 'Public Liquidity', pct: 40, color: 'bg-cyan-400', desc: 'DEX Market Circulation' },
  { label: 'Protocol Vault',   pct: 30, color: 'bg-brand-yellow', desc: 'Locked LP (24 Months)' }, 
  { label: 'Ecosystem Fund',   pct: 15, color: 'bg-brand-pink', desc: 'Development & Grants' },   
  { label: 'Core Contributors', pct: 15, color: 'bg-white', desc: 'Vested linear 12m' },
];

export default function TokenomicsSection() {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="mb-6">
        <h2 className="font-black text-4xl text-black tracking-tighter uppercase leading-none italic">
          TOKENOMICS<br/>ARCHITECTURE
        </h2>
      </div>
      <div className="flex flex-col gap-4 mb-8">
        {BREAKDOWN.map((item, i) => (
          <div key={i} className="flex justify-between items-end border-b-4 border-black/10 pb-2">
            <div className="flex flex-col">
              <span className="font-black text-xl text-black leading-none uppercase italic">{item.label}</span>
              <span className="font-mono text-[10px] font-bold text-black/60 uppercase mt-1">{item.desc}</span>
            </div>
            <span className="font-black text-3xl text-black tracking-tighter">{item.pct}%</span>
          </div>
        ))}
      </div>
      <div className="flex border-4 border-black shadow-[6px_6px_0px_black] overflow-hidden bg-black">
        {BREAKDOWN.map((item, i) => (
          <div
            key={i}
            style={{ width: `${item.pct}%` }}
            className={`${item.color} h-12 md:h-16 border-r-2 border-black last:border-r-0 hover:opacity-80 transition-opacity cursor-help`}
            title={`${item.label}: ${item.pct}%`}
          />
        ))}
      </div>
      <p className="font-mono text-[9px] font-black text-black/40 mt-3 uppercase tracking-widest">
        Total Allocation: 100% Guaranteed by Smart Contract
      </p>
    </div>
  );
}