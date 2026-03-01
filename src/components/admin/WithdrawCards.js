export default function WithdrawCards({ contractEth, contractJay, onWithdrawEth, onWithdrawTokens }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-4 border-black bg-brand-cyan p-6 shadow-[8px_8px_0px_black] group">
        <div className="mb-4">
          <p className="font-black uppercase text-[10px] mb-1">Accumulated Protocol ETH</p>
          <h3 className="text-5xl font-black tracking-tighter break-all">{parseFloat(contractEth).toFixed(4)}</h3>
        </div>
        <button 
          onClick={onWithdrawEth}
          disabled={parseFloat(contractEth) === 0}
          className="w-full bg-black text-brand-cyan py-4 font-black uppercase hover:bg-white hover:text-black transition-colors border-4 border-black shadow-[4px_4px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Withdraw Revenue
        </button>
      </div>
      <div className="border-4 border-black bg-black text-white p-6 shadow-[8px_8px_0px_#ff0055] group">
        <div className="mb-4 text-brand-pink">
          <p className="font-black uppercase text-[10px] mb-1">Vault Token Balance</p>
          <h3 className="text-5xl font-black tracking-tighter break-all">{Number(contractJay).toLocaleString()}</h3>
        </div>
        <button 
          onClick={onWithdrawTokens}
          disabled={Number(contractJay) === 0}
          className="w-full bg-brand-pink text-black py-4 font-black uppercase hover:bg-white transition-colors border-4 border-black shadow-[4px_4px_0px_white] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reclaim Assets
        </button>
      </div>
    </div>
  );
}