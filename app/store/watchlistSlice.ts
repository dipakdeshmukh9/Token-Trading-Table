import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * Watchlist slice for managing favorited tokens
 */
interface WatchlistState {
  tokens: string[];
  lastUpdated?: number;
}

const initialState: WatchlistState = {
  tokens: [],
  lastUpdated: undefined,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    /**
     * Toggle a token in the watchlist
     */
    toggleWatch(state: WatchlistState, action: PayloadAction<string>) {
      const id = action.payload;

      if (state.tokens.includes(id)) {
        state.tokens = state.tokens.filter((t: string) => t !== id);
      } else {
        state.tokens.push(id);
      }
      state.lastUpdated = Date.now();
    },

    /**
     * Add a token to the watchlist
     */
    addWatch(state: WatchlistState, action: PayloadAction<string>) {
      const id = action.payload;
      if (!state.tokens.includes(id)) {
        state.tokens.push(id);
        state.lastUpdated = Date.now();
      }
    },

    /**
     * Remove a token from the watchlist
     */
    removeWatch(state: WatchlistState, action: PayloadAction<string>) {
      const id = action.payload;
      state.tokens = state.tokens.filter((t: string) => t !== id);
      state.lastUpdated = Date.now();
    },

    /**
     * Set the entire watchlist
     */
    setWatchlist(state: WatchlistState, action: PayloadAction<string[]>) {
      state.tokens = action.payload;
      state.lastUpdated = Date.now();
    },

    /**
     * Clear the entire watchlist
     */
    clearWatchlist(state: WatchlistState) {
      state.tokens = [];
      state.lastUpdated = Date.now();
    },
  },
});

export const {
  toggleWatch,
  addWatch,
  removeWatch,
  setWatchlist,
  clearWatchlist,
} = watchlistSlice.actions;
export default watchlistSlice.reducer;

