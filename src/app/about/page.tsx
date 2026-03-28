import {
  Cpu, BarChart3, ShoppingBag, Wrench, Bot, TrendingDown,
  Code2, Globe, Shield, Clock, Users, Zap,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Price Comparison",
    description: "Compare prices across 10+ popular PC component shops in Bangladesh instantly.",
  },
  {
    icon: TrendingDown,
    title: "Price History",
    description: "Track price trends over time with interactive charts. Know when to buy.",
  },
  {
    icon: Wrench,
    title: "PC Builder",
    description: "Build your dream PC with our smart builder. Check compatibility and compare total costs.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Get personalized PC build recommendations from our AI-powered chatbot.",
  },
  {
    icon: Shield,
    title: "Best Deal Alerts",
    description: "Find the biggest discounts and best offers across all shops in one place.",
  },
  {
    icon: Clock,
    title: "Daily Updates",
    description: "Prices are automatically updated daily from all tracked shops via web scraping.",
  },
];

const shops = [
  "Star Tech", "Ryans Computers", "TechLand BD", "Binary Logic",
  "Ultra Technology", "Skyland", "Nexus", "PC House BD",
  "Potaka IT", "Computer Importer",
];

const techStack = [
  { name: "Next.js", desc: "React Framework" },
  { name: "Tailwind CSS", desc: "Styling" },
  { name: "TypeScript", desc: "Type Safety" },
  { name: "Supabase", desc: "Database" },
  { name: "Cheerio", desc: "Web Scraping" },
  { name: "Recharts", desc: "Data Visualization" },
  { name: "Google Gemini", desc: "AI Integration" },
  { name: "Vercel", desc: "Hosting" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
          <Cpu className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          About <span className="gradient-text">PCBest</span>
        </h1>
        <p className="text-muted mt-4 max-w-2xl mx-auto leading-relaxed">
          PCBest is a free, open-source platform that helps you find the best PC component
          prices across all major shops in Bangladesh. We believe everyone deserves to get
          the best value for their money when building a PC.
        </p>
      </div>

      {/* Problem & Solution */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-danger/5 border border-danger/20 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3 text-danger">The Problem</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>- PC component prices vary widely across shops in Bangladesh</li>
              <li>- Manually checking 10+ websites is time-consuming</li>
              <li>- No single platform compares all shops at once</li>
              <li>- Hard to track price changes and find the best deals</li>
              <li>- Building a PC requires checking compatibility & prices separately</li>
            </ul>
          </div>
          <div className="bg-success/5 border border-success/20 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3 text-success">Our Solution</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>- Automated price scraping from 10+ shops daily</li>
              <li>- Instant side-by-side price comparison</li>
              <li>- Price history tracking with visual charts</li>
              <li>- Smart PC Builder with compatibility checks</li>
              <li>- AI-powered recommendations for your budget</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="bg-card border border-card-border rounded-xl p-5 card-hover">
              <feature.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shops Tracked */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Shops We Track</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {shops.map((shop) => (
            <span
              key={shop}
              className="bg-card border border-card-border rounded-full px-4 py-2 text-sm font-medium"
            >
              {shop}
            </span>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Built With</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {techStack.map((tech) => (
            <div key={tech.name} className="bg-card border border-card-border rounded-xl p-4 text-center card-hover">
              <p className="font-semibold text-sm">{tech.name}</p>
              <p className="text-xs text-muted mt-0.5">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="bg-card border border-card-border rounded-xl p-6">
          <div className="grid sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: Globe, label: "Web Scraping", desc: "GitHub Actions scrapes 10+ shop websites daily" },
              { icon: ShoppingBag, label: "Data Storage", desc: "Prices stored in Supabase PostgreSQL" },
              { icon: Zap, label: "Real-time Display", desc: "Next.js renders latest prices instantly" },
              { icon: Users, label: "User Action", desc: "Compare, build PCs & find best deals" },
            ].map((step, i) => (
              <div key={step.label}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-sm">{step.label}</p>
                <p className="text-xs text-muted mt-1">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden sm:block text-muted mt-3 text-lg">&rarr;</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Open Source</h2>
        <p className="text-muted text-sm max-w-lg mx-auto mb-6">
          PCBest is open source and free to use. Contributions are welcome!
          Built as a portfolio project demonstrating full-stack development,
          web scraping, data engineering, and AI integration skills.
        </p>
        <a
          href="https://github.com/NitPaul/pcbest"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          <Code2 className="w-5 h-5" />
          View on GitHub
        </a>
      </section>
    </div>
  );
}
