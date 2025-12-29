/**
 * Token category type for different table sections
 */
export type TokenCategory = "new-pairs" | "final-stretch" | "migrated";

/**
 * Core token data structure
 */
export interface Token {
  id: string;
  name: string;
  symbol: string;
  mc: number;
  category: TokenCategory;
  price?: number;
  priceChange24h?: number;
  volume24h?: number;
  txCount?: number;
  createdAt?: number;
  image?: string;
  description?: string;
  links?: {
    website?: string;
    twitter?: string;
    discord?: string;
  };
}

/**
 * Token with real-time price data
 */
export interface TokenWithPrice extends Token {
  price: number;
  priceChange24h: number;
  volume24h: number;
  txCount: number;
}

/**
 * Sorting configuration
 */
export type SortField = "name" | "mc" | "price" | "volume" | "txCount";
export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

/**
 * Filter configuration
 */
export interface TokenFilter {
  category: TokenCategory;
  minMc?: number;
  maxMc?: number;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}

/**
 * WebSocket event types
 */
export interface PriceUpdate {
  tokenId: string;
  price: number;
  change: number;
  timestamp: number;
}

/**
 * Modal state
 */
export interface ModalState {
  isOpen: boolean;
  tokenId?: string;
}

/**
 * Loading state
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * API Response
 */
export interface ApiResponse<T> {
  data: T;
  status: LoadingState;
  error?: string;
}

