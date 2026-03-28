export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  image: string;
  specs: Record<string, string>;
  prices: Price[];
  rating?: number;
  reviewCount?: number;
}

export interface Price {
  shop: ShopName;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  url: string;
  lastUpdated: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export interface PCBuildComponent {
  category: string;
  product: Product | null;
  required: boolean;
}

export interface PCBuild {
  id: string;
  name: string;
  components: PCBuildComponent[];
  totalPrice: number;
  createdAt: string;
}

export interface PriceHistory {
  date: string;
  price: number;
  shop: ShopName;
}

export type ShopName =
  | "Startech"
  | "Ryans"
  | "TechLand"
  | "BinaryLogic"
  | "UltraTech"
  | "Skyland"
  | "Nexus"
  | "PCHouse"
  | "PotakaIT"
  | "ComputerImporter";

export const SHOP_INFO: Record<ShopName, { name: string; url: string; logo: string; color: string }> = {
  Startech: { name: "Star Tech", url: "https://www.startech.com.bd", logo: "/shops/startech.png", color: "#E31E25" },
  Ryans: { name: "Ryans Computers", url: "https://www.ryans.com", logo: "/shops/ryans.png", color: "#00A651" },
  TechLand: { name: "TechLand BD", url: "https://www.techlandbd.com", logo: "/shops/techland.png", color: "#1A73E8" },
  BinaryLogic: { name: "Binary Logic", url: "https://www.binarylogic.com.bd", logo: "/shops/binarylogic.png", color: "#FF6B00" },
  UltraTech: { name: "Ultra Technology", url: "https://www.ultratech.com.bd", logo: "/shops/ultratech.png", color: "#6C2BD9" },
  Skyland: { name: "Skyland", url: "https://www.skyland.com.bd", logo: "/shops/skyland.png", color: "#0EA5E9" },
  Nexus: { name: "Nexus", url: "https://www.nexus.com.bd", logo: "/shops/nexus.png", color: "#10B981" },
  PCHouse: { name: "PC House BD", url: "https://www.pchouse.com.bd", logo: "/shops/pchouse.png", color: "#F59E0B" },
  PotakaIT: { name: "Potaka IT", url: "https://potakait.com", logo: "/shops/potakait.png", color: "#EF4444" },
  ComputerImporter: { name: "Computer Importer", url: "https://computerimporter.com", logo: "/shops/computerimporter.png", color: "#8B5CF6" },
};

export const COMPONENT_CATEGORIES = [
  { key: "processor", label: "Processor", required: true },
  { key: "motherboard", label: "Motherboard", required: true },
  { key: "ram", label: "RAM", required: true },
  { key: "gpu", label: "Graphics Card", required: false },
  { key: "ssd", label: "SSD", required: true },
  { key: "hdd", label: "HDD", required: false },
  { key: "psu", label: "Power Supply", required: true },
  { key: "casing", label: "Casing", required: true },
  { key: "cooler", label: "CPU Cooler", required: false },
  { key: "monitor", label: "Monitor", required: false },
] as const;
