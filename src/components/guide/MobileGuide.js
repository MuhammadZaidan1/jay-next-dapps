'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Smartphone, Copy, Check, ArrowRight } from 'lucide-react';

export default function MobileGuide() {
    const [copied, setCopied] = useState(false);
    const protocolUrl = "https://jay-dapps.vercel.app";
    const handleCopy = () => {
        navigator.clipboard.writeText(protocolUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const steps = [
        {
        title: "Get The App",
        desc: (
            <div className="flex flex-col gap-3">
            <p className="font-bold text-gray-600 leading-snug text-sm sm:text-base">
                Download the official MetaMask app to securely set up your Web3 wallet.
            </p>
            <div className="flex flex-wrap gap-3 mt-1">
                <a 
                href="https://apps.apple.com/us/app/metamask/id1438144202" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black text-white px-4 py-2 text-[10px] sm:text-xs font-black uppercase shadow-[3px_3px_0px_#FF2E63] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-black"
                >
                App Store ↗
                </a>
                <a 
                href="https://play.google.com/store/apps/details?id=io.metamask" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-cyan text-black px-4 py-2 text-[10px] sm:text-xs font-black uppercase shadow-[3px_3px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all border-2 border-black"
                >
                Play Store ↗
                </a>
            </div>
            </div>
        )
        },
        {
        title: "Open Explore Tab",
        desc: (
            <p className="font-bold text-gray-600 leading-snug text-sm sm:text-base">
            Open the MetaMask app and tap the <strong className="text-black">'Explore'</strong> icon (the compass symbol at the bottom). Standard mobile browsers won't connect properly.
            </p>
        )
        },
        {
        title: "Enter Protocol URL",
        desc: (
            <div className="flex flex-col gap-3">
            <p className="font-bold text-gray-600 leading-snug text-sm sm:text-base">
                Paste the protocol URL into the MetaMask Explore search bar to securely connect and start swapping.
            </p>
            <button 
                onClick={handleCopy}
                className={`w-fit flex items-center justify-center gap-2 border-2 border-black px-4 py-2 font-black text-xs sm:text-sm uppercase shadow-[4px_4px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all ${copied ? 'bg-green-400 text-black' : 'bg-brand-yellow text-black'}`}
            >
                {copied ? <Check size={16} strokeWidth={3} /> : <Copy size={16} strokeWidth={3} />}
                {copied ? 'URL COPIED!' : 'COPY PROTOCOL URL'}
            </button>
            </div>
        )
        }
    ];
    return (
        <div className="border-4 border-black bg-white shadow-[12px_12px_0px_black] overflow-hidden mt-12">
        <div className="bg-black text-brand-yellow p-4 md:p-6 border-b-4 border-black flex items-center gap-4">
            <Smartphone size={40} strokeWidth={2.5} />
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
            Mobile_Setup
            </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 sm:p-8 md:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col justify-center bg-gray-50">
            <ul className="space-y-8">
                {steps.map((step, idx) => (
                <li key={idx} className="flex gap-4 sm:gap-6 items-start">
                    <div className="bg-brand-cyan border-4 border-black w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-black text-lg sm:text-xl shrink-0 shadow-brutal">
                    {idx + 1}
                    </div>
                    <div>
                    <h3 className="text-lg sm:text-xl font-black uppercase mb-2">{step.title}</h3>
                    {step.desc}
                    </div>
                </li>
                ))}
            </ul>
            </div>
            <div 
            className="relative p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center gap-10 bg-brand-yellow/20"
            style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(0,0,0,0.1) 15px, rgba(0,0,0,0.1) 17px)'
            }}
            >
            <div className="relative z-10 flex flex-row gap-4 justify-center items-center w-full max-w-sm mx-auto mt-4 sm:mt-0">
                <div className="border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.3)] bg-white p-1 sm:p-2 w-1/2 -rotate-3 hover:rotate-0 transition-transform duration-300">
                <Image 
                    src="/assets/guide-mobile.png" 
                    alt="MetaMask App Download" 
                    width={200} 
                    height={400} 
                    className="w-full h-auto object-cover border-2 border-black"
                />
                </div>
                <div className="border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.3)] bg-white p-1 sm:p-2 w-1/2 rotate-3 translate-y-6 hover:rotate-0 transition-transform duration-300">
                <Image 
                    src="/assets/explore-guide.png" 
                    alt="MetaMask Explore Tab" 
                    width={200} 
                    height={400} 
                    className="w-full h-auto object-cover border-2 border-black"
                />
                </div>
            </div>
            <Link href="/" className="relative z-10 w-full max-w-xs sm:max-w-sm mt-8 sm:mt-12">
                <button className="w-full bg-black text-white border-4 border-black px-6 py-4 font-black text-lg sm:text-xl uppercase shadow-[6px_6px_0px_#00E5FF] hover:bg-brand-cyan hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2">
                Back to Home <ArrowRight size={24} strokeWidth={3} />
                </button>
            </Link>
            </div>
        </div>
        </div>
    );
}