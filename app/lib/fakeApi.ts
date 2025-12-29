import { Token, TokenCategory, PriceUpdate } from "./types";

// Enhanced mock data with multiple categories
const mockTokensData: Token[] = [
  // New Pairs
  {
    id: "1",
    name: "Axiom Pro",
    symbol: "AXPR",
    mc: 450000,
    category: "new-pairs",
    price: 0.042,
    priceChange24h: 12.5,
    volume24h: 125000,
    txCount: 234,
    createdAt: Date.now() - 86400000 * 2,
    image: "🟦",
    description: "Advanced trading protocol",
    links: { website: "#", twitter: "#", discord: "#" },
  },
  {
    id: "2",
    name: "Luna Swap",
    symbol: "LUNA",
    mc: 320000,
    category: "new-pairs",
    price: 0.018,
    priceChange24h: -5.2,
    volume24h: 98000,
    txCount: 156,
    createdAt: Date.now() - 86400000 * 1,
    image: "🌙",
    description: "Decentralized swap protocol",
    links: { website: "#", twitter: "#", discord: "#" },
  },
  {
    id: "3",
    name: "Forge Token",
    symbol: "FRGE",
    mc: 580000,
    category: "new-pairs",
    price: 0.065,
    priceChange24h: 23.8,
    volume24h: 234000,
    txCount: 412,
    createdAt: Date.now() - 86400000 * 0.5,
    image: "🔥",
    description: "Multi-chain bridge",
    links: { website: "#", twitter: "#", discord: "#" },
  },
  {
    id: "4",
    name: "Quantum Grid",
    symbol: "QGRD",
    mc: 275000,
    category: "new-pairs",
    price: 0.012,
    priceChange24h: 8.1,
    volume24h: 67000,
    txCount: 89,
    createdAt: Date.now() - 86400000 * 3,
    image: "⚛️",
    description: "Quantum computing token",
    links: { website: "#", twitter: "#", discord: "#" },
  },

  // Final Stretch
  {
    id: "5",
    name: "Stellar Rise",
    symbol: "STEL",
    mc: 1200000,
    category: "final-stretch",
    price: 0.15,
    priceChange24h: 34.5,
    volume24h: 456000,
    txCount: 678,
    createdAt: Date.now() - 86400000 * 7,
    image: "⭐",
    description: "Stellar payments network",
    links: { website: "#", twitter: "#", discord: "#" },
  },
  {
    id: "6",
    name: "Nebula Finance",
    symbol: "NEBL",
    mc: 890000,
    category: "final-stretch",
    price: 0.089,
    priceChange24h: 19.2,
    volume24h: 287000,
    txCount: 445,
    createdAt: Date.now() - 86400000 * 5,
    image: "🌌",
    description: "Decentralized finance hub",
    links: { website: "#", twitter: "#", discord: "#" },
  },
  {
    id: "7",
    name: "Velocity Pro",
    symbol: "VLCT",
    mc: 1450000,
    category: "final-stretch",
    price: 0.21,
    priceChange24h: 42.3,
    volume24h: 567000,
    txCount: 823,
    createdAt: Date.now() - 86400000 * 10,
    image: "⚡",
    description: "High-speed transaction layer",
    links: { website: "#", twitter: "#", discord: "#" },
  },
  {
    id: "8",
    name: "Prism Yield",
    symbol: "PRSY",
    mc: 650000,
    category: "final-stretch",
    price: 0.055,
    priceChange24h: 15.7,
    volume24h: 189000,
    txCount: 267,
    createdAt: Date.now() - 86400000 * 6,
    image: "💎",
    description: "Yield farming protocol",
    links: { website: "#", twitter: "#", discord: "#" },
  },

  // Migrated
  {
    id: "9",
    name: "Ethereum Solo",
    symbol: "ESOL",
    mc: 3200000,
    category: "migrated",
    price: 0.45,
    priceChange24h: 67.8,
    volume24h: 1200000,
    txCount: 2341,
    createdAt: Date.now() - 86400000 * 30,
    image: "⟠",
    description: "Ethereum compatibility layer",
    links: { website: "#", twitter: "#", discord: "#" },
  },
  {
    id: "10",
    name: "Bridge Protocol",
    symbol: "BRDG",
    mc: 2800000,
    category: "migrated",
    price: 0.38,
    priceChange24h: 51.2,
    volume24h: 987000,
    txCount: 1876,
    createdAt: Date.now() - 86400000 * 45,
    image: "🌉",
    description: "Cross-chain bridge",
    links: { website: "#", twitter: "#", discord: "#" },
  },
  {
    id: "11",
    name: "Sentinel AI",
    symbol: "SENT",
    mc: 4100000,
    category: "migrated",
    price: 0.62,
    priceChange24h: 89.5,
    volume24h: 1567000,
    txCount: 3201,
    createdAt: Date.now() - 86400000 * 60,
    image: "🤖",
    description: "AI-powered trading bot",
    links: { website: "#", twitter: "#", discord: "#" },
  },
  {
    id: "12",
    name: "Cosmos Hub",
    symbol: "COSM",
    mc: 3700000,
    category: "migrated",
    price: 0.51,
    priceChange24h: 73.4,
    volume24h: 1345000,
    txCount: 2567,
    createdAt: Date.now() - 86400000 * 50,
    image: "🌌",
    description: "Interchain communication",
    links: { website: "#", twitter: "#", discord: "#" },
  },
];

