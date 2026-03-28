import { Product, Category, PriceHistory } from "./types";

export const categories: Category[] = [
  { id: "1", name: "Processor", slug: "processor", icon: "Cpu", count: 156 },
  { id: "2", name: "Motherboard", slug: "motherboard", icon: "CircuitBoard", count: 203 },
  { id: "3", name: "RAM", slug: "ram", icon: "MemoryStick", count: 178 },
  { id: "4", name: "Graphics Card", slug: "gpu", icon: "Monitor", count: 134 },
  { id: "5", name: "SSD", slug: "ssd", icon: "HardDrive", count: 145 },
  { id: "6", name: "HDD", slug: "hdd", icon: "Database", count: 87 },
  { id: "7", name: "Power Supply", slug: "psu", icon: "Zap", count: 112 },
  { id: "8", name: "Casing", slug: "casing", icon: "Box", count: 167 },
  { id: "9", name: "CPU Cooler", slug: "cooler", icon: "Fan", count: 98 },
  { id: "10", name: "Monitor", slug: "monitor", icon: "MonitorSmartphone", count: 210 },
  { id: "11", name: "Keyboard", slug: "keyboard", icon: "Keyboard", count: 165 },
  { id: "12", name: "Mouse", slug: "mouse", icon: "Mouse", count: 143 },
];

