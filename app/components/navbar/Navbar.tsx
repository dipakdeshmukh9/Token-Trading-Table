"use client";

import { Search, Star, Bell, Settings, ChevronDown } from "lucide-react";

const navItems = [
  "Discover",
  "Pulse",
  "Trackers",
  "Perpetuals",
  "Yield",
  "Vision",
  "Portfolio",
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0b0e11]/85 backdrop-blur">
      <div className="mx-auto max-w-[1600px] h-[56px] px-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-[18px]">
          {/* Axiom Triangle Logo */}
          <svg width="14" height="14" viewBox="0 0 24 24" className="fill-white">
            <polygon points="12,3 21,20 3,20" />
          </svg>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-[14px] text-[13px] font-medium">
            {navItems.map((item) => (
              <span
                key={item}
                className={
                  item === "Pulse"
                    ? "text-[#5b7cfa]"
                    : "text-white/70 hover:text-white transition-colors"
                }
              >
                {item}
              </span>
            ))}
          </nav>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Search */}
          <button className="w-[34px] h-[34px] rounded-full border border-white/[0.08] flex items-center justify-center hover:border-white/[0.18] transition">
            <Search size={15} strokeWidth={1.75} />
          </button>

          {/* SOL Chain Selector */}
          <button className="h-[34px] flex items-center gap-[8px] rounded-full border border-white/[0.08] px-[14px] text-[13px] hover:bg-white/[0.04] transition">
            <span className="w-[6px] h-[6px] rounded-full bg-green-400/80" />
            SOL
            <ChevronDown size={13} className="text-white/60" />
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-[14px]">
          {[Star, Bell, Settings].map((Icon, i) => (
            <button
              key={i}
              className="w-[34px] h-[34px] flex items-center justify-center text-white/70 hover:text-white transition"
            >
              <Icon size={17} strokeWidth={1.6} />
            </button>
          ))}

          <button className="h-[34px] px-[18px] rounded-full bg-[#5b7cfa] text-[13px] font-medium shadow-[0_0_0_0_rgba(91,124,250,0.4)] hover:opacity-90 transition">
            Deposit
          </button>
        </div>
      </div>
    </header>
  );
}
