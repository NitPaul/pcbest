"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BarChart3, Plus, X, Search, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { products, getBestPrice, formatPrice } from "@/lib/data";
import { Product, SHOP_INFO, ShopName } from "@/lib/types";

export default function ComparePage() {
  const [selected, setSelected] = useState<Product[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery) return products.slice(0, 12);
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const addProduct = (product: Product) => {
    if (selected.length < 4 && !selected.find((p) => p.id === product.id)) {
      setSelected([...selected, product]);
    }
    setShowPicker(false);
    setSearchQuery("");
  };

  const removeProduct = (id: string) => {
    setSelected(selected.filter((p) => p.id !== id));
  };

  const allSpecs = useMemo(() => {
    const specKeys = new Set<string>();
    for (const p of selected) {
      Object.keys(p.specs).forEach((k) => specKeys.add(k));
    }
    return Array.from(specKeys);
  }, [selected]);

  const allShops = useMemo(() => {
    const shops = new Set<string>();
    for (const p of selected) {
      p.prices.forEach((pr) => shops.add(pr.shop));
    }
    return Array.from(shops);
  }, [selected]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Compare Products
        </h1>
        <p className="text-sm text-muted mt-1">
          Compare up to 4 products side by side across all shops
        </p>
      </div>

      {/* Product Selection */}
      <div className="flex flex-wrap gap-3 mb-8">
        {selected.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-2 bg-card border border-card-border rounded-xl px-4 py-2"
          >
            <img src={product.image} alt={product.name} className="w-8 h-8 object-contain" />
            <span className="text-sm font-medium max-w-[150px] truncate">{product.name}</span>
            <button
              onClick={() => removeProduct(product.id)}
              className="p-1 hover:bg-danger/10 rounded-md transition"
            >
              <X className="w-4 h-4 text-muted hover:text-danger" />
            </button>
          </div>
        ))}
        {selected.length < 4 && (
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="flex items-center gap-1.5 px-4 py-2 border-2 border-dashed border-card-border rounded-xl text-sm text-muted hover:border-primary hover:text-primary transition"
          >
            <Plus className="w-4 h-4" />
            Add Product ({selected.length}/4)
          </button>
        )}
      </div>

      {/* Product Picker Modal */}
      {showPicker && (
        <div className="bg-card border border-card-border rounded-xl p-5 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a product to compare..."
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-muted-bg border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
            {searchResults.map((product) => {
              const isSelected = selected.find((p) => p.id === product.id);
              const best = getBestPrice(product);
              return (
                <button
                  key={product.id}
                  onClick={() => !isSelected && addProduct(product)}
                  disabled={!!isSelected}
                  className={`flex items-center gap-3 p-3 rounded-lg text-left transition ${
                    isSelected ? "opacity-50 cursor-not-allowed bg-muted-bg" : "hover:bg-muted-bg"
                  }`}
                >
                  <img src={product.image} alt={product.name} className="w-10 h-10 object-contain rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted">{formatPrice(best.price)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {selected.length >= 2 ? (
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left px-5 py-4 bg-muted-bg text-xs font-medium text-muted uppercase tracking-wider w-40">
                    Feature
                  </th>
                  {selected.map((p) => (
                    <th key={p.id} className="px-5 py-4 text-center min-w-[200px]">
                      <Link href={`/products/${p.slug}`} className="block">
                        <img src={p.image} alt={p.name} className="w-16 h-16 object-contain mx-auto mb-2" />
                        <p className="text-sm font-medium hover:text-primary transition line-clamp-2">{p.name}</p>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Best Price Row */}
                <tr className="border-b border-card-border bg-success/5">
                  <td className="px-5 py-3 text-sm font-medium">Best Price</td>
                  {selected.map((p) => {
                    const best = getBestPrice(p);
                    const lowestPrice = Math.min(...selected.map((s) => getBestPrice(s).price));
                    return (
                      <td key={p.id} className="px-5 py-3 text-center">
                        <span className={`text-lg font-bold ${best.price === lowestPrice ? "text-success" : ""}`}>
                          {formatPrice(best.price)}
                        </span>
                        <p className="text-xs text-muted">{SHOP_INFO[best.shop as ShopName]?.name}</p>
                      </td>
                    );
                  })}
                </tr>

                {/* Brand */}
                <tr className="border-b border-card-border">
                  <td className="px-5 py-3 text-sm font-medium bg-muted-bg">Brand</td>
                  {selected.map((p) => (
                    <td key={p.id} className="px-5 py-3 text-sm text-center">{p.brand}</td>
                  ))}
                </tr>

                {/* Category */}
                <tr className="border-b border-card-border">
                  <td className="px-5 py-3 text-sm font-medium bg-muted-bg">Category</td>
                  {selected.map((p) => (
                    <td key={p.id} className="px-5 py-3 text-sm text-center capitalize">{p.category}</td>
                  ))}
                </tr>

                {/* Rating */}
                <tr className="border-b border-card-border">
                  <td className="px-5 py-3 text-sm font-medium bg-muted-bg">Rating</td>
                  {selected.map((p) => (
                    <td key={p.id} className="px-5 py-3 text-sm text-center">
                      {p.rating ? `${p.rating}/5 (${p.reviewCount})` : "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Specs */}
                {allSpecs.map((spec) => (
                  <tr key={spec} className="border-b border-card-border">
                    <td className="px-5 py-3 text-sm font-medium bg-muted-bg">{spec}</td>
                    {selected.map((p) => (
                      <td key={p.id} className="px-5 py-3 text-sm text-center">
                        {p.specs[spec] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Availability per shop */}
                <tr className="border-b border-card-border">
                  <td colSpan={selected.length + 1} className="px-5 py-3 bg-muted-bg">
                    <span className="text-xs font-medium text-muted uppercase tracking-wider">
                      Shop Availability & Prices
                    </span>
                  </td>
                </tr>
                {allShops.map((shop) => {
                  const shopInfo = SHOP_INFO[shop as ShopName];
                  return (
                    <tr key={shop} className="border-b border-card-border">
                      <td className="px-5 py-3 text-sm font-medium bg-muted-bg">
                        {shopInfo?.name || shop}
                      </td>
                      {selected.map((p) => {
                        const price = p.prices.find((pr) => pr.shop === shop);
                        return (
                          <td key={p.id} className="px-5 py-3 text-center">
                            {price ? (
                              <div>
                                <span className="text-sm font-medium">{formatPrice(price.price)}</span>
                                {price.inStock ? (
                                  <span className="flex items-center justify-center gap-1 text-xs text-success mt-0.5">
                                    <CheckCircle className="w-3 h-3" /> In Stock
                                  </span>
                                ) : (
                                  <span className="flex items-center justify-center gap-1 text-xs text-danger mt-0.5">
                                    <XCircle className="w-3 h-3" /> Out of Stock
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted text-sm">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-card border border-card-border rounded-xl">
          <BarChart3 className="w-16 h-16 text-muted/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Select Products to Compare</h3>
          <p className="text-sm text-muted mt-1 max-w-md mx-auto">
            Add at least 2 products to see a detailed side-by-side comparison of specs, prices, and availability across all shops.
          </p>
          <button
            onClick={() => setShowPicker(true)}
            className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-medium transition"
          >
            <Plus className="w-4 h-4" />
            Add Products
          </button>
        </div>
      )}
    </div>
  );
}
