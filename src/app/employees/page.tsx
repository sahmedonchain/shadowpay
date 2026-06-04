"use client";

import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import { DBType } from "@/lib/db";

export default function EmployeesPage() {
  const [data, setData] = useState<DBType | null>(null);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    setData(blockchain.getState());
    const unsub = eventBus.subscribe(() => setData(blockchain.getState()));
    return unsub;
  }, []);

  const handleAdd = () => {
    const s = Number(salary);
    if (!name.trim() || !s || s <= 0) return alert("Name and valid salary required");
    blockchain.addEmployee(name.trim(), s);
    setName("");
    setSalary("");
  };

  if (!data) return <div className="p-10 text-zinc-400">Loading...</div>;

  return (
    <div className="p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Employees</h1>
        <p className="text-zinc-500 mt-1">Manage team members</p>
      </div>

      {/* ADD FORM */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 space-y-3">
        <h3 className="font-semibold">Add Employee</h3>
        <input
          className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 text-white"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 text-white"
          placeholder="Monthly salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-white text-black px-5 py-2 rounded font-medium hover:bg-zinc-200"
        >
          Add Employee
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {data.employees.length === 0 ? (
          <p className="text-zinc-500">No employees yet</p>
        ) : (
          data.employees.map((emp) => (
            <div key={emp.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
              <div>
                <p className="font-semibold">{emp.name}</p>
                <p className="text-zinc-400 text-sm">{emp.salary.toLocaleString()} / month</p>
              </div>
              <button
                onClick={() => blockchain.deleteEmployee(emp.id)}
                className="text-red-400 text-sm hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}