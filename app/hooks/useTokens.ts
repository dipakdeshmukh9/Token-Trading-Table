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
import { Token, TokenCategory, SortConfig } from "@/app/lib/types";

/**
 * Hook for watchlist operations
 */
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

/**
 * Hook for tokens state and operations
 */
export const useTokens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector((state: RootState) => state.tokens);

  return useMemo(
    () => ({
      byCategory: tokens.byCategory,
      allTokens: tokens.allTokens,
      sortConfig: tokens.sortConfig,
      loading: tokens.loading,
      error: tokens.error,
      searchQuery: tokens.searchQuery,
      selectedCategory: tokens.selectedCategory,
      updatePrice: (tokenId: string, price: number, change: number) =>
        dispatch(updateTokenPrice({ tokenId, price, priceChange24h: change })),
      setSortConfig: (config: SortConfig) =>
        dispatch(setSortConfig(config)),
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

/**
 * Hook for UI state and operations
 */
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

      // Modal operations
      openBuyModal: (tokenId: string) =>
        dispatch(openBuyModal(tokenId)),
      closeBuyModal: () => dispatch(closeBuyModal()),
      openSellModal: (tokenId: string) =>
        dispatch(openSellModal(tokenId)),
      closeSellModal: () => dispatch(closeSellModal()),
      openDetailsModal: (tokenId: string) =>
        dispatch(openDetailsModal(tokenId)),
      closeDetailsModal: () => dispatch(closeDetailsModal()),

      // UI operations
      setActivePopover: (id: string | undefined) =>
        dispatch(setActivePopover(id)),
      setHoveredToken: (id: string | undefined) =>
        dispatch(setHoveredToken(id)),
      notify: (type: "success" | "error" | "info" | "warning", message: string) =>
        dispatch(addNotification({ type, message })),
      toggleChart: () => dispatch({ type: "ui/toggleChart" }),
      setDisplayMode: (mode: "compact" | "detailed") =>
        dispatch({ type: "ui/setDisplayMode", payload: mode }),
    }),
    [ui, dispatch]
  );
};

/**
 * Hook for sorting tokens
 */
export const useSortedTokens = (tokens: Token[]): Token[] => {
  const { sortConfig } = useTokens();

  return useMemo(() => {
    const sorted = [...tokens];
    sorted.sort((a, b) => {
      let aVal: any = a[sortConfig.field as keyof Token];
      let bVal: any = b[sortConfig.field as keyof Token];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) {
        return sortConfig.order === "asc" ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.order === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [tokens, sortConfig]);
};

/**
 * Hook for filtering tokens
 */
export const useFilteredTokens = (tokens: Token[]): Token[] => {
  const { searchQuery } = useTokens();

  return useMemo(() => {
    if (!searchQuery) return tokens;

    const query = searchQuery.toLowerCase();
    return tokens.filter(
      (token) =>
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query)
    );
  }, [tokens, searchQuery]);
};

/**
 * Hook combining sorting and filtering
 */
export const useProcessedTokens = (tokens: Token[]): Token[] => {
  const filtered = useFilteredTokens(tokens);
  const sorted = useSortedTokens(filtered);
  return sorted;
};
