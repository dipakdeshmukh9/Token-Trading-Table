"use client";

import { useEffect, useMemo, useCallback, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchTokens, getWebSocket } from "@/app/lib/fakeApi";
import {
  useTokens,
  useUI,
  useSortedTokens,
  useFilteredTokens,
} from "@/app/hooks/useTokens";
import { updateTokenPrice } from "@/app/store/tokensSlice";
import TokenCard from "./TokenCard";
import SkeletonTokenCard from "./SkeletonTokenCard";
import BuyModal from "../../modals/BuyModal";
import { Button } from "@/app/components/ui/Button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { TokenCategory, Token } from "@/app/lib/types";
import type { AppDispatch } from "@/app/store/store";

interface PulseColumnProps {
  title: string;
  category: TokenCategory;
}

/**
 * PulseColumn - displays a list of tokens in a category with sorting, filtering, and real-time updates
 * Memoized for performance optimization
 */
const PulseColumn = memo(function PulseColumn({ title, category }: PulseColumnProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { sortConfigByCategory, setSortConfigForCategory } = useTokens();
  const { modals, closeBuyModal } = useUI();

  // Get sort config for this specific category
  const sortConfig = sortConfigByCategory[category];

  // Fetch tokens for this category
  const { data, isLoading, isError, refetch } = useQuery<Token[], Error>({
    queryKey: ["tokens", category],
    queryFn: () => fetchTokens(category),
    refetchInterval: 3000,
    retry: 1,
  });

  // Set up real-time price updates via WebSocket mock
  useEffect(() => {
    const ws = getWebSocket();

    const handlePriceUpdate = (update: any) => {
      dispatch(
        updateTokenPrice({
          tokenId: update.tokenId,
          price: update.price,
          priceChange24h: update.change,
        })
      );
    };

    ws.on(handlePriceUpdate);

    return () => {
      ws.off(handlePriceUpdate);
    };
  }, [dispatch]);

  // Sort the data
  const sortedData = useMemo(() => {
    if (!data) return [];

    const sorted = [...data];
    sorted.sort((a, b) => {
      const field = sortConfig.field as keyof Token;
      let aVal: any = a[field];
      let bVal: any = b[field];

      // Handle string comparison
      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
        return sortConfig.order === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // Handle number comparison
      const diff = aVal - bVal;
      return sortConfig.order === "asc" ? diff : -diff;
    });

    return sorted;
  }, [data, sortConfig]);

  // Toggle sort order for a field
  const handleSort = useCallback(
    (field: string) => {
      if (sortConfig.field === field) {
        // Toggle order
        setSortConfigForCategory(category, {
          field: sortConfig.field,
          order: sortConfig.order === "asc" ? "desc" : "asc",
        });
      } else {
        // Change field, default to desc
        setSortConfigForCategory(category, {
          field: field as any,
          order: "desc",
        });
      }
    },
    [sortConfig, setSortConfigForCategory, category]
  );

  // Get sort icon
  const getSortIcon = (field: string) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown size={14} className="opacity-40" />;
    }
    return sortConfig.order === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  return (
    <>
      {/* Column Container - Fixed height, full column space */}
      <div className="flex flex-col rounded-xl border border-white/6 bg-white/2 overflow-hidden h-full">
        {/* Sticky Header - Always visible at top */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-2.5 border-b border-white/6 bg-white/2 backdrop-blur-sm flex-shrink-0">
          <h2 className="text-xs font-semibold text-white truncate">{title}</h2>

          {/* Sort Controls - Compact */}
          <div className="flex items-center gap-0.5 flex-shrink-0 ml-1">
            <Button
              size="xs"
              variant={sortConfig.field === "mc" ? "secondary" : "ghost"}
              onClick={() => handleSort("mc")}
              className="gap-0.5 text-xs font-medium px-1.5 py-0.5 whitespace-nowrap"
            >
              MC {getSortIcon("mc")}
            </Button>

            <Button
              size="xs"
              variant={sortConfig.field === "name" ? "secondary" : "ghost"}
              onClick={() => handleSort("name")}
              className="gap-0.5 text-xs font-medium px-1.5 py-0.5 whitespace-nowrap"
            >
              Name {getSortIcon("name")}
            </Button>

            <Button
              size="xs"
              variant={sortConfig.field === "price" ? "secondary" : "ghost"}
              onClick={() => handleSort("price")}
              className="gap-0.5 text-xs font-medium px-1.5 py-0.5 whitespace-nowrap"
            >
              Price {getSortIcon("price")}
            </Button>
          </div>
        </div>

        {/* Scrollable Cards Container - Fills remaining space */}
        <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-2">
          {isLoading ? (
            <>
              <SkeletonTokenCard />
              <SkeletonTokenCard />
              <SkeletonTokenCard />
              <SkeletonTokenCard />
            </>
          ) : isError ? (
            <div className="flex items-center justify-center h-32 flex-col">
              <p className="text-sm text-red-400/80 mb-3 font-medium">
                Failed to load tokens
              </p>
              <Button size="sm" variant="secondary" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          ) : !sortedData || sortedData.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm text-white/40 font-medium">
              No tokens available
            </div>
          ) : (
            sortedData.map((token) => (
              <TokenCard
                key={token.id}
                id={token.id}
                name={token.name}
                symbol={token.symbol}
                mc={token.mc}
                price={token.price}
                priceChange24h={token.priceChange24h}
                volume24h={token.volume24h}
                txCount={token.txCount}
                category={category}
              />
            ))
          )}
        </div>
      </div>

      {/* Buy Modal */}
      {modals.buy.isOpen && modals.buy.tokenId && (
        <BuyModal
          tokenId={modals.buy.tokenId}
          onClose={closeBuyModal}
        />
      )}
    </>
  );
}, (prevProps, nextProps) =>
  prevProps.title === nextProps.title &&
  prevProps.category === nextProps.category
);

PulseColumn.displayName = "PulseColumn";

export default PulseColumn;
