'use client';

import { useState } from 'react'; 
import { useWeb3 } from '@/hooks/useWeb3';

import Navbar           from '@/components/layout/Navbar';
import HeroSection      from '@/components/ui/HeroSection';
import StatsSection     from '@/components/ui/StatsSection';
import RoadmapSection   from '@/components/ui/RoadmapSection';
import TokenomicsSection from '@/components/ui/TokenomicsSection';
import JoinCommunitySection from '@/components/ui/JoinCommunitySection';
import Footer           from '@/components/layout/Footer';

import SwapToken from '@/components/web3/SwapToken';
import TransactionHistory from '@/components/web3/TransactionHistory';

export default function HomePage() {
  const { account, connectWallet } = useWeb3();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleSwapSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-yellow relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img 
          src="/assets/icon-1.png" 
          alt=""
          className="absolute top-[25%] -left-5 w-40 md:w-125 transition-all"
        />
        <img 
          src="/assets/icon-3.png" 
          alt=""
          className="absolute top-[40%] right-0 w-36 md:w-100 -rotate-15"
        />
        <img 
          src="/assets/icon-4.png" 
          alt=""
          className="absolute bottom-[38%] -left-12 w-48 md:w-125 -rotate-30"
        />
      </div>
      <div className="max-w-350 mx-auto flex flex-col gap-6 md:gap-12 p-4 md:p-10 relative z-10">
        <header className="border-4 border-black shadow-brutal bg-white">
          <Navbar walletAddress={account} onConnect={connectWallet} />
        </header>
        <main className="flex flex-col gap-6 md:gap-12">
          <div className="border-4 border-black shadow-brutal bg-brand-cyan">
            <HeroSection walletAddress={account} onConnect={connectWallet} />
          </div>
          <div className="border-4 border-black shadow-brutal bg-white">
            <StatsSection />
          </div>
        </main>
        <section className="flex justify-center py-6 md:py-10">
          <div className="w-full max-w-xl flex flex-col gap-6"> 
            <SwapToken 
              walletAddress={account} 
              onConnect={connectWallet} 
              onSuccess={handleSwapSuccess} 
            />
            {account && (
              <TransactionHistory 
                walletAddress={account} 
                refreshTrigger={refreshTrigger} 
              />
            )}
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="border-4 border-black shadow-brutal bg-brand-yellow p-6 md:p-12">
            <RoadmapSection />
          </div>
          <div className="border-4 border-black shadow-brutal bg-brand-pink p-6 md:p-12">
            <TokenomicsSection />
          </div>
        </section>
        <section className="border-4 border-black shadow-brutal bg-white">
          <JoinCommunitySection />
        </section>
        <footer className="border-4 border-black shadow-brutal bg-black">
          <Footer />
        </footer>
      </div>
    </div>
  );
}