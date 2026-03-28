"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product, Category } from "@/lib/types";
import { products as mockProducts, categories as mockCategories } from "@/lib/data";
import { fetchProducts, fetchCategories } from "@/lib/supabase-data";

interface DataContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  isLive: boolean;
}

const DataContext = createContext<DataContextType>({
  products: mockProducts,
  categories: mockCategories,
  loading: true,
  isLive: false,
});

export function useData() {
  return useContext(DataContext);
}

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [prods, cats] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        // Only switch to live data if Supabase returned MORE products than mock
        // This prevents showing a nearly-empty site from a partially seeded DB
        if (prods.length >= mockProducts.length) {
          setProducts(prods);
          setIsLive(true);
        }
        if (cats.length >= mockCategories.length) {
          setCategories(cats);
        }
      } catch {
        // Fall back to mock data silently
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <DataContext.Provider value={{ products, categories, loading, isLive }}>
      {children}
    </DataContext.Provider>
  );
}
