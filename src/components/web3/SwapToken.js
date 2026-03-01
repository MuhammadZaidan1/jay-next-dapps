'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { Wallet, ArrowDown, Loader2 } from 'lucide-react';
import { VENDOR_ADDRESS, JAY_TOKEN_ADDRESS, VendorABI, JayTokenABI } from '@/constants';
import Skeleton from '@/components/ui/Skeleton';

function getReadProvider() {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
}

export default function SwapToken({ walletAddress, onConnect, onSuccess }) {
  const [mode, setMode] = useState('BUY');
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [tokenPerETH, setTokenPerETH] = useState(500n);
  const [userBalance, setUserBalance] = useState('0.00');
  const vAbi = useMemo(() => VendorABI?.abi || VendorABI, []);
  const jAbi = useMemo(() => JayTokenABI?.abi || JayTokenABI, []);
  const fetchBalance = useCallback(async () => {
    if (!walletAddress) {
        setIsInitialLoading(false);
        return;
    }
    try {
      const provider = getReadProvider();
      if (!provider) return;
      if (mode === 'BUY') {
        const balance = await provider.getBalance(walletAddress);
        setUserBalance(parseFloat(ethers.formatEther(balance)).toFixed(4));
      } else {
        const jayContract = new ethers.Contract(JAY_TOKEN_ADDRESS, jAbi, provider);
        const balance = await jayContract.balanceOf(walletAddress);
        setUserBalance(parseFloat(ethers.formatUnits(balance, 18)).toFixed(2));
      }
    } catch (err) {
      console.error('Balance sync error:', err);
    } finally {
      setIsInitialLoading(false);
    }
  }, [walletAddress, mode, jAbi]);
  useEffect(() => {
    async function init() {
      setIsInitialLoading(true);
      try {
        const provider = getReadProvider();
        if (!provider) return;
        const vendor = new ethers.Contract(VENDOR_ADDRESS, vAbi, provider);
        const rate = await vendor.tokenPerETH();
        setTokenPerETH(rate);
      } catch (err) {
        console.warn('Protocol rate sync failed:', err.message);
      }
    }
    init();
    if (walletAddress) fetchBalance();
    else setIsInitialLoading(false);
  }, [walletAddress, fetchBalance, vAbi]);
  const handleInputChange = (val) => {
    setInputAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      const rate = Number(tokenPerETH);
      setOutputAmount(mode === 'BUY' ? (num * rate).toLocaleString() : (num / rate).toFixed(6));
    } else {
      setOutputAmount('');
    }
  };
  const handleMaxClick = () => {
    if (!walletAddress || parseFloat(userBalance) <= 0) return;
    let maxVal = parseFloat(userBalance);
    if (mode === 'BUY') {
      maxVal = Math.max(0, maxVal - 0.005); 
      if (maxVal <= 0) {
        toast.error('Insufficient ETH for network gas fees.');
        return;
      }
    }
    handleInputChange(maxVal.toString());
  };

  const handleModeToggle = () => {
    setIsInitialLoading(true);
    setMode(prev => prev === 'BUY' ? 'SELL' : 'BUY');
    setInputAmount('');
    setOutputAmount('');
  };

  const ToastWithLink = ({ title, hash }) => (
    <div className="flex flex-col gap-1">
      <span className="font-bold">{title}</span>
      <a 
        href={`https://sepolia.etherscan.io/tx/${hash}`} 
        target="_blank" 
        rel="noreferrer" 
        className="text-[10px] text-blue-500 hover:text-black hover:bg-brand-yellow px-1 -mx-1 transition-all underline font-black uppercase inline-block w-max mt-1"
      >
        Track on Etherscan ↗
      </a>
    </div>
  );

  const handleExecuteSwap = useCallback(async () => {
    if (!walletAddress) { toast.error('Connection required.'); return; }
    if (!inputAmount || parseFloat(inputAmount) <= 0) { toast.error('Invalid amount.'); return; }
    setLoading(true);
    const toastId = toast.loading('Initializing Protocol Request...');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      if (mode === 'BUY') {
        const vendorContract = new ethers.Contract(VENDOR_ADDRESS, vAbi, signer);
        const tx = await vendorContract.buyTokens({ 
          value: ethers.parseEther(inputAmount) 
        });
        toast.loading(<ToastWithLink title="Awaiting Confirmation..." hash={tx.hash} />, { id: toastId });
        await tx.wait();
        toast.success('Swap finalized: $JAY received.', { id: toastId });
      } else {
        const tokenAmountToSell = ethers.parseEther(inputAmount);
        const jayToken = new ethers.Contract(JAY_TOKEN_ADDRESS, jAbi, signer);        
        const approveTx = await jayToken.approve(VENDOR_ADDRESS, tokenAmountToSell);
        toast.loading(<ToastWithLink title="Auth 1/2: Granting Access..." hash={approveTx.hash} />, { id: toastId });
        await approveTx.wait();
        const vendorContract = new ethers.Contract(VENDOR_ADDRESS, vAbi, signer);
        const sellTx = await vendorContract.sellTokens(tokenAmountToSell);
        toast.loading(<ToastWithLink title="Auth 2/2: Executing Swap..." hash={sellTx.hash} />, { id: toastId });
        await sellTx.wait();        
        toast.success('Swap finalized: ETH received.', { id: toastId });
      }
      setInputAmount('');
      setOutputAmount('');
      fetchBalance();
      if (onSuccess) onSuccess(); 
    } catch (err) {
      console.error("Swap Error:", err);
      if (err.code === 'ACTION_REJECTED' || err?.info?.error?.code === 4001 || err.code === 4001) {
        toast.error('Transaction cancelled by user.', { id: toastId });
      } else if (err.code === 'INSUFFICIENT_FUNDS' || err?.message?.includes('insufficient funds')) {
        toast.error('Insufficient funds for gas fees.', { id: toastId });
      } else {
        toast.error(err?.reason || 'Protocol execution failed. Please retry.', { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  }, [walletAddress, mode, inputAmount, fetchBalance, vAbi, jAbi, onSuccess]);
  const isBuy = mode === 'BUY';
  const isInsufficient = parseFloat(inputAmount || '0') > parseFloat(userBalance);
  return (
    <div className="w-full max-w-xl mx-auto px-0">
      <div className="border-4 md:border-[6px] border-black bg-white p-4 md:p-8 shadow-brutal relative overflow-hidden">        
        <div className={`absolute -top-1 -right-1 border-b-4 border-l-4 border-black px-4 py-1 font-black text-xs uppercase italic ${isBuy ? 'bg-brand-cyan' : 'bg-brand-yellow'}`}>
          {mode} MODE
        </div>
        <div className="mb-6 border-b-4 border-black pb-4">
          <h2 className="font-black text-2xl md:text-3xl tracking-tighter uppercase italic">Token Swap</h2>
          <p className="font-mono text-[10px] md:text-xs font-bold text-black/50 leading-tight mt-1">
            Exchange ETH and $JAY assets instantly via decentralized liquidity vault.
          </p>
        </div>
        <div className="flex border-4 border-black mb-6 shadow-[4px_4px_0px_black] bg-white p-1 gap-1">
          <button
            onClick={() => { if(mode !== 'BUY') handleModeToggle(); }}
            disabled={loading}
            className={`flex-1 py-3 font-black text-lg md:text-xl transition-all ${isBuy ? 'bg-brand-cyan text-black' : 'bg-transparent text-brand-cyan hover:bg-black/5'}`}
          >
            BUY
          </button>
          <button
            onClick={() => { if(mode !== 'SELL') handleModeToggle(); }}
            disabled={loading}
            className={`flex-1 py-3 font-black text-lg md:text-xl transition-all ${!isBuy ? 'bg-brand-yellow text-black' : 'bg-transparent text-brand-yellow hover:bg-black/5'}`}
          >
            SELL
          </button>
        </div>
        <div className="bg-gray-100 border-4 border-black p-4 md:p-6 flex flex-col gap-5 md:gap-6">          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-black text-[10px] uppercase text-black/60 font-mono">From</label>
              <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-black/40 bg-white px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_black]">
                <Wallet size={10} /> 
                {walletAddress ? (
                    isInitialLoading ? <Skeleton className="w-16 h-3" /> : `${userBalance} ${isBuy ? 'ETH' : '$JAY'}`
                ) : '0.00'}
              </div>
            </div>            
            <div className={`flex border-4 border-black bg-white focus-within:translate-x-1 focus-within:translate-y-1 focus-within:shadow-none transition-all shadow-[4px_4px_0px_black] ${isInsufficient ? 'border-red-500 bg-red-50' : ''}`}>
              <input
                type="number"
                placeholder="0.00"
                value={inputAmount}
                onChange={(e) => handleInputChange(e.target.value)}
                className="flex-1 px-3 py-3 md:py-4 font-black text-xl md:text-3xl outline-none bg-transparent min-w-0"
              />              
              {walletAddress && (
                <button 
                  onClick={handleMaxClick}
                  className="shrink-0 px-3 md:px-4 font-black text-[10px] md:text-xs bg-gray-200 border-l-4 border-black hover:bg-brand-pink transition-colors uppercase"
                >
                  MAX
                </button>
              )}
              <div className={`shrink-0 w-20 md:w-28 flex items-center justify-center font-black border-l-4 border-black text-xs md:text-lg ${isBuy ? 'bg-brand-cyan' : 'bg-brand-yellow'}`}>
                {isBuy ? 'ETH' : '$JAY'}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center relative z-10 py-1 md:py-0">
            <div className="h-0.5 md:h-1 bg-black flex-1"></div>
            <button 
              onClick={handleModeToggle}
              className="mx-3 md:mx-4 bg-white border-4 border-black p-2 hover:bg-brand-pink transition-all shadow-[4px_4px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <ArrowDown size={18} strokeWidth={4} className="text-black" />
            </button>
            <div className="h-0.5 md:h-1 bg-black flex-1"></div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="block font-black text-[10px] uppercase text-black/60 font-mono">To (Estimated)</label>
            <div className="flex border-4 border-black bg-gray-50 border-dashed transition-all">
              <input
                type="text"
                placeholder="0.00"
                value={outputAmount}
                readOnly
                className="flex-1 px-3 py-3 md:py-4 font-black text-xl md:text-3xl outline-none bg-transparent text-black/40 min-w-0"
              />
              <div className={`shrink-0 w-20 md:w-28 flex items-center justify-center font-black border-l-4 border-black border-dashed text-xs md:text-lg ${!isBuy ? 'bg-brand-cyan' : 'bg-brand-yellow'}`}>
                {isBuy ? '$JAY' : 'ETH'}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={walletAddress ? handleExecuteSwap : onConnect}
          disabled={loading || isInsufficient}
          className={`mt-8 w-full border-4 border-black py-4 md:py-6 font-black text-xl md:text-2xl uppercase tracking-tighter shadow-brutal transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex justify-center items-center gap-2 
            ${isInsufficient 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-brand-pink text-brand-black hover:bg-brand-black hover:text-white disabled:opacity-50'
            }
          `}
        >
          {loading && <Loader2 className="animate-spin" />}
          {loading 
            ? 'EXECUTING...' 
            : !walletAddress 
              ? 'CONNECT WALLET' 
              : isInsufficient 
                ? 'INSUFFICIENT BALANCE' 
                : 'CONFIRM SWAP'}
        </button>
        <div className="mt-8 grid grid-cols-2 gap-2">
          <div className="bg-gray-50 border-2 border-black p-2 md:p-3 shadow-[3px_3px_0px_black]">
            <p className="font-mono text-[8px] md:text-[10px] font-black text-black/40 uppercase">Protocol Rate</p>
            {isInitialLoading ? (
                <Skeleton className="w-24 h-4 mt-1" />
            ) : (
                <p className="font-mono text-[9px] md:text-xs font-black truncate uppercase">1 ETH = {tokenPerETH.toString()} JAY</p>
            )}
          </div>
          <div className="bg-gray-50 border-2 border-black p-2 md:p-3 shadow-[3px_3px_0px_black]">
            <p className="font-mono text-[8px] md:text-[10px] font-black text-black/40 uppercase">Trading Fee</p>
            <p className="font-mono text-[9px] md:text-xs font-black text-green-600 uppercase">Static_Zero</p>
          </div>
        </div>
      </div>
    </div>
  );
}