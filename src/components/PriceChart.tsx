"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PriceHistory, SHOP_INFO, ShopName } from "@/lib/types";

const CHART_COLORS = ["#2563eb", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

export default function PriceChart({ history }: { history: PriceHistory[] }) {
  // Transform data for recharts: group by date
  const dateMap = new Map<string, Record<string, number>>();
  const shops = new Set<string>();

  for (const h of history) {
    shops.add(h.shop);
    if (!dateMap.has(h.date)) dateMap.set(h.date, {});
    dateMap.get(h.date)![h.shop] = h.price;
  }

  const data = Array.from(dateMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, prices]) => ({ date: date.slice(5), ...prices }));

  const shopList = Array.from(shops);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="var(--muted)" />
          <YAxis
            tick={{ fontSize: 11 }}
            stroke="var(--muted)"
            tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--card-border)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value, name) => [
              `৳${Number(value).toLocaleString()}`,
              SHOP_INFO[String(name) as ShopName]?.name || String(name),
            ]}
          />
          <Legend
            formatter={(value: string) => SHOP_INFO[value as ShopName]?.name || value}
            wrapperStyle={{ fontSize: "12px" }}
          />
          {shopList.map((shop, i) => (
            <Line
              key={shop}
              type="monotone"
              dataKey={shop}
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
