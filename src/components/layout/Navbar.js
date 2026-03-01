'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, ShieldCheck, Menu, X, PlusCircle, Wallet, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ethers } from 'ethers';
import { VENDOR_ADDRESS, VendorABI, JAY_TOKEN_ADDRESS } from '@/constants';

export default function Navbar({ walletAddress, onConnect }) {
  const [isOwner, setIsOwner] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        if (error.code === 'BAD_DATA' && error.value === '0x') {
          console.warn("Contract not found. Please ensure you are on the Sepolia Testnet.");
        } else {
          console.error("Owner verification failed:", error);
        }
        setIsOwner(false);
      }
    };
    checkOwnerStatus();
  }, [walletAddress]);
  const addTokenToMetaMask = async () => {
    if (!window.ethereum) {
      toast.error('Web3 Wallet required.');
      return;
    }
    try {
      const baseUrl = window.location.origin; 
      const logoUrl = `${baseUrl}/assets/logo-token.png`; 
      await window.ethereum.request({
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
      setIsMenuOpen(false);
    } catch (error) {
      toast.error('Token import failed.');
    }
  };
  const short = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null;
  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success('Wallet address copied!');
    }
  };
  return (
    <nav className="relative z-50 border-b-4 border-black bg-white shadow-[0_4px_0_0_rgba(0,0,0,1)] transition-all">
      <div className="relative z-20 flex items-center justify-between px-4 py-3 md:px-6 md:py-4 max-w-7xl mx-auto bg-white">
        <Link href="/" className="shrink-0" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white border-4 border-black px-2 py-1 flex items-center gap-2 shadow-brutal hover:bg-brand-pink hover:text-white transition-all group">
            <Image 
              src="/assets/logo-token.png" 
              alt="$JAY"
              width={32} height={32}
              className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-12 transition-transform" 
              priority 
            />
            <span className="font-black text-lg md:text-2xl tracking-tighter italic uppercase">
              $JAY<span className="text-brand-pink group-hover:text-white">.</span>SYS
            </span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/guide">
            <button className="flex items-center gap-2 bg-white border-4 border-black px-4 py-2 font-black text-xs uppercase shadow-brutal hover:bg-brand-cyan transition-all">
              <HelpCircle size={16} strokeWidth={2.5} /> Guide
            </button>
          </Link>
          {walletAddress && (
            <button onClick={addTokenToMetaMask} className="flex items-center gap-2 bg-white border-4 border-black px-3 py-2 font-black text-xs uppercase shadow-brutal hover:bg-brand-yellow transition-all">
              🦊 Add Token
            </button>
          )}          
          {isOwner && (
            <Link href="/admin">
              <button className="flex items-center gap-2 bg-black text-brand-yellow border-4 border-black px-4 py-2 font-black text-xs uppercase shadow-brutal hover:bg-brand-pink hover:text-white transition-all">
                <ShieldCheck size={16} /> Admin
              </button>
            </Link>
          )}          
          {short ? (
            <button onClick={copyAddress} className="flex items-center gap-2 bg-brand-cyan border-4 border-black px-4 py-2 font-mono text-sm font-black shadow-brutal hover:bg-white transition-all">
              <Copy size={14} /> {short}
            </button>
          ) : (
            <button onClick={onConnect} className="bg-brand-yellow border-4 border-black px-6 py-2 font-black text-sm uppercase shadow-brutal hover:bg-black hover:text-brand-yellow transition-all">
              Connect Wallet
            </button>
          )}
        </div>
        <div className="lg:hidden flex items-center gap-3">
          {!walletAddress && (
            <button onClick={onConnect} className="bg-brand-yellow border-4 border-black px-3 py-1.5 font-black text-[10px] uppercase shadow-[2px_2px_0px_black] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all">
              Connect
            </button>
          )}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`border-4 border-black p-1.5 transition-all active:translate-x-1 active:translate-y-1 ${isMenuOpen ? 'bg-brand-pink text-white shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0px_black]'}`}
          >
            {isMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b-4 border-black p-6 space-y-4 z-40 shadow-[0_12px_0_0_rgba(0,0,0,1)] animate-in slide-in-from-top-2 duration-200">
          {short && (
            <button 
              onClick={copyAddress}
              className="w-full flex items-center justify-between bg-brand-cyan border-4 border-black p-4 font-black text-sm shadow-[4px_4px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              <div className="flex items-center gap-3">
                <Wallet size={18} strokeWidth={2.5} />
                <span className="font-mono">{short}</span>
              </div>
              <Copy size={18} strokeWidth={2.5} />
            </button>
          )}
          <Link href="/guide" onClick={() => setIsMenuOpen(false)} className="block">
            <button className="w-full flex items-center justify-between bg-brand-yellow border-4 border-black p-4 font-black text-sm uppercase shadow-[4px_4px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
              <span>Onboarding Guide</span>
              <HelpCircle size={20} strokeWidth={2.5} />
            </button>
          </Link>
          {walletAddress && (
            <button 
              onClick={addTokenToMetaMask}
              className="w-full flex items-center justify-between bg-white border-4 border-black p-4 font-black text-sm uppercase shadow-[4px_4px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              <span>Add $JAY to Wallet</span>
              <PlusCircle size={20} strokeWidth={2.5} />
            </button>
          )}
          {isOwner && (
            <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block">
              <button className="w-full flex items-center justify-between bg-black text-brand-yellow border-4 border-black p-4 font-black text-sm uppercase shadow-[4px_4px_0px_#FF2E63] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                <span>Admin Portal</span>
                <ShieldCheck size={20} strokeWidth={2.5} />
              </button>
            </Link>
          )}
          <div className="pt-4 text-center font-mono text-[10px] text-black/50 font-black tracking-widest uppercase border-t-4 border-dashed border-black/20">
            — JAY Protocol System v1.0 —
          </div>
        </div>
      )}
    </nav>
  );
}