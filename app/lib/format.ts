/**
 * Format utility functions for consistent formatting across the app
 */

/**
 * Format large numbers with K, M, B suffix
 */
export const formatNumber = (num: number, decimals = 1): string => {
  if (num === 0) return "0";
  if (num < 1000) return num.toFixed(decimals);

  const sizes = ["", "K", "M", "B", "T"];
  const i = Math.floor(Math.log(num) / Math.log(1000));
  return (num / Math.pow(1000, i)).toFixed(decimals) + sizes[i];
};

/**
 * Format currency values
 */
export const formatCurrency = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format percentage values
 */
export const formatPercent = (value: number, decimals = 2): string => {
  return `${value > 0 ? "+" : ""}${value.toFixed(decimals)}%`;
};

/**
 * Format price (for crypto, often needs more decimals)
 */
export const formatPrice = (price: number, decimals = 6): string => {
  if (price < 0.0001) {
    return price.toExponential(4);
  }
  return price.toFixed(decimals);
};

/**
 * Format timestamp
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

/**
 * Format date
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return formatDate(timestamp);
};
