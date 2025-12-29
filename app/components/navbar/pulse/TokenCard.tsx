"use client";

import { useEffect, useRef, useState, memo } from "react";
import { useUI, useWatchlist } from "@/app/hooks/useTokens";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
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

/**
 * TokenCard component - memoized for performance
 * Displays token information with price updates and interactions
 */
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

    // Flash on market cap change
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

    // Flash on price change
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
      if (onBuy) {
        onBuy();
      } else {
        openBuyModal(id);
      }
    };

    return (
      <div
        className={clsx(
          "group relative flex gap-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:bg-white/[0.06]",
          "border-white/[0.06] bg-white/[0.02]",
          flash === "up" && "border-green-500/40 bg-green-500/10",
          flash === "down" && "border-red-500/40 bg-red-500/10"
        )}
        onClick={() => openDetailsModal(id)}
      >
        {/* Left Icon */}
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-sm font-bold flex-shrink-0 flex items-center justify-center">
          {symbol[0]}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Tooltip content={`${name} (${symbol})`}>
              <span className="text-[14px] font-medium truncate">{name}</span>
            </Tooltip>
            <span className="text-[12px] text-white/50">{symbol}</span>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-3 text-[12px] text-white/60 flex-wrap mb-2">
            <div className="flex items-center gap-1">
              <span className="text-white/40">MC</span>
              <span className={priceFlash === "up" ? "text-green-400" : priceFlash === "down" ? "text-red-400" : ""}>
                ${formatNumber(mc / 1000000, 2)}M
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white/40">V</span>
              <span>${formatNumber(volume24h / 1000, 0)}K</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white/40">TX</span>
              <span>{txCount}</span>
            </div>
          </div>

          {/* Price and Change Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant={priceIsPositive ? "success" : "danger"}
              size="sm"
              className={priceFlash === "up" ? "scale-110" : priceFlash === "down" ? "scale-95" : ""}
            >
              {formatPercent(priceChange24h)}
            </Badge>
            <span className="text-[11px] text-white/40">
              ${formatPrice(price, 6)}
            </span>
          </div>
        </div>

        {/* Right Actions - Visible on Hover */}
        <div className="absolute right-3 top-3 hidden group-hover:flex gap-2 items-center flex-shrink-0">
          <Tooltip content="View details">
            <Button
              size="xs"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                openDetailsModal(id);
              }}
            >
              Details
            </Button>
          </Tooltip>

          <Tooltip content="Buy token">
            <Button
              size="xs"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleBuy();
              }}
            >
              Buy
            </Button>
          </Tooltip>

          <Tooltip content={watched ? "Remove from watchlist" : "Add to watchlist"}>
            <Button
              size="xs"
              variant={watched ? "primary" : "secondary"}
              onClick={(e) => {
                e.stopPropagation();
                toggle(id);
              }}
              className="px-2"
            >
              <Star
                size={14}
                className={watched ? "fill-current" : ""}
              />
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  },
  (prev, next) => {
    // Custom comparison for memo - only re-render if data changes significantly
    return (
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
  }
);

TokenCard.displayName = "TokenCard";

export default TokenCard;

