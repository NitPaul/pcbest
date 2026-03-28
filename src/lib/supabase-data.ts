import { supabase, isSupabaseConfigured } from "./supabase";
import { Product, Category, PriceHistory, ShopName } from "./types";
import { products as mockProducts, categories as mockCategories } from "./data";

export async function fetchCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return mockCategories;

  const { data, error } = await supabase!
    .from("categories")
    .select("id, name, slug, icon, component_type");

  if (error || !data) return mockCategories;

  // Get product counts per category
  const { data: counts } = await supabase!
    .from("products")
    .select("category_id");

  const countMap: Record<string, number> = {};
  if (counts) {
    for (const row of counts) {
      countMap[row.category_id] = (countMap[row.category_id] || 0) + 1;
    }
  }

  return data.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon || "Cpu",
    count: countMap[c.id] || 0,
  }));
}

export async function fetchProducts(options?: {
  category?: string;
  query?: string;
  limit?: number;
}): Promise<Product[]> {
  if (!isSupabaseConfigured()) return mockProducts;

  // Get category ID if filtering by category
  let categoryId: string | null = null;
  if (options?.category) {
    const { data: cat } = await supabase!
      .from("categories")
      .select("id")
      .eq("slug", options.category)
      .single();
    categoryId = cat?.id || null;
  }

  let query = supabase!
    .from("products")
    .select(`
      id, name, slug, brand, specs, image_url, rating, review_count,
      category_id,
      categories ( slug ),
      prices ( shop_name, shop_url, price, original_price, in_stock, last_scraped )
    `);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (options?.query) {
    query = query.ilike("name", `%${options.query}%`);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error || !data) return mockProducts;

  return data.map(mapSupabaseProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return mockProducts.find((p) => p.slug === slug) || null;
  }

  const { data, error } = await supabase!
    .from("products")
    .select(`
      id, name, slug, brand, specs, image_url, rating, review_count,
      category_id,
      categories ( slug ),
      prices ( shop_name, shop_url, price, original_price, in_stock, last_scraped )
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return mapSupabaseProduct(data);
}

export async function fetchPriceHistory(productId: string): Promise<PriceHistory[]> {
  if (!isSupabaseConfigured()) return [];

  // Find the product in supabase by slug to get UUID
  const { data, error } = await supabase!
    .from("price_history")
    .select("shop_name, price, recorded_at")
    .eq("product_id", productId)
    .order("recorded_at", { ascending: true });

  if (error || !data) return [];

  return data.map((h) => ({
    date: h.recorded_at,
    price: h.price,
    shop: h.shop_name as ShopName,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSupabaseProduct(row: any): Product {
  const catSlug = row.categories?.slug || "processor";
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: catSlug,
    brand: row.brand || "",
    image: row.image_url || "",
    specs: row.specs || {},
    rating: row.rating ? parseFloat(row.rating) : undefined,
    reviewCount: row.review_count || 0,
    prices: (row.prices || []).map((p: Record<string, unknown>) => ({
      shop: p.shop_name as ShopName,
      price: p.price as number,
      originalPrice: (p.original_price as number) || undefined,
      inStock: p.in_stock as boolean,
      url: p.shop_url as string,
      lastUpdated: p.last_scraped
        ? new Date(p.last_scraped as string).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    })),
  };
}