export const products: Product[] = [
  // ─── Processors (6) ────────────────────────────────────────────────
  {
    id: "p1",
    name: "AMD Ryzen 5 5600X Processor",
    slug: "amd-ryzen-5-5600x",
    category: "processor",
    brand: "AMD",
    image: "",
    specs: { Cores: "6", Threads: "12", "Base Clock": "3.7 GHz", "Boost Clock": "4.6 GHz", Cache: "35MB", TDP: "65W", Socket: "AM4" },
    rating: 4.7,
    reviewCount: 412,
    prices: [
      { shop: "Startech", price: 16500, originalPrice: 18000, inStock: true, url: "https://www.startech.com.bd/amd-ryzen-5-5600x", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 17200, inStock: true, url: "https://www.ryans.com/amd-ryzen-5-5600x", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 16800, inStock: true, url: "https://www.techlandbd.com/amd-ryzen-5-5600x", lastUpdated: "2026-03-28" },
      { shop: "PCHouse", price: 16200, originalPrice: 17500, inStock: true, url: "https://www.pchouse.com.bd/amd-ryzen-5-5600x", lastUpdated: "2026-03-28" },
      { shop: "PotakaIT", price: 17000, inStock: true, url: "https://potakait.com/amd-ryzen-5-5600x", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p2",
    name: "AMD Ryzen 7 7800X3D Processor",
    slug: "amd-ryzen-7-7800x3d",
    category: "processor",
    brand: "AMD",
    image: "",
    specs: { Cores: "8", Threads: "16", "Base Clock": "4.2 GHz", "Boost Clock": "5.0 GHz", Cache: "104MB", TDP: "120W", Socket: "AM5" },
    rating: 4.9,
    reviewCount: 324,
    prices: [
      { shop: "Startech", price: 42500, originalPrice: 45000, inStock: true, url: "https://www.startech.com.bd/amd-ryzen-7-7800x3d", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 43200, inStock: true, url: "https://www.ryans.com/amd-ryzen-7-7800x3d", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 42800, originalPrice: 44500, inStock: true, url: "https://www.techlandbd.com/amd-ryzen-7-7800x3d", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 43500, inStock: true, url: "https://www.binarylogic.com.bd/amd-ryzen-7-7800x3d", lastUpdated: "2026-03-28" },
      { shop: "UltraTech", price: 44000, inStock: false, url: "https://www.ultratech.com.bd/amd-ryzen-7-7800x3d", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p3",
    name: "AMD Ryzen 9 7950X Processor",
    slug: "amd-ryzen-9-7950x",
    category: "processor",
    brand: "AMD",
    image: "",
    specs: { Cores: "16", Threads: "32", "Base Clock": "4.5 GHz", "Boost Clock": "5.7 GHz", Cache: "80MB", TDP: "170W", Socket: "AM5" },
    rating: 4.8,
    reviewCount: 187,
    prices: [
      { shop: "Startech", price: 62500, inStock: true, url: "https://www.startech.com.bd/amd-ryzen-9-7950x", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 63800, originalPrice: 68000, inStock: true, url: "https://www.ryans.com/amd-ryzen-9-7950x", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 61500, originalPrice: 66000, inStock: true, url: "https://www.techlandbd.com/amd-ryzen-9-7950x", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 64000, inStock: false, url: "https://www.binarylogic.com.bd/amd-ryzen-9-7950x", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 63200, inStock: true, url: "https://www.nexus.com.bd/amd-ryzen-9-7950x", lastUpdated: "2026-03-28" },
      { shop: "Skyland", price: 64500, inStock: true, url: "https://www.skyland.com.bd/amd-ryzen-9-7950x", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p4",
    name: "Intel Core i5-14600K Processor",
    slug: "intel-core-i5-14600k",
    category: "processor",
    brand: "Intel",
    image: "",
    specs: { Cores: "14 (6P+8E)", Threads: "20", "Base Clock": "3.5 GHz", "Boost Clock": "5.3 GHz", Cache: "24MB", TDP: "125W", Socket: "LGA1700" },
    rating: 4.7,
    reviewCount: 256,
    prices: [
      { shop: "Startech", price: 32500, inStock: true, url: "https://www.startech.com.bd/intel-core-i5-14600k", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 31800, originalPrice: 33500, inStock: true, url: "https://www.ryans.com/intel-core-i5-14600k", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 32200, inStock: true, url: "https://www.techlandbd.com/intel-core-i5-14600k", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 32800, inStock: false, url: "https://www.binarylogic.com.bd/intel-core-i5-14600k", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 31500, originalPrice: 33000, inStock: true, url: "https://www.nexus.com.bd/intel-core-i5-14600k", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p5",
    name: "Intel Core i7-14700K Processor",
    slug: "intel-core-i7-14700k",
    category: "processor",
    brand: "Intel",
    image: "",
    specs: { Cores: "20 (8P+12E)", Threads: "28", "Base Clock": "3.4 GHz", "Boost Clock": "5.6 GHz", Cache: "33MB", TDP: "125W", Socket: "LGA1700" },
    rating: 4.8,
    reviewCount: 298,
    prices: [
      { shop: "Startech", price: 48500, originalPrice: 52000, inStock: true, url: "https://www.startech.com.bd/intel-core-i7-14700k", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 49200, inStock: true, url: "https://www.ryans.com/intel-core-i7-14700k", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 47800, originalPrice: 51000, inStock: true, url: "https://www.techlandbd.com/intel-core-i7-14700k", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 50000, inStock: true, url: "https://www.binarylogic.com.bd/intel-core-i7-14700k", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 48000, inStock: true, url: "https://www.nexus.com.bd/intel-core-i7-14700k", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p6",
    name: "Intel Core i9-14900K Processor",
    slug: "intel-core-i9-14900k",
    category: "processor",
    brand: "Intel",
    image: "",
    specs: { Cores: "24 (8P+16E)", Threads: "32", "Base Clock": "3.2 GHz", "Boost Clock": "6.0 GHz", Cache: "36MB", TDP: "125W", Socket: "LGA1700" },
    rating: 4.7,
    reviewCount: 176,
    prices: [
      { shop: "Startech", price: 68500, inStock: true, url: "https://www.startech.com.bd/intel-core-i9-14900k", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 69800, originalPrice: 75000, inStock: true, url: "https://www.ryans.com/intel-core-i9-14900k", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 67500, originalPrice: 72000, inStock: true, url: "https://www.techlandbd.com/intel-core-i9-14900k", lastUpdated: "2026-03-28" },
      { shop: "UltraTech", price: 70500, inStock: false, url: "https://www.ultratech.com.bd/intel-core-i9-14900k", lastUpdated: "2026-03-28" },
      { shop: "Skyland", price: 69000, inStock: true, url: "https://www.skyland.com.bd/intel-core-i9-14900k", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── Motherboards (4) ──────────────────────────────────────────────
  {
    id: "p7",
    name: "MSI MAG B650 TOMAHAWK WIFI Motherboard",
    slug: "msi-mag-b650-tomahawk-wifi",
    category: "motherboard",
    brand: "MSI",
    image: "",
    specs: { Socket: "AM5", Chipset: "B650", "Memory Slots": "4x DDR5", "Max Memory": "128GB", "M.2 Slots": "2", WiFi: "WiFi 6E" },
    rating: 4.7,
    reviewCount: 167,
    prices: [
      { shop: "Startech", price: 25500, originalPrice: 27000, inStock: true, url: "https://www.startech.com.bd/msi-b650-tomahawk", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 26000, inStock: true, url: "https://www.ryans.com/msi-b650-tomahawk", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 25800, inStock: true, url: "https://www.techlandbd.com/msi-b650-tomahawk", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 26500, inStock: false, url: "https://www.binarylogic.com.bd/msi-b650-tomahawk", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 25200, originalPrice: 27500, inStock: true, url: "https://www.nexus.com.bd/msi-b650-tomahawk", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p8",
    name: "GIGABYTE B760M AORUS ELITE AX Motherboard",
    slug: "gigabyte-b760m-aorus-elite-ax",
    category: "motherboard",
    brand: "GIGABYTE",
    image: "",
    specs: { Socket: "LGA1700", Chipset: "B760", "Memory Slots": "2x DDR5", "Max Memory": "96GB", "M.2 Slots": "2", WiFi: "WiFi 6E" },
    rating: 4.5,
    reviewCount: 134,
    prices: [
      { shop: "Startech", price: 18500, inStock: true, url: "https://www.startech.com.bd/gigabyte-b760m-aorus-elite", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 18200, originalPrice: 19500, inStock: true, url: "https://www.ryans.com/gigabyte-b760m-aorus-elite", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 18800, inStock: true, url: "https://www.techlandbd.com/gigabyte-b760m-aorus-elite", lastUpdated: "2026-03-28" },
      { shop: "PCHouse", price: 17900, originalPrice: 19000, inStock: true, url: "https://www.pchouse.com.bd/gigabyte-b760m-aorus-elite", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p9",
    name: "ASUS ROG STRIX B650-A GAMING WIFI Motherboard",
    slug: "asus-rog-strix-b650-a",
    category: "motherboard",
    brand: "ASUS",
    image: "",
    specs: { Socket: "AM5", Chipset: "B650", "Memory Slots": "4x DDR5", "Max Memory": "128GB", "M.2 Slots": "3", WiFi: "WiFi 6E" },
    rating: 4.6,
    reviewCount: 112,
    prices: [
      { shop: "Startech", price: 27500, inStock: true, url: "https://www.startech.com.bd/asus-rog-strix-b650-a", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 28200, originalPrice: 30000, inStock: true, url: "https://www.ryans.com/asus-rog-strix-b650-a", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 27800, inStock: true, url: "https://www.techlandbd.com/asus-rog-strix-b650-a", lastUpdated: "2026-03-28" },
      { shop: "UltraTech", price: 28500, inStock: false, url: "https://www.ultratech.com.bd/asus-rog-strix-b650-a", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p10",
    name: "ASRock B760M Pro RS Motherboard",
    slug: "asrock-b760m-pro-rs",
    category: "motherboard",
    brand: "ASRock",
    image: "",
    specs: { Socket: "LGA1700", Chipset: "B760", "Memory Slots": "2x DDR5", "Max Memory": "96GB", "M.2 Slots": "2", WiFi: "No" },
    rating: 4.3,
    reviewCount: 89,
    prices: [
      { shop: "Startech", price: 13500, originalPrice: 14500, inStock: true, url: "https://www.startech.com.bd/asrock-b760m-pro-rs", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 13800, inStock: true, url: "https://www.ryans.com/asrock-b760m-pro-rs", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 13200, inStock: true, url: "https://www.techlandbd.com/asrock-b760m-pro-rs", lastUpdated: "2026-03-28" },
      { shop: "PotakaIT", price: 13000, originalPrice: 14000, inStock: true, url: "https://potakait.com/asrock-b760m-pro-rs", lastUpdated: "2026-03-28" },
      { shop: "ComputerImporter", price: 13600, inStock: true, url: "https://computerimporter.com/asrock-b760m-pro-rs", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── RAM (4) ───────────────────────────────────────────────────────
  {
    id: "p11",
    name: "Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz RAM",
    slug: "corsair-vengeance-ddr5-32gb-6000mhz",
    category: "ram",
    brand: "Corsair",
    image: "",
    specs: { Capacity: "32GB (2x16GB)", Type: "DDR5", Speed: "6000MHz", "CAS Latency": "CL36", Voltage: "1.35V" },
    rating: 4.8,
    reviewCount: 189,
    prices: [
      { shop: "Startech", price: 13500, originalPrice: 15000, inStock: true, url: "https://www.startech.com.bd/corsair-vengeance-ddr5-32gb", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 13800, inStock: true, url: "https://www.ryans.com/corsair-vengeance-ddr5-32gb", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 14200, inStock: true, url: "https://www.techlandbd.com/corsair-vengeance-ddr5-32gb", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 13200, originalPrice: 14500, inStock: true, url: "https://www.binarylogic.com.bd/corsair-vengeance-ddr5-32gb", lastUpdated: "2026-03-28" },
      { shop: "Skyland", price: 14500, inStock: false, url: "https://www.skyland.com.bd/corsair-vengeance-ddr5-32gb", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p12",
    name: "G.Skill Trident Z5 RGB DDR5 32GB (2x16GB) 6400MHz",
    slug: "gskill-trident-z5-rgb-ddr5-32gb",
    category: "ram",
    brand: "G.Skill",
    image: "",
    specs: { Capacity: "32GB (2x16GB)", Type: "DDR5", Speed: "6400MHz", "CAS Latency": "CL32", Voltage: "1.40V" },
    rating: 4.9,
    reviewCount: 145,
    prices: [
      { shop: "Startech", price: 16500, inStock: true, url: "https://www.startech.com.bd/gskill-trident-z5-rgb-32gb", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 17200, inStock: true, url: "https://www.ryans.com/gskill-trident-z5-rgb-32gb", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 16800, originalPrice: 18000, inStock: true, url: "https://www.techlandbd.com/gskill-trident-z5-rgb-32gb", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 16200, originalPrice: 17500, inStock: true, url: "https://www.binarylogic.com.bd/gskill-trident-z5-rgb-32gb", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p13",
    name: "Kingston Fury Beast DDR5 16GB 5600MHz RAM",
    slug: "kingston-fury-beast-ddr5-16gb",
    category: "ram",
    brand: "Kingston",
    image: "",
    specs: { Capacity: "16GB", Type: "DDR5", Speed: "5600MHz", "CAS Latency": "CL40", Voltage: "1.25V" },
    rating: 4.5,
    reviewCount: 220,
    prices: [
      { shop: "Startech", price: 5800, inStock: true, url: "https://www.startech.com.bd/kingston-fury-beast-ddr5-16gb", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 5500, originalPrice: 6200, inStock: true, url: "https://www.ryans.com/kingston-fury-beast-ddr5-16gb", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 5900, inStock: true, url: "https://www.techlandbd.com/kingston-fury-beast-ddr5-16gb", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 5600, inStock: true, url: "https://www.binarylogic.com.bd/kingston-fury-beast-ddr5-16gb", lastUpdated: "2026-03-28" },
      { shop: "PotakaIT", price: 5700, inStock: true, url: "https://potakait.com/kingston-fury-beast-ddr5-16gb", lastUpdated: "2026-03-28" },
      { shop: "ComputerImporter", price: 5400, originalPrice: 6000, inStock: true, url: "https://computerimporter.com/kingston-fury-beast-ddr5-16gb", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p14",
    name: "TeamGroup T-Force Delta RGB DDR5 32GB (2x16GB) 6000MHz",
    slug: "teamgroup-t-force-delta-rgb-ddr5-32gb",
    category: "ram",
    brand: "TeamGroup",
    image: "",
    specs: { Capacity: "32GB (2x16GB)", Type: "DDR5", Speed: "6000MHz", "CAS Latency": "CL38", Voltage: "1.35V" },
    rating: 4.6,
    reviewCount: 98,
    prices: [
      { shop: "Startech", price: 12200, originalPrice: 13500, inStock: true, url: "https://www.startech.com.bd/teamgroup-delta-rgb-ddr5-32gb", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 12800, inStock: true, url: "https://www.ryans.com/teamgroup-delta-rgb-ddr5-32gb", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 12500, inStock: true, url: "https://www.techlandbd.com/teamgroup-delta-rgb-ddr5-32gb", lastUpdated: "2026-03-28" },
      { shop: "Skyland", price: 12000, originalPrice: 13000, inStock: true, url: "https://www.skyland.com.bd/teamgroup-delta-rgb-ddr5-32gb", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── Graphics Cards (5) ────────────────────────────────────────────
  {
    id: "p15",
    name: "NVIDIA GeForce RTX 4060 8GB",
    slug: "nvidia-rtx-4060",
    category: "gpu",
    brand: "NVIDIA",
    image: "",
    specs: { Memory: "8GB GDDR6", "Boost Clock": "2460 MHz", "CUDA Cores": "3072", "Bus Width": "128-bit", TDP: "115W", Interface: "PCIe 4.0 x8" },
    rating: 4.5,
    reviewCount: 278,
    prices: [
      { shop: "Startech", price: 35500, inStock: true, url: "https://www.startech.com.bd/rtx-4060", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 36200, originalPrice: 38500, inStock: true, url: "https://www.ryans.com/rtx-4060", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 34800, originalPrice: 37000, inStock: true, url: "https://www.techlandbd.com/rtx-4060", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 36500, inStock: true, url: "https://www.binarylogic.com.bd/rtx-4060", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 35000, inStock: true, url: "https://www.nexus.com.bd/rtx-4060", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p16",
    name: "NVIDIA GeForce RTX 4070 Super 12GB",
    slug: "nvidia-rtx-4070-super",
    category: "gpu",
    brand: "NVIDIA",
    image: "",
    specs: { Memory: "12GB GDDR6X", "Boost Clock": "2475 MHz", "CUDA Cores": "7168", "Bus Width": "192-bit", TDP: "220W", Interface: "PCIe 4.0 x16" },
    rating: 4.8,
    reviewCount: 312,
    prices: [
      { shop: "Startech", price: 72000, originalPrice: 78000, inStock: true, url: "https://www.startech.com.bd/rtx-4070-super", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 73500, inStock: true, url: "https://www.ryans.com/rtx-4070-super", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 71500, originalPrice: 76000, inStock: true, url: "https://www.techlandbd.com/rtx-4070-super", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 74000, inStock: false, url: "https://www.binarylogic.com.bd/rtx-4070-super", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 72500, inStock: true, url: "https://www.nexus.com.bd/rtx-4070-super", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p17",
    name: "NVIDIA GeForce RTX 4080 Super 16GB",
    slug: "nvidia-rtx-4080-super",
    category: "gpu",
    brand: "NVIDIA",
    image: "",
    specs: { Memory: "16GB GDDR6X", "Boost Clock": "2550 MHz", "CUDA Cores": "10240", "Bus Width": "256-bit", TDP: "320W", Interface: "PCIe 4.0 x16" },
    rating: 4.9,
    reviewCount: 156,
    prices: [
      { shop: "Startech", price: 132000, inStock: true, url: "https://www.startech.com.bd/rtx-4080-super", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 135000, originalPrice: 145000, inStock: true, url: "https://www.ryans.com/rtx-4080-super", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 130000, originalPrice: 140000, inStock: true, url: "https://www.techlandbd.com/rtx-4080-super", lastUpdated: "2026-03-28" },
      { shop: "UltraTech", price: 138000, inStock: false, url: "https://www.ultratech.com.bd/rtx-4080-super", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p18",
    name: "AMD Radeon RX 7800 XT 16GB",
    slug: "amd-radeon-rx-7800-xt",
    category: "gpu",
    brand: "AMD",
    image: "",
    specs: { Memory: "16GB GDDR6", "Boost Clock": "2430 MHz", "Stream Processors": "3840", "Bus Width": "256-bit", TDP: "263W", Interface: "PCIe 4.0 x16" },
    rating: 4.7,
    reviewCount: 178,
    prices: [
      { shop: "Startech", price: 62000, inStock: true, url: "https://www.startech.com.bd/rx-7800-xt", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 60500, originalPrice: 65000, inStock: true, url: "https://www.techlandbd.com/rx-7800-xt", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 63000, inStock: true, url: "https://www.ryans.com/rx-7800-xt", lastUpdated: "2026-03-28" },
      { shop: "UltraTech", price: 61000, inStock: true, url: "https://www.ultratech.com.bd/rx-7800-xt", lastUpdated: "2026-03-28" },
      { shop: "Skyland", price: 61500, originalPrice: 64000, inStock: true, url: "https://www.skyland.com.bd/rx-7800-xt", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p19",
    name: "AMD Radeon RX 7600 8GB",
    slug: "amd-radeon-rx-7600",
    category: "gpu",
    brand: "AMD",
    image: "",
    specs: { Memory: "8GB GDDR6", "Boost Clock": "2655 MHz", "Stream Processors": "2048", "Bus Width": "128-bit", TDP: "165W", Interface: "PCIe 4.0 x8" },
    rating: 4.4,
    reviewCount: 203,
    prices: [
      { shop: "Startech", price: 28500, originalPrice: 30500, inStock: true, url: "https://www.startech.com.bd/rx-7600", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 29200, inStock: true, url: "https://www.ryans.com/rx-7600", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 28000, originalPrice: 30000, inStock: true, url: "https://www.techlandbd.com/rx-7600", lastUpdated: "2026-03-28" },
      { shop: "PCHouse", price: 29500, inStock: true, url: "https://www.pchouse.com.bd/rx-7600", lastUpdated: "2026-03-28" },
      { shop: "PotakaIT", price: 28800, inStock: true, url: "https://potakait.com/rx-7600", lastUpdated: "2026-03-28" },
      { shop: "ComputerImporter", price: 27800, inStock: true, url: "https://computerimporter.com/rx-7600", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── SSDs (4) ──────────────────────────────────────────────────────
  {
    id: "p20",
    name: "Samsung 990 Pro 1TB NVMe M.2 SSD",
    slug: "samsung-990-pro-1tb",
    category: "ssd",
    brand: "Samsung",
    image: "",
    specs: { Capacity: "1TB", Interface: "NVMe PCIe 4.0 x4", "Read Speed": "7450 MB/s", "Write Speed": "6900 MB/s", "Form Factor": "M.2 2280" },
    rating: 4.9,
    reviewCount: 445,
    prices: [
      { shop: "Startech", price: 11500, originalPrice: 13000, inStock: true, url: "https://www.startech.com.bd/samsung-990-pro-1tb", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 11800, inStock: true, url: "https://www.ryans.com/samsung-990-pro-1tb", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 11200, originalPrice: 12500, inStock: true, url: "https://www.techlandbd.com/samsung-990-pro-1tb", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 12000, inStock: true, url: "https://www.binarylogic.com.bd/samsung-990-pro-1tb", lastUpdated: "2026-03-28" },
      { shop: "Skyland", price: 11600, inStock: true, url: "https://www.skyland.com.bd/samsung-990-pro-1tb", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p21",
    name: "WD Black SN850X 2TB NVMe SSD",
    slug: "wd-black-sn850x-2tb",
    category: "ssd",
    brand: "Western Digital",
    image: "",
    specs: { Capacity: "2TB", Interface: "NVMe PCIe 4.0 x4", "Read Speed": "7300 MB/s", "Write Speed": "6600 MB/s", "Form Factor": "M.2 2280" },
    rating: 4.8,
    reviewCount: 267,
    prices: [
      { shop: "Startech", price: 18500, inStock: true, url: "https://www.startech.com.bd/wd-sn850x-2tb", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 19200, inStock: true, url: "https://www.ryans.com/wd-sn850x-2tb", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 18200, originalPrice: 20000, inStock: true, url: "https://www.techlandbd.com/wd-sn850x-2tb", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 18800, inStock: false, url: "https://www.binarylogic.com.bd/wd-sn850x-2tb", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p22",
    name: "Samsung 870 EVO 1TB SATA SSD",
    slug: "samsung-870-evo-1tb",
    category: "ssd",
    brand: "Samsung",
    image: "",
    specs: { Capacity: "1TB", Interface: "SATA III 6Gbps", "Read Speed": "560 MB/s", "Write Speed": "530 MB/s", "Form Factor": "2.5 inch" },
    rating: 4.7,
    reviewCount: 534,
    prices: [
      { shop: "Startech", price: 8500, inStock: true, url: "https://www.startech.com.bd/samsung-870-evo-1tb", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 8200, originalPrice: 9000, inStock: true, url: "https://www.ryans.com/samsung-870-evo-1tb", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 8600, inStock: true, url: "https://www.techlandbd.com/samsung-870-evo-1tb", lastUpdated: "2026-03-28" },
      { shop: "PCHouse", price: 8100, originalPrice: 8800, inStock: true, url: "https://www.pchouse.com.bd/samsung-870-evo-1tb", lastUpdated: "2026-03-28" },
      { shop: "PotakaIT", price: 8400, inStock: true, url: "https://potakait.com/samsung-870-evo-1tb", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p23",
    name: "Kingston NV2 1TB NVMe M.2 SSD",
    slug: "kingston-nv2-1tb",
    category: "ssd",
    brand: "Kingston",
    image: "",
    specs: { Capacity: "1TB", Interface: "NVMe PCIe 4.0 x4", "Read Speed": "3500 MB/s", "Write Speed": "2100 MB/s", "Form Factor": "M.2 2280" },
    rating: 4.3,
    reviewCount: 312,
    prices: [
      { shop: "Startech", price: 6500, originalPrice: 7200, inStock: true, url: "https://www.startech.com.bd/kingston-nv2-1tb", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 6800, inStock: true, url: "https://www.ryans.com/kingston-nv2-1tb", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 6600, inStock: true, url: "https://www.techlandbd.com/kingston-nv2-1tb", lastUpdated: "2026-03-28" },
      { shop: "ComputerImporter", price: 6300, originalPrice: 6900, inStock: true, url: "https://computerimporter.com/kingston-nv2-1tb", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── HDDs (2) ──────────────────────────────────────────────────────
  {
    id: "p24",
    name: "Seagate Barracuda 2TB 7200RPM HDD",
    slug: "seagate-barracuda-2tb",
    category: "hdd",
    brand: "Seagate",
    image: "",
    specs: { Capacity: "2TB", RPM: "7200", Interface: "SATA III", Cache: "256MB", "Form Factor": "3.5\"" },
    rating: 4.4,
    reviewCount: 567,
    prices: [
      { shop: "Startech", price: 5800, inStock: true, url: "https://www.startech.com.bd/seagate-barracuda-2tb", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 5500, originalPrice: 6000, inStock: true, url: "https://www.ryans.com/seagate-barracuda-2tb", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 5600, inStock: true, url: "https://www.techlandbd.com/seagate-barracuda-2tb", lastUpdated: "2026-03-28" },
      { shop: "PCHouse", price: 5400, inStock: true, url: "https://www.pchouse.com.bd/seagate-barracuda-2tb", lastUpdated: "2026-03-28" },
      { shop: "PotakaIT", price: 5700, inStock: true, url: "https://potakait.com/seagate-barracuda-2tb", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p25",
    name: "WD Blue 1TB 7200RPM HDD",
    slug: "wd-blue-1tb",
    category: "hdd",
    brand: "Western Digital",
    image: "",
    specs: { Capacity: "1TB", RPM: "7200", Interface: "SATA III", Cache: "64MB", "Form Factor": "3.5\"" },
    rating: 4.3,
    reviewCount: 489,
    prices: [
      { shop: "Startech", price: 3800, inStock: true, url: "https://www.startech.com.bd/wd-blue-1tb", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 3600, originalPrice: 4000, inStock: true, url: "https://www.ryans.com/wd-blue-1tb", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 3900, inStock: true, url: "https://www.techlandbd.com/wd-blue-1tb", lastUpdated: "2026-03-28" },
      { shop: "PCHouse", price: 3500, inStock: true, url: "https://www.pchouse.com.bd/wd-blue-1tb", lastUpdated: "2026-03-28" },
      { shop: "ComputerImporter", price: 3700, inStock: true, url: "https://computerimporter.com/wd-blue-1tb", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── Power Supplies (3) ────────────────────────────────────────────
  {
    id: "p26",
    name: "Corsair RM850x 850W 80+ Gold PSU",
    slug: "corsair-rm850x",
    category: "psu",
    brand: "Corsair",
    image: "",
    specs: { Wattage: "850W", Efficiency: "80+ Gold", Modularity: "Fully Modular", "Fan Size": "135mm", Warranty: "10 Years" },
    rating: 4.8,
    reviewCount: 356,
    prices: [
      { shop: "Startech", price: 14500, inStock: true, url: "https://www.startech.com.bd/corsair-rm850x", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 14200, originalPrice: 15500, inStock: true, url: "https://www.ryans.com/corsair-rm850x", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 14800, inStock: true, url: "https://www.techlandbd.com/corsair-rm850x", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 13900, originalPrice: 15000, inStock: true, url: "https://www.binarylogic.com.bd/corsair-rm850x", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 14600, inStock: true, url: "https://www.nexus.com.bd/corsair-rm850x", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p27",
    name: "Deepcool PX1000G 1000W 80+ Gold PSU",
    slug: "deepcool-px1000g",
    category: "psu",
    brand: "Deepcool",
    image: "",
    specs: { Wattage: "1000W", Efficiency: "80+ Gold", Modularity: "Fully Modular", "Fan Size": "135mm FDB", Warranty: "10 Years" },
    rating: 4.7,
    reviewCount: 89,
    prices: [
      { shop: "Startech", price: 12500, originalPrice: 13800, inStock: true, url: "https://www.startech.com.bd/deepcool-px1000g", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 13000, inStock: true, url: "https://www.ryans.com/deepcool-px1000g", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 12200, originalPrice: 13500, inStock: true, url: "https://www.techlandbd.com/deepcool-px1000g", lastUpdated: "2026-03-28" },
      { shop: "Skyland", price: 12800, inStock: true, url: "https://www.skyland.com.bd/deepcool-px1000g", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p28",
    name: "Antec NeoECO 650W 80+ Bronze PSU",
    slug: "antec-neoeco-650w",
    category: "psu",
    brand: "Antec",
    image: "",
    specs: { Wattage: "650W", Efficiency: "80+ Bronze", Modularity: "Semi Modular", "Fan Size": "120mm", Warranty: "5 Years" },
    rating: 4.4,
    reviewCount: 234,
    prices: [
      { shop: "Startech", price: 5800, inStock: true, url: "https://www.startech.com.bd/antec-neoeco-650w", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 5500, originalPrice: 6200, inStock: true, url: "https://www.ryans.com/antec-neoeco-650w", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 5900, inStock: true, url: "https://www.techlandbd.com/antec-neoeco-650w", lastUpdated: "2026-03-28" },
      { shop: "PotakaIT", price: 5600, inStock: true, url: "https://potakait.com/antec-neoeco-650w", lastUpdated: "2026-03-28" },
      { shop: "ComputerImporter", price: 5400, originalPrice: 5900, inStock: true, url: "https://computerimporter.com/antec-neoeco-650w", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── Casings (3) ───────────────────────────────────────────────────
  {
    id: "p29",
    name: "NZXT H7 Flow Mid-Tower Case",
    slug: "nzxt-h7-flow",
    category: "casing",
    brand: "NZXT",
    image: "",
    specs: { "Form Factor": "Mid-Tower", "Motherboard Support": "ATX, mATX, ITX", "Drive Bays": "2x 3.5\", 2x 2.5\"", "Fan Support": "Up to 10 fans", "Radiator Support": "Up to 360mm", "USB Ports": "1x USB-C, 2x USB-A" },
    rating: 4.6,
    reviewCount: 198,
    prices: [
      { shop: "Startech", price: 13500, inStock: true, url: "https://www.startech.com.bd/nzxt-h7-flow", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 14000, inStock: true, url: "https://www.ryans.com/nzxt-h7-flow", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 13200, originalPrice: 14500, inStock: true, url: "https://www.techlandbd.com/nzxt-h7-flow", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 13800, inStock: false, url: "https://www.binarylogic.com.bd/nzxt-h7-flow", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p30",
    name: "Deepcool CH510 Mid-Tower Case",
    slug: "deepcool-ch510",
    category: "casing",
    brand: "Deepcool",
    image: "",
    specs: { "Form Factor": "Mid-Tower", "Motherboard Support": "ATX, mATX, ITX", "Drive Bays": "2x 3.5\", 2x 2.5\"", "Fan Support": "Up to 7 fans", "Radiator Support": "Up to 360mm top, 280mm front", "USB Ports": "1x USB-C, 1x USB-A" },
    rating: 4.5,
    reviewCount: 145,
    prices: [
      { shop: "Startech", price: 6800, originalPrice: 7500, inStock: true, url: "https://www.startech.com.bd/deepcool-ch510", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 7200, inStock: true, url: "https://www.ryans.com/deepcool-ch510", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 6600, originalPrice: 7200, inStock: true, url: "https://www.techlandbd.com/deepcool-ch510", lastUpdated: "2026-03-28" },
      { shop: "Skyland", price: 7000, inStock: true, url: "https://www.skyland.com.bd/deepcool-ch510", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 6900, inStock: true, url: "https://www.nexus.com.bd/deepcool-ch510", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p31",
    name: "Antec AX90 Mid-Tower Case",
    slug: "antec-ax90",
    category: "casing",
    brand: "Antec",
    image: "",
    specs: { "Form Factor": "Mid-Tower", "Motherboard Support": "ATX, mATX, ITX", "Drive Bays": "2x 3.5\", 3x 2.5\"", "Fan Support": "Up to 8 fans", "Radiator Support": "Up to 360mm front", "USB Ports": "2x USB-A" },
    rating: 4.3,
    reviewCount: 176,
    prices: [
      { shop: "Startech", price: 5200, inStock: true, url: "https://www.startech.com.bd/antec-ax90", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 5500, inStock: true, url: "https://www.ryans.com/antec-ax90", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 5000, originalPrice: 5500, inStock: true, url: "https://www.techlandbd.com/antec-ax90", lastUpdated: "2026-03-28" },
      { shop: "PCHouse", price: 5100, inStock: true, url: "https://www.pchouse.com.bd/antec-ax90", lastUpdated: "2026-03-28" },
      { shop: "PotakaIT", price: 5300, inStock: true, url: "https://potakait.com/antec-ax90", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── CPU Coolers (3) ───────────────────────────────────────────────
  {
    id: "p32",
    name: "Noctua NH-D15 CPU Cooler",
    slug: "noctua-nh-d15",
    category: "cooler",
    brand: "Noctua",
    image: "",
    specs: { Type: "Air Cooler", Height: "165mm", "Fan Size": "2x 150mm", TDP: "250W", Socket: "LGA1700, AM5, AM4", Noise: "24.6 dB(A)" },
    rating: 4.9,
    reviewCount: 512,
    prices: [
      { shop: "Startech", price: 12500, inStock: true, url: "https://www.startech.com.bd/noctua-nh-d15", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 12200, originalPrice: 13000, inStock: true, url: "https://www.techlandbd.com/noctua-nh-d15", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 12800, inStock: true, url: "https://www.ryans.com/noctua-nh-d15", lastUpdated: "2026-03-28" },
      { shop: "UltraTech", price: 13200, inStock: false, url: "https://www.ultratech.com.bd/noctua-nh-d15", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p33",
    name: "DeepCool AK620 CPU Cooler",
    slug: "deepcool-ak620",
    category: "cooler",
    brand: "DeepCool",
    image: "",
    specs: { Type: "Air Cooler", Height: "160mm", "Fan Size": "2x 120mm FK120", TDP: "260W", Socket: "LGA1700, AM5, AM4", Noise: "28 dB(A)" },
    rating: 4.7,
    reviewCount: 287,
    prices: [
      { shop: "Startech", price: 5800, originalPrice: 6500, inStock: true, url: "https://www.startech.com.bd/deepcool-ak620", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 6000, inStock: true, url: "https://www.ryans.com/deepcool-ak620", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 5600, originalPrice: 6200, inStock: true, url: "https://www.techlandbd.com/deepcool-ak620", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 5900, inStock: true, url: "https://www.binarylogic.com.bd/deepcool-ak620", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 5700, inStock: true, url: "https://www.nexus.com.bd/deepcool-ak620", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p34",
    name: "NZXT Kraken X63 280mm AIO Liquid Cooler",
    slug: "nzxt-kraken-x63",
    category: "cooler",
    brand: "NZXT",
    image: "",
    specs: { Type: "AIO Liquid Cooler", "Radiator Size": "280mm", "Fan Size": "2x 140mm", TDP: "300W+", Socket: "LGA1700, AM5, AM4", Noise: "21-36 dB(A)" },
    rating: 4.6,
    reviewCount: 198,
    prices: [
      { shop: "Startech", price: 13800, originalPrice: 15000, inStock: true, url: "https://www.startech.com.bd/nzxt-kraken-x63", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 14200, inStock: true, url: "https://www.ryans.com/nzxt-kraken-x63", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 13500, originalPrice: 14800, inStock: true, url: "https://www.techlandbd.com/nzxt-kraken-x63", lastUpdated: "2026-03-28" },
      { shop: "Skyland", price: 14500, inStock: false, url: "https://www.skyland.com.bd/nzxt-kraken-x63", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── Monitors (3) ─────────────────────────────────────────────────
  {
    id: "p35",
    name: "LG 27GP850-B 27\" QHD 165Hz Gaming Monitor",
    slug: "lg-27gp850-b",
    category: "monitor",
    brand: "LG",
    image: "",
    specs: { "Screen Size": "27\"", Resolution: "2560x1440 (QHD)", "Refresh Rate": "165Hz", "Panel Type": "Nano IPS", "Response Time": "1ms", HDR: "HDR400" },
    rating: 4.7,
    reviewCount: 289,
    prices: [
      { shop: "Startech", price: 38500, originalPrice: 42000, inStock: true, url: "https://www.startech.com.bd/lg-27gp850-b", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 39000, inStock: true, url: "https://www.ryans.com/lg-27gp850-b", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 37800, originalPrice: 40000, inStock: true, url: "https://www.techlandbd.com/lg-27gp850-b", lastUpdated: "2026-03-28" },
      { shop: "UltraTech", price: 39500, inStock: true, url: "https://www.ultratech.com.bd/lg-27gp850-b", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p36",
    name: "Samsung Odyssey G5 27\" QHD 165Hz Gaming Monitor",
    slug: "samsung-odyssey-g5-27",
    category: "monitor",
    brand: "Samsung",
    image: "",
    specs: { "Screen Size": "27\"", Resolution: "2560x1440 (QHD)", "Refresh Rate": "165Hz", "Panel Type": "VA", "Response Time": "1ms", HDR: "HDR10" },
    rating: 4.5,
    reviewCount: 345,
    prices: [
      { shop: "Startech", price: 27500, inStock: true, url: "https://www.startech.com.bd/samsung-odyssey-g5-27", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 26800, originalPrice: 29000, inStock: true, url: "https://www.ryans.com/samsung-odyssey-g5-27", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 27200, inStock: true, url: "https://www.techlandbd.com/samsung-odyssey-g5-27", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 28000, inStock: true, url: "https://www.binarylogic.com.bd/samsung-odyssey-g5-27", lastUpdated: "2026-03-28" },
      { shop: "PCHouse", price: 26500, originalPrice: 28500, inStock: true, url: "https://www.pchouse.com.bd/samsung-odyssey-g5-27", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p37",
    name: "ASUS TUF Gaming VG27AQ1A 27\" QHD 170Hz Monitor",
    slug: "asus-tuf-vg27aq1a",
    category: "monitor",
    brand: "ASUS",
    image: "",
    specs: { "Screen Size": "27\"", Resolution: "2560x1440 (QHD)", "Refresh Rate": "170Hz", "Panel Type": "IPS", "Response Time": "1ms MPRT", HDR: "HDR10" },
    rating: 4.6,
    reviewCount: 212,
    prices: [
      { shop: "Startech", price: 33500, originalPrice: 36000, inStock: true, url: "https://www.startech.com.bd/asus-tuf-vg27aq1a", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 34200, inStock: true, url: "https://www.ryans.com/asus-tuf-vg27aq1a", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 33000, originalPrice: 35500, inStock: true, url: "https://www.techlandbd.com/asus-tuf-vg27aq1a", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 34500, inStock: false, url: "https://www.nexus.com.bd/asus-tuf-vg27aq1a", lastUpdated: "2026-03-28" },
      { shop: "Skyland", price: 33800, inStock: true, url: "https://www.skyland.com.bd/asus-tuf-vg27aq1a", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── Keyboards (2) ────────────────────────────────────────────────
  {
    id: "p38",
    name: "Keychron K8 Pro Wireless Mechanical Keyboard",
    slug: "keychron-k8-pro",
    category: "keyboard",
    brand: "Keychron",
    image: "",
    specs: { Layout: "TKL (87 Keys)", Switch: "Gateron G Pro Brown", Connectivity: "Bluetooth 5.1 + USB-C", Battery: "4000mAh", Backlight: "RGB", "Hot-Swappable": "Yes" },
    rating: 4.6,
    reviewCount: 134,
    prices: [
      { shop: "Startech", price: 9800, inStock: true, url: "https://www.startech.com.bd/keychron-k8-pro", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 10200, inStock: true, url: "https://www.ryans.com/keychron-k8-pro", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 9500, originalPrice: 10500, inStock: true, url: "https://www.techlandbd.com/keychron-k8-pro", lastUpdated: "2026-03-28" },
      { shop: "UltraTech", price: 10000, inStock: false, url: "https://www.ultratech.com.bd/keychron-k8-pro", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p39",
    name: "Royal Kludge RK84 Wireless Mechanical Keyboard",
    slug: "royal-kludge-rk84",
    category: "keyboard",
    brand: "Royal Kludge",
    image: "",
    specs: { Layout: "75% (84 Keys)", Switch: "RK Brown", Connectivity: "Bluetooth 5.0 + 2.4GHz + USB-C", Battery: "3750mAh", Backlight: "RGB", "Hot-Swappable": "Yes" },
    rating: 4.4,
    reviewCount: 267,
    prices: [
      { shop: "Startech", price: 5500, originalPrice: 6200, inStock: true, url: "https://www.startech.com.bd/royal-kludge-rk84", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 5800, inStock: true, url: "https://www.ryans.com/royal-kludge-rk84", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 5200, originalPrice: 5800, inStock: true, url: "https://www.techlandbd.com/royal-kludge-rk84", lastUpdated: "2026-03-28" },
      { shop: "PotakaIT", price: 5600, inStock: true, url: "https://potakait.com/royal-kludge-rk84", lastUpdated: "2026-03-28" },
      { shop: "ComputerImporter", price: 5300, inStock: true, url: "https://computerimporter.com/royal-kludge-rk84", lastUpdated: "2026-03-28" },
    ],
  },

  // ─── Mice (2) ──────────────────────────────────────────────────────
  {
    id: "p40",
    name: "Logitech G Pro X Superlight 2 Wireless Mouse",
    slug: "logitech-g-pro-x-superlight-2",
    category: "mouse",
    brand: "Logitech",
    image: "",
    specs: { Sensor: "HERO 2", DPI: "32,000", Weight: "60g", Battery: "95 hours", Connectivity: "LIGHTSPEED Wireless", Buttons: "5" },
    rating: 4.8,
    reviewCount: 234,
    prices: [
      { shop: "Startech", price: 13500, originalPrice: 15000, inStock: true, url: "https://www.startech.com.bd/logitech-superlight-2", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 14000, inStock: true, url: "https://www.ryans.com/logitech-superlight-2", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 13200, inStock: true, url: "https://www.techlandbd.com/logitech-superlight-2", lastUpdated: "2026-03-28" },
      { shop: "BinaryLogic", price: 13800, inStock: true, url: "https://www.binarylogic.com.bd/logitech-superlight-2", lastUpdated: "2026-03-28" },
    ],
  },
  {
    id: "p41",
    name: "Razer DeathAdder V3 Wired Gaming Mouse",
    slug: "razer-deathadder-v3",
    category: "mouse",
    brand: "Razer",
    image: "",
    specs: { Sensor: "Focus Pro 30K", DPI: "30,000", Weight: "59g", Connectivity: "Wired USB", "Cable Type": "Speedflex Cable", Buttons: "5" },
    rating: 4.7,
    reviewCount: 189,
    prices: [
      { shop: "Startech", price: 7800, inStock: true, url: "https://www.startech.com.bd/razer-deathadder-v3", lastUpdated: "2026-03-28" },
      { shop: "Ryans", price: 7500, originalPrice: 8200, inStock: true, url: "https://www.ryans.com/razer-deathadder-v3", lastUpdated: "2026-03-28" },
      { shop: "TechLand", price: 7900, inStock: true, url: "https://www.techlandbd.com/razer-deathadder-v3", lastUpdated: "2026-03-28" },
      { shop: "UltraTech", price: 8200, inStock: false, url: "https://www.ultratech.com.bd/razer-deathadder-v3", lastUpdated: "2026-03-28" },
      { shop: "Nexus", price: 7600, originalPrice: 8300, inStock: true, url: "https://www.nexus.com.bd/razer-deathadder-v3", lastUpdated: "2026-03-28" },
    ],
  },
];

// Generate a real search URL for a shop so "Buy" buttons actually work
const SHOP_SEARCH_URLS: Record<string, (q: string) => string> = {
  Startech: (q) => `https://www.startech.com.bd/product/search?search=${encodeURIComponent(q)}`,
  Ryans: (q) => `https://www.ryans.com/searchresult?term=${encodeURIComponent(q)}`,
  TechLand: (q) => `https://www.techlandbd.com/index.php?route=product/search&search=${encodeURIComponent(q)}`,
  BinaryLogic: (q) => `https://www.binarylogic.com.bd/search?q=${encodeURIComponent(q)}`,
  UltraTech: (q) => `https://www.ultratech.com.bd/search?q=${encodeURIComponent(q)}`,
  Skyland: (q) => `https://www.skyland.com.bd/search?q=${encodeURIComponent(q)}`,
  Nexus: (q) => `https://www.nexus.com.bd/search?q=${encodeURIComponent(q)}`,
  PCHouse: (q) => `https://www.pchouse.com.bd/search?q=${encodeURIComponent(q)}`,
  PotakaIT: (q) => `https://potakait.com/search?q=${encodeURIComponent(q)}`,
  ComputerImporter: (q) => `https://computerimporter.com/search?q=${encodeURIComponent(q)}`,
};

export function getShopUrl(shopName: string, productName: string, originalUrl?: string): string {
  // If the original URL actually works (from scraper), use it
  // Otherwise generate a search URL that will work
  const generator = SHOP_SEARCH_URLS[shopName];
  if (generator) return generator(productName);
  return originalUrl || "#";
}

export function getBestPrice(product: Product): { price: number; shop: string } {
  const inStockPrices = product.prices.filter((p) => p.inStock);
  if (inStockPrices.length === 0) return { price: product.prices[0].price, shop: product.prices[0].shop };
  const best = inStockPrices.reduce((min, p) => (p.price < min.price ? p : min), inStockPrices[0]);
  return { price: best.price, shop: best.shop };
}

export function getMaxDiscount(product: Product): number {
  let maxDiscount = 0;
  for (const p of product.prices) {
    if (p.originalPrice && p.originalPrice > p.price) {
      const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
      if (discount > maxDiscount) maxDiscount = discount;
    }
  }
  return maxDiscount;
}

export function formatPrice(price: number): string {
  return "৳" + price.toLocaleString("en-BD");
}

export function generatePriceHistory(product: Product): PriceHistory[] {
  const history: PriceHistory[] = [];
  const shops = product.prices.map((p) => p.shop);
  const baseDate = new Date("2026-01-01");

  for (let i = 0; i < 90; i += 3) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    for (const shop of shops.slice(0, 3)) {
      const basePrice = product.prices.find((p) => p.shop === shop)?.price || 0;
      const variance = Math.floor(Math.random() * (basePrice * 0.08)) - basePrice * 0.03;
      history.push({ date: dateStr, price: basePrice + variance, shop });
    }
  }
  return history;
}

export function searchProducts(query: string, category?: string): Product[] {
  let filtered = products;
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        Object.values(p.specs).some((v) => v.toLowerCase().includes(q))
    );
  }
  return filtered;
}
