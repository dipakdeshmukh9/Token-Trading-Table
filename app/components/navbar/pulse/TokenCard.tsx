"use client";

import { useEffect, useRef, useState, memo } from "react";
import { useUI, useWatchlist } from "@/app/hooks/useTokens";
import { Star } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Tooltip } from "@/app/components/ui/Tooltip";
import { formatNumber, formatPrice, formatPercent } from "@/app/lib/format";
import clsx from "clsx";

interface TokenCardProps {
  id: string;
  name: string;
  symbol: string;
  mc: number;
  price?: number;
  priceChange24h?: number;
  volume24h?: number;
  txCount?: number;
  category?: string;
  onBuy?: () => void;
}

const TokenCard = memo(
  ({
    id,
    name,
    symbol,
    mc,
    price = 0.001,
    priceChange24h = 0,
    volume24h = 0,
    txCount = 0,
    category,
    onBuy,
  }: TokenCardProps) => {
    const { openBuyModal, openDetailsModal } = useUI();
    const { isWatched, toggle } = useWatchlist();

    const prevMc = useRef<number>(mc);
    const prevPrice = useRef<number>(price);
    const [flash, setFlash] = useState<"up" | "down" | null>(null);
    const [priceFlash, setPriceFlash] = useState<"up" | "down" | null>(null);

    useEffect(() => {
      if (mc > prevMc.current) {
        setFlash("up");
      } else if (mc < prevMc.current) {
        setFlash("down");
      }
      prevMc.current = mc;
      const t = setTimeout(() => setFlash(null), 500);
      return () => clearTimeout(t);
    }, [mc]);

    useEffect(() => {
      if (price > prevPrice.current) {
        setPriceFlash("up");
      } else if (price < prevPrice.current) {
        setPriceFlash("down");
      }
      prevPrice.current = price;
      const t = setTimeout(() => setPriceFlash(null), 500);
      return () => clearTimeout(t);
    }, [price]);

    const watched = isWatched(id);
    const priceIsPositive = priceChange24h >= 0;

    const handleBuy = () => {
      openBuyModal(id);
    };

    return (
      <div
        className={clsx(
          "relative flex flex-col p-2.5 rounded-lg border transition-colors duration-150 cursor-pointer overflow-visible",
          "border-white/6 bg-white/2 hover:bg-white/4 hover:border-white/10",
          "h-24",
          flash === "up" && "border-green-500/30 bg-green-500/8",
          flash === "down" && "border-red-500/30 bg-red-500/8"
        )}
        onClick={() => openDetailsModal(id)}
      >
        {/* TOP: Icon + Name/Symbol + Star */}
        <div className="flex items-start justify-between gap-1.5 mb-1">
          <div className="flex items-start gap-1.5 min-w-0 flex-1">
            <div className="w-7 h-7 rounded-md bg-linear-to-br from-white/12 to-white/4 flex items-center justify-center text-[10px] font-bold shrink-0 text-white/70">
              {symbol[0]}
            </div>
            <div className="min-w-0 flex-1">
              <Tooltip content={`${name} (${symbol})`}>
                <div className="text-xs font-semibold text-white truncate leading-tight">
                  {name}
                </div>
              </Tooltip>
              <div className="text-[9px] text-white/40 font-medium leading-tight">{symbol}</div>
            </div>
          </div>
          <Tooltip content={watched ? "Remove from watchlist" : "Add to watchlist"}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle(id);
              }}
              className={clsx(
                "shrink-0 p-0.5 rounded transition-colors",
                watched && "text-yellow-400"
              )}
            >
              <Star
                size={12}
                className={watched ? "fill-current" : ""}
                strokeWidth={watched ? 0 : 2}
              />
            </button>
          </Tooltip>
        </div>

        {/* MIDDLE: Stats Grid - MC, Vol, TX */}
        <div className="grid grid-cols-3 gap-1.5 mb-1 text-[9px]">
          <div className="flex flex-col min-w-0">
            <span className="text-white/25 font-medium leading-tight">MC</span>
            <span
              className={clsx(
                "font-semibold text-[10px] leading-tight truncate",
                priceFlash === "up"
                  ? "text-green-400"
                  : priceFlash === "down"
                    ? "text-red-400"
                    : "text-white/70"
              )}
            >
              ${formatNumber(mc / 1000000, 2)}M
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white/25 font-medium leading-tight">Vol</span>
            <span className="font-semibold text-[10px] text-white/70 leading-tight truncate">
              ${formatNumber(volume24h / 1000000, 1)}M
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white/25 font-medium leading-tight">TX</span>
            <span className="font-semibold text-[10px] text-white/70 leading-tight truncate">
              {formatNumber(txCount / 1000, 1)}K
            </span>
          </div>
        </div>

        {/* BOTTOM: Price + Badge + Buttons (ONE LINE) */}
        <div className="flex items-center justify-between gap-1.5 shrink-0">
          <div className="flex items-center gap-0.5 min-w-0 flex-1">
            <span className="text-[9px] font-mono text-white/60 shrink-0 truncate">
              ${formatPrice(price, 6)}
            </span>
            {/* Percentage Badge Box */}
            <div className={clsx(
              "rounded-lg px-1.5 py-0.5 flex items-center justify-center transition-colors shrink-0",
              priceIsPositive 
                ? "bg-green-500/12 border border-green-500/20" 
                : "bg-red-500/12 border border-red-500/20"
            )}>
              <Badge
                variant={priceIsPositive ? "success" : "danger"}
                size="sm"
                className={clsx(
                  "transition-transform duration-200 shrink-0 border-0",
                  priceFlash === "up" && "scale-105",
                  priceFlash === "down" && "scale-95"
                )}
              >
                {formatPercent(priceChange24h)}
              </Badge>
            </div>
          </div>
          <div className="flex gap-1 shrink-0">
            {/* Buy Button Box */}
            <div className="rounded-lg bg-white/4 border border-white/6 hover:bg-white/6 hover:border-white/10 transition-colors p-0.5 flex items-center justify-center">
              <Tooltip content="Buy token">
                <Button
                  size="xs"
                  variant="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuy();
                  }}
                  className="text-[10px] px-2 py-0.5 font-semibold"
                >
                  Buy
                </Button>
              </Tooltip>
            </div>
            {/* Info Button Box */}
            <div className="rounded-lg bg-white/4 border border-white/6 hover:bg-white/6 hover:border-white/10 transition-colors p-0.5 flex items-center justify-center">
              <Tooltip content="View details">
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDetailsModal(id);
                  }}
                  className="text-[10px] px-2 py-0.5"
                >
                  Info
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prev, next) =>
    prev.id === next.id &&
    prev.name === next.name &&
    prev.symbol === next.symbol &&
    prev.mc === next.mc &&
    prev.price === next.price &&
    prev.priceChange24h === next.priceChange24h &&
    prev.volume24h === next.volume24h &&
    prev.txCount === next.txCount &&
    prev.category === next.category &&
    prev.onBuy === next.onBuy
);

TokenCard.displayName = "TokenCard";

export default TokenCard;

