"use client";

import { TrendingDown, Tag, Flame, Clock, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useData } from "@/components/DataProvider";
import { getMaxDiscount, getBestPrice, formatPrice, getShopUrl } from "@/lib/data";

export default function DealsPage() {
  const { products } = useData();
  const dealsProducts = products
    .filter((p) => getMaxDiscount(p) > 0)
    .sort((a, b) => getMaxDiscount(b) - getMaxDiscount(a));

  const bestValueProducts = [...products]
    .sort((a, b) => getBestPrice(a).price - getBestPrice(b).price)
    .slice(0, 8);

  const topDeal = dealsProducts[0];
  const topDealDiscount = topDeal ? getMaxDiscount(topDeal) : 0;
  const topDealBest = topDeal ? getBestPrice(topDeal) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Tag className="w-6 h-6 text-danger" />
          Best Deals & Offers
        </h1>
        <p className="text-sm text-muted mt-1">
          Products with the biggest price drops across all shops
        </p>
      </div>

      {/* Featured Deal */}
      {topDeal && topDealBest && (
        <div className="bg-gradient-to-r from-danger/10 via-warning/5 to-success/10 border border-danger/20 rounded-2xl p-6 md:p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-40 h-40 bg-white rounded-xl p-4 flex items-center justify-center shrink-0">
              <img src={topDeal.image} alt={topDeal.name} className="w-full h-full object-contain" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <span className="bg-danger text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  DEAL OF THE DAY
                </span>
                <span className="bg-danger/10 text-danger text-xs font-bold px-2 py-1 rounded-full">
                  {topDealDiscount}% OFF
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold">{topDeal.name}</h2>
              <div className="flex items-center gap-3 mt-2 justify-center md:justify-start">
                <span className="text-3xl font-bold text-success">{formatPrice(topDealBest.price)}</span>
                <span className="text-lg text-muted line-through">
                  {formatPrice(topDeal.prices.find((p) => p.originalPrice)?.originalPrice || 0)}
                </span>
              </div>
              <p className="text-sm text-muted mt-1">
                Best price at <strong>{topDealBest.shop}</strong>
              </p>
              <a
                href={getShopUrl(topDealBest.shop, topDeal.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-danger hover:bg-danger/90 text-white px-6 py-2.5 rounded-xl font-medium transition"
              >
                Grab This Deal <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* All Deals */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingDown className="w-5 h-5 text-danger" />
          <h2 className="text-xl font-bold">Biggest Price Drops</h2>
          <span className="text-sm text-muted ml-2">{dealsProducts.length} deals</span>
        </div>
        {dealsProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dealsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-card-border rounded-xl">
            <Tag className="w-12 h-12 text-muted/30 mx-auto mb-3" />
            <p className="text-muted">No deals available right now. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Budget Picks */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Budget-Friendly Picks</h2>
          <span className="text-sm text-muted ml-2">Lowest priced components</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestValueProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