/**
 * Fetch tokens by category with simulated delay
 */
export async function fetchTokens(category?: TokenCategory): Promise<Token[]> {
  await new Promise((r) => setTimeout(r, 600));

  if (!category) return mockTokensData;

  return mockTokensData.filter((token) => token.category === category);
}

/**
 * Fetch all tokens across all categories
 */
export async function fetchAllTokens(): Promise<Token[]> {
  await new Promise((r) => setTimeout(r, 400));
  return mockTokensData;
}

/**
 * Mock WebSocket for real-time price updates
 */
export class MockWebSocket {
  private listeners: ((update: PriceUpdate) => void)[] = [];
  private interval: NodeJS.Timeout | null = null;

  constructor() {
    this.startPriceUpdates();
  }

  private startPriceUpdates() {
    this.interval = setInterval(() => {
      mockTokensData.forEach((token) => {
        // 60% chance of price update
        if (Math.random() > 0.4) {
          const changePercent = (Math.random() - 0.5) * 5; // -2.5% to +2.5%
          const newPrice = token.price! * (1 + changePercent / 100);
          const priceUpdate: PriceUpdate = {
            tokenId: token.id,
            price: parseFloat(newPrice.toFixed(6)),
            change: changePercent,
            timestamp: Date.now(),
          };

          // Update the mock data
          const tokenIndex = mockTokensData.findIndex((t) => t.id === token.id);
          if (tokenIndex >= 0) {
            mockTokensData[tokenIndex].price = newPrice;
            mockTokensData[tokenIndex].priceChange24h! += changePercent;
          }

          this.notifyListeners(priceUpdate);
        }
      });
    }, 2000); // Update every 2 seconds
  }

  on(callback: (update: PriceUpdate) => void) {
    this.listeners.push(callback);
  }

  off(callback: (update: PriceUpdate) => void) {
    this.listeners = this.listeners.filter((l) => l !== callback);
  }

  private notifyListeners(update: PriceUpdate) {
    this.listeners.forEach((listener) => listener(update));
  }

  close() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.listeners = [];
  }
}

/**
 * Create and manage WebSocket instance
 */
let wsInstance: MockWebSocket | null = null;

export function getWebSocket(): MockWebSocket {
  if (!wsInstance) {
    wsInstance = new MockWebSocket();
  }
  return wsInstance;
}

export function closeWebSocket() {
  if (wsInstance) {
    wsInstance.close();
    wsInstance = null;
  }
}

