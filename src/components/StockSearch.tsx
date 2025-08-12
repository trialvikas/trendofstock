'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function StockSearch() {
  const [symbol, setSymbol] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symbol.trim()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const cleanSymbol = symbol.trim().toUpperCase();
      router.push(`/stock/${cleanSymbol}`);
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9.-]/g, '');
    setSymbol(value);
  };

  const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA'];

  const handlePopularStock = (stockSymbol: string) => {
    setSymbol(stockSymbol);
    router.push(`/stock/${stockSymbol}`);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Stock Analytics</CardTitle>
        <CardDescription className="text-lg">
          Search for any stock symbol to get real-time data and analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter stock symbol (e.g., AAPL, ICICIBANK.NS)"
            value={symbol}
            onChange={handleInputChange}
            className="flex-1 text-lg"
            maxLength={20}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={!symbol.trim() || isLoading}
            className="px-8"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            Popular Stocks
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularStocks.map((stock) => (
              <Button
                key={stock}
                variant="outline"
                size="sm"
                onClick={() => handlePopularStock(stock)}
                className="text-sm"
              >
                {stock}
              </Button>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          <p>Enter a valid stock symbol (e.g., AAPL for US stocks, ICICIBANK.NS for Indian stocks) to view detailed analytics and recent news.</p>
        </div>
      </CardContent>
    </Card>
  );
}
