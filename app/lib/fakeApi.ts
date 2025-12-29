import { Token, TokenCategory, PriceUpdate } from "./types";

// Enhanced mock data with 35+ tokens across 3 categories
const mockTokensData: Token[] = [
  // New Pairs (12 tokens)
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
    description: "Advanced trading protocol with AI integration",
    links: { website: "https://axiom.pro", twitter: "https://twitter.com/axiom", discord: "https://discord.gg/axiom" },
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
    description: "Decentralized swap protocol with low slippage",
    links: { website: "https://lunaswap.io", twitter: "https://twitter.com/lunaswap", discord: "https://discord.gg/luna" },
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
    description: "Multi-chain bridge for seamless transfers",
    links: { website: "https://forge.io", twitter: "https://twitter.com/forgetoken", discord: "https://discord.gg/forge" },
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
    description: "Quantum computing enabled token",
    links: { website: "https://quantum.grid", twitter: "https://twitter.com/qgrid", discord: "https://discord.gg/qgrid" },
  },
  {
    id: "13",
    name: "Nova Protocol",
    symbol: "NOVA",
    mc: 385000,
    category: "new-pairs",
    price: 0.031,
    priceChange24h: 18.3,
    volume24h: 142000,
    txCount: 267,
    createdAt: Date.now() - 86400000 * 1.5,
    image: "💫",
    description: "Next-gen DeFi protocol",
    links: { website: "https://nova.pro", twitter: "https://twitter.com/nova", discord: "https://discord.gg/nova" },
  },
  {
    id: "14",
    name: "Pixel Swap",
    symbol: "PXLS",
    mc: 298000,
    category: "new-pairs",
    price: 0.022,
    priceChange24h: -2.5,
    volume24h: 81000,
    txCount: 143,
    createdAt: Date.now() - 86400000 * 2.5,
    image: "🎨",
    description: "NFT-integrated swap platform",
    links: { website: "https://pixel.swap", twitter: "https://twitter.com/pixelswap", discord: "https://discord.gg/pixel" },
  },
  {
    id: "15",
    name: "Thunder DeFi",
    symbol: "THND",
    mc: 520000,
    category: "new-pairs",
    price: 0.058,
    priceChange24h: 31.2,
    volume24h: 198000,
    txCount: 356,
    createdAt: Date.now() - 86400000 * 0.3,
    image: "⚡",
    description: "Lightning-fast DeFi transactions",
    links: { website: "https://thunder.defi", twitter: "https://twitter.com/thunderdefi", discord: "https://discord.gg/thunder" },
  },
  {
    id: "16",
    name: "Prism AI",
    symbol: "PRMA",
    mc: 410000,
    category: "new-pairs",
    price: 0.044,
    priceChange24h: 15.7,
    volume24h: 167000,
    txCount: 298,
    createdAt: Date.now() - 86400000 * 1.2,
    image: "🤖",
    description: "AI-powered trading intelligence",
    links: { website: "https://prism.ai", twitter: "https://twitter.com/prismai", discord: "https://discord.gg/prism" },
  },
  {
    id: "17",
    name: "Echo Finance",
    symbol: "ECHO",
    mc: 340000,
    category: "new-pairs",
    price: 0.029,
    priceChange24h: 6.8,
    volume24h: 95000,
    txCount: 171,
    createdAt: Date.now() - 86400000 * 2.8,
    image: "🔊",
    description: "Automated portfolio management",
    links: { website: "https://echo.finance", twitter: "https://twitter.com/echofinance", discord: "https://discord.gg/echo" },
  },
  {
    id: "18",
    name: "Stellar Protocol",
    symbol: "STLR",
    mc: 625000,
    category: "new-pairs",
    price: 0.071,
    priceChange24h: 27.4,
    volume24h: 267000,
    txCount: 489,
    createdAt: Date.now() - 86400000 * 0.7,
    image: "⭐",
    description: "Next generation stellar payments",
    links: { website: "https://stellar.pro", twitter: "https://twitter.com/stellar", discord: "https://discord.gg/stellar" },
  },
  {
    id: "19",
    name: "Nexus Chain",
    symbol: "NEXS",
    mc: 455000,
    category: "new-pairs",
    price: 0.039,
    priceChange24h: 9.4,
    volume24h: 134000,
    txCount: 213,
    createdAt: Date.now() - 86400000 * 1.8,
    image: "🔗",
    description: "Cross-chain liquidity protocol",
    links: { website: "https://nexus.chain", twitter: "https://twitter.com/nexus", discord: "https://discord.gg/nexus" },
  },
  {
    id: "20",
    name: "Vortex Finance",
    symbol: "VRTX",
    mc: 505000,
    category: "new-pairs",
    price: 0.053,
    priceChange24h: 22.1,
    volume24h: 187000,
    txCount: 334,
    createdAt: Date.now() - 86400000 * 1.1,
    image: "🌀",
    description: "High-yield liquidity vaults",
    links: { website: "https://vortex.finance", twitter: "https://twitter.com/vortex", discord: "https://discord.gg/vortex" },
  },

  // Final Stretch (12 tokens)
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
    links: { website: "https://stellar.rise", twitter: "https://twitter.com/stellar", discord: "https://discord.gg/stellar" },
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
    links: { website: "https://nebula.finance", twitter: "https://twitter.com/nebula", discord: "https://discord.gg/nebula" },
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
    links: { website: "https://velocity.pro", twitter: "https://twitter.com/velocity", discord: "https://discord.gg/velocity" },
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
    links: { website: "https://prism.yield", twitter: "https://twitter.com/prismy", discord: "https://discord.gg/prism" },
  },
  {
    id: "21",
    name: "Zenith Protocol",
    symbol: "ZNTH",
    mc: 1100000,
    category: "final-stretch",
    price: 0.132,
    priceChange24h: 28.9,
    volume24h: 389000,
    txCount: 567,
    createdAt: Date.now() - 86400000 * 8,
    image: "🏔️",
    description: "Ultimate DeFi experience",
    links: { website: "https://zenith.pro", twitter: "https://twitter.com/zenith", discord: "https://discord.gg/zenith" },
  },
  {
    id: "22",
    name: "Apex Trading",
    symbol: "APEX",
    mc: 1320000,
    category: "final-stretch",
    price: 0.178,
    priceChange24h: 38.6,
    volume24h: 512000,
    txCount: 745,
    createdAt: Date.now() - 86400000 * 9,
    image: "📈",
    description: "Advanced trading platform",
    links: { website: "https://apex.trading", twitter: "https://twitter.com/apex", discord: "https://discord.gg/apex" },
  },
  {
    id: "23",
    name: "Harmony Chain",
    symbol: "HARM",
    mc: 945000,
    category: "final-stretch",
    price: 0.104,
    priceChange24h: 25.3,
    volume24h: 334000,
    txCount: 501,
    createdAt: Date.now() - 86400000 * 7.5,
    image: "🎼",
    description: "Synchronized blockchain layer",
    links: { website: "https://harmony.chain", twitter: "https://twitter.com/harmony", discord: "https://discord.gg/harmony" },
  },
  {
    id: "24",
    name: "Solstice Token",
    symbol: "SLST",
    mc: 1055000,
    category: "final-stretch",
    price: 0.119,
    priceChange24h: 31.5,
    volume24h: 412000,
    txCount: 623,
    createdAt: Date.now() - 86400000 * 12,
    image: "☀️",
    description: "Solar energy blockchain",
    links: { website: "https://solstice.token", twitter: "https://twitter.com/solstice", discord: "https://discord.gg/solstice" },
  },
  {
    id: "25",
    name: "Cipher Network",
    symbol: "CPHR",
    mc: 1180000,
    category: "final-stretch",
    price: 0.147,
    priceChange24h: 36.2,
    volume24h: 478000,
    txCount: 701,
    createdAt: Date.now() - 86400000 * 11,
    image: "🔐",
    description: "Encrypted transaction network",
    links: { website: "https://cipher.network", twitter: "https://twitter.com/cipher", discord: "https://discord.gg/cipher" },
  },
  {
    id: "26",
    name: "Momentum DeFi",
    symbol: "MNTM",
    mc: 875000,
    category: "final-stretch",
    price: 0.098,
    priceChange24h: 21.7,
    volume24h: 301000,
    txCount: 445,
    createdAt: Date.now() - 86400000 * 6.8,
    image: "🚀",
    description: "Accelerated DeFi growth",
    links: { website: "https://momentum.defi", twitter: "https://twitter.com/momentum", discord: "https://discord.gg/momentum" },
  },

  // Migrated (12 tokens)
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
    links: { website: "https://eth.solo", twitter: "https://twitter.com/ethsolo", discord: "https://discord.gg/ethsolo" },
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
    links: { website: "https://bridge.protocol", twitter: "https://twitter.com/bridge", discord: "https://discord.gg/bridge" },
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
    links: { website: "https://sentinel.ai", twitter: "https://twitter.com/sentinel", discord: "https://discord.gg/sentinel" },
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
    links: { website: "https://cosmos.hub", twitter: "https://twitter.com/cosmos", discord: "https://discord.gg/cosmos" },
  },
  {
    id: "27",
    name: "Titan Protocol",
    symbol: "TNPT",
    mc: 3900000,
    category: "migrated",
    price: 0.556,
    priceChange24h: 81.3,
    volume24h: 1456000,
    txCount: 2876,
    createdAt: Date.now() - 86400000 * 75,
    image: "💪",
    description: "Robust consensus mechanism",
    links: { website: "https://titan.protocol", twitter: "https://twitter.com/titan", discord: "https://discord.gg/titan" },
  },
  {
    id: "28",
    name: "Phoenix Rising",
    symbol: "PHXR",
    mc: 3100000,
    category: "migrated",
    price: 0.441,
    priceChange24h: 62.5,
    volume24h: 1098000,
    txCount: 2134,
    createdAt: Date.now() - 86400000 * 55,
    image: "🔥",
    description: "Rebirth of decentralized finance",
    links: { website: "https://phoenix.rising", twitter: "https://twitter.com/phoenix", discord: "https://discord.gg/phoenix" },
  },
  {
    id: "29",
    name: "Helix Exchange",
    symbol: "HLXE",
    mc: 2950000,
    category: "migrated",
    price: 0.417,
    priceChange24h: 59.2,
    volume24h: 1023000,
    txCount: 1945,
    createdAt: Date.now() - 86400000 * 48,
    image: "🧬",
    description: "Spiral growth exchange",
    links: { website: "https://helix.exchange", twitter: "https://twitter.com/helix", discord: "https://discord.gg/helix" },
  },
  {
    id: "30",
    name: "Apex Vault",
    symbol: "APXV",
    mc: 3650000,
    category: "migrated",
    price: 0.519,
    priceChange24h: 71.8,
    volume24h: 1289000,
    txCount: 2478,
    createdAt: Date.now() - 86400000 * 65,
    image: "🏛️",
    description: "Maximum security vaults",
    links: { website: "https://apex.vault", twitter: "https://twitter.com/apexvault", discord: "https://discord.gg/apexvault" },
  },
  {
    id: "31",
    name: "Diamond Token",
    symbol: "DMND",
    mc: 4200000,
    category: "migrated",
    price: 0.648,
    priceChange24h: 94.2,
    volume24h: 1678000,
    txCount: 3345,
    createdAt: Date.now() - 86400000 * 70,
    image: "💎",
    description: "Premium token economics",
    links: { website: "https://diamond.token", twitter: "https://twitter.com/diamond", discord: "https://discord.gg/diamond" },
  },
  {
    id: "32",
    name: "Nexus Prime",
    symbol: "NXPR",
    mc: 3350000,
    category: "migrated",
    price: 0.477,
    priceChange24h: 68.4,
    volume24h: 1412000,
    txCount: 2687,
    createdAt: Date.now() - 86400000 * 52,
    image: "🌐",
    description: "Prime nexus of blockchain",
    links: { website: "https://nexus.prime", twitter: "https://twitter.com/nexusprime", discord: "https://discord.gg/nexusprime" },
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
 * Mock WebSocket for real-time price updates with enhanced color transitions
 */
export class MockWebSocket {
  private listeners: ((update: PriceUpdate) => void)[] = [];
  private intervals: NodeJS.Timeout[] = [];
  private priceHistories: Map<string, number[]> = new Map();

  constructor() {
    this.initializePriceHistories();
    this.startPriceUpdates();
  }

  private initializePriceHistories() {
    mockTokensData.forEach((token) => {
      this.priceHistories.set(token.id, [token.price!]);
    });
  }

  private startPriceUpdates() {
    // Fast updates every 500ms for smooth transitions
    const fastInterval = setInterval(() => {
      mockTokensData.forEach((token) => {
        // 35% chance of small update (smoother transitions)
        if (Math.random() > 0.65) {
          const changePercent = (Math.random() - 0.5) * 2; // -1% to +1% for smooth updates
          const newPrice = token.price! * (1 + changePercent / 100);
          
          const priceUpdate: PriceUpdate = {
            tokenId: token.id,
            price: parseFloat(newPrice.toFixed(8)),
            change: changePercent,
            timestamp: Date.now(),
          };

          // Update the mock data
          const tokenIndex = mockTokensData.findIndex((t) => t.id === token.id);
          if (tokenIndex >= 0) {
            mockTokensData[tokenIndex].price = newPrice;
            mockTokensData[tokenIndex].priceChange24h! += changePercent;
          }

          // Track price history for analytics
          const history = this.priceHistories.get(token.id) || [];
          history.push(newPrice);
          if (history.length > 50) history.shift();
          this.priceHistories.set(token.id, history);

          this.notifyListeners(priceUpdate);
        }
      });
    }, 500); // Update every 500ms for smooth animations

    // Periodic larger movements every 5 seconds
    const largeInterval = setInterval(() => {
      mockTokensData.forEach((token) => {
        // 15% chance of larger, more noticeable update
        if (Math.random() > 0.85) {
          const changePercent = (Math.random() - 0.5) * 8; // -4% to +4% for visible changes
          const newPrice = token.price! * (1 + changePercent / 100);
          
          const priceUpdate: PriceUpdate = {
            tokenId: token.id,
            price: parseFloat(newPrice.toFixed(8)),
            change: changePercent,
            timestamp: Date.now(),
          };

          const tokenIndex = mockTokensData.findIndex((t) => t.id === token.id);
          if (tokenIndex >= 0) {
            mockTokensData[tokenIndex].price = newPrice;
            mockTokensData[tokenIndex].priceChange24h! += changePercent;
          }

          const history = this.priceHistories.get(token.id) || [];
          history.push(newPrice);
          if (history.length > 50) history.shift();
          this.priceHistories.set(token.id, history);

          this.notifyListeners(priceUpdate);
        }
      });
    }, 5000); // Larger updates every 5 seconds

    this.intervals.push(fastInterval, largeInterval);
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

  getPriceHistory(tokenId: string): number[] {
    return this.priceHistories.get(tokenId) || [];
  }

  close() {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals = [];
    this.listeners = [];
    this.priceHistories.clear();
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

