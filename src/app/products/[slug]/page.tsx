"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ExternalLink, CheckCircle, XCircle, Star, TrendingDown,
  ShoppingCart, Share2, BarChart3, Clock,
} from "lucide-react";
import { useData } from "@/components/DataProvider";
import { getBestPrice, getMaxDiscount, formatPrice, generatePriceHistory, getShopUrl } from "@/lib/data";
import { SHOP_INFO, ShopName } from "@/lib/types";
import PriceChart from "@/components/PriceChart";
import ProductImage from "@/components/ProductImage";

export default function ProductDetailPage() {
  const { products } = useData();
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-muted mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/products" className="text-primary hover:underline">Browse all products</Link>
      </div>
    );
  }

  const best = getBestPrice(product);
  const discount = getMaxDiscount(product);
  const priceHistory = generatePriceHistory(product);
  const sortedPrices = [...product.prices].sort((a, b) => {
    if (a.inStock && !b.inStock) return -1;
    if (!a.inStock && b.inStock) return 1;
    return a.price - b.price;
  });

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link href="/" className="hover:text-primary transition">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary transition">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-primary transition capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-card border border-card-border rounded-2xl p-8 flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <ProductImage
              src={product.image}
              alt={product.name}
              category={product.category}
              className="w-full h-full object-contain"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-danger text-white text-sm font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                {discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full capitalize">
              {product.category}
            </span>
            <span className="text-xs text-muted">{product.brand}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

          {product.rating && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= Math.round(product.rating!) ? "text-warning fill-warning" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted">({product.reviewCount} reviews)</span>
            </div>
          )}

          {/* Best Price Highlight */}
          <div className="mt-6 bg-success/5 border border-success/20 rounded-xl p-5">
            <p className="text-sm text-muted">Best Price Available</p>
            <div className="flex items-end gap-3 mt-1">
              <span className="text-3xl font-bold text-success">{formatPrice(best.price)}</span>
              {discount > 0 && (
                <span className="text-lg text-muted line-through">
                  {formatPrice(product.prices.find((p) => p.shop === best.shop)?.originalPrice || 0)}
                </span>
              )}
            </div>
            <p className="text-sm text-muted mt-1">
              at <strong>{SHOP_INFO[best.shop as ShopName]?.name}</strong>
            </p>
            <a
              href={getShopUrl(best.shop, product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 bg-success hover:bg-success/90 text-white px-6 py-2.5 rounded-xl font-medium transition"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy at Best Price
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Specs */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="bg-muted-bg rounded-lg px-3 py-2">
                  <p className="text-xs text-muted">{key}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <Link
              href={`/compare?products=${product.slug}`}
              className="flex items-center gap-2 px-4 py-2 border border-card-border rounded-lg text-sm hover:bg-muted-bg transition"
            >
              <BarChart3 className="w-4 h-4" />
              Compare
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-card-border rounded-lg text-sm hover:bg-muted-bg transition"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Price Comparison Table */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          Price Comparison Across Shops
        </h2>
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border bg-muted-bg">
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Shop</th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Price</th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Updated</th>
                  <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedPrices.map((price, i) => {
                  const shopInfo = SHOP_INFO[price.shop as ShopName];
                  const isBest = price.price === best.price && price.inStock;
                  return (
                    <tr key={i} className={`border-b border-card-border last:border-0 ${isBest ? "bg-success/5" : ""}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: shopInfo?.color || "#666" }}
                          >
                            {price.shop.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{shopInfo?.name || price.shop}</p>
                            {isBest && (
                              <span className="text-xs text-success font-medium">Best Price</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isBest ? "text-success text-lg" : ""}`}>
                            {formatPrice(price.price)}
                          </span>
                          {price.originalPrice && (
                            <span className="text-sm text-muted line-through">
                              {formatPrice(price.originalPrice)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {price.inStock ? (
                          <span className="flex items-center gap-1 text-success text-sm">
                            <CheckCircle className="w-4 h-4" /> In Stock
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-danger text-sm">
                            <XCircle className="w-4 h-4" /> Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-muted flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {price.lastUpdated}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <a
                          href={getShopUrl(price.shop, product.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition ${
                            price.inStock
                              ? "bg-primary hover:bg-primary-dark text-white"
                              : "bg-muted-bg text-muted cursor-not-allowed"
                          }`}
                        >
                          Visit Shop
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Price History Chart */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-primary" />
          Price History (Last 90 Days)
        </h2>
        <div className="bg-card border border-card-border rounded-xl p-6">
          <PriceChart history={priceHistory} />
          <p className="text-xs text-muted mt-3 text-center">
            Price history is tracked daily. Chart shows trends from the top 3 shops.
          </p>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <div key={p.id} className="bg-card border border-card-border rounded-xl p-4 card-hover">
                <Link href={`/products/${p.slug}`}>
                  <div className="aspect-square bg-muted-bg rounded-lg p-4 mb-3">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-sm font-medium line-clamp-2 hover:text-primary transition">{p.name}</h3>
                  <p className="text-lg font-bold text-primary mt-1">{formatPrice(getBestPrice(p).price)}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
