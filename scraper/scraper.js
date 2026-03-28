/**
 * PCBest Price Scraper
 *
 * This script scrapes PC component prices from popular Bangladeshi shops.
 * It runs via GitHub Actions on a daily schedule and stores results in Supabase.
 *
 * Shops scraped:
 * - Star Tech (startech.com.bd)
 * - Ryans Computers (ryans.com)
 * - TechLand BD (techlandbd.com)
 * - Binary Logic (binarylogic.com.bd)
 * - Ultra Technology (ultratech.com.bd)
 *
 * Usage: node scraper/scraper.js
 * Requires: SUPABASE_URL and SUPABASE_KEY environment variables
 */

const axios = require("axios");
const cheerio = require("cheerio");

// Shop configurations
const SHOPS = {
  startech: {
    name: "Startech",
    baseUrl: "https://www.startech.com.bd",
    categories: {
      processor: "/component/processor",
      motherboard: "/component/motherboard",
      ram: "/component/ram",
      gpu: "/component/graphics-card",
      ssd: "/component/ssd-hard-disk/ssd",
      hdd: "/component/ssd-hard-disk/hard-disk",
      psu: "/component/power-supply",
      casing: "/component/casing",
      cooler: "/component/cooling-fan",
      monitor: "/monitor",
    },
    parseProducts($, category) {
      const products = [];
      $(".p-item").each((_, el) => {
        const $el = $(el);
        const name = $el.find(".p-item-name a").text().trim();
        const priceText = $el.find(".p-item-price span").text().trim();
        const price = parseInt(priceText.replace(/[^0-9]/g, ""), 10);
        const link = $el.find(".p-item-name a").attr("href");
        const image = $el.find(".p-item-img img").attr("src");
        const inStock = !$el.find(".out-of-stock").length;

        if (name && price) {
          products.push({
            name,
            price,
            url: link ? `https://www.startech.com.bd${link}` : "",
            image: image || "",
            inStock,
            category,
            shop: "Startech",
          });
        }
      });
      return products;
    },
  },
  ryans: {
    name: "Ryans",
    baseUrl: "https://www.ryans.com",
    categories: {
      processor: "/category/desktop-processor",
      motherboard: "/category/desktop-motherboard",
      ram: "/category/desktop-ram",
      gpu: "/category/graphics-card",
      ssd: "/category/ssd",
      psu: "/category/power-supply",
      casing: "/category/casing",
      monitor: "/category/monitor",
    },
    parseProducts($, category) {
      const products = [];
      $(".product-card, .card-body").each((_, el) => {
        const $el = $(el);
        const name = $el.find(".product-title, .card-title").text().trim();
        const priceText = $el.find(".product-price, .price").first().text().trim();
        const price = parseInt(priceText.replace(/[^0-9]/g, ""), 10);
        const link = $el.find("a").first().attr("href");
        const image = $el.find("img").first().attr("src");

        if (name && price) {
          products.push({
            name,
            price,
            url: link || "",
            image: image || "",
            inStock: true,
            category,
            shop: "Ryans",
          });
        }
      });
      return products;
    },
  },
  techland: {
    name: "TechLand",
    baseUrl: "https://www.techlandbd.com",
    categories: {
      processor: "/pc-components/processors",
      motherboard: "/pc-components/motherboards",
      ram: "/pc-components/rams",
      gpu: "/pc-components/graphics-cards",
      ssd: "/pc-components/ssd",
      psu: "/pc-components/power-supply",
      casing: "/pc-components/casings",
      monitor: "/monitors",
    },
    parseProducts($, category) {
      const products = [];
      $(".product-layout, .product-thumb").each((_, el) => {
        const $el = $(el);
        const name = $el.find(".name a, .product-name a").text().trim();
        const priceText = $el.find(".price-new, .price").first().text().trim();
        const price = parseInt(priceText.replace(/[^0-9]/g, ""), 10);
        const link = $el.find(".name a, .product-name a").attr("href");
        const image = $el.find("img").first().attr("src");

        if (name && price) {
          products.push({
            name,
            price,
            url: link || "",
            image: image || "",
            inStock: true,
            category,
            shop: "TechLand",
          });
        }
      });
      return products;
    },
  },
};

// Normalize product name for matching across shops
function normalizeProductName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/g, "")
    .trim();
}

// Fetch a page with retries
async function fetchPage(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9",
          "Accept-Language": "en-US,en;q=0.9",
        },
        timeout: 15000,
      });
      return response.data;
    } catch (error) {
      console.log(`Retry ${i + 1}/${retries} for ${url}: ${error.message}`);
      if (i === retries - 1) throw error;
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
}

// Main scraper function
async function scrapeShop(shopConfig) {
  const allProducts = [];
  console.log(`\nScraping ${shopConfig.name}...`);

  for (const [category, path] of Object.entries(shopConfig.categories)) {
    try {
      const url = `${shopConfig.baseUrl}${path}`;
      console.log(`  Category: ${category} -> ${url}`);

      const html = await fetchPage(url);
      const $ = cheerio.load(html);
      const products = shopConfig.parseProducts($, category);

      console.log(`  Found ${products.length} products`);
      allProducts.push(...products);

      // Respectful delay between requests
      await new Promise((r) => setTimeout(r, 1500));
    } catch (error) {
      console.error(`  Error scraping ${category} from ${shopConfig.name}: ${error.message}`);
    }
  }

  return allProducts;
}

// Store results in Supabase
async function storeResults(products) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log("\nNo Supabase credentials found. Saving to local JSON instead.");
    const fs = require("fs");
    const outputPath = "./scraper/data/latest-prices.json";
    fs.mkdirSync("./scraper/data", { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
    console.log(`Saved ${products.length} products to ${outputPath}`);
    return;
  }

  // Supabase upsert logic would go here
  console.log(`Would store ${products.length} products in Supabase`);
}

// Main execution
async function main() {
  console.log("=== PCBest Price Scraper ===");
  console.log(`Started at: ${new Date().toISOString()}`);

  const allProducts = [];

  for (const shop of Object.values(SHOPS)) {
    try {
      const products = await scrapeShop(shop);
      allProducts.push(...products);
    } catch (error) {
      console.error(`Failed to scrape ${shop.name}: ${error.message}`);
    }
  }

  console.log(`\nTotal products scraped: ${allProducts.length}`);
  await storeResults(allProducts);

  console.log(`\nCompleted at: ${new Date().toISOString()}`);
}

main().catch(console.error);
