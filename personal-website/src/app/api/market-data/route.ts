import { NextRequest, NextResponse } from "next/server";
import YahooFinanceClass from "yahoo-finance2";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Initialize Yahoo Finance instance (required for v3+)
const yahooFinance = new YahooFinanceClass({ 
  suppressNotices: ['yahooSurvey'] 
});

// Popular assets with their Yahoo Finance symbols
export const POPULAR_ASSETS = [
  { symbol: "^GSPC", name: "S&P 500", category: "Index" },
  { symbol: "^IXIC", name: "NASDAQ 100", category: "Index" },
  { symbol: "^DJI", name: "Dow Jones", category: "Index" },
  { symbol: "BTC-USD", name: "Bitcoin", category: "Crypto" },
  { symbol: "ETH-USD", name: "Ethereum", category: "Crypto" },
  { symbol: "AAPL", name: "Apple Inc.", category: "Stock" },
  { symbol: "MSFT", name: "Microsoft", category: "Stock" },
  { symbol: "GOOGL", name: "Google", category: "Stock" },
  { symbol: "AMZN", name: "Amazon", category: "Stock" },
  { symbol: "TSLA", name: "Tesla", category: "Stock" },
  { symbol: "NVDA", name: "NVIDIA", category: "Stock" },
  { symbol: "VOO", name: "Vanguard S&P 500 ETF", category: "ETF" },
  { symbol: "QQQ", name: "Invesco QQQ Trust", category: "ETF" },
  { symbol: "VTI", name: "Vanguard Total Stock Market ETF", category: "ETF" },
];

interface HistoricalReturn {
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get("symbol") || "^GSPC";

    console.log(`Fetching data for symbol: ${symbol}`);

    // Fetch historical data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 11); // Get 11 years of data

    console.log(`Date range: ${startDate.toISOString()} to ${endDate.toISOString()}`);

    const queryOptions = {
      period1: startDate.toISOString().split('T')[0], // YYYY-MM-DD format
      period2: endDate.toISOString().split('T')[0],
      interval: "1mo" as const,
    };

    console.log('Query options:', queryOptions);

    // Use chart method instead of historical
    const chartData = await yahooFinance.chart(symbol, queryOptions);
    const historicalData = chartData.quotes;

    console.log(`Received ${historicalData?.length || 0} historical data points`);

    if (!historicalData || historicalData.length === 0) {
      return NextResponse.json(
        { error: "No data found for this symbol" },
        { status: 404 }
      );
    }

    // Get current quote for additional info using quoteSummary
    const quoteData = await yahooFinance.quoteSummary(symbol, { modules: ['price'] });
    const quote = quoteData.price;
    console.log(`Quote fetched for ${symbol}:`, quote.shortName || quote.longName);

    // Calculate annualized returns for different periods
    const calculateAnnualReturn = (years: number): number | null => {
      const periodsNeeded = years * 12; // Monthly data
      if (historicalData.length < periodsNeeded) return null;

      const recentPrice = historicalData[historicalData.length - 1].close;
      const oldPrice = historicalData[historicalData.length - periodsNeeded].close;

      if (!recentPrice || !oldPrice) return null;

      // Calculate annualized return: ((ending/beginning)^(1/years) - 1) * 100
      const totalReturn = recentPrice / oldPrice;
      const annualReturn = (Math.pow(totalReturn, 1 / years) - 1) * 100;

      return annualReturn;
    };

    const response: HistoricalReturn = {
      symbol: symbol,
      name: quote.longName || quote.shortName || symbol,
      annualReturn1Y: calculateAnnualReturn(1) || 0,
      annualReturn3Y: calculateAnnualReturn(3) || 0,
      annualReturn5Y: calculateAnnualReturn(5) || 0,
      annualReturn10Y: calculateAnnualReturn(10) || 0,
      currentPrice: quote.regularMarketPrice || 0,
      currency: quote.currency || "USD",
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error fetching market data:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data", details: error.message },
      { status: 500 }
    );
  }
}

// Search endpoint for finding stocks/assets
export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || query.length < 1) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    // Search for symbols
    const searchResults = await yahooFinance.search(query, {
      quotesCount: 10,
      newsCount: 0,
    });

    const results = searchResults.quotes.map((quote) => ({
      symbol: quote.symbol,
      name: quote.longname || quote.shortname || quote.symbol,
      type: quote.quoteType,
      exchange: quote.exchange,
    }));

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error("Error searching assets:", error);
    return NextResponse.json(
      { error: "Failed to search assets", details: error.message },
      { status: 500 }
    );
  }
}

