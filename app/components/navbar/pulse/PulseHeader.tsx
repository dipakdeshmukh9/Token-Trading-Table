"use client";

import { List, ChevronDown, HelpCircle } from "lucide-react";

export default function PulseHeader() {
  return (
    <div className="flex items-center justify-between py-6">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <h1 className="text-[20px] font-semibold">Pulse</h1>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-xs">≡</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-xs">⬡</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 h-[34px] px-4 rounded-full bg-white/5 hover:bg-white/10 transition text-[13px]">
          <List size={14} />
          Display
          <ChevronDown size={14} />
        </button>

        <button className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white/70 hover:text-white transition">
          <HelpCircle size={16} />
        </button>
      </div>
    </div>
  );
}
