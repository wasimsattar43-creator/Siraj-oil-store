-- PostgreSQL Database Schema for Siraj Oil Store E-Commerce Platform
-- Compatible with PostgreSQL 13+, Cloud SQL, Supabase, Neon, AWS RDS

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Brands Table
CREATE TABLE IF NOT EXISTS brands (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    country VARCHAR(80),
    description TEXT,
    is_authorized_reseller BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    brand_id VARCHAR(64) REFERENCES brands(id) ON DELETE RESTRICT,
    brand_name VARCHAR(120) NOT NULL,
    category_id VARCHAR(64) REFERENCES categories(id) ON DELETE RESTRICT,
    category_name VARCHAR(120) NOT NULL,
    viscosity VARCHAR(40) NOT NULL,
    oil_type VARCHAR(60) NOT NULL,
    pack_size VARCHAR(50) NOT NULL,
    price_pkr NUMERIC(12, 2) NOT NULL CHECK (price_pkr >= 0),
    original_price_pkr NUMERIC(12, 2),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image TEXT NOT NULL,
    dabba_color VARCHAR(60) DEFAULT 'Royal Blue',
    api_grade VARCHAR(80) NOT NULL,
    acea VARCHAR(80),
    ilsac VARCHAR(80),
    jaso VARCHAR(80),
    drain_interval VARCHAR(80),
    description TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    compatible_vehicles JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT false,
    is_best_seller BOOLEAN DEFAULT false,
    batch_code VARCHAR(80),
    rating NUMERIC(3, 2) DEFAULT 4.90,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for product search & filters
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_viscosity ON products(viscosity);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price_pkr);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);

-- 4. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(64) PRIMARY KEY,
    full_name VARCHAR(160) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(160),
    city VARCHAR(80) NOT NULL,
    address TEXT NOT NULL,
    total_orders INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(160) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    customer_email VARCHAR(160),
    delivery_city VARCHAR(80) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_instructions TEXT,
    subtotal_pkr NUMERIC(12, 2) NOT NULL,
    discount_pkr NUMERIC(12, 2) DEFAULT 0,
    shipping_fee_pkr NUMERIC(12, 2) NOT NULL,
    total_pkr NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(40) NOT NULL, -- 'cod', 'bank_transfer', 'online_gateway'
    payment_status VARCHAR(40) NOT NULL DEFAULT 'pending',
    order_status VARCHAR(40) NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled'
    tracking_number VARCHAR(100),
    courier_name VARCHAR(100),
    estimated_delivery_days VARCHAR(50),
    idempotency_key VARCHAR(120),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(64) PRIMARY KEY,
    order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    brand_name VARCHAR(120) NOT NULL,
    viscosity VARCHAR(40) NOT NULL,
    pack_size VARCHAR(50) NOT NULL,
    price_pkr NUMERIC(12, 2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    image TEXT
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- 7. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(64) PRIMARY KEY,
    order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    method VARCHAR(40) NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'pending',
    amount_pkr NUMERIC(12, 2) NOT NULL,
    reference_code VARCHAR(120),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Inventory Logs Table
CREATE TABLE IF NOT EXISTS inventory_logs (
    id VARCHAR(64) PRIMARY KEY,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    change_type VARCHAR(50) NOT NULL, -- 'order_sale', 'restock', 'adjustment', 'cancellation_restock'
    quantity_change INTEGER NOT NULL,
    previous_stock INTEGER NOT NULL,
    new_stock INTEGER NOT NULL,
    notes TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Wholesale & Bulk Inquiries Table
CREATE TABLE IF NOT EXISTS wholesale_inquiries (
    id VARCHAR(64) PRIMARY KEY,
    full_name VARCHAR(160) NOT NULL,
    business_name VARCHAR(200) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    city VARCHAR(80) NOT NULL,
    products_interested TEXT NOT NULL,
    estimated_monthly_volume VARCHAR(100) NOT NULL,
    notes TEXT,
    status VARCHAR(40) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(64) PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(160) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'super_admin',
    email VARCHAR(160) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
