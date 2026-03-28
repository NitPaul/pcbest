# PCBest - Best PC Component Prices in Bangladesh

<div align="center">

**Find the best PC component prices across 10+ shops in Bangladesh**

[Live Demo](https://pcbest.vercel.app) | [Report Bug](https://github.com/NitPaul/pcbest/issues) | [Request Feature](https://github.com/NitPaul/pcbest/issues)

</div>

---

## The Problem

Building a PC in Bangladesh means checking **10+ different shop websites** manually to find the best price. Prices vary significantly across shops, and there's no single platform to compare them all. This wastes hours and often leads to overpaying.

## The Solution

**PCBest** automatically scrapes prices from all major PC component shops in Bangladesh and presents them in one clean, searchable interface. Compare prices instantly, build PCs with real-time pricing, and never overpay again.

## Features

| Feature | Description |
|---------|-------------|
| **Price Comparison** | Compare prices across 10+ shops side-by-side |
| **Smart PC Builder** | Select components, check compatibility, see total cost |
| **Price History** | Track price trends over time with interactive charts |
| **AI Assistant** | Get personalized build recommendations via chatbot |
| **Deal Finder** | Automatically highlights biggest price drops |
| **Product Compare** | Side-by-side specs comparison for up to 4 products |
| **Download Builds** | Export your PC build as a detailed text file |
| **Share Builds** | Share your build via unique URL |
| **Dark Mode** | Full dark/light theme support |
| **PWA Support** | Install as a native app on mobile |
| **SEO Optimized** | Full meta tags, JSON-LD, sitemap, robots.txt |
| **Responsive** | Works perfectly on mobile, tablet, and desktop |

## Shops Tracked

| Shop | Website | Status |
|------|---------|--------|
| Star Tech | startech.com.bd | Active |
| Ryans Computers | ryans.com | Active |
| TechLand BD | techlandbd.com | Active |
| Binary Logic | binarylogic.com.bd | Active |
| Ultra Technology | ultratech.com.bd | Active |
| Skyland | skyland.com.bd | Active |
| Nexus | nexus.com.bd | Active |
| PC House BD | pchouse.com.bd | Active |
| Potaka IT | potakait.com | Active |
| Computer Importer | computerimporter.com | Active |

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router, SSR/SSG |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Supabase** | PostgreSQL database (free tier) |
| **Cheerio + Axios** | Web scraping engine |
| **Recharts** | Price history data visualization |
| **Lucide React** | Modern icon library |
| **GitHub Actions** | Automated daily price scraping |
| **Google Gemini** | AI chatbot integration (free tier) |
| **Vercel** | Hosting & deployment (free tier) |

## Architecture

```
                    ┌──────────────────────────┐
                    │   GitHub Actions (Daily)  │
                    │   Scrapes 10+ shop sites  │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   Supabase PostgreSQL     │
                    │   Products, Prices,       │
                    │   Price History, Builds   │
                    └────────────┬─────────────┘
                                 │
                    ┌────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
          ┌──────────────────┐      ┌──────────────────┐
          │   Next.js App     │      │   Gemini AI API  │
          │   SSR/SSG Pages   │◄────►│   Chatbot &      │
          │   API Routes      │      │   Recommendations│
          └────────┬─────────┘      └──────────────────┘
                   │
                   ▼
          ┌──────────────────┐
          │   Vercel (CDN)    │
          │   Free Hosting    │
          └──────────────────┘
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NitPaul/pcbest.git
   cd pcbest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional, for database features)
   ```bash
   cp .env.example .env.local
   ```
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

### Setting Up Supabase (Optional)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the schema from `supabase/schema.sql` in the SQL Editor
4. Copy the project URL and anon key to your `.env.local`

### Running the Scraper

```bash
# Install scraper dependencies
cd scraper && npm install axios cheerio

# Run the scraper
node scraper/scraper.js
```

The scraper also runs automatically via GitHub Actions daily at 6 AM BDT.

## Project Structure

```
├── .github/workflows/     # GitHub Actions for automated scraping
├── public/                 # Static assets, PWA manifest
├── scraper/                # Web scraping scripts
│   └── scraper.js          # Main scraper (Cheerio + Axios)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── products/       # Product listing & detail pages
│   │   ├── build/          # PC Builder tool
│   │   ├── compare/        # Product comparison
│   │   ├── deals/          # Best deals page
│   │   └── about/          # About page
│   ├── components/         # Reusable React components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Footer.tsx      # Footer
│   │   ├── ProductCard.tsx # Product card component
│   │   ├── AIChatbot.tsx   # AI chatbot widget
│   │   ├── PriceChart.tsx  # Price history chart
│   │   └── ThemeProvider.tsx # Dark/light mode
│   └── lib/                # Utilities and data
│       ├── types.ts        # TypeScript interfaces
│       ├── data.ts         # Mock data & helpers
│       └── supabase.ts     # Supabase client
├── supabase/
│   └── schema.sql          # Database schema
└── package.json
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

```bash
npm run build
# Deploy the .next folder to Netlify
```

## Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, search, categories, deals, trending |
| Products | `/products` | Full product listing with filters |
| Product Detail | `/products/[slug]` | Price comparison table, history chart |
| PC Builder | `/build` | Component selection, compatibility, download |
| Compare | `/compare` | Side-by-side product comparison |
| Deals | `/deals` | Best discounts & budget picks |
| About | `/about` | Project info, tech stack, how it works |

## Roadmap

- [x] Price comparison across shops
- [x] Product search and filtering
- [x] PC Builder with download
- [x] Price history charts
- [x] AI chatbot assistant
- [x] Dark/light mode
- [x] PWA support
- [x] SEO optimization
- [ ] User accounts & saved builds
- [ ] Price drop email alerts
- [ ] Browser extension
- [ ] Bangla language support
- [ ] Mobile app (React Native)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Price data sourced from respective shop websites
- Built with Next.js, Tailwind CSS, and Supabase
- AI powered by Google Gemini

---

<div align="center">

**Built with care for the PC building community in Bangladesh**

AI & Data Engineer Portfolio Project

</div>
