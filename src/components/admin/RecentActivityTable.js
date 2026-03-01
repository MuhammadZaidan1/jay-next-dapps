import { History, ExternalLink } from 'lucide-react';

export default function RecentActivityTable({ recentSales }) {
  return (
    <div className="border-4 border-black bg-white shadow-[12px_12px_0px_black] overflow-hidden mb-10">
      <div className="bg-black text-white p-5 font-black flex justify-between items-center border-b-4 border-black">
        <div className="flex items-center gap-3">
          <History size={24} className="text-brand-yellow" />
          <span className="text-xl italic uppercase">Transaction History</span>
        </div>
        <div className="text-[10px] font-mono bg-brand-pink text-black px-2 py-1 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
          </span>
          SCANNING_MAINNET
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono">
          <thead className="bg-gray-100 border-b-4 border-black">
            <tr>
              <th className="p-5 uppercase font-black text-sm border-r-4 border-black">Wallet_Address</th>
              <th className="p-5 uppercase font-black text-sm border-r-4 border-black">Value (ETH)</th>
              <th className="p-5 uppercase font-black text-sm border-r-4 border-black">Received (JAY)</th>
              <th className="p-5 uppercase font-black text-sm">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-black">
            {recentSales.length > 0 ? recentSales.map((tx, idx) => (
              <tr key={idx} className="hover:bg-brand-cyan/10 transition-colors">
                <td className="p-5 border-r-4 border-black font-bold text-xs truncate max-w-37.5">{tx.buyer}</td>
                <td className="p-5 border-r-4 border-black font-black text-blue-600 italic text-lg">{tx.amountEth}</td>
                <td className="p-5 border-r-4 border-black font-black text-brand-pink text-lg">+{Number(tx.amountJay).toLocaleString()}</td>
                <td className="p-5 font-black">
                  <a 
                    href={`https://sepolia.etherscan.io/tx/${tx.hash}`} 
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-brand-yellow hover:text-black transition-all border-2 border-black uppercase text-xs"
                  >
                    View Explorer <ExternalLink size={12} />
                  </a>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="p-20 text-center font-black text-gray-400 italic uppercase text-2xl">
                  No Transactions Found in Current Cycle
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}