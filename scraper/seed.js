/**
 * Seeds the Supabase database with initial product data
 * Usage: node scraper/seed.js
 */

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    name: "AMD Ryzen 7 7800X3D Processor",
    slug: "amd-ryzen-7-7800x3d",
    category_slug: "processor",
    brand: "AMD",
    image_url: "https://placehold.co/400x400/1a1a2e/e94560?text=Ryzen+7+7800X3D",
    specs: { Cores: "8", Threads: "16", "Base Clock": "4.2 GHz", "Boost Clock": "5.0 GHz", Cache: "104MB", TDP: "120W", Socket: "AM5" },
    rating: 4.9, review_count: 324,
    prices: [
      { shop_name: "Startech", price: 42500, original_price: 45000, in_stock: true, shop_url: "https://www.startech.com.bd/amd-ryzen-7-7800x3d" },
      { shop_name: "Ryans", price: 43200, in_stock: true, shop_url: "https://www.ryans.com/amd-ryzen-7-7800x3d" },
      { shop_name: "TechLand", price: 42800, original_price: 44500, in_stock: true, shop_url: "https://www.techlandbd.com/amd-ryzen-7-7800x3d" },
      { shop_name: "BinaryLogic", price: 43500, in_stock: true, shop_url: "https://www.binarylogic.com.bd/amd-ryzen-7-7800x3d" },
      { shop_name: "UltraTech", price: 44000, in_stock: false, shop_url: "https://www.ultratech.com.bd/amd-ryzen-7-7800x3d" },
    ],
  },
  {
    name: "Intel Core i5-14600K Processor",
    slug: "intel-core-i5-14600k",
    category_slug: "processor",
    brand: "Intel",
    image_url: "https://placehold.co/400x400/1a1a2e/00d2ff?text=i5-14600K",
    specs: { Cores: "14 (6P+8E)", Threads: "20", "Base Clock": "3.5 GHz", "Boost Clock": "5.3 GHz", Cache: "24MB", TDP: "125W", Socket: "LGA1700" },
    rating: 4.7, review_count: 256,
    prices: [
      { shop_name: "Startech", price: 32500, in_stock: true, shop_url: "https://www.startech.com.bd/intel-core-i5-14600k" },
      { shop_name: "Ryans", price: 31800, original_price: 33500, in_stock: true, shop_url: "https://www.ryans.com/intel-core-i5-14600k" },
      { shop_name: "TechLand", price: 32200, in_stock: true, shop_url: "https://www.techlandbd.com/intel-core-i5-14600k" },
      { shop_name: "BinaryLogic", price: 32800, in_stock: false, shop_url: "https://www.binarylogic.com.bd/intel-core-i5-14600k" },
      { shop_name: "Nexus", price: 31500, original_price: 33000, in_stock: true, shop_url: "https://www.nexus.com.bd/intel-core-i5-14600k" },
    ],
  },
  {
    name: "AMD Ryzen 5 7600X Processor",
    slug: "amd-ryzen-5-7600x",
    category_slug: "processor",
    brand: "AMD",
    image_url: "https://placehold.co/400x400/1a1a2e/e94560?text=Ryzen+5+7600X",
    specs: { Cores: "6", Threads: "12", "Base Clock": "4.7 GHz", "Boost Clock": "5.3 GHz", Cache: "38MB", TDP: "105W", Socket: "AM5" },
    rating: 4.6, review_count: 198,
    prices: [
      { shop_name: "Startech", price: 22500, original_price: 24000, in_stock: true, shop_url: "https://www.startech.com.bd/amd-ryzen-5-7600x" },
      { shop_name: "TechLand", price: 22800, in_stock: true, shop_url: "https://www.techlandbd.com/amd-ryzen-5-7600x" },
      { shop_name: "Ryans", price: 23200, in_stock: true, shop_url: "https://www.ryans.com/amd-ryzen-5-7600x" },
      { shop_name: "PCHouse", price: 22200, in_stock: true, shop_url: "https://www.pchouse.com.bd/amd-ryzen-5-7600x" },
    ],
  },
  {
    name: "Intel Core i7-14700K Processor",
    slug: "intel-core-i7-14700k",
    category_slug: "processor",
    brand: "Intel",
    image_url: "https://placehold.co/400x400/1a1a2e/00d2ff?text=i7-14700K",
    specs: { Cores: "20 (8P+12E)", Threads: "28", "Base Clock": "3.4 GHz", "Boost Clock": "5.6 GHz", Cache: "33MB", TDP: "125W", Socket: "LGA1700" },
    rating: 4.8, review_count: 298,
    prices: [
      { shop_name: "Startech", price: 48500, original_price: 52000, in_stock: true, shop_url: "https://www.startech.com.bd/intel-core-i7-14700k" },
      { shop_name: "Ryans", price: 49200, in_stock: true, shop_url: "https://www.ryans.com/intel-core-i7-14700k" },
      { shop_name: "TechLand", price: 47800, original_price: 51000, in_stock: true, shop_url: "https://www.techlandbd.com/intel-core-i7-14700k" },
      { shop_name: "BinaryLogic", price: 50000, in_stock: true, shop_url: "https://www.binarylogic.com.bd/intel-core-i7-14700k" },
      { shop_name: "Nexus", price: 48000, in_stock: true, shop_url: "https://www.nexus.com.bd/intel-core-i7-14700k" },
    ],
  },
  {
    name: "Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz RAM",
    slug: "corsair-vengeance-ddr5-32gb-6000mhz",
    category_slug: "ram",
    brand: "Corsair",
    image_url: "https://placehold.co/400x400/1a1a2e/ffd700?text=Corsair+DDR5",
    specs: { Capacity: "32GB (2x16GB)", Type: "DDR5", Speed: "6000MHz", "CAS Latency": "CL36", Voltage: "1.35V" },
    rating: 4.8, review_count: 189,
    prices: [
      { shop_name: "Startech", price: 13500, original_price: 15000, in_stock: true, shop_url: "https://www.startech.com.bd/corsair-vengeance-ddr5-32gb" },
      { shop_name: "Ryans", price: 13800, in_stock: true, shop_url: "https://www.ryans.com/corsair-vengeance-ddr5-32gb" },
      { shop_name: "TechLand", price: 14200, in_stock: true, shop_url: "https://www.techlandbd.com/corsair-vengeance-ddr5-32gb" },
      { shop_name: "BinaryLogic", price: 13200, original_price: 14500, in_stock: true, shop_url: "https://www.binarylogic.com.bd/corsair-vengeance-ddr5-32gb" },
      { shop_name: "Skyland", price: 14500, in_stock: false, shop_url: "https://www.skyland.com.bd/corsair-vengeance-ddr5-32gb" },
    ],
  },
  {
    name: "G.Skill Trident Z5 RGB DDR5 32GB (2x16GB) 6400MHz",
    slug: "gskill-trident-z5-rgb-ddr5-32gb",
    category_slug: "ram",
    brand: "G.Skill",
    image_url: "https://placehold.co/400x400/1a1a2e/ff6b6b?text=G.Skill+Z5",
    specs: { Capacity: "32GB (2x16GB)", Type: "DDR5", Speed: "6400MHz", "CAS Latency": "CL32", Voltage: "1.40V" },
    rating: 4.9, review_count: 145,
    prices: [
      { shop_name: "Startech", price: 16500, in_stock: true, shop_url: "https://www.startech.com.bd/gskill-trident-z5-rgb-32gb" },
      { shop_name: "Ryans", price: 17200, in_stock: true, shop_url: "https://www.ryans.com/gskill-trident-z5-rgb-32gb" },
      { shop_name: "TechLand", price: 16800, original_price: 18000, in_stock: true, shop_url: "https://www.techlandbd.com/gskill-trident-z5-rgb-32gb" },
    ],
  },
  {
    name: "Kingston Fury Beast DDR5 16GB 5600MHz RAM",
    slug: "kingston-fury-beast-ddr5-16gb",
    category_slug: "ram",
    brand: "Kingston",
    image_url: "https://placehold.co/400x400/1a1a2e/4ecdc4?text=Kingston+DDR5",
    specs: { Capacity: "16GB", Type: "DDR5", Speed: "5600MHz", "CAS Latency": "CL40", Voltage: "1.25V" },
    rating: 4.5, review_count: 220,
    prices: [
      { shop_name: "Startech", price: 5800, in_stock: true, shop_url: "https://www.startech.com.bd/kingston-fury-beast-ddr5-16gb" },
      { shop_name: "Ryans", price: 5500, original_price: 6200, in_stock: true, shop_url: "https://www.ryans.com/kingston-fury-beast-ddr5-16gb" },
      { shop_name: "TechLand", price: 5900, in_stock: true, shop_url: "https://www.techlandbd.com/kingston-fury-beast-ddr5-16gb" },
      { shop_name: "BinaryLogic", price: 5600, in_stock: true, shop_url: "https://www.binarylogic.com.bd/kingston-fury-beast-ddr5-16gb" },
      { shop_name: "PotakaIT", price: 5700, in_stock: true, shop_url: "https://potakait.com/kingston-fury-beast-ddr5-16gb" },
      { shop_name: "ComputerImporter", price: 5400, original_price: 6000, in_stock: true, shop_url: "https://computerimporter.com/kingston-fury-beast-ddr5-16gb" },
    ],
  },
  {
    name: "NVIDIA GeForce RTX 4070 Super 12GB",
    slug: "nvidia-rtx-4070-super",
    category_slug: "gpu",
    brand: "NVIDIA",
    image_url: "https://placehold.co/400x400/1a1a2e/76b900?text=RTX+4070+Super",
    specs: { Memory: "12GB GDDR6X", "Boost Clock": "2475 MHz", "CUDA Cores": "7168", "Bus Width": "192-bit", TDP: "220W", Interface: "PCIe 4.0 x16" },
    rating: 4.8, review_count: 312,
    prices: [
      { shop_name: "Startech", price: 72000, original_price: 78000, in_stock: true, shop_url: "https://www.startech.com.bd/rtx-4070-super" },
      { shop_name: "Ryans", price: 73500, in_stock: true, shop_url: "https://www.ryans.com/rtx-4070-super" },
      { shop_name: "TechLand", price: 71500, original_price: 76000, in_stock: true, shop_url: "https://www.techlandbd.com/rtx-4070-super" },
      { shop_name: "BinaryLogic", price: 74000, in_stock: false, shop_url: "https://www.binarylogic.com.bd/rtx-4070-super" },
      { shop_name: "Nexus", price: 72500, in_stock: true, shop_url: "https://www.nexus.com.bd/rtx-4070-super" },
    ],
  },
  {
    name: "AMD Radeon RX 7800 XT 16GB",
    slug: "amd-radeon-rx-7800-xt",
    category_slug: "gpu",
    brand: "AMD",
    image_url: "https://placehold.co/400x400/1a1a2e/e94560?text=RX+7800+XT",
    specs: { Memory: "16GB GDDR6", "Boost Clock": "2430 MHz", "Stream Processors": "3840", "Bus Width": "256-bit", TDP: "263W", Interface: "PCIe 4.0 x16" },
    rating: 4.7, review_count: 178,
    prices: [
      { shop_name: "Startech", price: 62000, in_stock: true, shop_url: "https://www.startech.com.bd/rx-7800-xt" },
      { shop_name: "TechLand", price: 60500, original_price: 65000, in_stock: true, shop_url: "https://www.techlandbd.com/rx-7800-xt" },
      { shop_name: "Ryans", price: 63000, in_stock: true, shop_url: "https://www.ryans.com/rx-7800-xt" },
      { shop_name: "UltraTech", price: 61000, in_stock: true, shop_url: "https://www.ultratech.com.bd/rx-7800-xt" },
    ],
  },
  {
    name: "MSI MAG B650 TOMAHAWK WIFI Motherboard",
    slug: "msi-mag-b650-tomahawk-wifi",
    category_slug: "motherboard",
    brand: "MSI",
    image_url: "https://placehold.co/400x400/1a1a2e/ff6b35?text=B650+Tomahawk",
    specs: { Socket: "AM5", Chipset: "B650", "Memory Slots": "4x DDR5", "Max Memory": "128GB", "M.2 Slots": "2", WiFi: "WiFi 6E" },
    rating: 4.7, review_count: 167,
    prices: [
      { shop_name: "Startech", price: 25500, original_price: 27000, in_stock: true, shop_url: "https://www.startech.com.bd/msi-b650-tomahawk" },
      { shop_name: "Ryans", price: 26000, in_stock: true, shop_url: "https://www.ryans.com/msi-b650-tomahawk" },
      { shop_name: "TechLand", price: 25800, in_stock: true, shop_url: "https://www.techlandbd.com/msi-b650-tomahawk" },
      { shop_name: "BinaryLogic", price: 26500, in_stock: false, shop_url: "https://www.binarylogic.com.bd/msi-b650-tomahawk" },
    ],
  },
  {
    name: "GIGABYTE B760M AORUS ELITE AX Motherboard",
    slug: "gigabyte-b760m-aorus-elite-ax",
    category_slug: "motherboard",
    brand: "GIGABYTE",
    image_url: "https://placehold.co/400x400/1a1a2e/f48c06?text=B760M+Aorus",
    specs: { Socket: "LGA1700", Chipset: "B760", "Memory Slots": "2x DDR5", "Max Memory": "96GB", "M.2 Slots": "2", WiFi: "WiFi 6E" },
    rating: 4.5, review_count: 134,
    prices: [
      { shop_name: "Startech", price: 18500, in_stock: true, shop_url: "https://www.startech.com.bd/gigabyte-b760m-aorus-elite" },
      { shop_name: "Ryans", price: 18200, original_price: 19500, in_stock: true, shop_url: "https://www.ryans.com/gigabyte-b760m-aorus-elite" },
      { shop_name: "TechLand", price: 18800, in_stock: true, shop_url: "https://www.techlandbd.com/gigabyte-b760m-aorus-elite" },
      { shop_name: "PCHouse", price: 17900, original_price: 19000, in_stock: true, shop_url: "https://www.pchouse.com.bd/gigabyte-b760m-aorus-elite" },
    ],
  },
  {
    name: "Samsung 990 Pro 1TB NVMe M.2 SSD",
    slug: "samsung-990-pro-1tb",
    category_slug: "ssd",
    brand: "Samsung",
    image_url: "https://placehold.co/400x400/1a1a2e/2196f3?text=990+Pro+1TB",
    specs: { Capacity: "1TB", Interface: "NVMe PCIe 4.0 x4", "Read Speed": "7450 MB/s", "Write Speed": "6900 MB/s", "Form Factor": "M.2 2280" },
    rating: 4.9, review_count: 445,
    prices: [
      { shop_name: "Startech", price: 11500, original_price: 13000, in_stock: true, shop_url: "https://www.startech.com.bd/samsung-990-pro-1tb" },
      { shop_name: "Ryans", price: 11800, in_stock: true, shop_url: "https://www.ryans.com/samsung-990-pro-1tb" },
      { shop_name: "TechLand", price: 11200, original_price: 12500, in_stock: true, shop_url: "https://www.techlandbd.com/samsung-990-pro-1tb" },
      { shop_name: "BinaryLogic", price: 12000, in_stock: true, shop_url: "https://www.binarylogic.com.bd/samsung-990-pro-1tb" },
      { shop_name: "Skyland", price: 11600, in_stock: true, shop_url: "https://www.skyland.com.bd/samsung-990-pro-1tb" },
    ],
  },
  {
    name: "WD Black SN850X 2TB NVMe SSD",
    slug: "wd-black-sn850x-2tb",
    category_slug: "ssd",
    brand: "Western Digital",
    image_url: "https://placehold.co/400x400/1a1a2e/333333?text=SN850X+2TB",
    specs: { Capacity: "2TB", Interface: "NVMe PCIe 4.0 x4", "Read Speed": "7300 MB/s", "Write Speed": "6600 MB/s", "Form Factor": "M.2 2280" },
    rating: 4.8, review_count: 267,
    prices: [
      { shop_name: "Startech", price: 18500, in_stock: true, shop_url: "https://www.startech.com.bd/wd-sn850x-2tb" },
      { shop_name: "Ryans", price: 19200, in_stock: true, shop_url: "https://www.ryans.com/wd-sn850x-2tb" },
      { shop_name: "TechLand", price: 18200, original_price: 20000, in_stock: true, shop_url: "https://www.techlandbd.com/wd-sn850x-2tb" },
    ],
  },
  {
    name: "Corsair RM850x 850W 80+ Gold PSU",
    slug: "corsair-rm850x",
    category_slug: "psu",
    brand: "Corsair",
    image_url: "https://placehold.co/400x400/1a1a2e/ffd700?text=RM850x",
    specs: { Wattage: "850W", Efficiency: "80+ Gold", Modularity: "Fully Modular", "Fan Size": "135mm", Warranty: "10 Years" },
    rating: 4.8, review_count: 356,
    prices: [
      { shop_name: "Startech", price: 14500, in_stock: true, shop_url: "https://www.startech.com.bd/corsair-rm850x" },
      { shop_name: "Ryans", price: 14200, original_price: 15500, in_stock: true, shop_url: "https://www.ryans.com/corsair-rm850x" },
      { shop_name: "TechLand", price: 14800, in_stock: true, shop_url: "https://www.techlandbd.com/corsair-rm850x" },
      { shop_name: "BinaryLogic", price: 13900, original_price: 15000, in_stock: true, shop_url: "https://www.binarylogic.com.bd/corsair-rm850x" },
    ],
  },
  {
    name: "NZXT H7 Flow Mid-Tower Case",
    slug: "nzxt-h7-flow",
    category_slug: "casing",
    brand: "NZXT",
    image_url: "https://placehold.co/400x400/1a1a2e/9c27b0?text=H7+Flow",
    specs: { "Form Factor": "Mid-Tower", "Motherboard Support": "ATX, mATX, ITX", "Drive Bays": "2x 3.5\", 2x 2.5\"", "Fan Support": "Up to 10 fans", "Radiator Support": "Up to 360mm" },
    rating: 4.6, review_count: 198,
    prices: [
      { shop_name: "Startech", price: 13500, in_stock: true, shop_url: "https://www.startech.com.bd/nzxt-h7-flow" },
      { shop_name: "Ryans", price: 14000, in_stock: true, shop_url: "https://www.ryans.com/nzxt-h7-flow" },
      { shop_name: "TechLand", price: 13200, original_price: 14500, in_stock: true, shop_url: "https://www.techlandbd.com/nzxt-h7-flow" },
    ],
  },
  {
    name: "Noctua NH-D15 CPU Cooler",
    slug: "noctua-nh-d15",
    category_slug: "cooler",
    brand: "Noctua",
    image_url: "https://placehold.co/400x400/1a1a2e/8B4513?text=NH-D15",
    specs: { Type: "Air Cooler", Height: "165mm", "Fan Size": "2x 150mm", TDP: "250W", Socket: "LGA1700, AM5, AM4", Noise: "24.6 dB(A)" },
    rating: 4.9, review_count: 512,
    prices: [
      { shop_name: "Startech", price: 12500, in_stock: true, shop_url: "https://www.startech.com.bd/noctua-nh-d15" },
      { shop_name: "TechLand", price: 12200, original_price: 13000, in_stock: true, shop_url: "https://www.techlandbd.com/noctua-nh-d15" },
      { shop_name: "Ryans", price: 12800, in_stock: true, shop_url: "https://www.ryans.com/noctua-nh-d15" },
    ],
  },
  {
    name: "LG 27GP850-B 27\" QHD 165Hz Gaming Monitor",
    slug: "lg-27gp850-b",
    category_slug: "monitor",
    brand: "LG",
    image_url: "https://placehold.co/400x400/1a1a2e/a50034?text=LG+27GP850",
    specs: { "Screen Size": "27\"", Resolution: "2560x1440 (QHD)", "Refresh Rate": "165Hz", "Panel Type": "Nano IPS", "Response Time": "1ms", HDR: "HDR400" },
    rating: 4.7, review_count: 289,
    prices: [
      { shop_name: "Startech", price: 38500, original_price: 42000, in_stock: true, shop_url: "https://www.startech.com.bd/lg-27gp850-b" },
      { shop_name: "Ryans", price: 39000, in_stock: true, shop_url: "https://www.ryans.com/lg-27gp850-b" },
      { shop_name: "TechLand", price: 37800, original_price: 40000, in_stock: true, shop_url: "https://www.techlandbd.com/lg-27gp850-b" },
      { shop_name: "UltraTech", price: 39500, in_stock: true, shop_url: "https://www.ultratech.com.bd/lg-27gp850-b" },
    ],
  },
  {
    name: "Seagate Barracuda 2TB 7200RPM HDD",
    slug: "seagate-barracuda-2tb",
    category_slug: "hdd",
    brand: "Seagate",
    image_url: "https://placehold.co/400x400/1a1a2e/00bcd4?text=Barracuda+2TB",
    specs: { Capacity: "2TB", RPM: "7200", Interface: "SATA III", Cache: "256MB", "Form Factor": "3.5\"" },
    rating: 4.4, review_count: 567,
    prices: [
      { shop_name: "Startech", price: 5800, in_stock: true, shop_url: "https://www.startech.com.bd/seagate-barracuda-2tb" },
      { shop_name: "Ryans", price: 5500, original_price: 6000, in_stock: true, shop_url: "https://www.ryans.com/seagate-barracuda-2tb" },
      { shop_name: "TechLand", price: 5600, in_stock: true, shop_url: "https://www.techlandbd.com/seagate-barracuda-2tb" },
      { shop_name: "PCHouse", price: 5400, in_stock: true, shop_url: "https://www.pchouse.com.bd/seagate-barracuda-2tb" },
      { shop_name: "PotakaIT", price: 5700, in_stock: true, shop_url: "https://potakait.com/seagate-barracuda-2tb" },
    ],
  },
  {
    name: "Keychron K8 Pro Wireless Mechanical Keyboard",
    slug: "keychron-k8-pro",
    category_slug: "keyboard",
    brand: "Keychron",
    image_url: "https://placehold.co/400x400/1a1a2e/ff4081?text=K8+Pro",
    specs: { Layout: "TKL (87 Keys)", Switch: "Gateron G Pro Brown", Connectivity: "Bluetooth 5.1 + USB-C", Battery: "4000mAh", Backlight: "RGB", "Hot-Swappable": "Yes" },
    rating: 4.6, review_count: 134,
    prices: [
      { shop_name: "Startech", price: 9800, in_stock: true, shop_url: "https://www.startech.com.bd/keychron-k8-pro" },
      { shop_name: "Ryans", price: 10200, in_stock: true, shop_url: "https://www.ryans.com/keychron-k8-pro" },
      { shop_name: "TechLand", price: 9500, original_price: 10500, in_stock: true, shop_url: "https://www.techlandbd.com/keychron-k8-pro" },
    ],
  },
  {
    name: "Logitech G Pro X Superlight 2 Wireless Mouse",
    slug: "logitech-g-pro-x-superlight-2",
    category_slug: "mouse",
    brand: "Logitech",
    image_url: "https://placehold.co/400x400/1a1a2e/00e5ff?text=Superlight+2",
    specs: { Sensor: "HERO 2", DPI: "32,000", Weight: "60g", Battery: "95 hours", Connectivity: "LIGHTSPEED Wireless", Buttons: "5" },
    rating: 4.8, review_count: 234,
    prices: [
      { shop_name: "Startech", price: 13500, original_price: 15000, in_stock: true, shop_url: "https://www.startech.com.bd/logitech-superlight-2" },
      { shop_name: "Ryans", price: 14000, in_stock: true, shop_url: "https://www.ryans.com/logitech-superlight-2" },
      { shop_name: "TechLand", price: 13200, in_stock: true, shop_url: "https://www.techlandbd.com/logitech-superlight-2" },
      { shop_name: "BinaryLogic", price: 13800, in_stock: true, shop_url: "https://www.binarylogic.com.bd/logitech-superlight-2" },
    ],
  },
];

