"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { products } from "@/lib/data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Best gaming PC under 80,000 BDT?",
  "Which GPU is best for 1440p?",
  "Recommend a budget motherboard",
  "DDR4 vs DDR5 for gaming?",
];

function generateAIResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("budget") && q.includes("gaming") || q.includes("under 80") || q.includes("80,000") || q.includes("80000")) {
    return `For a budget gaming PC under ৳80,000, I'd recommend:

**Processor:** AMD Ryzen 5 7600X (~৳22,200) - Great value for gaming
**Motherboard:** GIGABYTE B760M AORUS ELITE AX (~৳17,900)
**RAM:** Kingston Fury Beast DDR5 16GB (~৳5,400)
**SSD:** Samsung 990 Pro 1TB (~৳11,200)
**PSU:** A 650W 80+ Bronze (~৳6,000)
**Case:** Budget ATX case (~৳4,000)

**Total: ~৳66,700** - Leaves room for a used GPU!

Check the PC Builder page to customize this build with live prices.`;
  }

  if (q.includes("gpu") || q.includes("graphics") || q.includes("1440p") || q.includes("4k")) {
    const gpus = products.filter(p => p.category === "gpu");
    const gpuList = gpus.map(g => {
      const prices = g.prices.filter(p => p.inStock);
      const best = prices.reduce((min, p) => p.price < min.price ? p : min, prices[0]);
      return `- **${g.name}**: From ৳${best.price.toLocaleString()} at ${best.shop}`;
    }).join("\n");

    return `For **1440p gaming**, both options are excellent:\n\n${gpuList}\n\nThe **RTX 4070 Super** offers better ray tracing and DLSS 3. The **RX 7800 XT** has more VRAM (16GB vs 12GB) and is often cheaper.\n\n**My pick:** RX 7800 XT for pure rasterization value, RTX 4070 Super if you want DLSS and ray tracing.`;
  }

  if (q.includes("motherboard") || q.includes("mobo")) {
    return `Here are the best budget motherboards available:\n\n- **GIGABYTE B760M AORUS ELITE AX** (Intel LGA1700) - Best price: ৳17,900 at PC House BD. WiFi 6E included!\n- **MSI MAG B650 TOMAHAWK WIFI** (AMD AM5) - Best price: ৳25,500 at Star Tech. Great VRM for Ryzen 7000.\n\n**Tip:** Match your motherboard socket with your CPU - AM5 for Ryzen 7000, LGA1700 for 12th/13th/14th Gen Intel.`;
  }

  if (q.includes("ddr4") || q.includes("ddr5") || q.includes("ram")) {
    return `**DDR4 vs DDR5 for Gaming:**\n\n| Feature | DDR4 | DDR5 |\n|---------|------|------|\n| Price | Cheaper | 20-40% more |\n| Gaming FPS | ~2-5% less | Slight edge |\n| Bandwidth | Up to 3600MHz | 5600MHz+ |\n| Future-proof | No (AM4/older) | Yes (AM5/LGA1700) |\n\n**Verdict:** If building new, go **DDR5** - prices have dropped significantly. Best value: **Kingston Fury Beast DDR5 16GB** at ৳5,400 from Computer Importer.\n\nFor 32GB kits, the **Corsair Vengeance DDR5 32GB** at ৳13,200 from Binary Logic is excellent.`;
  }

  if (q.includes("processor") || q.includes("cpu") || q.includes("ryzen") || q.includes("intel")) {
    return `**Top Processor Picks Right Now:**\n\n**Budget:** AMD Ryzen 5 7600X - ৳22,200 (PC House)\n**Mid-range:** Intel Core i5-14600K - ৳31,500 (Nexus)\n**Gaming King:** AMD Ryzen 7 7800X3D - ৳42,500 (Star Tech)\n**Productivity:** Intel Core i7-14700K - ৳47,800 (TechLand)\n\nThe **Ryzen 7 7800X3D** is the undisputed gaming champion thanks to its 3D V-Cache. For mixed workloads, the **i7-14700K** offers 20 cores at great value.`;
  }

  if (q.includes("monitor") || q.includes("display")) {
    return `**Monitor Recommendation:**\n\nThe **LG 27GP850-B** is a fantastic choice:\n- 27" QHD (2560x1440)\n- 165Hz refresh rate\n- 1ms Nano IPS panel\n- HDR400 support\n- Best price: **৳37,800** at TechLand BD\n\nPerfect for gaming and content creation!`;
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return `Hello! I'm your PC building assistant. I can help you with:\n\n- **Component recommendations** based on your budget\n- **Price comparisons** across BD shops\n- **Compatibility checks** for your build\n- **Performance advice** for gaming, editing, etc.\n\nWhat are you looking to build today?`;
  }

  return `Great question! Based on the current prices across BD shops, here are some tips:\n\n1. **Best deals right now:** Check our Deals page for products with the biggest discounts\n2. **PC Builder:** Use our PC Builder tool to assemble a complete build with real-time prices\n3. **Price tracking:** We update prices daily from 10+ shops\n\nCan you be more specific about what you're looking for? I can help with:\n- Budget builds (tell me your budget)\n- Specific component recommendations\n- Compatibility questions\n- Performance comparisons`;
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
