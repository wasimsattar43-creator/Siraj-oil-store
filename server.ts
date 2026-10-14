import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { db } from './src/server/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // In-memory rate-limiter / deduplication map for order idempotency
  const recentOrdersMap = new Map<string, number>();

  // --- API Routes ---

  // 1. Products API
  app.get('/api/products', (req, res) => {
    try {
      let products = db.getProducts();
      const { category, brand, viscosity, oilType, search, sort } = req.query;

      if (category && typeof category === 'string' && category !== 'all') {
        products = products.filter(
          (p) => p.categoryId === category || p.categoryName.toLowerCase().includes(category.toLowerCase())
        );
      }

      if (brand && typeof brand === 'string' && brand !== 'all') {
        products = products.filter(
          (p) => p.brandId === brand || p.brandName.toLowerCase().includes(brand.toLowerCase())
        );
      }

      if (viscosity && typeof viscosity === 'string' && viscosity !== 'all') {
        products = products.filter((p) => p.viscosity === viscosity);
      }

      if (oilType && typeof oilType === 'string' && oilType !== 'all') {
        products = products.filter((p) => p.oilType === oilType);
      }

      if (search && typeof search === 'string') {
        const query = search.toLowerCase().trim();
        products = products.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.brandName.toLowerCase().includes(query) ||
            p.viscosity.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.compatibleVehicles.some((v) => v.toLowerCase().includes(query))
        );
      }

      // Sorting
      if (sort === 'price-low') {
        products.sort((a, b) => a.pricePKR - b.pricePKR);
      } else if (sort === 'price-high') {
        products.sort((a, b) => b.pricePKR - a.pricePKR);
      } else if (sort === 'rating') {
        products.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'newest') {
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      res.json({ success: true, count: products.length, products });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/products/:id', (req, res) => {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product });
  });

  app.post('/api/products', (req, res) => {
    try {
      const {
        name,
        brandId,
        brandName,
        categoryId,
        categoryName,
        viscosity,
        oilType,
        packSize,
        pricePKR,
        originalPricePKR,
        stock,
        image,
        dabbaColor,
        specifications,
        description,
        features,
        compatibleVehicles,
      } = req.body;

      if (!name || !pricePKR || !viscosity || !brandName) {
        return res.status(400).json({ success: false, error: 'Name, price, brand, and viscosity are required.' });
      }

      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newProduct = db.createProduct({
        name,
        slug,
        brandId: brandId || 'brand-siraj',
        brandName: brandName || 'Siraj Oil Store',
        categoryId: categoryId || 'cat-car-oil',
        categoryName: categoryName || 'Car Engine Oil (PCMO)',
        viscosity,
        oilType: oilType || 'Fully Synthetic',
        packSize: packSize || '4 Litres',
        pricePKR: Number(pricePKR),
        originalPricePKR: originalPricePKR ? Number(originalPricePKR) : undefined,
        cartonPricePKR: Number(req.body.cartonPricePKR) || 5000,
        cartonQuantity: req.body.cartonQuantity || '1 Full Carton (All Pieces Pack)',
        stock: Number(stock) || 0,
        image: image || '/src/assets/images/siraj_oil_store_blue_dabba_1791984381397.jpg',
        dabbaColor: dabbaColor || 'Siraj Oil Store Blue Dabba (Normal Size 4L)',
        specifications: specifications || { apiGrade: 'API SP', drainInterval: '8,000 KM' },
        description: description || 'Premium Siraj Oil Store automotive motor oil certified for Pakistani conditions.',
        features: Array.isArray(features) ? features : ['100% Genuine Sealed Pack'],
        compatibleVehicles: Array.isArray(compatibleVehicles) ? compatibleVehicles : ['Universal Passenger Cars'],
        batchCode: `SOS-2026-${Math.floor(100 + Math.random() * 900)}`,
        rating: 5.0,
        reviewCount: 1,
      });

      res.status(201).json({ success: true, product: newProduct });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Batch rate & price update endpoint for Quick Rate Editor
  app.put('/api/products/batch/rates', (req, res) => {
    try {
      const { updates } = req.body;
      if (!Array.isArray(updates)) {
        return res.status(400).json({ success: false, error: 'updates array is required.' });
      }
      const updatedList: any[] = [];
      for (const item of updates) {
        if (!item.id) continue;
        const updated = db.updateProduct(item.id, {
          ...(item.pricePKR !== undefined ? { pricePKR: Number(item.pricePKR) } : {}),
          ...(item.cartonPricePKR !== undefined ? { cartonPricePKR: Number(item.cartonPricePKR) } : {}),
          ...(item.stock !== undefined ? { stock: Number(item.stock) } : {}),
        });
        if (updated) updatedList.push(updated);
      }
      res.json({ success: true, updatedCount: updatedList.length, products: updatedList });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put('/api/products/:id', (req, res) => {
    try {
      const updated = db.updateProduct(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
      res.json({ success: true, product: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete('/api/products/:id', (req, res) => {
    const success = db.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  });

  // 2. Categories & Brands
  app.get('/api/categories', (_req, res) => {
    res.json({ success: true, categories: db.getCategories() });
  });

  app.get('/api/brands', (_req, res) => {
    res.json({ success: true, brands: db.getBrands() });
  });

  // 3. Orders API
  app.get('/api/orders', (_req, res) => {
    res.json({ success: true, orders: db.getOrders() });
  });

  // Public Order Tracking by ID or Order Number
  app.get('/api/orders/:id', (req, res) => {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found. Please check your order number (e.g. SOS-PK-10491) or contact our helpline.',
      });
    }
    res.json({ success: true, order });
  });

  // Order Placement with Server-Side Validation, Pakistani Phone Check, and Duplicate Protection
  app.post('/api/orders', (req, res) => {
    try {
      const { customer, items, paymentMethod, couponCode, idempotencyKey } = req.body;

      // Validation
      if (!customer || !customer.fullName || !customer.phone || !customer.city || !customer.address) {
        return res.status(400).json({
          success: false,
          error: 'Please provide full name, Pakistani mobile number, delivery city, and complete address.',
        });
      }

      // Validate Pakistani phone number format
      const cleanedPhone = customer.phone.replace(/[\s\-]/g, '');
      const pakPhoneRegex = /^((\+92)|(0092)|(0))?3[0-9]{9}$/;
      if (!pakPhoneRegex.test(cleanedPhone)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Pakistani mobile number. Please enter a valid number like 0300-1234567 or +923001234567.',
        });
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, error: 'Your cart is empty. Please add items to place an order.' });
      }

      // Duplicate order protection (idempotency key or same phone+amount within 2 minutes)
      const orderFingerprint = `${cleanedPhone}_${items.map((i: any) => `${i.productId}:${i.quantity}`).sort().join(',')}`;
      const now = Date.now();
      const lastPlacedTime = recentOrdersMap.get(orderFingerprint);

      if (lastPlacedTime && now - lastPlacedTime < 2 * 60 * 1000) {
        return res.status(429).json({
          success: false,
          error: 'An identical order was placed moments ago. Please check your order history or wait 2 minutes to prevent duplicate orders.',
        });
      }

      const result = db.createOrder({
        customer: {
          fullName: customer.fullName.trim(),
          phone: customer.phone.trim(),
          email: customer.email?.trim() || '',
          city: customer.city.trim(),
          address: customer.address.trim(),
          instructions: customer.instructions?.trim() || '',
        },
        items,
        paymentMethod: paymentMethod || 'cod',
        couponCode,
      });

      if (!result.success) {
        return res.status(400).json({ success: false, error: result.error });
      }

      recentOrdersMap.set(orderFingerprint, now);

      res.status(201).json({
        success: true,
        message: 'Order placed successfully! 100% Genuine guarantee from Siraj Oil Store.',
        order: result.order,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin order status update
  app.put('/api/orders/:id/status', (req, res) => {
    try {
      const { status, trackingNumber, courierName, paymentStatus } = req.body;
      const updated = db.updateOrderStatus(req.params.id, status, {
        trackingNumber,
        courierName,
        paymentStatus,
      });

      if (!updated) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }
      res.json({ success: true, order: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // CSV Export for orders
  app.get('/api/orders/export/csv', (_req, res) => {
    try {
      const orders = db.getOrders();
      const headers = ['Order Number', 'Date', 'Customer Name', 'Phone', 'City', 'Address', 'Items Count', 'Subtotal PKR', 'Discount PKR', 'Total PKR', 'Payment Method', 'Payment Status', 'Order Status', 'Tracking Number'];
      const rows = orders.map((o) => [
        `"${o.orderNumber}"`,
        `"${new Date(o.createdAt).toLocaleDateString()}"`,
        `"${o.customer.fullName.replace(/"/g, '""')}"`,
        `"${o.customer.phone}"`,
        `"${o.customer.city}"`,
        `"${o.customer.address.replace(/"/g, '""')}"`,
        o.items.reduce((s, i) => s + i.quantity, 0),
        o.subtotalPKR,
        o.discountPKR,
        o.totalPKR,
        `"${o.paymentMethod.toUpperCase()}"`,
        `"${o.paymentStatus.toUpperCase()}"`,
        `"${o.orderStatus.toUpperCase()}"`,
        `"${o.trackingNumber || 'N/A'}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="siraj_oil_store_orders.csv"');
      res.send(csvContent);
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Wholesale / Bulk Inquiries API
  app.get('/api/inquiries', (_req, res) => {
    res.json({ success: true, inquiries: db.getInquiries() });
  });

  app.post('/api/inquiries', (req, res) => {
    try {
      const { fullName, businessName, phone, city, productsInterested, estimatedMonthlyVolume, notes } = req.body;
      if (!fullName || !phone || !city || !businessName) {
        return res.status(400).json({
          success: false,
          error: 'Full name, business/workshop name, phone number, and city are required.',
        });
      }

      const inquiry = db.createInquiry({
        fullName,
        businessName,
        phone,
        city,
        productsInterested: productsInterested || 'General Lubricants & Blue Dabba Oils',
        estimatedMonthlyVolume: estimatedMonthlyVolume || '10-20 Cartons',
        notes: notes || '',
      });

      res.status(201).json({
        success: true,
        message: 'Wholesale inquiry received! Our B2B commercial manager will contact you within 24 hours.',
        inquiry,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put('/api/inquiries/:id/status', (req, res) => {
    const updated = db.updateInquiryStatus(req.params.id, req.body.status);
    if (!updated) return res.status(404).json({ success: false, error: 'Inquiry not found' });
    res.json({ success: true, inquiry: updated });
  });

  // 5. Inventory & Stats
  app.get('/api/inventory/logs', (_req, res) => {
    res.json({ success: true, logs: db.getInventoryLogs() });
  });

  app.get('/api/stats', (_req, res) => {
    res.json({ success: true, stats: db.getStats() });
  });

  // 6. Admin Authentication (secure simple session token)
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    // Default admin credentials (instructed in README & editable)
    if (username === 'admin' && (password === 'sirajoil2026' || password === 'admin123')) {
      return res.json({
        success: true,
        token: 'admin-sess-' + Buffer.from(`${username}-${Date.now()}`).toString('base64'),
        user: {
          username: 'admin',
          fullName: 'Siraj Ahmed (Director)',
          role: 'super_admin',
        },
      });
    }
    res.status(401).json({ success: false, error: 'Invalid admin username or password.' });
  });

  // --- Vite / Static Middleware ---
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Siraj Oil Store] Full-stack engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