async function seed() {
  console.log("=== Seeding PCBest Database ===\n");

  // 1. Get categories
  const { data: cats, error: catErr } = await supabase.from("categories").select("id, slug");
  if (catErr) { console.error("Failed to fetch categories:", catErr.message); return; }
  console.log(`Found ${cats.length} categories`);

  const catMap = {};
  for (const c of cats) catMap[c.slug] = c.id;

  // 2. Insert products and prices
  let productCount = 0;
  let priceCount = 0;

  for (const p of products) {
    const categoryId = catMap[p.category_slug];
    if (!categoryId) { console.warn(`  Skipping ${p.name}: category "${p.category_slug}" not found`); continue; }

    // Insert product
    const { data: prod, error: prodErr } = await supabase
      .from("products")
      .upsert({
        name: p.name,
        slug: p.slug,
        normalized_name: p.name.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim(),
        category_id: categoryId,
        brand: p.brand,
        specs: p.specs,
        image_url: p.image_url,
        rating: p.rating,
        review_count: p.review_count,
      }, { onConflict: "slug" })
      .select("id")
      .single();

    if (prodErr) { console.error(`  Error inserting ${p.name}:`, prodErr.message); continue; }
    productCount++;
    console.log(`  + ${p.name} (${prod.id})`);

    // Insert prices
    for (const price of p.prices) {
      const { error: priceErr } = await supabase.from("prices").insert({
        product_id: prod.id,
        shop_name: price.shop_name,
        shop_url: price.shop_url,
        price: price.price,
        original_price: price.original_price || null,
        in_stock: price.in_stock,
      });
      if (priceErr) { console.error(`    Price error for ${price.shop_name}:`, priceErr.message); }
      else { priceCount++; }
    }

    // Insert price history (one entry per shop for today)
    for (const price of p.prices) {
      await supabase.from("price_history").insert({
        product_id: prod.id,
        shop_name: price.shop_name,
        price: price.price,
      });
    }
  }

  console.log(`\n=== Seeding Complete ===`);
  console.log(`Products: ${productCount}`);
  console.log(`Prices: ${priceCount}`);
}

seed().catch(console.error);
