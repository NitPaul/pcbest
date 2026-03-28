"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories, searchProducts } from "@/lib/data";

type SortOption = "relevance" | "price-low" | "price-high" | "rating" | "name";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-muted">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const brands = useMemo(() => {
    const brandSet = new Set(products.map((p) => p.brand));
    return Array.from(brandSet).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = searchProducts(query, selectedCategory);

    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (inStockOnly) {
      result = result.filter((p) => p.prices.some((pr) => pr.inStock));
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => {
          const aMin = Math.min(...a.prices.filter((p) => p.inStock).map((p) => p.price));
          const bMin = Math.min(...b.prices.filter((p) => p.inStock).map((p) => p.price));
          return aMin - bMin;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const aMin = Math.min(...a.prices.filter((p) => p.inStock).map((p) => p.price));
          const bMin = Math.min(...b.prices.filter((p) => p.inStock).map((p) => p.price));
          return bMin - aMin;
        });
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [query, selectedCategory, selectedBrand, sortBy, inStockOnly]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSortBy("relevance");
    setInStockOnly(false);
  };

  const hasFilters = query || selectedCategory || selectedBrand || inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {selectedCategory
              ? categories.find((c) => c.slug === selectedCategory)?.name || "Products"
              : query
              ? `Results for "${query}"`
              : "All Products"}
          </h1>
          <p className="text-sm text-muted mt-1">{filteredProducts.length} products found</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-card border border-card-border rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition ${
              showFilters ? "bg-primary text-white border-primary" : "bg-card border-card-border hover:border-primary"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}>
          <div className="bg-card border border-card-border rounded-xl p-5 sticky top-20 space-y-5">
            {/* Search within results */}
            <div>
              <label className="text-xs font-medium text-muted uppercase tracking-wider">Search</label>
              <div className="relative mt-1.5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-muted-bg border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-medium text-muted uppercase tracking-wider">Category</label>
              <div className="mt-1.5 space-y-1 max-h-48 overflow-y-auto">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition ${
                    !selectedCategory ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted-bg"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition flex justify-between ${
                      selectedCategory === cat.slug ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted-bg"
                    }`}
                  >
                    {cat.name}
                    <span className="text-muted text-xs">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="text-xs font-medium text-muted uppercase tracking-wider">Brand</label>
              <div className="mt-1.5 space-y-1 max-h-36 overflow-y-auto">
                <button
                  onClick={() => setSelectedBrand("")}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition ${
                    !selectedBrand ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted-bg"
                  }`}
                >
                  All Brands
                </button>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition ${
                      selectedBrand === brand ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted-bg"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Only */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-card-border text-primary focus:ring-primary"
                />
                <span className="text-sm">In Stock Only</span>
              </label>
            </div>

            {/* Clear Filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-1.5 text-sm text-danger hover:bg-danger/5 py-2 rounded-lg transition"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No products found</h3>
              <p className="text-sm text-muted mt-1">Try adjusting your filters or search query</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-primary text-sm font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
