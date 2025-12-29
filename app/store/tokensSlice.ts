import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchTokens, fetchAllTokens } from "@/app/lib/fakeApi";
import { Token, TokenCategory, SortConfig, SortField, SortOrder } from "@/app/lib/types";

/**
 * Tokens state structure
 */
interface TokensState {
  // Data
  byCategory: {
    "new-pairs": Token[];
    "final-stretch": Token[];
    migrated: Token[];
  };
  allTokens: Token[];

  // Sorting - per category
  sortConfigByCategory: {
    "new-pairs": SortConfig;
    "final-stretch": SortConfig;
    migrated: SortConfig;
  };

  // Loading states
  loading: {
    "new-pairs": boolean;
    "final-stretch": boolean;
    migrated: boolean;
    all: boolean;
  };
  error: {
    "new-pairs"?: string;
    "final-stretch"?: string;
    migrated?: string;
    all?: string;
  };

  // UI state
  searchQuery: string;
  selectedCategory: TokenCategory;
  lastUpdated: number;
}

const initialState: TokensState = {
  byCategory: {
    "new-pairs": [],
    "final-stretch": [],
    migrated: [],
  },
  allTokens: [],
  sortConfigByCategory: {
    "new-pairs": { field: "mc", order: "desc" },
    "final-stretch": { field: "mc", order: "desc" },
    migrated: { field: "mc", order: "desc" },
  },
  loading: {
    "new-pairs": false,
    "final-stretch": false,
    migrated: false,
    all: false,
  },
  error: {},
  searchQuery: "",
  selectedCategory: "new-pairs",
  lastUpdated: 0,
};

/**
 * Async thunks for data fetching
 */
export const fetchTokensByCategory = createAsyncThunk(
  "tokens/fetchByCategory",
  async (category: TokenCategory) => {
    const data = await fetchTokens(category);
    return { category, data };
  }
);

export const fetchAllTokensThunk = createAsyncThunk(
  "tokens/fetchAll",
  async () => {
    return await fetchAllTokens();
  }
);

/**
 * Tokens slice
 */
const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    /**
     * Update price for a token (real-time updates)
     */
    updateTokenPrice(
      state: TokensState,
      action: PayloadAction<{
        tokenId: string;
        price: number;
        priceChange24h: number;
        volume24h?: number;
      }>
    ) {
      const { tokenId, price, priceChange24h, volume24h } = action.payload;

      // Update in all locations
      Object.keys(state.byCategory).forEach((key) => {
        const category = key as TokenCategory;
        const token = state.byCategory[category].find((t) => t.id === tokenId);
        if (token) {
          token.price = price;
          token.priceChange24h = priceChange24h;
          if (volume24h !== undefined) {
            token.volume24h = volume24h;
          }
        }
      });

      const allToken = state.allTokens.find((t) => t.id === tokenId);
      if (allToken) {
        allToken.price = price;
        allToken.priceChange24h = priceChange24h;
        if (volume24h !== undefined) {
          allToken.volume24h = volume24h;
        }
      }

      state.lastUpdated = Date.now();
    },

    /**
     * Set sort configuration for a specific category
     */
    setSortConfig(
      state: TokensState,
      action: PayloadAction<{
        category: TokenCategory;
        config: SortConfig;
      }>
    ) {
      const { category, config } = action.payload;
      state.sortConfigByCategory[category] = config;
    },

    /**
     * Set search query
     */
    setSearchQuery(state: TokensState, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },

    /**
     * Set selected category
     */
    setSelectedCategory(
      state: TokensState,
      action: PayloadAction<TokenCategory>
    ) {
      state.selectedCategory = action.payload;
    },

    /**
     * Update multiple tokens at once
     */
    updateTokens(
      state: TokensState,
      action: PayloadAction<{
        category: TokenCategory;
        tokens: Token[];
      }>
    ) {
      const { category, tokens } = action.payload;
      state.byCategory[category] = tokens;
      state.lastUpdated = Date.now();
    },
  },

  extraReducers: (builder) => {
    // Fetch tokens by category
    builder
      .addCase(fetchTokensByCategory.pending, (state, action) => {
        const category = action.meta.arg;
        state.loading[category] = true;
        state.error[category] = undefined;
      })
      .addCase(fetchTokensByCategory.fulfilled, (state, action) => {
        const { category, data } = action.payload;
        state.byCategory[category] = data;
        state.loading[category] = false;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchTokensByCategory.rejected, (state, action) => {
        const category = action.meta.arg;
        state.loading[category] = false;
        state.error[category] = action.error.message || "Failed to fetch tokens";
      });

    // Fetch all tokens
    builder
      .addCase(fetchAllTokensThunk.pending, (state) => {
        state.loading.all = true;
        state.error.all = undefined;
      })
      .addCase(fetchAllTokensThunk.fulfilled, (state, action) => {
        state.allTokens = action.payload;
        state.loading.all = false;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchAllTokensThunk.rejected, (state, action) => {
        state.loading.all = false;
        state.error.all = action.error.message || "Failed to fetch tokens";
      });
  },
});

export const {
  updateTokenPrice,
  setSortConfig,
  setSearchQuery,
  setSelectedCategory,
  updateTokens,
} = tokensSlice.actions;
export default tokensSlice.reducer;
