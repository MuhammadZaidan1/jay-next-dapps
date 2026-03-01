'use client';

import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { ShieldAlert, Pickaxe, ArrowLeft, Activity, Zap } from 'lucide-react';
import { useWeb3 } from '@/hooks/useWeb3';
import { VENDOR_ADDRESS, JAY_TOKEN_ADDRESS, VendorABI, JayTokenABI } from '@/constants';
import Link from 'next/link';

import DashboardStats from '@/components/admin/DashboardStats';
import WithdrawCards from '@/components/admin/WithdrawCards';
import RecentActivityTable from '@/components/admin/RecentActivityTable';

export default function AdminPage() {
  const { account, connectWallet } = useWeb3();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contractEth, setContractEth] = useState('0.00');
  const [contractJay, setContractJay] = useState('0');
  const [tokenRate, setTokenRate] = useState('0');
  const [totalSupply, setTotalSupply] = useState('0');
  const [tokensSold, setTokensSold] = useState('0');
  const [progressPercent, setProgressPercent] = useState(0);
  const [gasPrice, setGasPrice] = useState('0');
  const [recentSales, setRecentSales] = useState([]);

  const fetchData = useCallback(async () => {
    if (!account) { setLoading(false); return; }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const vendorContract = new ethers.Contract(VENDOR_ADDRESS, VendorABI.abi || VendorABI, provider);
      const ownerAddress = await vendorContract.owner();
      if (account.toLowerCase() === ownerAddress.toLowerCase()) {
        setIsOwner(true);
        const feeData = await provider.getFeeData();
        if (feeData.gasPrice) setGasPrice(ethers.formatUnits(feeData.gasPrice, 'gwei').split('.')[0]);
        const ethBalance = await provider.getBalance(VENDOR_ADDRESS);
        const jayContract = new ethers.Contract(JAY_TOKEN_ADDRESS, JayTokenABI.abi || JayTokenABI, provider);
        const jayBalance = await jayContract.balanceOf(VENDOR_ADDRESS);
        const rate = await vendorContract.tokenPerETH();
        const tSupply = await jayContract.totalSupply();
        const formattedJay = ethers.formatUnits(jayBalance, 18);
        const formattedSupply = ethers.formatUnits(tSupply, 18);
        const sold = Number(formattedSupply) - Number(formattedJay);
        setContractEth(ethers.formatEther(ethBalance));
        setContractJay(formattedJay);
        setTokenRate(rate.toString());
        setTotalSupply(formattedSupply);
        setTokensSold(sold > 0 ? sold.toString() : '0');
        setProgressPercent(sold > 0 ? ((sold / Number(formattedSupply)) * 100).toFixed(2) : 0);
        const currentBlock = await provider.getBlockNumber();
        const filter = vendorContract.filters.BuyTokens();
        const events = await vendorContract.queryFilter(filter, currentBlock - 10000, 'latest');
        const parsedEvents = events.map(event => ({
          buyer: event.args[0],
          amountEth: ethers.formatEther(event.args[1]),
          amountJay: ethers.formatUnits(event.args[2], 18),
          hash: event.transactionHash
        })).reverse().slice(0, 5);
        setRecentSales(parsedEvents);
      } else {
        setIsOwner(false);
      }
    } catch (error) {
      console.error("Fetch data error:", error);
      toast.error("Protocol Synchronization Failed.");
    } finally {
      setLoading(false);
    }
  }, [account]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleWithdrawETH = async () => {
    const toastId = toast.loading('Initiating ETH Withdrawal...');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const vendorContract = new ethers.Contract(VENDOR_ADDRESS, VendorABI.abi || VendorABI, signer);
      const tx = await vendorContract.withdrawETH();
      await tx.wait();
      toast.success('Funds Successfully Withdrawn.', { id: toastId });
      fetchData();
    } catch (err) {
      if (err.code === 'ACTION_REJECTED' || err.code === 4001) {
        toast.error('Transaction Terminated by User.', { id: toastId });
      } else {
        toast.error('Withdrawal Execution Failed.', { id: toastId });
      }
    }
  };

  const handleWithdrawTokens = async () => {
    const toastId = toast.loading('Initiating Token Recovery...');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const vendorContract = new ethers.Contract(VENDOR_ADDRESS, VendorABI.abi || VendorABI, signer);
      const tx = await vendorContract.withdrawTokens();
      await tx.wait();
      toast.success('Assets Successfully Recovered.', { id: toastId });
      fetchData();
    } catch (err) {
      if (err.code === 'ACTION_REJECTED' || err.code === 4001) {
        toast.error('Transaction Terminated by User.', { id: toastId });
      } else {
        toast.error('Recovery Execution Failed.', { id: toastId });
      }
    }
  };

  if (!account) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="border-4 border-black p-10 max-w-md w-full text-center shadow-[8px_8px_0px_black] flex flex-col items-center gap-6">
        <ShieldAlert size={60} className="text-brand-pink" />
        <h1 className="font-black text-3xl uppercase tracking-tighter">Restricted Access</h1>
        <p className="font-mono text-xs text-black/50 uppercase">Authentication Required to Proceed</p>
        <button onClick={connectWallet} className="bg-brand-yellow text-black border-4 border-black px-6 py-3 font-black uppercase shadow-[4px_4px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-full">Connect Admin Wallet</button>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center font-black text-4xl gap-4">
      <Zap size={48} className="animate-bounce text-brand-yellow" />
      <span className="animate-pulse italic">AUTHORIZING...</span>
    </div>
  );

  if (!isOwner) return (
    <div className="min-h-screen bg-brand-pink flex flex-col items-center justify-center p-6">
      <div className="border-[6px] border-black bg-white p-10 max-w-lg w-full text-center shadow-[12px_12px_0px_black] rotate-1 flex flex-col items-center gap-4">
        <h1 className="font-black text-6xl text-black uppercase tracking-tighter leading-[0.85]">ACCESS<br/>DENIED</h1>
        <p className="font-mono font-bold text-sm uppercase mt-2">Signature Mismatch: Connected address is not the Protocol Owner.</p>
        <Link href="/" className="bg-brand-cyan border-4 border-black px-6 py-3 font-black uppercase shadow-[4px_4px_0px_black] w-full mt-4 text-center">Return to Terminal</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-10 font-sans relative">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-8 border-black pb-6 gap-6">
          <div className="space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 font-mono font-black text-xs uppercase bg-black text-white px-3 py-1 hover:bg-brand-pink transition-all">
              <ArrowLeft size={14}/> SYSTEM_EXIT
            </Link>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none italic select-none">
              DASH<span className="text-brand-pink">.</span>BOARD
            </h1>
          </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_black] font-mono font-black text-xs uppercase flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Owner_ID: {account.slice(0,12)}...{account.slice(-4)}
              </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black text-white p-4 border-4 border-black shadow-[4px_4px_0px_#00ff00] flex justify-between items-center">
            <span className="font-mono text-[10px] font-black uppercase flex items-center gap-2"><Activity size={14}/> Network_Status</span>
            <span className="font-mono text-xs font-black text-green-400">NODE_LIVE</span>
          </div>
          <div className="bg-white text-black p-4 border-4 border-black shadow-[4px_4px_0px_black] flex justify-between items-center">
            <span className="font-mono text-[10px] font-black uppercase flex items-center gap-2"><Pickaxe size={14} className="text-brand-pink"/> Gas_Price</span>
            <span className="font-mono text-sm font-black text-blue-600">{gasPrice} GWEI</span>
          </div>
          <div className="bg-brand-yellow text-black p-4 border-4 border-black shadow-[4px_4px_0px_#ff0055] flex justify-between items-center">
            <span className="font-mono text-[10px] font-black uppercase flex items-center gap-2"><ShieldAlert size={14}/> Security_Layer</span>
            <span className="font-mono text-xs font-black bg-black text-brand-yellow px-2 animate-pulse italic uppercase">Active</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardStats 
            tokenRate={tokenRate} 
            totalSupply={totalSupply} 
            tokensSold={tokensSold} 
            progressPercent={progressPercent} 
          />
          <WithdrawCards 
            contractEth={contractEth} 
            contractJay={contractJay} 
            onWithdrawEth={handleWithdrawETH} 
            onWithdrawTokens={handleWithdrawTokens} 
          />
        </div>
        <RecentActivityTable recentSales={recentSales} />
      </div>
    </div>
  );
}