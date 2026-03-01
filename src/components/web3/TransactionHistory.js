'use client';
import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { ExternalLink, History, Loader2, ArrowUpRight, RefreshCw } from 'lucide-react';
import { VENDOR_ADDRESS } from '@/constants';

export default function TransactionHistory({ walletAddress, refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  const fetchHistory = useCallback(async () => {
    if (!walletAddress || !ETHERSCAN_API_KEY) {
      if (!ETHERSCAN_API_KEY) console.warn("Explorer API configuration missing.");
      return;
    }
    setLoading(true);
    try {
      const url = `https://api.etherscan.io/v2/api?chainid=11155111&module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === '1' && Array.isArray(data.result)) {
        const vendorTxs = data.result.filter((tx) => {
          const target = VENDOR_ADDRESS.toLowerCase();
          const to = (tx.to || "").toLowerCase();
          const from = (tx.from || "").toLowerCase();
          return to === target || from === target;
        }).slice(0, 3); 
        setTransactions(vendorTxs);
      } else if (data.message === "No transactions found") {
        setTransactions([]);
      }
    } catch (err) {
      console.error("Explorer sync failed:", err);
    } finally {
      setLoading(false);
    }
  }, [walletAddress, ETHERSCAN_API_KEY]);
  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 30000);
    return () => clearInterval(interval);
  }, [fetchHistory, refreshTrigger]); 
  if (!walletAddress) return null;
  return (
    <div className="border-4 border-black bg-white shadow-brutal p-6 mt-6 relative">      
      <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-2">
        <div className="flex items-center gap-2">
          <History size={24} strokeWidth={3} />
          <h3 className="font-black text-xl uppercase italic tracking-tight text-black">Activity Feed</h3>
        </div>        
        <div className="flex items-center gap-2">
          {loading && <Loader2 size={16} className="animate-spin text-brand-pink" />}          
          <button 
            onClick={fetchHistory}
            disabled={loading}
            className="p-1.5 border-2 border-black bg-brand-yellow hover:bg-brand-cyan transition-all shadow-[2px_2px_0px_black] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Refresh History"
          >
            <RefreshCw size={16} strokeWidth={3} className={`text-black ${loading ? 'animate-spin' : 'group-hover:-rotate-90 transition-transform'}`} />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {transactions.length === 0 && !loading ? (
          <div className="py-10 border-2 border-dashed border-black/10 flex flex-col items-center bg-gray-50/50">
            <p className="font-mono text-[10px] text-black/40 italic text-center px-4 uppercase">
              No protocol transactions detected for this address.
            </p>
          </div>
        ) : (
          <>
            {transactions.map((tx, i) => {
              const isBuy = tx.value !== "0";               
              return (
                <div key={i} className="flex justify-between items-center border-2 border-black p-3 bg-white hover:bg-brand-cyan/5 transition-all group shadow-[2px_2px_0px_black] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black]">
                  <div className="flex flex-col">
                    <span className={`text-[9px] font-black px-2 py-0.5 border-2 border-black w-fit mb-1 shadow-[1px_1px_0px_black] uppercase ${isBuy ? 'bg-brand-cyan text-black' : 'bg-brand-yellow text-black'}`}>
                      {isBuy ? 'BUY_PROTOCOL' : 'SELL_PROTOCOL'}
                    </span>
                    <p className="font-mono text-[9px] text-black/50">
                      {new Date(tx.timeStamp * 1000).toLocaleTimeString('en-US')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-black text-xs font-mono">
                        {isBuy ? `${parseFloat(ethers.formatEther(tx.value)).toFixed(4)} ETH` : 'TOKEN_SWAP'}
                      </p>
                      <p className={`font-mono text-[9px] font-bold uppercase ${tx.isError === '0' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.isError === '0' ? 'Finalized' : 'Reverted'}
                      </p>
                    </div>                    
                    <a 
                      href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white p-2 border-2 border-black shadow-[2px_2px_0px_black] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all hover:bg-brand-pink hover:text-black"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
            {transactions.length > 0 && (
              <a 
                href={`https://sepolia.etherscan.io/address/${walletAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full bg-white text-black border-4 border-black py-3 font-black text-sm uppercase tracking-tighter shadow-[4px_4px_0px_black] hover:bg-brand-pink hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all group"
              >
                View Network Explorer 
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}