"use client";

import { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useMarketData, searchAssets, SearchResult } from "@/hooks/useMarketData";

const POPULAR_ASSETS = [
  { symbol: "^GSPC", name: "S&P 500", category: "Index" },
  { symbol: "^IXIC", name: "NASDAQ 100", category: "Index" },
  { symbol: "^DJI", name: "Dow Jones", category: "Index" },
  { symbol: "BTC-USD", name: "Bitcoin", category: "Crypto" },
  { symbol: "ETH-USD", name: "Ethereum", category: "Crypto" },
  { symbol: "VOO", name: "Vanguard S&P 500 ETF", category: "ETF" },
  { symbol: "QQQ", name: "Invesco QQQ Trust", category: "ETF" },
  { symbol: "AAPL", name: "Apple Inc.", category: "Stock" },
  { symbol: "MSFT", name: "Microsoft", category: "Stock" },
  { symbol: "GOOGL", name: "Google", category: "Stock" },
  { symbol: "TSLA", name: "Tesla", category: "Stock" },
  { symbol: "NVDA", name: "NVIDIA", category: "Stock" },
];

interface CalculationResult {
  totalInvested: number;
  finalValue: number;
  totalReturn: number;
  returnPercentage: number;
  chartData: Array<{
    period: string;
    invested: number;
    value: number;
    gain: number;
  }>;
}

