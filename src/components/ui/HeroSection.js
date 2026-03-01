'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection({ onConnect, walletAddress }) {
  return (
    <section className="relative w-full px-6 py-12 md:px-12 md:py-12 min-h-112.5 md:min-h-125 flex items-center overflow-hidden">
      <div className="absolute -bottom-10 -right-10 md:bottom-auto md:top-8 md:right-16 z-0 opacity-20 md:opacity-25 pointer-events-none transform rotate-12 md:rotate-20 transition-all duration-500">
        <Image 
          src="/assets/swap-icon.png" 
          alt="Protocol Decoration"
          width={600} 
          height={600}
          className="object-contain w-72 md:w-150 lg:w-175 h-auto" 
        />
      </div>
      <div className="relative z-10 w-full">
        <h1 className="font-black text-7xl md:text-9xl leading-[0.85] tracking-tighter text-black uppercase italic">
          TRADE<br />$JAY
        </h1>
        <div className="mt-6 md:mt-8 bg-white border-4 border-black p-4 md:p-6 shadow-brutal max-w-xs md:max-w-md">
          <p className="font-sans text-base md:text-xl font-bold text-black leading-tight italic uppercase tracking-tight">
            Seamless Asset Liquidity. <span className="text-brand-pink">Zero Friction</span> Protocol execution.
          </p>
        </div>
        {!walletAddress && (
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onConnect}
              className="bg-black text-brand-yellow border-4 border-black px-8 py-3.5 md:px-10 md:py-4 font-black text-base md:text-lg uppercase tracking-widest shadow-brutal hover:bg-brand-yellow hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              INITIALIZE INTERFACE →
            </button>
            <Link href="/guide">
              <button className="bg-white text-black border-4 border-black px-8 py-3.5 md:px-10 md:py-4 font-black text-base md:text-lg uppercase tracking-widest shadow-brutal hover:bg-brand-pink hover:text-white transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                HOW TO START 📖
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}