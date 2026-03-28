"use client";

import Link from "next/link";
import { ShoppingCart, TrendingDown, Star, ExternalLink } from "lucide-react";
import { Product, SHOP_INFO, ShopName } from "@/lib/types";
import { getBestPrice, getMaxDiscount, formatPrice } from "@/lib/data";

export default function ProductCard({ product, onCompare, onAddToBuild }: {
  product: Product;
  onCompare?: (product: Product) => void;
  onAddToBuild?: (product: Product) => void;
}) {
  const best = getBestPrice(product);
  const discount = getMaxDiscount(product);
  const shopCount = product.prices.filter((p) => p.inStock).length;

  return (
    <div className="bg-card border border-card-border rounded-xl overflow-hidden card-hover group">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="aspect-square bg-muted-bg p-6 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-danger text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            {discount}% OFF
          </span>
        )}
        <span className="absolute top-3 right-3 bg-card/90 backdrop-blur text-xs px-2 py-1 rounded-md border border-card-border">
          {shopCount} {shopCount === 1 ? "shop" : "shops"}
        </span>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize">
            {product.category}
          </span>
          <span className="text-xs text-muted">{product.brand}</span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 hover:text-primary transition min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {product.rating && (
          <div className="flex items-center gap-1 mt-1.5">
            <Star className="w-3.5 h-3.5 text-warning fill-warning" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted">({product.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted">Best price at {SHOP_INFO[best.shop as ShopName]?.name}</p>
            <p className="text-xl font-bold text-primary">{formatPrice(best.price)}</p>
          </div>
          <a
            href={product.prices.find((p) => p.shop === best.shop)?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-primary hover:bg-primary-dark text-white text-xs font-medium px-3 py-2 rounded-lg transition"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Buy
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Actions */}
        <div className="mt-3 pt-3 border-t border-card-border flex gap-2">
          {onCompare && (
            <button
              onClick={() => onCompare(product)}
              className="flex-1 text-xs text-muted hover:text-primary hover:bg-primary/5 py-1.5 rounded-md transition text-center"
            >
              + Compare
            </button>
          )}
          {onAddToBuild && (
            <button
              onClick={() => onAddToBuild(product)}
              className="flex-1 text-xs text-muted hover:text-accent hover:bg-accent/5 py-1.5 rounded-md transition text-center"
            >
              + Add to Build
            </button>
          )}
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-xs text-muted hover:text-foreground hover:bg-muted-bg py-1.5 rounded-md transition text-center"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
