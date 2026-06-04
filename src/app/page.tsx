export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* NAV */}
      <div className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-zinc-800">
        <h1 className="text-lg font-bold">ShadowPay</h1>
        <div className="hidden md:flex gap-6 text-sm text-zinc-400">
          <a href="/dashboard" className="hover:text-white">Dashboard</a>
          <a href="/employees" className="hover:text-white">Employees</a>
          <a href="/payroll" className="hover:text-white">Payroll</a>
        </div>
        <a href="/dashboard" className="md:hidden text-sm bg-white text-black px-3 py-1 rounded">
          Open App
        </a>
      </div>

      {/* HERO */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full mb-4">
          Built for Miden Testnet
        </span>
        <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Private Payroll &<br />Treasury System
        </h2>
        <p className="text-zinc-400 mt-5 max-w-lg text-base md:text-lg">
          Manage employees, payroll, and treasury with zk-proof inspired architecture.
          Designed for Miden-compatible privacy workflows.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <a href="/dashboard" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-200">
            Go to Dashboard
          </a>
          <a href="/payroll" className="border border-zinc-700 px-6 py-3 rounded-lg hover:bg-zinc-900">
            View Payroll Engine
          </a>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 md:px-10 py-10 border-t border-zinc-800">
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="font-bold">Payroll Engine</h3>
          <p className="text-sm text-zinc-400 mt-2">Create, approve and manage payroll lifecycle with proof generation</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="font-bold">Treasury System</h3>
          <p className="text-sm text-zinc-400 mt-2">Real accounting with full audit trail and transaction logs</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="font-bold">Miden Ready</h3>
          <p className="text-sm text-zinc-400 mt-2">Built with zk-proof compatible architecture for Miden testnet</p>
        </div>
      </div>

    </div>
  );
}