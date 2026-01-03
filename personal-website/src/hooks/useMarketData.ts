import { useState, useEffect } from "react";

export interface MarketData {
  symbol: string;
  name: string;
  annualReturn1Y: number;
  annualReturn3Y: number;
  annualReturn5Y: number;
  annualReturn10Y: number;
  currentPrice: number;
  currency: string;
  lastUpdated: string;
}

export interface SearchResult {
  symbol: string;
  name: string;
  type: string;
  exchange: string;
}

export function useMarketData(symbol: string) {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/market-data?symbol=${encodeURIComponent(symbol)}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch market data");
        }

        const marketData = await response.json();
        setData(marketData);
      } catch (err: any) {
        setError(err.message || "An error occurred");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return { data, loading, error };
}

export async function searchAssets(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch("/api/market-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to search assets");
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching assets:", error);
    return [];
  }
}

