# Stock Analytics App

A comprehensive stock analytics application built with Next.js 15, TypeScript, and Tailwind CSS. Get real-time stock data, advanced technical analysis, and the latest news for any publicly traded company.

## 🚀 Features

### **Real-Time Stock Data**
- Live stock quotes from Yahoo Finance
- Current price, daily changes, volume, and market cap
- Support for international stocks (US, Indian, European markets)
- Multi-currency support (USD, INR, EUR, etc.)

### **Advanced Technical Analysis**
- **RSI (14-period)**: Relative Strength Index with visual indicators
- **Bollinger Bands (20-period)**: Price volatility and support/resistance levels
- **Moving Averages**: EMA20, EMA90, SMA20, SMA90 with crossover analysis
- **AI-Powered Trend Detection**: Bull/Bear market signals based on technical indicators

### **Intelligent Market Analysis**
- **BULL_RUN**: When RSI > 60 AND price > Bollinger Band middle AND 20 EMA > 90 EMA
- **BEAR_MARKET**: When RSI < 40 AND price < Bollinger Band middle AND 20 EMA < 90 EMA
- **NEUTRAL/SIDEWAYS**: For mixed market signals
- **Strength Indicators**: STRONG, MODERATE, WEAK signal classification

### **Real-Time News Integration**
- Latest news from multiple sources (MT Newswires, Barrons, Barchart, etc.)
- Stock-specific news filtering
- Clickable links to full articles
- Publication dates and source attribution

### **Modern UI/UX**
- Clean, responsive design with Tailwind CSS
- Tabbed interface for Technical Analysis and News
- Visual progress bars and color-coded indicators
- Mobile-friendly responsive layout
- Dark/Light theme support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Data Source**: Yahoo Finance (via yahoo-finance2)
- **Technical Analysis**: technicalindicators library
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stock-analytics-app.git
   cd stock-analytics-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

### **Search for Stocks**
- Enter any stock symbol (e.g., AAPL, GOOGL, TSLA)
- Support for international stocks (e.g., ICICIBANK.NS for Indian stocks)
- Click on popular stock buttons for quick access

### **View Technical Analysis**
- **RSI Analysis**: See momentum indicators with color-coded strength levels
- **Bollinger Bands**: Visualize price volatility and trading ranges
- **Moving Averages**: Analyze trend direction with EMA and SMA crossovers
- **Trend Signals**: Get AI-powered bull/bear market predictions

### **Read Latest News**
- Switch to the "Latest News" tab
- Browse recent articles from reputable financial sources
- Click "Read more" to view full articles

## 📊 Supported Stock Symbols

### **US Stocks**
- AAPL (Apple Inc.)
- GOOGL (Alphabet Inc.)
- MSFT (Microsoft Corporation)
- TSLA (Tesla Inc.)
- AMZN (Amazon.com Inc.)
- NVDA (NVIDIA Corporation)

### **International Stocks**
- ICICIBANK.NS (ICICI Bank - India)
- RELIANCE.NS (Reliance Industries - India)
- TSLA.TO (Tesla - Toronto)
- And many more...

## 🔧 API Endpoints

### **Get Stock Data**
```
GET /api/stock/[symbol]
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "quote": {
      "symbol": "AAPL",
      "regularMarketPrice": 227.18,
      "regularMarketChange": -1.91,
      "regularMarketChangePercent": -0.83,
      "currency": "USD"
    },
    "technicalAnalysis": {
      "rsi": 69.81,
      "bollingerBands": {
        "upper": 225.96,
        "middle": 212.48,
        "lower": 198.99
      },
      "trendAnalysis": {
        "signal": "BULL_RUN",
        "strength": "MODERATE"
      }
    },
    "news": [...]
  }
}
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/stock/[symbol]/route.ts    # Stock data API endpoint
│   ├── stock/[symbol]/page.tsx        # Stock detail page
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Home page
├── components/
│   ├── StockSearch.tsx                # Search component
│   ├── StockNews.tsx                  # News display component
│   └── TechnicalAnalysis.tsx          # Technical analysis component
└── lib/
    └── stock.ts                       # Stock data utilities
```

## 🎯 Key Features Explained

### **Technical Analysis Logic**
The app implements sophisticated technical analysis:

1. **RSI Calculation**: 14-period Relative Strength Index
2. **Bollinger Bands**: 20-period with 2 standard deviations
3. **Moving Averages**: Both exponential (EMA) and simple (SMA)
4. **Trend Detection**: Multi-factor analysis for market direction

### **Bull/Bear Detection Algorithm**
```typescript
// Bull Run Conditions
const isBullish = rsi > 60 && 
                  currentPrice > bollingerBands.middle && 
                  ema20 > ema90;

// Bear Market Conditions  
const isBearish = rsi < 40 && 
                  currentPrice < bollingerBands.middle && 
                  ema20 < ema90;
```

## 🌟 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Yahoo Finance** for providing stock data
- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for styling framework
- **Next.js** for the React framework
- **technicalindicators** for technical analysis calculations

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
