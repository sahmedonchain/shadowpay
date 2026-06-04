"use client";

import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import { DBType } from "@/lib/db";

export default function ClaimPage() {
  const [data, setData] = useState<DBType | null>(null);

  useEffect(() => {
    setData(blockchain.getState());
    const unsub = eventBus.subscribe(() => setData(blockchain.getState()));
    return unsub;
  }, []);

  if (!data) return <div className="p-6 text-zinc-400">Loading...</div>;

  const getEmployeeName = (id: string) =>
    data.employees.find((e) => e.id === id)?.name ?? id.slice(0, 8);

  const approved = data.payrolls.filter((p) => p.status === "approved");
  const claimed = [...new Map(
    data.payrolls.filter((p) => p.status === "claimed").map((p) => [p.id, p])
  ).values()];

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Claim Salary</h1>
        <p className="text-zinc-500 mt-1 text-sm">Proof-verified payroll claims</p>
      </div>

      {approved.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-500 text-sm">
          No approved payrolls available to claim
        </div>
      ) : (
        <div className="space-y-3">
          {approved.map((p) => (
            <div key={p.id} className="bg-zinc-900 p-4 md:p-5 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <p className="font-semibold">{getEmployeeName(p.employeeId)}</p>
                <p className="text-zinc-400 text-sm">{p.amount.toLocaleString()}</p>
                {p.proof && (
                  <p className="text-xs text-zinc-600 mt-1">
                    🔐 {p.proof.hash.slice(0, 16)}...
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  const ok = blockchain.claimPayroll(p.id);
                  if (!ok) alert("Claim failed");
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 text-sm w-full sm:w-auto"
              >
                Claim
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
        <h3 className="font-semibold mb-3">Claim History</h3>
        {claimed.length === 0 ? (
          <p className="text-zinc-500 text-sm">No claims yet</p>
        ) : (
          <div className="space-y-2">
            {claimed.map((p) => (
              <div key={p.id} className="text-sm text-zinc-400 py-1 border-b border-zinc-800 flex justify-between">
                <span>✅ {getEmployeeName(p.employeeId)}</span>
                <span className="text-zinc-500">{p.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}