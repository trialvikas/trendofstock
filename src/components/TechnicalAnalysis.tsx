import { TechnicalAnalysis as TechnicalAnalysisType } from '@/lib/stock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TechnicalAnalysisProps {
  technicalAnalysis: TechnicalAnalysisType;
  currentPrice: number;
  currency: string;
}

export default function TechnicalAnalysis({ technicalAnalysis, currentPrice, currency }: TechnicalAnalysisProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getRSIColor = (rsi: number) => {
    if (rsi >= 70) return 'text-red-600'; // Overbought
    if (rsi >= 60) return 'text-orange-600'; // Strong
    if (rsi >= 40) return 'text-green-600'; // Normal
    if (rsi >= 30) return 'text-orange-600'; // Weak
    return 'text-red-600'; // Oversold
  };

  const getRSILabel = (rsi: number) => {
    if (rsi >= 70) return 'Overbought';
    if (rsi >= 60) return 'Strong';
    if (rsi >= 40) return 'Normal';
    if (rsi >= 30) return 'Weak';
    return 'Oversold';
  };

  const getTrendColor = (signal: string) => {
    switch (signal) {
      case 'BULL_RUN': return 'bg-green-500';
      case 'BEAR_MARKET': return 'bg-red-500';
      case 'SIDEWAYS': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendTextColor = (signal: string) => {
    switch (signal) {
      case 'BULL_RUN': return 'text-green-600';
      case 'BEAR_MARKET': return 'text-red-600';
      case 'SIDEWAYS': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'STRONG': return 'bg-blue-500';
      case 'MODERATE': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Trend Analysis - Main Signal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            Trend Analysis
            <Badge className={getTrendColor(technicalAnalysis.trendAnalysis.signal)}>
              {technicalAnalysis.trendAnalysis.signal.replace('_', ' ')}
            </Badge>
            <Badge className={getStrengthColor(technicalAnalysis.trendAnalysis.strength)}>
              {technicalAnalysis.trendAnalysis.strength}
            </Badge>
          </CardTitle>
          <CardDescription>
            AI-powered trend analysis based on RSI, Bollinger Bands, and moving averages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className={`text-lg font-medium ${getTrendTextColor(technicalAnalysis.trendAnalysis.signal)}`}>
            {technicalAnalysis.trendAnalysis.description}
          </p>
        </CardContent>
      </Card>

      {/* Technical Indicators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RSI Card */}
        <Card>
          <CardHeader>
            <CardTitle>RSI (14-period)</CardTitle>
            <CardDescription>Relative Strength Index - Momentum oscillator</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{technicalAnalysis.rsi.toFixed(2)}</span>
              <Badge variant="outline" className={getRSIColor(technicalAnalysis.rsi)}>
                {getRSILabel(technicalAnalysis.rsi)}
              </Badge>
            </div>
            <Progress value={technicalAnalysis.rsi} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Oversold (30)</span>
              <span>Neutral (50)</span>
              <span>Overbought (70)</span>
            </div>
          </CardContent>
        </Card>

        {/* Bollinger Bands Card */}
        <Card>
          <CardHeader>
            <CardTitle>Bollinger Bands (20-period)</CardTitle>
            <CardDescription>Price volatility and support/resistance levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Upper Band</p>
                <p className="font-semibold">{formatCurrency(technicalAnalysis.bollingerBands.upper)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Middle Band</p>
                <p className="font-semibold">{formatCurrency(technicalAnalysis.bollingerBands.middle)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lower Band</p>
                <p className="font-semibold">{formatCurrency(technicalAnalysis.bollingerBands.lower)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="font-semibold">{formatCurrency(currentPrice)}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative h-2 bg-gray-200 rounded">
                <div 
                  className="absolute h-full bg-blue-500 rounded"
                  style={{
                    left: '0%',
                    width: '100%'
                  }}
                />
                <div 
                  className="absolute w-2 h-2 bg-red-500 rounded-full transform -translate-x-1"
                  style={{
                    left: `${Math.max(0, Math.min(100, 
                      ((currentPrice - technicalAnalysis.bollingerBands.lower) / 
                      (technicalAnalysis.bollingerBands.upper - technicalAnalysis.bollingerBands.lower)) * 100
                    ))}%`,
                    top: '0px'
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Lower</span>
                <span>Current Price</span>
                <span>Upper</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Moving Averages */}
      <Card>
        <CardHeader>
          <CardTitle>Moving Averages</CardTitle>
          <CardDescription>Exponential and Simple Moving Averages for trend direction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">EMA 20</p>
              <p className="text-lg font-semibold">{formatCurrency(technicalAnalysis.ema20)}</p>
              <Badge variant={technicalAnalysis.ema20 > technicalAnalysis.ema90 ? "default" : "destructive"} className="text-xs">
                {technicalAnalysis.ema20 > technicalAnalysis.ema90 ? 'Bullish' : 'Bearish'}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">EMA 90</p>
              <p className="text-lg font-semibold">{formatCurrency(technicalAnalysis.ema90)}</p>
              <p className="text-xs text-muted-foreground">Long-term trend</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">SMA 20</p>
              <p className="text-lg font-semibold">{formatCurrency(technicalAnalysis.sma20)}</p>
              <p className="text-xs text-muted-foreground">Simple average</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">SMA 90</p>
              <p className="text-lg font-semibold">{formatCurrency(technicalAnalysis.sma90)}</p>
              <p className="text-xs text-muted-foreground">Long-term simple</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Moving Average Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>EMA Crossover:</span>
                <span className={technicalAnalysis.ema20 > technicalAnalysis.ema90 ? 'text-green-600' : 'text-red-600'}>
                  {technicalAnalysis.ema20 > technicalAnalysis.ema90 ? 'Golden Cross (Bullish)' : 'Death Cross (Bearish)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Price vs EMA20:</span>
                <span className={currentPrice > technicalAnalysis.ema20 ? 'text-green-600' : 'text-red-600'}>
                  {currentPrice > technicalAnalysis.ema20 ? 'Above (Bullish)' : 'Below (Bearish)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>EMA Spread:</span>
                <span>
                  {(((technicalAnalysis.ema20 - technicalAnalysis.ema90) / technicalAnalysis.ema90) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
