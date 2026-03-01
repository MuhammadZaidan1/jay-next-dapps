'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, ShieldCheck, Menu, X, PlusCircle, Wallet } from 'lucide-react';
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
        console.error("Owner verification failed:", error);
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
      toast.error('Import failed.');
    }
  };

  const short = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null;

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success('Address copied!');
    }
  };

  return (
    <nav className="relative z-100 border-b-4 border-black bg-white shadow-[0_4px_0_0_rgba(0,0,0,1)]">
      {/* HEADER BAR */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 md:px-6 md:py-4 max-w-7xl mx-auto bg-white">
        
        {/* LOGO */}
        <Link href="/" className="shrink-0">
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

        {/* DESKTOP NAV (lg+) */}
        <div className="hidden lg:flex items-center gap-4">
          {walletAddress && (
            <button onClick={addTokenToMetaMask} className="flex items-center gap-2 bg-white border-4 border-black px-3 py-2 font-black text-xs uppercase shadow-brutal hover:bg-brand-yellow transition-all">
              🦊 Add Token
            </button>
          )}
          {isOwner && (
            <Link href="/admin">
              <button className="flex items-center gap-2 bg-black text-brand-yellow border-4 border-black px-4 py-2 font-black text-xs uppercase shadow-brutal hover:bg-brand-pink transition-all">
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

        {/* MOBILE CONTROLS (lg hidden) */}
        <div className="lg:hidden flex items-center gap-2">
          {!walletAddress && (
             <button onClick={onConnect} className="bg-brand-yellow border-4 border-black px-3 py-1.5 font-black text-[10px] uppercase shadow-brutal">
               Connect
             </button>
          )}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-white border-4 border-black p-1.5 shadow-brutal transition-all active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            {isMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROWER MENU */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[calc(100%-4px)] left-0 w-full bg-white border-b-4 border-black p-4 space-y-3 z-10 shadow-[0_10px_0_0_rgba(0,0,0,0.1)] animate-in slide-in-from-top duration-200">
          
          {/* Alamat Wallet di Mobile Pindah Sini */}
          {short && (
            <button 
              onClick={copyAddress}
              className="w-full flex items-center justify-between bg-brand-cyan border-4 border-black p-4 font-black text-sm shadow-brutal"
            >
              <div className="flex items-center gap-2">
                <Wallet size={18} />
                <span className="font-mono">{short}</span>
              </div>
              <Copy size={18} />
            </button>
          )}

          {walletAddress && (
            <button 
              onClick={addTokenToMetaMask}
              className="w-full flex items-center justify-between bg-white border-4 border-black p-4 font-black text-sm uppercase shadow-brutal"
            >
              <span>Add $JAY to Wallet</span>
              <PlusCircle size={20} />
            </button>
          )}

          {isOwner && (
            <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block">
              <button className="w-full flex items-center justify-between bg-black text-brand-yellow border-4 border-black p-4 font-black text-sm uppercase shadow-brutal">
                <span>Admin Portal</span>
                <ShieldCheck size={20} />
              </button>
            </Link>
          )}

          <div className="pt-2 text-center font-mono text-[9px] text-black/40 font-black tracking-widest uppercase">
            — JAY Protocol System v1.0 —
          </div>
        </div>
      )}
    </nav>
  );
}