import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWatch,
  addWatch,
  removeWatch,
} from "@/app/store/watchlistSlice";
import {
  updateTokenPrice,
  setSortConfig,
  setSearchQuery,
  setSelectedCategory,
  fetchTokensByCategory,
  fetchAllTokensThunk,
} from "@/app/store/tokensSlice";
import {
  openBuyModal,
  closeBuyModal,
  openSellModal,
  closeSellModal,
  openDetailsModal,
  closeDetailsModal,
  setActivePopover,
  setHoveredToken,
  addNotification,
} from "@/app/store/uiSlice";
import type { RootState, AppDispatch } from "@/app/store/store";
import type { Token, TokenCategory, SortConfig } from "@/app/lib/types";

/* =======================
   WATCHLIST HOOK
======================= */
export const useWatchlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const watched = useSelector((state: RootState) => state.watchlist.tokens);

  return useMemo(
    () => ({
      watched,
      isWatched: (tokenId: string) => watched.includes(tokenId),
      toggle: (tokenId: string) => dispatch(toggleWatch(tokenId)),
      add: (tokenId: string) => dispatch(addWatch(tokenId)),
      remove: (tokenId: string) => dispatch(removeWatch(tokenId)),
    }),
    [watched, dispatch]
  );
};

/* =======================
   TOKENS HOOK
======================= */
export const useTokens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector((state: RootState) => state.tokens);

  return useMemo(
    () => ({
      byCategory: tokens.byCategory,
      allTokens: tokens.allTokens,
      sortConfigByCategory: tokens.sortConfigByCategory,
      loading: tokens.loading,
      error: tokens.error,
      searchQuery: tokens.searchQuery,
      selectedCategory: tokens.selectedCategory,

      updatePrice: (tokenId: string, price: number, change: number) =>
        dispatch(
          updateTokenPrice({
            tokenId,
            price,
            priceChange24h: change,
          })
        ),

      setSortConfigForCategory: (
        category: TokenCategory,
        config: SortConfig
      ) => dispatch(setSortConfig({ category, config })),

      setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),

      setCategory: (category: TokenCategory) =>
        dispatch(setSelectedCategory(category)),

      fetchByCategory: (category: TokenCategory) =>
        dispatch(fetchTokensByCategory(category)),

      fetchAll: () => dispatch(fetchAllTokensThunk()),
    }),
    [tokens, dispatch]
  );
};

/* =======================
   UI HOOK
======================= */
export const useUI = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ui = useSelector((state: RootState) => state.ui);

  return useMemo(
    () => ({
      modals: ui.modals,
      activePopover: ui.activePopover,
      hoveredTokenId: ui.hoveredTokenId,
      displayMode: ui.displayMode,
      showFilters: ui.showFilters,
      showChart: ui.showChart,
      notifications: ui.notifications,

      openBuyModal: (tokenId: string) =>
        dispatch(openBuyModal(tokenId)),
      closeBuyModal: () => dispatch(closeBuyModal()),

      openSellModal: (tokenId: string) =>
        dispatch(openSellModal(tokenId)),
      closeSellModal: () => dispatch(closeSellModal()),

      openDetailsModal: (tokenId: string) =>
        dispatch(openDetailsModal(tokenId)),
      closeDetailsModal: () => dispatch(closeDetailsModal()),

      setActivePopover: (id?: string) =>
        dispatch(setActivePopover(id)),

      setHoveredToken: (id?: string) =>
        dispatch(setHoveredToken(id)),

      notify: (
        type: "success" | "error" | "info" | "warning",
        message: string
      ) => dispatch(addNotification({ type, message })),

      toggleChart: () => dispatch({ type: "ui/toggleChart" }),

      setDisplayMode: (mode: "compact" | "detailed") =>
        dispatch({ type: "ui/setDisplayMode", payload: mode }),
    }),
    [ui, dispatch]
  );
};

/* =======================
   SORT TOKENS (CATEGORY BASED)
======================= */
export const useSortedTokens = (
  tokens: Token[],
  category: "new-pairs" | "final-stretch" | "migrated"
): Token[] => {
  const { sortConfigByCategory } = useTokens();
  const sortConfig = sortConfigByCategory[category];

  return useMemo(() => {
    if (!sortConfig || tokens.length === 0) return tokens;

    // ✅ correct fields from SortConfig
    const field = sortConfig.field as keyof Token;
    const order = sortConfig.order;

    return [...tokens].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (aVal == null || bVal == null) return 0;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return order === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return order === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });
  }, [tokens, sortConfig]);
};



/* =======================
   FILTER TOKENS
======================= */
export const useFilteredTokens = (tokens: Token[]): Token[] => {
  const { searchQuery } = useTokens();

  return useMemo(() => {
    if (!searchQuery) return tokens;

    const q = searchQuery.toLowerCase();
    return tokens.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.symbol.toLowerCase().includes(q)
    );
  }, [tokens, searchQuery]);
};

/* =======================
   FILTER + SORT (FINAL)
======================= */
export const useProcessedTokens = (
  tokens: Token[],
  category: "new-pairs" | "final-stretch" | "migrated"
): Token[] => {
  const filtered = useFilteredTokens(tokens);
  const sorted = useSortedTokens(filtered, category);
  return sorted;
};
