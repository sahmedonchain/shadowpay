"use client";

import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import { DBType } from "@/lib/db";

export default function TreasuryPage() {
  const [data, setData] = useState<DBType | null>(null);
  const [fundAmount, setFundAmount] = useState("");

  useEffect(() => {
    setData(blockchain.getState());
    const unsub = eventBus.subscribe(() => setData(blockchain.getState()));
    return unsub;
  }, []);

  if (!data) return <div className="p-6 text-zinc-400">Loading...</div>;

  const transactions = Array.isArray(data.transactions) ? data.transactions : [];

  const totalDeducted = transactions
    .filter((t) => t.type === "DEDUCT")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalAdded = transactions
    .filter((t) => t.type === "ADD")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Treasury</h1>
        <p className="text-zinc-500 mt-1 text-sm">Fund management & audit trail</p>
      </div>

      {/* BALANCE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">Current Balance</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-1">{data.treasury.toLocaleString()}</h2>
        </div>
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">Total Paid Out</p>
          <h2 className="text-2xl md:text-3xl font-bold text-red-400 mt-1">{totalDeducted.toLocaleString()}</h2>
        </div>
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">Total Added</p>
          <h2 className="text-2xl md:text-3xl font-bold text-green-400 mt-1">{totalAdded.toLocaleString()}</h2>
        </div>
      </div>

      {/* FUND */}
      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 space-y-3">
        <h3 className="font-semibold">Fund Treasury</h3>
        <input
          className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 text-white text-sm"
          placeholder="Amount to add"
          type="number"
          value={fundAmount}
          onChange={(e) => setFundAmount(e.target.value)}
        />
        <button
          onClick={() => {
            const amt = Number(fundAmount);
            if (!amt || amt <= 0) return alert("Enter valid amount");
            blockchain.fundTreasury(amt);
            setFundAmount("");
          }}
          className="bg-white text-black px-5 py-2 rounded font-medium hover:bg-zinc-200 w-full sm:w-auto text-sm"
        >
          Add Funds
        </button>
      </div>

      {/* AUDIT LOG */}
      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
        <h3 className="font-semibold mb-4">Full Audit Log</h3>
        {transactions.length === 0 ? (
          <p className="text-zinc-500 text-sm">No transactions yet</p>
        ) : (
          <div className="space-y-2">
            {[...transactions].reverse().map((t) => (
              <div key={t.id} className="flex flex-col sm:flex-row sm:justify-between text-xs md:text-sm py-2 border-b border-zinc-800 gap-1">
                <span className={`font-medium ${t.type === "DEDUCT" ? "text-red-400" : "text-green-400"}`}>
                  {t.type === "DEDUCT" ? "−" : "+"}{t.amount.toLocaleString()}
                </span>
                <span className="text-zinc-400">{t.reason}</span>
                <span className="text-zinc-600">{new Date(t.timestamp).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}