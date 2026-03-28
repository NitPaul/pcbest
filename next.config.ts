import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "www.startech.com.bd" },
      { protocol: "https", hostname: "www.ryans.com" },
      { protocol: "https", hostname: "www.techlandbd.com" },
    ],
  },
};

export default nextConfig;
