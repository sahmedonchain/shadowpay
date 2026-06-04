"use client";

import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import { DBType } from "@/lib/db";

export default function Dashboard() {
  const [data, setData] = useState<DBType | null>(null);

  useEffect(() => {
    setData(blockchain.getState());
    const unsub = eventBus.subscribe(() => setData(blockchain.getState()));
    return unsub;
  }, []);

  if (!data) return <div className="p-6 text-zinc-400">Loading...</div>;

  const pending = data.payrolls.filter((p) => p.status === "pending").length;
  const approved = data.payrolls.filter((p) => p.status === "approved").length;
  const claimed = data.payrolls.filter((p) => p.status === "claimed").length;
  const totalPaid = data.payrolls
    .filter((p) => p.status === "claimed")
    .reduce((sum, p) => sum + p.amount, 0);

  const treasuryHealth =
    data.treasury > 50000 ? "🟢 Healthy" :
    data.treasury > 10000 ? "🟡 Medium" : "🔴 Low";

  const transactions = Array.isArray(data.transactions) ? data.transactions : [];

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">ShadowPay</h1>
        <p className="text-zinc-500 mt-1 text-sm">Private payroll & treasury control</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="bg-zinc-900 p-4 md:p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs md:text-sm">Treasury</p>
          <h2 className="text-xl md:text-2xl font-bold mt-1">{data.treasury.toLocaleString()}</h2>
          <p className="text-xs mt-1">{treasuryHealth}</p>
        </div>
        <div className="bg-zinc-900 p-4 md:p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs md:text-sm">Employees</p>
          <h2 className="text-xl md:text-2xl font-bold mt-1">{data.employees.length}</h2>
        </div>
        <div className="bg-zinc-900 p-4 md:p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs md:text-sm">Total Paid</p>
          <h2 className="text-xl md:text-2xl font-bold mt-1">{totalPaid.toLocaleString()}</h2>
        </div>
        <div className="bg-zinc-900 p-4 md:p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs md:text-sm">Pending</p>
          <h2 className="text-xl md:text-2xl font-bold mt-1">{pending}</h2>
        </div>
      </div>

      {/* PAYROLL STATUS */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-900 p-3 md:p-4 rounded-xl border border-zinc-800 text-center">
          <p className="text-zinc-400 text-xs">Pending</p>
          <p className="text-lg md:text-xl font-bold text-yellow-400">{pending}</p>
        </div>
        <div className="bg-zinc-900 p-3 md:p-4 rounded-xl border border-zinc-800 text-center">
          <p className="text-zinc-400 text-xs">Approved</p>
          <p className="text-lg md:text-xl font-bold text-blue-400">{approved}</p>
        </div>
        <div className="bg-zinc-900 p-3 md:p-4 rounded-xl border border-zinc-800 text-center">
          <p className="text-zinc-400 text-xs">Claimed</p>
          <p className="text-lg md:text-xl font-bold text-green-400">{claimed}</p>
        </div>
      </div>

      {/* TRANSACTION LOG */}
      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
        <h3 className="text-base font-bold mb-3">Transaction Log</h3>
        {transactions.length === 0 ? (
          <p className="text-zinc-500 text-sm">No transactions yet</p>
        ) : (
          <div className="space-y-2">
            {[...transactions].reverse().slice(0, 8).map((t) => (
              <div key={t.id} className="flex justify-between text-xs md:text-sm gap-2">
                <span className={`font-medium shrink-0 ${t.type === "DEDUCT" ? "text-red-400" : "text-green-400"}`}>
                  {t.type === "DEDUCT" ? "−" : "+"}{t.amount}
                </span>
                <span className="text-zinc-400 truncate">{t.reason}</span>
                <span className="text-zinc-600 shrink-0">
                  {new Date(t.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}