export function DCACalculator() {
  const [investmentAmount, setInvestmentAmount] = useState<string>("500");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("monthly");
  const [duration, setDuration] = useState<string>("10");
  const [selectedAsset, setSelectedAsset] = useState<string>("^GSPC");
  const [useHistoricalReturn, setUseHistoricalReturn] = useState<"1Y" | "3Y" | "5Y" | "10Y">("10Y");
  const [customReturn, setCustomReturn] = useState<string>("10");
  const [useCustomReturn, setUseCustomReturn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch market data for selected asset
  const { data: marketData, loading: marketLoading, error: marketError } = useMarketData(selectedAsset);

  // Get the appropriate return rate
  const annualReturn = useMemo(() => {
    if (useCustomReturn) {
      return parseFloat(customReturn) || 10;
    }

    if (!marketData) return 10; // Default fallback

    switch (useHistoricalReturn) {
      case "1Y":
        return marketData.annualReturn1Y;
      case "3Y":
        return marketData.annualReturn3Y;
      case "5Y":
        return marketData.annualReturn5Y;
      case "10Y":
        return marketData.annualReturn10Y;
      default:
        return 10;
    }
  }, [marketData, useHistoricalReturn, useCustomReturn, customReturn]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const delaySearch = setTimeout(async () => {
      setSearchLoading(true);
      const results = await searchAssets(searchQuery);
      setSearchResults(results);
      setSearchLoading(false);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const calculation = useMemo((): CalculationResult => {
    const amount = parseFloat(investmentAmount) || 0;
    const years = parseFloat(duration) || 0;
    const returnRate = annualReturn / 100;

    let periodsPerYear: number;
    
    switch (frequency) {
      case "daily":
        periodsPerYear = 252; // Trading days
        break;
      case "weekly":
        periodsPerYear = 52;
        break;
      case "monthly":
        periodsPerYear = 12;
        break;
    }

    const totalPeriods = Math.floor(years * periodsPerYear);
    const ratePerPeriod = returnRate / periodsPerYear;

    let totalInvested = 0;
    let currentValue = 0;
    const chartData: CalculationResult["chartData"] = [];

    for (let period = 1; period <= totalPeriods; period++) {
      totalInvested += amount;
      currentValue = (currentValue + amount) * (1 + ratePerPeriod);

      const sampleRate = Math.max(1, Math.floor(totalPeriods / 50));
      if (period % sampleRate === 0 || period === totalPeriods) {
        const yearLabel = (period / periodsPerYear).toFixed(1);
        chartData.push({
          period: `${yearLabel}y`,
          invested: Math.round(totalInvested),
          value: Math.round(currentValue),
          gain: Math.round(currentValue - totalInvested),
        });
      }
    }

    const finalValue = currentValue;
    const totalReturn = finalValue - totalInvested;
    const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

    return {
      totalInvested,
      finalValue,
      totalReturn,
      returnPercentage,
      chartData,
    };
  }, [investmentAmount, frequency, duration, annualReturn]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const selectedAssetInfo = POPULAR_ASSETS.find(a => a.symbol === selectedAsset);

  return (
    <div className="space-y-8">
      {/* Asset Selection */}
      <div className="card p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight mb-6">
          Select Investment Asset
        </h2>

        {/* Popular Assets Grid - Mobile Optimized */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4">
          {POPULAR_ASSETS.map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => {
                setSelectedAsset(asset.symbol);
                setShowSearch(false);
              }}
              className={`text-left p-4 min-h-[60px] rounded-lg border transition-all active:scale-98 ${
                selectedAsset === asset.symbol
                  ? "border-[var(--accent)] bg-blue-50 ring-2 ring-[var(--accent)]/20"
                  : "border-black/10 hover:border-[var(--accent)]/50 hover:bg-gray-50 active:bg-gray-100"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm sm:text-base truncate">{asset.name}</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">{asset.symbol}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-white/80 border border-black/10 shrink-0">
                  {asset.category}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Search Toggle - Mobile Optimized */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="text-sm sm:text-base text-[var(--accent)] hover:underline py-2 active:opacity-70"
        >
          {showSearch ? "Hide" : "Search for"} other stocks or assets
        </button>

        {/* Search Interface - Mobile Optimized */}
        {showSearch && (
          <div className="mt-4 rounded-lg border border-black/10 bg-[var(--card-2)] p-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stocks, ETFs, crypto..."
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            
            {searchLoading && (
              <div className="mt-3 text-sm text-[var(--muted)]">Searching...</div>
            )}

            {searchResults.length > 0 && (
              <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.symbol}
                    onClick={() => {
                      setSelectedAsset(result.symbol);
                      setShowSearch(false);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                    className="w-full text-left p-4 min-h-[60px] rounded-lg border border-black/10 hover:border-[var(--accent)] hover:bg-white active:bg-gray-50 transition-all"
                  >
                    <div className="font-medium text-sm sm:text-base">{result.name}</div>
                    <div className="text-xs text-[var(--muted)] mt-1">
                      {result.symbol} · {result.type} · {result.exchange}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Market Data Display */}
        {marketLoading && (
          <div className="mt-4 rounded-lg border border-black/10 bg-blue-50 p-4">
            <div className="text-sm text-blue-700">Loading market data...</div>
          </div>
        )}

        {marketError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="text-sm text-red-700">⚠️ {marketError}</div>
            <div className="text-xs text-red-600 mt-1">Using default 10% return rate</div>
          </div>
        )}

        {marketData && !marketLoading && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="font-semibold text-sm">{marketData.name}</div>
                <div className="text-xs text-[var(--muted)] mt-0.5">
                  Current: {formatCurrency(marketData.currentPrice)} {marketData.currency}
                </div>
              </div>
              <div className="text-xs text-[var(--muted)]">
                Updated: {new Date(marketData.lastUpdated).toLocaleDateString()}
              </div>
            </div>

            <div className="text-xs font-semibold text-[var(--muted)] mb-2">
              Historical Annual Returns:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {marketData.annualReturn1Y !== 0 && (
                <div className="text-center p-3 rounded bg-white/60 border border-black/10">
                  <div className="text-xs text-[var(--muted)]">1 Year</div>
                  <div className={`font-semibold text-base sm:text-sm ${marketData.annualReturn1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(marketData.annualReturn1Y)}
                  </div>
                </div>
              )}
              {marketData.annualReturn3Y !== 0 && (
                <div className="text-center p-3 rounded bg-white/60 border border-black/10">
                  <div className="text-xs text-[var(--muted)]">3 Years</div>
                  <div className={`font-semibold text-base sm:text-sm ${marketData.annualReturn3Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(marketData.annualReturn3Y)}
                  </div>
                </div>
              )}
              {marketData.annualReturn5Y !== 0 && (
                <div className="text-center p-3 rounded bg-white/60 border border-black/10">
                  <div className="text-xs text-[var(--muted)]">5 Years</div>
                  <div className={`font-semibold text-base sm:text-sm ${marketData.annualReturn5Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(marketData.annualReturn5Y)}
                  </div>
                </div>
              )}
              {marketData.annualReturn10Y !== 0 && (
                <div className="text-center p-3 rounded bg-white/60 border border-black/10">
                  <div className="text-xs text-[var(--muted)]">10 Years</div>
                  <div className={`font-semibold text-base sm:text-sm ${marketData.annualReturn10Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(marketData.annualReturn10Y)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Investment Parameters */}
      <div className="card p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight mb-6">
          Investment Parameters
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">
              Investment Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 pl-8 text-base sm:text-base focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                placeholder="500"
                min="0"
                step="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Investment Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Investment Duration (Years)
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              placeholder="10"
              min="0.1"
              step="0.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Return Rate to Use
            </label>
            {!useCustomReturn && marketData ? (
              <select
                value={useHistoricalReturn}
                onChange={(e) => setUseHistoricalReturn(e.target.value as any)}
                className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              >
                {marketData.annualReturn1Y !== 0 && (
                  <option value="1Y">1-Year Historical ({formatPercentage(marketData.annualReturn1Y)})</option>
                )}
                {marketData.annualReturn3Y !== 0 && (
                  <option value="3Y">3-Year Historical ({formatPercentage(marketData.annualReturn3Y)})</option>
                )}
                {marketData.annualReturn5Y !== 0 && (
                  <option value="5Y">5-Year Historical ({formatPercentage(marketData.annualReturn5Y)})</option>
                )}
                {marketData.annualReturn10Y !== 0 && (
                  <option value="10Y">10-Year Historical ({formatPercentage(marketData.annualReturn10Y)})</option>
                )}
              </select>
            ) : (
              <input
                type="number"
                inputMode="decimal"
                value={customReturn}
                onChange={(e) => setCustomReturn(e.target.value)}
                className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-base focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                placeholder="10"
                min="-50"
                max="100"
                step="0.5"
              />
            )}
            <div className="mt-2">
              <label className="flex items-center gap-2 text-sm text-[var(--muted)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCustomReturn}
                  onChange={(e) => setUseCustomReturn(e.target.checked)}
                  className="rounded"
                />
                Use custom return rate
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            <strong>Using:</strong> {formatPercentage(annualReturn)} annual return
            {!useCustomReturn && marketData && ` (${useHistoricalReturn} historical data from ${marketData.name})`}
          </p>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
            Total Invested
          </div>
          <div className="text-2xl font-bold font-mono">
            {formatCurrency(calculation.totalInvested)}
          </div>
        </div>

        <div className="card p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
            Final Value
          </div>
          <div className="text-2xl font-bold font-mono text-green-600">
            {formatCurrency(calculation.finalValue)}
          </div>
        </div>

        <div className="card p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
            Total Return
          </div>
          <div className={`text-2xl font-bold font-mono ${calculation.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(calculation.totalReturn)}
          </div>
        </div>

        <div className="card p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
            Return %
          </div>
          <div className={`text-2xl font-bold font-mono ${calculation.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercentage(calculation.returnPercentage)}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="card p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight mb-6">
          Investment Growth Over Time
        </h2>

        <div className="h-[300px] sm:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={calculation.chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="period"
                stroke="#6b7280"
                style={{ fontSize: "10px" }}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: "10px" }}
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "12px",
                }}
                formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="invested"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorInvested)"
                name="Total Invested"
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                name="Portfolio Value"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Educational Section */}
      <div className="card p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          About This Calculator
        </h2>
        <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)]">
          <p>
            <strong className="text-[var(--foreground)]">Real Market Data:</strong> This calculator uses actual historical returns from Yahoo Finance. The data is updated regularly to provide accurate projections based on real market performance.
          </p>
          <p>
            <strong className="text-[var(--foreground)]">Multiple Assets:</strong> Choose from popular indices (S&P 500, NASDAQ), cryptocurrencies (Bitcoin, Ethereum), individual stocks, or search for any publicly traded asset.
          </p>
          <p className="text-xs italic">
            ⚠️ Disclaimer: Past performance does not guarantee future results. This calculator is for educational purposes only. Always consult with a financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
