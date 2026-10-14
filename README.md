# Siraj Oil Store — Multi-Brand Automotive Engine Oil E-Commerce Platform

A complete, modern, production-grade automotive e-commerce platform built for **Siraj Oil Store**, a premier Pakistan-based retailer and reseller of authentic engine oils, motorcycle lubricants, and commercial fleet fluids.

---

## 🏎️ Core Features

1. **Automotive Brand & Visual Identity**
   - Premium dark automotive design language with carbon textures, racing red accents, and high-visibility metallic styling.
   - Distinctive **Blue Dabba** signature series packaging highlighted across product cards, hero sections, and filters.
   - Professional Siraj Oil Store logo featuring an automotive oil-drop emblem and racing shield typography.

2. **Homepage & Interactive Vehicle Oil Advisor**
   - Announcement bar featuring genuine packaging guarantees and free shipping notices across Pakistan.
   - **Quick Viscosity & Vehicle Advisor**: Instant OEM viscosity recommendations for popular Pakistani vehicles (e.g., Suzuki Alto 660cc, Toyota Corolla 1.3/1.8, Honda Civic Turbo, Yamaha YBR 125, Honda CG 125, Toyota Hilux Revo diesel).
   - Featured authorized brands: Shell Helix, Mobil 1, Castrol, ZIC, TotalEnergies, Liqui Moly, Toyota Genuine, and Siraj Formula.
   - Wholesale & B2B inquiry form for workshops and commercial fleets.
   - Customer feedback from verified vehicle owners in Lahore, Karachi, Islamabad, and Faisalabad.

3. **Product Catalogue & Smart Filters**
   - Filters by Viscosity (`0W-20`, `5W-20`, `5W-30`, `5W-40`, `10W-40`, `15W-40`, `20W-50`).
   - Category filtering: Car Engine Oil (PCMO), Motorcycle 4T/2T, Heavy Duty Diesel, Fully Synthetic, Mineral High-Mileage, and Transmission Fluids.
   - One-click filter for **Blue Dabba Line Only**.
   - Search by brand, model, or vehicle compatibility with live suggestions.
   - Dynamic sorting: Price Low-to-High, Price High-to-Low, Highest Rated, Newest.

4. **Interactive Shopping Cart**
   - Quantity steppers with real-time stock boundary enforcement.
   - Promo coupon engine (`SIRAJ10` for 10% off, `GENUINE500` for Rs. 500 off orders over Rs. 5,000).
   - City-based delivery rates: Lahore (Rs. 200), Karachi / Islamabad / Rawalpindi (Rs. 300), other Pakistani cities (Rs. 350). Free delivery on orders over Rs. 7,000.
   - LocalStorage persistence synced with server-side validation.

5. **Pakistani Checkout System**
   - Validates Pakistani mobile numbers (`03xx-xxxxxxx` or `+923xxxxxxxxx`).
   - City dropdown covering 20+ major Pakistani commercial centers.
   - Street address and optional rider instructions.
   - Payment Methods:
     - **Cash on Delivery (COD)** (Fully active with parcel inspection policy)
     - **Direct Bank Transfer (IBFT)** (Meezan Bank Ltd & HBL corporate account details + WhatsApp proof verification)
     - **Online Payment Gateway** (Transparent notice explaining merchant gateway onboarding status; never simulates fake success)
   - Unique order number generation (`SOS-PK-XXXXX`).
   - Anti-duplicate submission protection within 2 minutes.

6. **Order Tracking & Consignment Status**
   - Real-time consignment tracking via `/api/orders/:id`.
   - Visual milestone stepper: Order Received $\to$ Verified & Confirmed $\to$ Packed & Sealed $\to$ In Transit $\to$ Delivered.
   - Courier partner names (TCS, Leopards Express) and tracking IDs.

7. **Secure Staff Admin Console**
   - Password-protected (`username: admin`, `password: sirajoil2026`).
   - Sales KPIs: Total Orders, Revenue in PKR, Pending Dispatches, Low Stock alert counts.
   - Order management: Update order statuses, assign tracking numbers, and view customer details.
   - Product & Inventory management: Add new products, update prices and stock levels, and delete products.
   - Wholesale B2B inquiry tracking.
   - **CSV Export**: Instant download of complete order records.

---

## 🗄️ Database Architecture & PostgreSQL Setup

The project includes an operational atomic database manager (`src/server/db.ts`) with relational data models and persistence, as well as a full production-ready PostgreSQL DDL script in `schema.sql`.

### Relational Models
- `brands` (Brand registry & authorized reseller flags)
- `categories` (Lubricant categories & slugs)
- `products` (Viscosity, API SP, ACEA, ILSAC, JASO MA2, drain intervals, stock, dabba color)
- `customers` (Pakistani delivery contacts, order history)
- `orders` (Order numbers, status, shipping fee, discounts, totals)
- `order_items` (Itemized line items, quantities, snapshot prices)
- `payments` (COD, Bank IBFT, Gateway audit trails)
- `inventory_logs` (Stock decrement on sale, replenishment on cancellation)
- `wholesale_inquiries` (B2B leads from workshops & transport fleets)
- `admin_users` (Staff role access)

### Deploying to PostgreSQL
To deploy on PostgreSQL (AWS RDS, Supabase, Neon, or Google Cloud SQL):
```bash
# 1. Connect to your PostgreSQL instance
psql -h <HOST> -U <USER> -d <DATABASE_NAME> -f schema.sql

# 2. Configure environment variables in .env
DATABASE_URL="postgres://username:password@hostname:5432/siraj_oil_store"
```

---

## 🚀 Running the Store

```bash
# Install dependencies
npm install

# Start full-stack server (Node.js Express API + Vite Frontend on port 3000)
npm run dev

# Run TypeScript linter
npm run lint

# Build production bundle
npm run build
```
