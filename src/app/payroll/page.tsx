"use client";

import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import { DBType } from "@/lib/db";

export default function PayrollPage() {
  const [data, setData] = useState<DBType | null>(null);
  const [selectedEmp, setSelectedEmp] = useState("");

  useEffect(() => {
    setData(blockchain.getState());
    const unsub = eventBus.subscribe(() => setData(blockchain.getState()));
    return unsub;
  }, []);

  if (!data) return <div className="p-10 text-zinc-400">Loading...</div>;

  const getEmployeeName = (id: string) =>
    data.employees.find((e) => e.id === id)?.name ?? id.slice(0, 8);

  const handleCreate = () => {
    const emp = data.employees.find((e) => e.id === selectedEmp);
    if (!emp) return alert("Select an employee");
    blockchain.createPayroll(emp.id, emp.salary);
    setSelectedEmp("");
  };

  return (
    <div className="p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Payroll Engine</h1>
        <p className="text-zinc-500 mt-1">Create and manage payroll batches</p>
      </div>

      {/* CREATE */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 space-y-3">
        <h3 className="font-semibold">Create Payroll</h3>
        {data.employees.length === 0 ? (
          <p className="text-zinc-500 text-sm">Add employees first</p>
        ) : (
          <>
            <select
              value={selectedEmp}
              onChange={(e) => setSelectedEmp(e.target.value)}
              className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 text-white"
            >
              <option value="">Select employee</option>
              {data.employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} — {emp.salary.toLocaleString()}
                </option>
              ))}
            </select>
            <button
              onClick={handleCreate}
              className="bg-white text-black px-5 py-2 rounded font-medium hover:bg-zinc-200"
            >
              Create Payroll
            </button>
          </>
        )}
      </div>

      {/* LIST */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Payroll List</h3>
        {data.payrolls.length === 0 ? (
          <p className="text-zinc-500">No payrolls yet</p>
        ) : (
          [...new Map(data.payrolls.map((p) => [p.id, p])).values()].reverse().map((p) => (
            <div key={p.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
              <div>
                <p className="font-semibold">{getEmployeeName(p.employeeId)}</p>
                <p className="text-zinc-400 text-sm">{p.amount.toLocaleString()}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                  p.status === "pending" ? "bg-yellow-900 text-yellow-300" :
                  p.status === "approved" ? "bg-blue-900 text-blue-300" :
                  "bg-green-900 text-green-300"
                }`}>
                  {p.status}
                </span>
                {p.proof && (
                  <p className="text-xs text-zinc-600 mt-1">Proof: {p.proof.proofId.slice(0, 12)}...</p>
                )}
              </div>
              <div className="flex gap-2">
                {p.status === "pending" && (
                  <button
                    onClick={() => {
                      const ok = blockchain.approvePayroll(p.id);
                      if (!ok) alert("Approval failed — insufficient treasury");
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-500"
                  >
                    Approve
                  </button>
                )}
                {p.status !== "claimed" && (
                  <button
                    onClick={() => blockchain.deletePayroll(p.id)}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}