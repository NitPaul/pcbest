import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import ThemeProvider from "@/components/ThemeProvider";
import DataProvider from "@/components/DataProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PCBest - Best PC Component Prices in Bangladesh",
    template: "%s | PCBest",
  },
  description:
    "Compare PC component prices across 10+ shops in Bangladesh. Find the best deals on processors, GPUs, RAM, SSDs & more. Build your dream PC at the lowest price.",
  keywords: [
    "PC components Bangladesh",
    "computer price BD",
    "best PC price",
    "Startech price",
    "Ryans price",
    "PC builder Bangladesh",
    "GPU price BD",
    "RAM price Bangladesh",
    "processor price BD",
  ],
  openGraph: {
    title: "PCBest - Best PC Component Prices in Bangladesh",
    description: "Compare prices across 10+ BD shops. Build your dream PC at the lowest price.",
    type: "website",
    locale: "en_BD",
    siteName: "PCBest",
  },
  twitter: {
    card: "summary_large_image",
    title: "PCBest - Best PC Component Prices in Bangladesh",
    description: "Compare prices across 10+ BD shops. Build your dream PC at the lowest price.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <DataProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <AIChatbot />
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
