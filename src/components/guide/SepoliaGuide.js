import Image from 'next/image';
import { AlertTriangle } from 'lucide-react';

export default function SepoliaGuide() {
    return (
        <div className="border-4 border-black bg-brand-pink p-6 sm:p-8 md:p-12 shadow-[12px_12px_0px_black] text-white">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="w-full md:w-3/5 flex flex-col">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-6 tracking-tighter">
                Need Sepolia ETH?
            </h2>
            <div className="bg-black/20 border-l-4 border-black p-4 mb-4 md:mb-8">
                <p className="font-bold flex items-start gap-3 text-sm md:text-base leading-snug">
                <AlertTriangle className="shrink-0 mt-0.5 text-brand-yellow" size={24} strokeWidth={3} />
                <span>
                    <strong>CRITICAL NOTICE:</strong> The $JAY Protocol currently operates exclusively on the <strong>Sepolia Testnet</strong>. You must use Sepolia ETH for gas fees and transactions. <span className="underline decoration-wavy decoration-brand-yellow">This is NOT real Ethereum (ETH) and holds NO real-world financial value.</span> Please do not send real funds to this protocol.
                </span>
                </p>
            </div>
            <a 
                href="https://sepoliafaucet.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:inline-flex bg-black text-white border-4 border-white px-8 py-4 font-black text-xl md:text-2xl uppercase shadow-[6px_6px_0px_white] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all items-center justify-center gap-2 w-fit"
            >
                CLAIM FREE ETH ↗
            </a>
            </div>
            <div className="w-full md:w-2/5 flex justify-center md:justify-end">
            <div className="bg-white border-4 border-black p-3 sm:p-4 shadow-[8px_8px_0px_black] rotate-3 hover:rotate-0 transition-transform duration-300 w-full max-w-55 sm:max-w-62.5 md:max-w-75">
                <Image 
                src="/assets/sepolia-faucet.png" 
                alt="Sepolia Faucet" 
                width={300} 
                height={300} 
                className="object-contain w-full h-auto" 
                />
            </div>
            </div>
        </div>
        <a 
            href="https://sepoliafaucet.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="md:hidden mt-10 bg-black text-white border-4 border-white px-6 py-4 font-black text-lg uppercase shadow-[4px_4px_0px_white] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 w-full text-center"
        >
            CLAIM FREE ETH ↗
        </a>
        </div>
    );
}