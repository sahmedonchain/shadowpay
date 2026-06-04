"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/treasury", label: "Treasury" },
    { href: "/employees", label: "Employees" },
    { href: "/payroll", label: "Payroll" },
    { href: "/claim", label: "Claim" },
  ];

  if (isHome) {
    return (
      <html lang="en">
        <body className="bg-black text-white">{children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white">
        <div className="flex min-h-screen">

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:flex w-60 bg-zinc-900 border-r border-zinc-800 flex-col p-6 fixed h-full">
            <h1 className="text-xl font-bold mb-8">ShadowPay</h1>
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-lg text-sm transition ${
                    pathname === link.href
                      ? "bg-white text-black font-medium"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* MOBILE TOPBAR */}
          <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex justify-between items-center">
            <h1 className="text-lg font-bold">ShadowPay</h1>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-zinc-300 text-2xl leading-none"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* MOBILE DROPDOWN MENU */}
          {menuOpen && (
            <div className="md:hidden fixed top-12 left-0 right-0 z-40 bg-zinc-900 border-b border-zinc-800 px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    pathname === link.href
                      ? "bg-white text-black font-medium"
                      : "text-zinc-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* MAIN CONTENT */}
          <main className="flex-1 md:ml-60 pt-14 md:pt-0 min-h-screen">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}