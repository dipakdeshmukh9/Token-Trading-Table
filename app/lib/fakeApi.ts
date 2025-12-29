import { Token } from "./types";

export async function fetchTokens(): Promise<Token[]> {
  await new Promise((r) => setTimeout(r, 800));

  return [
    {
      id: "1",
      name: "Test Token",
      symbol: "TEST",
      mc: 3400 + Math.floor(Math.random() * 200 - 100),
    },
    {
      id: "2",
      name: "Demo Coin",
      symbol: "DEMO",
      mc: 2200 + Math.floor(Math.random() * 200 - 100),
    },
    {
      id: "3",
      name: "Sample AI",
      symbol: "SAI",
      mc: 5100 + Math.floor(Math.random() * 200 - 100),
    },
  ];
}
