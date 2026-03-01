import Image from 'next/image';
import Link from 'next/link';
import { Monitor, ArrowRight } from 'lucide-react';

export default function DesktopGuide() {
  const steps = [
    {
      title: "Install Web3 Wallet",
      desc: (
        <>
          Download and install the MetaMask extension from{' '}
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand-pink underline hover:text-black transition-colors"
          >
            metamask.io
          </a>{' '}
          for Chrome, Brave, or Edge. Create a new wallet or import an existing one.
        </>
      )
    },
    {
      title: "Switch to Sepolia",
      desc: "Open MetaMask, go to Settings > Advanced > turn on 'Show test networks'. Click the network dropdown at the top left of your wallet, select 'Custom' (or 'Custom networks'), and then choose the Sepolia Testnet."
    },
    {
      title: "Connect & Swap",
      desc: "Return to our dApp, click 'Connect Wallet' at the top right, and approve the connection. You are now ready to swap testnet ETH for $JAY."
    }
  ];
  return (
    <div className="border-4 border-black bg-white shadow-[12px_12px_0px_black] overflow-hidden">
      <div className="bg-black text-brand-cyan p-4 md:p-6 border-b-4 border-black flex items-center gap-4">
        <Monitor size={40} strokeWidth={2.5} />
        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
          Desktop_Setup
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 sm:p-8 md:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-center bg-gray-50">
          <ul className="space-y-8">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-4 sm:gap-6 items-start">
                <div className="bg-brand-yellow border-4 border-black w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-black text-lg sm:text-xl shrink-0 shadow-brutal">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase mb-2">{step.title}</h3>
                  <p className="font-bold text-sm sm:text-base text-gray-600 leading-snug">{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div 
          className="relative p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center gap-8 bg-brand-cyan/20"
          style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 18px, rgba(0,0,0,0.1) 18px, rgba(0,0,0,0.1) 20px)'
          }}
        >
          <div className="relative z-10 border-4 border-black shadow-brutal bg-white p-2 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <Image 
              src="/assets/guide-desktop.png" 
              alt="Desktop Wallet Setup" 
              width={400} 
              height={300} 
              className="object-cover w-full h-auto"
            />
          </div>
          <Link href="/" className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <button className="w-full bg-brand-yellow text-black border-4 border-black px-6 py-4 font-black text-lg sm:text-xl uppercase shadow-[6px_6px_0px_black] hover:bg-black hover:text-brand-yellow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2">
              Ready to Swap <ArrowRight size={24} strokeWidth={3} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}