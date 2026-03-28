"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search, TrendingDown, Cpu, CircuitBoard, MemoryStick, Monitor,
  HardDrive, Zap, Box, Fan, Database, Keyboard, Mouse,
  ArrowRight, ShoppingBag, BarChart3, Wrench, Shield, Clock, Star,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useData } from "@/components/DataProvider";
import { getBestPrice, getMaxDiscount, formatPrice } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Cpu, CircuitBoard, MemoryStick, Monitor, HardDrive, Zap, Box, Fan, Database, Keyboard, Mouse,
  MonitorSmartphone: Monitor,
};

export default function Home() {
  const { products, categories } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Get deal products (products with discounts)
  const dealProducts = products
    .filter((p) => getMaxDiscount(p) > 0)
    .sort((a, b) => getMaxDiscount(b) - getMaxDiscount(a))
    .slice(0, 4);

  // Get trending products (highest rated)
  const trendingProducts = [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  const stats = [
    { label: "Products Tracked", value: "1,500+", icon: ShoppingBag },
    { label: "Shops Compared", value: "10+", icon: BarChart3 },
    { label: "Daily Price Updates", value: "24/7", icon: Clock },
    { label: "Money Saved Avg.", value: "15%", icon: Shield },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm">
              <span className="w-2 h-2 bg-success rounded-full pulse-badge" />
              Prices updated today from 10+ shops
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Best PC Prices</span> in Bangladesh
            </h1>

            <p className="mt-5 text-lg text-blue-100/80 max-w-2xl mx-auto">
              Compare prices across Star Tech, Ryans, TechLand & 7 more shops.
              Build your dream PC at the lowest price possible.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search "RTX 4070" or "Ryzen 7 7800X3D"...'
                  className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white text-gray-900 text-base shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400/30"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-accent text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition text-sm"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Category Links */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Processor", "GPU", "RAM", "SSD", "Monitor"].map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${cat.toLowerCase()}`}
                  className="text-sm text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-card-border rounded-xl p-5 text-center card-hover">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Browse Categories</h2>
            <p className="text-muted text-sm mt-1">Find components by category</p>
          </div>
          <Link href="/products" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Cpu;
            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="bg-card border border-card-border rounded-xl p-4 text-center card-hover group"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="mt-2 text-sm font-medium">{cat.name}</p>
                <p className="text-xs text-muted">{cat.count} products</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="bg-muted-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-danger" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Hot Deals</h2>
                <p className="text-muted text-sm">Biggest price drops right now</p>
              </div>
            </div>
            <Link href="/deals" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              All Deals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Trending Products</h2>
              <p className="text-muted text-sm">Most popular components</p>
            </div>
          </div>
          <Link href="/products" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* PC Builder CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="gradient-bg rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium text-accent">Smart Tool</span>
              </div>
              <h2 className="text-3xl font-bold">Build Your Dream PC</h2>
              <p className="text-blue-100/70 mt-2 max-w-lg">
                Select components, check compatibility, compare prices across shops,
                and download your complete build list with the best prices.
              </p>
            </div>
            <Link
              href="/build"
              className="shrink-0 bg-white text-gray-900 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition flex items-center gap-2"
            >
              <Wrench className="w-5 h-5" />
              Start Building
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
