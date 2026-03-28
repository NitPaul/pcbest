-- PCBest Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50),
  component_type VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  normalized_name VARCHAR(500),
  category_id UUID REFERENCES categories(id),
  brand VARCHAR(100),
  specs JSONB DEFAULT '{}',
  image_url TEXT,
  rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prices table (stores price from each shop)
CREATE TABLE IF NOT EXISTS prices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  shop_name VARCHAR(100) NOT NULL,
  shop_url TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  in_stock BOOLEAN DEFAULT true,
  last_scraped TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Price history table (for tracking price trends)
CREATE TABLE IF NOT EXISTS price_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  shop_name VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  recorded_at DATE DEFAULT CURRENT_DATE
);

-- Saved PC builds table
CREATE TABLE IF NOT EXISTS builds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  components JSONB NOT NULL DEFAULT '[]',
  total_price INTEGER DEFAULT 0,
  share_slug VARCHAR(50) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_normalized ON products(normalized_name);
CREATE INDEX IF NOT EXISTS idx_prices_product ON prices(product_id);
CREATE INDEX IF NOT EXISTS idx_prices_shop ON prices(shop_name);
CREATE INDEX IF NOT EXISTS idx_price_history_product ON price_history(product_id);
CREATE INDEX IF NOT EXISTS idx_price_history_date ON price_history(recorded_at);
CREATE INDEX IF NOT EXISTS idx_builds_share ON builds(share_slug);

-- Insert default categories
INSERT INTO categories (name, slug, icon, component_type) VALUES
  ('Processor', 'processor', 'Cpu', 'processor'),
  ('Motherboard', 'motherboard', 'CircuitBoard', 'motherboard'),
  ('RAM', 'ram', 'MemoryStick', 'ram'),
  ('Graphics Card', 'gpu', 'Monitor', 'gpu'),
  ('SSD', 'ssd', 'HardDrive', 'ssd'),
  ('HDD', 'hdd', 'Database', 'hdd'),
  ('Power Supply', 'psu', 'Zap', 'psu'),
  ('Casing', 'casing', 'Box', 'casing'),
  ('CPU Cooler', 'cooler', 'Fan', 'cooler'),
  ('Monitor', 'monitor', 'MonitorSmartphone', 'monitor'),
  ('Keyboard', 'keyboard', 'Keyboard', 'keyboard'),
  ('Mouse', 'mouse', 'Mouse', 'mouse')
ON CONFLICT (slug) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE builds ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read prices" ON prices FOR SELECT USING (true);
CREATE POLICY "Public read price history" ON price_history FOR SELECT USING (true);
CREATE POLICY "Public read builds" ON builds FOR SELECT USING (true);
CREATE POLICY "Public insert builds" ON builds FOR INSERT WITH CHECK (true);
