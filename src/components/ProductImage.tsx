"use client";

import { useState } from "react";
import { Package } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  processor: "#e94560",
  motherboard: "#ff6b35",
  ram: "#ffd700",
  gpu: "#76b900",
  ssd: "#2196f3",
  hdd: "#00bcd4",
  psu: "#f59e0b",
  casing: "#9c27b0",
  cooler: "#8B4513",
  monitor: "#a50034",
  keyboard: "#ff4081",
  mouse: "#00e5ff",
};

export default function ProductImage({
  src,
  alt,
  category,
  className = "",
}: {
  src: string;
  alt: string;
  category?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const color = CATEGORY_COLORS[category || ""] || "#2563eb";

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br text-white ${className}`}
        style={{
          background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
        }}
      >
        <Package className="w-12 h-12 mb-2" style={{ color }} />
        <span
          className="text-xs font-medium text-center px-2 leading-tight max-w-[80%]"
          style={{ color }}
        >
          {alt.length > 40 ? alt.slice(0, 40) + "..." : alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}
