import Link from "next/link";
import { Cpu, Code2, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">PCBest</span>
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Find the best PC component prices across all major shops in Bangladesh. Compare, build, and save.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted hover:text-primary transition">All Products</Link></li>
              <li><Link href="/build" className="text-muted hover:text-primary transition">PC Builder</Link></li>
              <li><Link href="/compare" className="text-muted hover:text-primary transition">Compare</Link></li>
              <li><Link href="/deals" className="text-muted hover:text-primary transition">Best Deals</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=processor" className="text-muted hover:text-primary transition">Processors</Link></li>
              <li><Link href="/products?category=gpu" className="text-muted hover:text-primary transition">Graphics Cards</Link></li>
              <li><Link href="/products?category=ram" className="text-muted hover:text-primary transition">RAM</Link></li>
              <li><Link href="/products?category=motherboard" className="text-muted hover:text-primary transition">Motherboards</Link></li>
              <li><Link href="/products?category=ssd" className="text-muted hover:text-primary transition">SSDs</Link></li>
              <li><Link href="/products?category=monitor" className="text-muted hover:text-primary transition">Monitors</Link></li>
            </ul>
          </div>

          {/* Shops */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Shops We Track</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted">Star Tech</span></li>
              <li><span className="text-muted">Ryans Computers</span></li>
              <li><span className="text-muted">TechLand BD</span></li>
              <li><span className="text-muted">Binary Logic</span></li>
              <li><span className="text-muted">Ultra Technology</span></li>
              <li><span className="text-muted">+ 5 more shops</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            &copy; 2026 PCBest. All prices are sourced from respective shop websites and may vary.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs text-muted hover:text-primary transition">About</Link>
            <a
              href="https://github.com/NitPaul/pcbest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <span className="text-xs text-muted flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-danger fill-danger" /> in BD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
