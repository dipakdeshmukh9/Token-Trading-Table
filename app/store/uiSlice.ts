import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "@/app/lib/types";

/**
 * UI state for managing all UI interactions
 */
interface UIState {
  // Modals
  modals: {
    buy: ModalState;
    sell: ModalState;
    details: ModalState;
  };

  // Popovers
  activePopover?: string;

  // Tooltips
  hoveredTokenId?: string;

  // Display preferences
  displayMode: "compact" | "detailed";
  showFilters: boolean;
  showChart: boolean;

  // Notifications
  notifications: Array<{
    id: string;
    type: "success" | "error" | "info" | "warning";
    message: string;
    timestamp: number;
  }>;
}

const initialState: UIState = {
  modals: {
    buy: { isOpen: false },
    sell: { isOpen: false },
    details: { isOpen: false },
  },
  activePopover: undefined,
  hoveredTokenId: undefined,
  displayMode: "detailed",
  showFilters: false,
  showChart: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    /**
     * Open buy modal for a token
     */
    openBuyModal(state: UIState, action: PayloadAction<string>) {
      state.modals.buy = {
        isOpen: true,
        tokenId: action.payload,
      };
    },

    /**
     * Close buy modal
     */
    closeBuyModal(state: UIState) {
      state.modals.buy = { isOpen: false };
    },

    /**
     * Open sell modal for a token
     */
    openSellModal(state: UIState, action: PayloadAction<string>) {
      state.modals.sell = {
        isOpen: true,
        tokenId: action.payload,
      };
    },

    /**
     * Close sell modal
     */
    closeSellModal(state: UIState) {
      state.modals.sell = { isOpen: false };
    },

    /**
     * Open details modal for a token
     */
    openDetailsModal(state: UIState, action: PayloadAction<string>) {
      state.modals.details = {
        isOpen: true,
        tokenId: action.payload,
      };
    },

    /**
     * Close details modal
     */
    closeDetailsModal(state: UIState) {
      state.modals.details = { isOpen: false };
    },

    /**
     * Set active popover
     */
    setActivePopover(state: UIState, action: PayloadAction<string | undefined>) {
      state.activePopover = action.payload;
    },

    /**
     * Set hovered token
     */
    setHoveredToken(
      state: UIState,
      action: PayloadAction<string | undefined>
    ) {
      state.hoveredTokenId = action.payload;
    },

    /**
     * Toggle display mode
     */
    setDisplayMode(
      state: UIState,
      action: PayloadAction<"compact" | "detailed">
    ) {
      state.displayMode = action.payload;
    },

    /**
     * Toggle filters visibility
     */
    toggleFilters(state: UIState) {
      state.showFilters = !state.showFilters;
    },

    /**
     * Toggle chart visibility
     */
    toggleChart(state: UIState) {
      state.showChart = !state.showChart;
    },

    /**
     * Add notification
     */
    addNotification(
      state: UIState,
      action: PayloadAction<{
        type: "success" | "error" | "info" | "warning";
        message: string;
      }>
    ) {
      state.notifications.push({
        id: Math.random().toString(36).substr(2, 9),
        type: action.payload.type,
        message: action.payload.message,
        timestamp: Date.now(),
      });
    },

    /**
     * Remove notification
     */
    removeNotification(state: UIState, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },

    /**
     * Clear all notifications
     */
    clearNotifications(state: UIState) {
      state.notifications = [];
    },
  },
});

export const {
  openBuyModal,
  closeBuyModal,
  openSellModal,
  closeSellModal,
  openDetailsModal,
  closeDetailsModal,
  setActivePopover,
  setHoveredToken,
  setDisplayMode,
  toggleFilters,
  toggleChart,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
