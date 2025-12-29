"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTokens } from "@/app/lib/fakeApi";
import TokenCard from "./TokenCard";
import SkeletonTokenCard from "./SkeletonTokenCard";

interface PulseColumnProps {
  title: string;
}

export default function PulseColumn({ title }: PulseColumnProps) {

  // ✅ STATE (INSIDE COMPONENT)
  const [sortBy, setSortBy] = useState<"name" | "mc">("mc");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // ✅ DATA FETCH
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["tokens", title],
    queryFn: fetchTokens,
    refetchInterval: 2000,
    retry: false,
  });

  // ✅ SORTED DATA (MEMOIZED)
  const sortedData = useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => {
      const value =
        sortBy === "name"
          ? a.name.localeCompare(b.name)
          : a.mc - b.mc;

      return order === "asc" ? value : -value;
    });
  }, [data, sortBy, order]);

  return (
    <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <h2 className="text-[14px] font-medium">{title}</h2>

        <div className="flex items-center gap-2 text-[12px] text-white/60">
          <button
            onClick={() => setSortBy("mc")}
            className={`px-2 py-0.5 rounded ${
              sortBy === "mc" ? "bg-white/10 text-white" : "hover:text-white"
            }`}
          >
            MC
          </button>

          <button
            onClick={() => setSortBy("name")}
            className={`px-2 py-0.5 rounded ${
              sortBy === "name" ? "bg-white/10 text-white" : "hover:text-white"
            }`}
          >
            Name
          </button>

          <button
            onClick={() =>
              setOrder((o) => (o === "asc" ? "desc" : "asc"))
            }
            className="px-2 py-0.5 rounded hover:text-white"
          >
            {order === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 space-y-2">
        {isLoading ? (
          <>
            <SkeletonTokenCard />
            <SkeletonTokenCard />
            <SkeletonTokenCard />
          </>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-sm text-red-400 mb-3">
              Failed to load tokens
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-1.5 text-xs rounded bg-white/10 hover:bg-white/20 transition"
            >
              Retry
            </button>
          </div>
        ) : sortedData.length === 0 ? (
          <div className="py-10 text-center text-sm text-white/50">
            No tokens found
          </div>
        ) : (
          sortedData.map((token) => (
            <TokenCard
              key={token.id}
              name={token.name}
              symbol={token.symbol}
              mc={token.mc}
            />
          ))
        )}
      </div>
    </div>
  );
}
