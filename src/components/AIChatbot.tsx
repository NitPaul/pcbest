"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { products } from "@/lib/data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Best gaming PC under ৳80,000?",
  "Which GPU for 1440p gaming?",
  "Budget motherboard recommendation",
  "DDR4 vs DDR5 for gaming?",
  "Best deals right now",
  "Help me build a PC",
];

// Helper: find the best (lowest) in-stock price for a product
function getBestInStockPrice(product: typeof products[0]) {
  const inStock = product.prices.filter(p => p.inStock);
  if (inStock.length === 0) return null;
  return inStock.reduce((min, p) => p.price < min.price ? p : min, inStock[0]);
}

// Helper: format a product line with best price
function formatProduct(product: typeof products[0]): string {
  const best = getBestInStockPrice(product);
  if (!best) return `- **${product.name}**: Currently out of stock`;
  return `- **${product.name}** — ৳${best.price.toLocaleString()} at ${best.shop}`;
}

// Helper: get products with active discounts
function getDeals() {
  return products
    .map(p => {
      let maxDiscount = 0;
      let bestDeal: { shop: string; price: number; originalPrice: number } | null = null;
      for (const pr of p.prices) {
        if (pr.originalPrice && pr.originalPrice > pr.price && pr.inStock) {
          const disc = Math.round(((pr.originalPrice - pr.price) / pr.originalPrice) * 100);
          if (disc > maxDiscount) {
            maxDiscount = disc;
            bestDeal = { shop: pr.shop, price: pr.price, originalPrice: pr.originalPrice };
          }
        }
      }
      return bestDeal ? { product: p, discount: maxDiscount, deal: bestDeal } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b!.discount - a!.discount) as { product: typeof products[0]; discount: number; deal: { shop: string; price: number; originalPrice: number } }[];
}

// Helper: find cheapest products overall
function getCheapestProducts(count = 5) {
  return [...products]
    .map(p => {
      const best = getBestInStockPrice(p);
      return best ? { product: p, price: best.price, shop: best.shop } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a!.price - b!.price)
    .slice(0, count) as { product: typeof products[0]; price: number; shop: string }[];
}

// Helper: get top pick per category
function getTopPicks() {
  const categoryMap = new Map<string, typeof products[0]>();
  for (const p of products) {
    const existing = categoryMap.get(p.category);
    if (!existing || (p.rating ?? 0) > (existing.rating ?? 0)) {
      categoryMap.set(p.category, p);
    }
  }
  return categoryMap;
}

function generateAIResponse(query: string): string {
  const q = query.toLowerCase();

  // --- Greetings ---
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("assalamualaikum") || q.includes("salam")) {
    return `Hello! I'm your PC building assistant. I can help you with:

- **Component recommendations** based on your budget
- **Price comparisons** across 10 BD shops
- **Compatibility checks** for your build
- **Build guides** for every budget tier
- **Deal alerts** on discounted components

What are you looking to build today?`;
  }

  // --- Thanks ---
  if (q.includes("thank") || q.includes("thanks") || q.includes("thx") || q.includes("ty") || q.includes("ধন্যবাদ")) {
    return `You're welcome! Happy to help. If you have any more questions about PC components, builds, or prices, just ask.

Good luck with your build! 🖥️`;
  }

  // --- Build / PC Builder ---
  if (q.includes("build") || q.includes("pc build") || q.includes("builder") || q.includes("assemble")) {
    const cpuBest = getBestInStockPrice(products.find(p => p.slug === "amd-ryzen-5-7600x")!);
    const moboBest = getBestInStockPrice(products.find(p => p.slug === "gigabyte-b760m-aorus-elite-ax")!);
    const ramBest = getBestInStockPrice(products.find(p => p.slug === "kingston-fury-beast-ddr5-16gb")!);
    const ssdBest = getBestInStockPrice(products.find(p => p.slug === "samsung-990-pro-1tb")!);
    const psuBest = getBestInStockPrice(products.find(p => p.slug === "corsair-rm850x")!);
    const caseBest = getBestInStockPrice(products.find(p => p.slug === "nzxt-h7-flow")!);

    return `Head over to the **PC Builder** page to assemble a complete system with live prices!

Here are sample builds for each budget tier:

**Budget Build (~৳60,000):**
- Ryzen 5 7600X — ৳${cpuBest?.price.toLocaleString()}
- B760M AORUS ELITE AX — ৳${moboBest?.price.toLocaleString()}
- 16GB DDR5 — ৳${ramBest?.price.toLocaleString()}
- 1TB NVMe SSD — ৳${ssdBest?.price.toLocaleString()}

**Mid-Range Build (~৳1,30,000):**
Add an **RTX 4070 Super**, 850W PSU, and a quality case.

**High-End Build (~৳2,00,000+):**
Ryzen 7 7800X3D + RTX 4070 Super + 32GB DDR5 + premium everything.

Use the **PC Builder** to customize any of these with real-time pricing!`;
  }

  // --- Budget gaming PC ---
  if ((q.includes("budget") && q.includes("gaming")) || q.includes("under 80") || q.includes("80,000") || q.includes("80000") || q.includes("৳80")) {
    const cpu = products.find(p => p.slug === "amd-ryzen-5-7600x")!;
    const mobo = products.find(p => p.slug === "gigabyte-b760m-aorus-elite-ax")!;
    const ram = products.find(p => p.slug === "kingston-fury-beast-ddr5-16gb")!;
    const ssd = products.find(p => p.slug === "samsung-990-pro-1tb")!;
    const psu = products.find(p => p.slug === "corsair-rm850x")!;
    const casing = products.find(p => p.slug === "nzxt-h7-flow")!;

    const cpuP = getBestInStockPrice(cpu)!;
    const moboP = getBestInStockPrice(mobo)!;
    const ramP = getBestInStockPrice(ram)!;
    const ssdP = getBestInStockPrice(ssd)!;
    const psuP = getBestInStockPrice(psu)!;
    const caseP = getBestInStockPrice(casing)!;
    const total = cpuP.price + moboP.price + ramP.price + ssdP.price + psuP.price + caseP.price;

    return `For a budget gaming PC under ৳80,000, here's my recommendation:

**Processor:** ${cpu.name} — ৳${cpuP.price.toLocaleString()} (${cpuP.shop})
**Motherboard:** ${mobo.name} — ৳${moboP.price.toLocaleString()} (${moboP.shop})
**RAM:** ${ram.name} — ৳${ramP.price.toLocaleString()} (${ramP.shop})
**SSD:** ${ssd.name} — ৳${ssdP.price.toLocaleString()} (${ssdP.shop})
**PSU:** ${psu.name} — ৳${psuP.price.toLocaleString()} (${psuP.shop})
**Case:** ${casing.name} — ৳${caseP.price.toLocaleString()} (${caseP.shop})

**Total: ~৳${total.toLocaleString()}** — Leaves room for a GPU!

Check the **PC Builder** page to customize this build with live prices.`;
  }

  // --- Compare ---
  if (q.includes("compare") || q.includes("comparison") || q.includes("vs") || q.includes("versus") || q.includes("difference between")) {
    return `Our **Comparison** feature lets you compare up to 4 products side-by-side!

**How to use it:**
1. Browse any product category
2. Click the **compare icon** on products you want to compare
3. View specs, prices, and ratings side-by-side

**Popular comparisons:**
- RTX 4070 Super **vs** RX 7800 XT (GPU)
- Ryzen 7 7800X3D **vs** i5-14600K (CPU)
- DDR5 32GB kits: Corsair **vs** G.Skill

You can compare prices across all 10 shops to find the best deal!`;
  }

  // --- Cheap / Lowest Price ---
  if (q.includes("cheap") || q.includes("cheapest") || q.includes("lowest price") || q.includes("affordable") || q.includes("low budget") || q.includes("sasta")) {
    const cheapest = getCheapestProducts(5);
    const list = cheapest.map(c =>
      `- **${c.product.name}** — ৳${c.price.toLocaleString()} at ${c.shop}`
    ).join("\n");

    return `Here are the **cheapest components** currently in stock:

${list}

**Tips for saving money:**
- Check the **Deals** page for discounted items
- Compare prices across shops — the same product can vary by ৳1,000+
- Consider the Kingston Fury Beast DDR5 16GB for budget RAM
- The Seagate Barracuda 2TB HDD is great for mass storage on a budget`;
  }

  // --- Best / Recommend / Suggestion ---
  if (q.includes("best") && !q.includes("best deal") || q.includes("recommend") || q.includes("suggestion") || q.includes("top pick") || q.includes("which should")) {
    const picks = getTopPicks();
    const lines: string[] = [];
    const categoryLabels: Record<string, string> = {
      processor: "Processor", gpu: "Graphics Card", ram: "RAM", motherboard: "Motherboard",
      ssd: "SSD", hdd: "HDD", psu: "PSU", casing: "Case", cooler: "Cooler",
      monitor: "Monitor", keyboard: "Keyboard", mouse: "Mouse",
    };

    picks.forEach((product, cat) => {
      const best = getBestInStockPrice(product);
      if (best) {
        lines.push(`**${categoryLabels[cat] || cat}:** ${product.name} (⭐ ${product.rating}) — ৳${best.price.toLocaleString()}`);
      }
    });

    return `Here are the **top-rated picks** per category:

${lines.join("\n")}

These are based on user ratings and current availability. Want details on any specific category?`;
  }

  // --- GPU ---
  if (q.includes("gpu") || q.includes("graphics") || q.includes("1440p") || q.includes("4k") || q.includes("video card") || q.includes("graphic card")) {
    const gpus = products.filter(p => p.category === "gpu");
    const gpuList = gpus.map(g => formatProduct(g)).join("\n");

    return `For **1440p gaming**, both options are excellent:

${gpuList}

The **RTX 4070 Super** offers better ray tracing and DLSS 3. The **RX 7800 XT** has more VRAM (16GB vs 12GB) and is often cheaper.

**My pick:** RX 7800 XT for pure rasterization value, RTX 4070 Super if you want DLSS and ray tracing.`;
  }

  // --- CPU / Processor ---
  if (q.includes("processor") || q.includes("cpu") || q.includes("ryzen") || q.includes("intel")) {
    const cpus = products.filter(p => p.category === "processor");
    const cpuList = cpus.map(c => {
      const best = getBestInStockPrice(c);
      return best ? `- **${c.name}** (⭐ ${c.rating}) — ৳${best.price.toLocaleString()} at ${best.shop}` : null;
    }).filter(Boolean).join("\n");

    return `**Top Processor Picks Right Now:**

${cpuList}

**Budget:** AMD Ryzen 5 7600X — Best value for gaming
**Gaming King:** AMD Ryzen 7 7800X3D — Unbeatable with 3D V-Cache
**Productivity:** Intel Core i7-14700K — 20 cores for multitasking

Match your CPU socket with your motherboard — **AM5** for Ryzen 7000, **LGA1700** for Intel 12th/13th/14th Gen.`;
  }

  // --- Motherboard ---
  if (q.includes("motherboard") || q.includes("mobo") || q.includes("mainboard") || q.includes("b650") || q.includes("b760") || q.includes("x670") || q.includes("z790")) {
    const mobos = products.filter(p => p.category === "motherboard");
    const moboList = mobos.map(m => {
      const best = getBestInStockPrice(m);
      const socket = m.specs["Socket"] || "";
      return best ? `- **${m.name}** (${socket}) — ৳${best.price.toLocaleString()} at ${best.shop}` : null;
    }).filter(Boolean).join("\n");

    return `Here are the best motherboards available:

${moboList}

**Tip:** Match your motherboard socket with your CPU:
- **AM5** → Ryzen 7000 series (B650, X670)
- **LGA1700** → Intel 12th/13th/14th Gen (B760, Z790)

Both boards above include **WiFi 6E** — no need for a separate WiFi card!`;
  }

  // --- RAM ---
  if (q.includes("ddr4") || q.includes("ddr5") || q.includes("ram") || q.includes("memory")) {
    const rams = products.filter(p => p.category === "ram");
    const ramList = rams.map(r => formatProduct(r)).join("\n");

    return `**DDR4 vs DDR5 for Gaming:**

| Feature | DDR4 | DDR5 |
|---------|------|------|
| Price | Cheaper | 20-40% more |
| Gaming FPS | ~2-5% less | Slight edge |
| Bandwidth | Up to 3600MHz | 5600MHz+ |
| Future-proof | No (AM4/older) | Yes (AM5/LGA1700) |

**Available DDR5 kits:**
${ramList}

**Verdict:** If building new, go **DDR5** — prices have dropped significantly. Best value pick is the **Kingston Fury Beast DDR5 16GB**.`;
  }

  // --- SSD / Storage / NVMe ---
  if (q.includes("ssd") || q.includes("storage") || q.includes("nvme") || q.includes("m.2") || q.includes("hard drive") || q.includes("hdd")) {
    const ssds = products.filter(p => p.category === "ssd");
    const hdds = products.filter(p => p.category === "hdd");
    const ssdList = ssds.map(s => formatProduct(s)).join("\n");
    const hddList = hdds.map(h => formatProduct(h)).join("\n");

    return `**Storage Recommendations:**

**NVMe SSDs (Fast — for OS & games):**
${ssdList}

**HDDs (Bulk storage — for files & backups):**
${hddList}

**My advice:**
- Get at least a **1TB NVMe SSD** for your OS and games
- Add a **2TB HDD** if you need mass storage
- The **Samsung 990 Pro** has the fastest speeds (7450 MB/s read)
- The **WD Black SN850X 2TB** is the best value for large NVMe storage`;
  }

  // --- PSU / Power Supply ---
  if (q.includes("psu") || q.includes("power supply") || q.includes("watt") || q.includes("wattage") || q.includes("smps")) {
    const psus = products.filter(p => p.category === "psu");
    const psuList = psus.map(p => formatProduct(p)).join("\n");

    return `**Power Supply Recommendations:**

${psuList}

**Wattage Guide:**
- **550W** — Budget builds (Ryzen 5 + no GPU / low-end GPU)
- **650W** — Mid-range (i5/Ryzen 5 + RTX 4060/RX 7600)
- **750W** — High-end (i7/Ryzen 7 + RTX 4070 Super/RX 7800 XT)
- **850W+** — Enthusiast (i9/Ryzen 9 + RTX 4080/4090)

**Tips:**
- Always get **80+ Bronze** or higher efficiency
- **Fully modular** PSUs make cable management much easier
- The **Corsair RM850x** is excellent — 10-year warranty and fully modular!`;
  }

  // --- Case / Casing ---
  if (q.includes("case") || q.includes("casing") || q.includes("cabinet") || q.includes("chassis") || q.includes("tower")) {
    const cases = products.filter(p => p.category === "casing");
    const caseList = cases.map(c => {
      const best = getBestInStockPrice(c);
      return best ? `- **${c.name}** — ৳${best.price.toLocaleString()} at ${best.shop}\n  Supports: ${c.specs["Motherboard Support"] || "ATX, mATX"} | Radiator: ${c.specs["Radiator Support"] || "Up to 360mm"}` : null;
    }).filter(Boolean).join("\n");

    return `**Case Recommendations:**

${caseList}

**What to look for in a case:**
- **Airflow** — Mesh front panels are best for cooling
- **Size** — Mid-Tower fits most builds; Full-Tower for custom loops
- **Fan support** — At least 3x 120mm or 2x 140mm
- **Radiator support** — 240mm minimum for AIO coolers, 360mm for high-end
- **Cable management** — Look for cases with good routing space

The **NZXT H7 Flow** is a fantastic all-rounder with excellent airflow!`;
  }

  // --- Cooler / Cooling ---
  if (q.includes("cooler") || q.includes("cooling") || q.includes("fan") || q.includes("aio") || q.includes("heatsink") || q.includes("thermal")) {
    const coolers = products.filter(p => p.category === "cooler");
    const coolerList = coolers.map(c => {
      const best = getBestInStockPrice(c);
      return best ? `- **${c.name}** (${c.specs["Type"] || "Cooler"}) — ৳${best.price.toLocaleString()} at ${best.shop}\n  TDP: ${c.specs["TDP"] || "N/A"} | Noise: ${c.specs["Noise"] || "N/A"}` : null;
    }).filter(Boolean).join("\n");

    return `**CPU Cooler Recommendations:**

${coolerList}

**Air vs AIO Liquid Cooler:**
- **Air coolers** — Reliable, no pump failure risk, great value
- **AIO liquid** — Better aesthetics, slightly better thermals for high-TDP CPUs

**Which cooler do you need?**
- Ryzen 5 / i5 → Stock cooler is fine, or a budget tower cooler
- Ryzen 7 / i7 → **Noctua NH-D15** or a 240mm AIO
- Ryzen 9 / i9 → 280mm or 360mm AIO recommended

The **Noctua NH-D15** is legendary — near-AIO performance with zero pump risk!`;
  }

  // --- Monitor ---
  if (q.includes("monitor") || q.includes("display") || q.includes("screen") || q.includes("panel")) {
    const monitors = products.filter(p => p.category === "monitor");
    const monitorList = monitors.map(m => {
      const best = getBestInStockPrice(m);
      return best ? `- **${m.name}**\n  ${m.specs["Resolution"] || ""} | ${m.specs["Refresh Rate"] || ""} | ${m.specs["Panel Type"] || ""}\n  Best price: **৳${best.price.toLocaleString()}** at ${best.shop}` : null;
    }).filter(Boolean).join("\n");

    return `**Monitor Recommendations:**

${monitorList}

**Buying guide:**
- **1080p 144Hz** — Budget gaming, great for competitive titles
- **1440p 165Hz** — Sweet spot for quality + performance
- **4K 144Hz** — Premium, needs a powerful GPU (RTX 4080+)
- **IPS** panels have the best colors; **VA** has deeper blacks

Perfect for both gaming and content creation!`;
  }

  // --- Keyboard ---
  if (q.includes("keyboard") || q.includes("mechanical") || q.includes("switch") || q.includes("keycap") || q.includes("tkl")) {
    const keyboards = products.filter(p => p.category === "keyboard");
    const kbList = keyboards.map(k => {
      const best = getBestInStockPrice(k);
      return best ? `- **${k.name}**\n  Switch: ${k.specs["Switch"] || "N/A"} | Layout: ${k.specs["Layout"] || "N/A"} | ${k.specs["Connectivity"] || ""}\n  Best price: **৳${best.price.toLocaleString()}** at ${best.shop}` : null;
    }).filter(Boolean).join("\n");

    return `**Keyboard Picks:**

${kbList}

**Switch guide:**
- **Red/Linear** — Smooth, no bump. Best for gaming
- **Brown/Tactile** — Slight bump. Good for typing + gaming
- **Blue/Clicky** — Loud click. Best for typing enthusiasts

**Features to look for:**
- **Hot-swappable** — Swap switches without soldering
- **Wireless** — Bluetooth + USB-C for flexibility
- **PBT keycaps** — More durable than ABS

The **Keychron K8 Pro** is an excellent all-rounder with hot-swap and wireless!`;
  }

  // --- Mouse ---
  if (q.includes("mouse") || q.includes("gaming mouse") || q.includes("mice") || q.includes("dpi")) {
    const mice = products.filter(p => p.category === "mouse");
    const mouseList = mice.map(m => {
      const best = getBestInStockPrice(m);
      return best ? `- **${m.name}**\n  Sensor: ${m.specs["Sensor"] || "N/A"} | Weight: ${m.specs["Weight"] || "N/A"} | Battery: ${m.specs["Battery"] || "N/A"}\n  Best price: **৳${best.price.toLocaleString()}** at ${best.shop}` : null;
    }).filter(Boolean).join("\n");

    return `**Gaming Mouse Picks:**

${mouseList}

**What matters in a gaming mouse:**
- **Weight** — Lighter is better for FPS games (sub-70g is ideal)
- **Sensor** — Modern sensors (HERO 2, PAW3950) are all excellent
- **Wireless** — Top wireless mice have zero perceptible lag now
- **Shape** — This is personal preference; try before you buy if possible

The **Logitech G Pro X Superlight 2** at just 60g is the gold standard for competitive FPS gaming!`;
  }

  // --- Deals / Discounts ---
  if (q.includes("deal") || q.includes("discount") || q.includes("offer") || q.includes("sale") || q.includes("price drop") || q.includes("best deal")) {
    const deals = getDeals().slice(0, 5);
    if (deals.length === 0) {
      return `No major deals at the moment, but prices change daily! Check the **Deals** page regularly.`;
    }
    const dealList = deals.map(d =>
      `- **${d.product.name}** — ~~৳${d.deal.originalPrice.toLocaleString()}~~ **৳${d.deal.price.toLocaleString()}** (${d.discount}% off) at ${d.deal.shop}`
    ).join("\n");

    return `**Best Deals Right Now:**

${dealList}

Visit the **Deals** page for the full list of discounted products across all shops!

**Pro tip:** Prices fluctuate frequently. Add products to your wishlist to get notified of price drops.`;
  }

  // --- Compatibility ---
  if (q.includes("compatible") || q.includes("compatibility") || q.includes("fit") || q.includes("work with") || q.includes("socket")) {
    return `**Compatibility Checker:**

Our system automatically checks compatibility when you build a PC. Here's what we verify:

**CPU + Motherboard:**
- Socket match (AM5, LGA1700, etc.)
- Chipset support for your CPU generation

**RAM + Motherboard:**
- DDR4 vs DDR5 — they are **not** interchangeable
- Max supported speed and capacity

**GPU + Case:**
- GPU length vs case clearance
- PCIe slot availability

**PSU + System:**
- Total wattage requirement
- Required power connectors

**Cooler + Case:**
- Cooler height clearance
- Radiator size support

Use the **PC Builder** page — it will warn you about any compatibility issues automatically!`;
  }

  // --- Shop / Store / Where to buy ---
  if (q.includes("shop") || q.includes("store") || q.includes("where to buy") || q.includes("retailer") || q.includes("dokan")) {
    return `We track prices from **10 popular BD shops:**

1. **Startech** — startech.com.bd
2. **Ryans** — ryans.com
3. **TechLand** — techlandbd.com
4. **BinaryLogic** — binarylogic.com.bd
5. **UltraTech** — ultratech.com.bd
6. **Skyland** — skyland.com.bd
7. **Nexus** — nexus.com.bd
8. **PC House** — pchouse.com.bd
9. **Potaka IT** — potakait.com
10. **Computer Importer** — computerimporter.com

Prices are updated daily. The same product can vary by **৳1,000–5,000** across shops, so always compare before buying!`;
  }

  // --- Fallback ---
  return `Great question! Based on current prices across BD shops, here are some tips:

1. **Best deals right now:** Check our **Deals** page for products with the biggest discounts
2. **PC Builder:** Use our **PC Builder** tool to assemble a complete build with real-time prices
3. **Price tracking:** We update prices daily from **10+ shops**
4. **Compare:** Use the comparison tool to view specs side-by-side

Can you be more specific about what you're looking for? I can help with:
- **Budget builds** — Tell me your budget in BDT
- **Component picks** — CPU, GPU, RAM, SSD, PSU, case, cooler, peripherals
- **Compatibility** — Check if parts work together
- **Deals** — Find the best discounts right now
- **Shop info** — Which stores we track`;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your PC building assistant. Ask me about components, builds, or prices across Bangladesh shops. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const response = generateAIResponse(input);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] bg-card border border-card-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">PC Build Assistant</h3>
              <p className="text-white/70 text-xs">Powered by AI</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-primary/10" : "bg-accent/10"
                }`}>
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-primary" />
                  ) : (
                    <Bot className="w-4 h-4 text-accent" />
                  )}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-muted-bg rounded-bl-md"
                }`}>
                  <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br/>")
                  }} />
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="bg-muted-bg rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-muted" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s); }}
                  className="text-xs bg-muted-bg hover:bg-primary/10 hover:text-primary px-2.5 py-1.5 rounded-full transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 border-t border-card-border flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about PC components..."
              className="flex-1 text-sm px-3 py-2 rounded-lg bg-muted-bg border border-card-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
