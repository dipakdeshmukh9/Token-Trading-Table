"use client";
import { useState } from "react";

interface TokenCardProps {
  name: string;
  symbol: string;
  mc: number;
}

export default function TokenCard({
  name,
  symbol,
  mc,
}: TokenCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group flex gap-3 p-3 rounded-lg border border-white/[0.06] 
      bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] 
      transition cursor-pointer"
    >
      {/* LEFT ICON */}
      <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center text-sm font-bold">
        {symbol[0]}
      </div>

      {/* MAIN */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium">{name}</span>
          <span className="text-[12px] text-white/50">{symbol}</span>
        </div>

        <div className="mt-1 flex items-center gap-3 text-[12px] text-white/60">
          <span>MC ${(mc / 1000).toFixed(1)}K</span>
          <span>V $412</span>
          <span>TX 7</span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400">
            +3%
          </span>
          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400">
            -1%
          </span>
        </div>
      </div>

      {/* HOVER ACTIONS */}
      {hovered && (
        <div className="absolute inset-0 rounded-lg bg-black/40 backdrop-blur-[2px] 
        flex items-center justify-end gap-2 pr-3">
          
          {/* BUY */}
          <button className="px-3 py-1 text-xs font-medium rounded 
          bg-green-500 text-black hover:bg-green-400 transition">
            Buy
          </button>

          {/* WATCH */}
          <div className="relative group">
            <button className="px-3 py-1 text-xs rounded 
            bg-white/10 hover:bg-white/20 transition">
              ★
            </button>

            {/* TOOLTIP */}
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
            opacity-0 group-hover:opacity-100 transition pointer-events-none">
              <div className="text-[10px] px-2 py-1 rounded bg-black text-white border border-white/10">
                Watch token
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
