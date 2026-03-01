'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { ethers } from 'ethers';
import { VENDOR_ADDRESS, VendorABI, JAY_TOKEN_ADDRESS } from '@/constants';

export default function Navbar({ walletAddress, onConnect }) {
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    const checkOwnerStatus = async () => {
      if (!walletAddress) {
        setIsOwner(false);
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const vendorContract = new ethers.Contract(
          VENDOR_ADDRESS, 
          VendorABI.abi || VendorABI, 
          provider
        );
        const owner = await vendorContract.owner();
        setIsOwner(walletAddress.toLowerCase() === owner.toLowerCase());
      } catch (error) {
        console.error("Owner verification failed:", error);
      }
    };
    checkOwnerStatus();
  }, [walletAddress]);
  const addTokenToMetaMask = async () => {
    if (!window.ethereum) {
      toast.error('Web3 Wallet extension required.');
      return;
    }
    try {
      const baseUrl = window.location.origin; 
      const logoUrl = `${baseUrl}/assets/logo-token.png`; 
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', 
          options: {
            address: JAY_TOKEN_ADDRESS, 
            symbol: 'JAY', 
            decimals: 18, 
            image: logoUrl, 
          },
        },
      });
      if (wasAdded) {
        toast.success('$JAY Asset integrated successfully.');
      } else {
        toast.info('Token integration cancelled.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to import asset to wallet.');
    }
  };
  const short = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null;
  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success('Wallet address copied.');
    }
  };
  return (
    <nav className="relative flex items-center justify-between px-4 md:px-6 py-4 bg-white overflow-hidden border-b-4 border-black">
      <div 
        className="absolute inset-0 opacity-[0.3] pointer-events-none z-0" 
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px'
        }}
      ></div>
      <Link href="/" className="relative z-10">
        <div className="bg-white border-4 border-black px-2 py-1 flex items-center gap-2 shadow-brutal hover:bg-brand-pink hover:text-white transition-all cursor-pointer group">
          <Image 
            src="/assets/logo-token.png" 
            alt="$JAY Protocol"
            width={40}  
            height={40} 
            className="object-contain group-hover:rotate-12 transition-transform" 
            priority 
          />
          <span className="font-black text-xl md:text-2xl tracking-tighter uppercase italic">
            $JAY<span className="text-brand-pink group-hover:text-white">.</span>SYS
          </span>
        </div>
      </Link>
      <div className="relative z-10 flex items-center gap-2 md:gap-4">
        {walletAddress && (
          <button 
            onClick={addTokenToMetaMask}
            className="hidden md:flex items-center gap-1 bg-white text-black border-4 border-black px-2 py-2 font-black text-[10px] md:text-xs uppercase shadow-brutal hover:bg-brand-yellow hover:-translate-y-1 transition-all"
            title="Import $JAY to Wallet"
          >
            🦊 <span className="ml-1">Add $JAY</span>
          </button>
        )}
        {isOwner && (
          <Link href="/admin">
            <button className="flex items-center gap-2 bg-black text-brand-yellow border-4 border-black px-3 md:px-4 py-2 font-black text-[10px] md:text-xs uppercase shadow-brutal hover:bg-brand-pink hover:text-white transition-all">
              <ShieldCheck size={16} strokeWidth={3} />
              <span className="hidden md:inline">Admin Portal</span>
            </button>
          </Link>
        )}
        {short ? (
          <div className="flex items-center gap-2">
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 bg-brand-cyan text-black border-4 border-black px-4 py-2.5 font-mono text-xs md:text-sm font-black shadow-brutal hover:bg-white transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <Copy size={14} />
              <span className="hidden sm:inline">{short}</span>
              <span className="sm:hidden font-black">COPY</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onConnect}
            className="bg-brand-yellow text-brand-black border-4 border-black px-4 md:px-8 py-3 font-black text-xs md:text-base uppercase tracking-tight shadow-brutal hover:bg-black hover:text-brand-yellow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}