import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./watchlistSlice";
import tokensReducer from "./tokensSlice";
import uiReducer from "./uiSlice";

/**
 * Redux store configuration with all slices
 */
export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    tokens: tokensReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

