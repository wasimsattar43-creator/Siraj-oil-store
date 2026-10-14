import React, { useState, useEffect } from 'react';
import { Product, Order, OrderStatus, WholesaleInquiry, OilViscosity } from '../types/store.ts';
import {
  Lock,
  X,
  Package,
  ShoppingCart,
  Download,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Truck,
  Users,
  Search,
  RefreshCw,
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onProductUpdated,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(sessionStorage.getItem('siraj_admin_auth'));
  });
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'inquiries'>('overview');

  // Data states
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<WholesaleInquiry[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Product editing modal / inline state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New product form
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('Siraj Formula Signature');
  const [newProdCategory, setNewProdCategory] = useState('Car Engine Oil (PCMO)');
  const [newProdViscosity, setNewProdViscosity] = useState<OilViscosity>('5W-30');
  const [newProdOilType, setNewProdOilType] = useState('Fully Synthetic');
  const [newProdPackSize, setNewProdPackSize] = useState('4 Litres');
  const [newProdPrice, setNewProdPrice] = useState(8850);
  const [newProdStock, setNewProdStock] = useState(50);
  const [newProdDabbaColor, setNewProdDabbaColor] = useState('Royal Blue Canister');
  const [newProdImage, setNewProdImage] = useState('/src/assets/images/siraj_synthetic_blue_dabba_1791981782512.jpg');
  const [newProdApiGrade, setNewProdApiGrade] = useState('API SP / ILSAC GF-6A');
  const [newProdDesc, setNewProdDesc] = useState('');

  // Orders filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [resOrders, resProducts, resInquiries, resStats] = await Promise.all([
        fetch('/api/orders').then((r) => r.json()),
        fetch('/api/products').then((r) => r.json()),
        fetch('/api/inquiries').then((r) => r.json()),
        fetch('/api/stats').then((r) => r.json()),
      ]);

      if (resOrders.success) setOrders(resOrders.orders);
      if (resProducts.success) setProducts(resProducts.products);
      if (resInquiries.success) setInquiries(resInquiries.inquiries);
      if (resStats.success) setStats(resStats.stats);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAllData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed');
      }

      sessionStorage.setItem('siraj_admin_auth', data.token);
      setIsAuthenticated(true);
      loadAllData();
    } catch (err: any) {
      setLoginError(err.message || 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('siraj_admin_auth');
    setIsAuthenticated(false);
  };

  // Order status update
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus, trackingNo?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, trackingNumber: trackingNo }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  // Product stock / price update
  const handleSaveProductEdit = async () => {
    if (!editingProduct) return;
    try {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.map((p) => (p.id === data.product.id ? data.product : p)));
        setEditingProduct(null);
        onProductUpdated();
      }
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product from the catalogue?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        onProductUpdated();
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  // Create product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProdName,
          brandName: newProdBrand,
          categoryName: newProdCategory,
          viscosity: newProdViscosity,
          oilType: newProdOilType,
          packSize: newProdPackSize,
          pricePKR: newProdPrice,
          stock: newProdStock,
          image: newProdImage,
          dabbaColor: newProdDabbaColor,
          specifications: { apiGrade: newProdApiGrade, drainInterval: '8,000 - 10,000 KM' },
          description: newProdDesc || 'Premium automotive motor oil batch verified for Pakistani climate.',
          features: ['100% Genuine Sealed Pack', 'Anti-friction polymers', 'LSPI protection'],
          compatibleVehicles: ['Passenger Cars & Pickups'],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => [data.product, ...prev]);
        setShowAddProductModal(false);
        setNewProdName('');
        onProductUpdated();
      }
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  };

  // Export orders to CSV
  const handleExportCSV = () => {
    window.location.href = '/api/orders/export/csv';
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter;
    const matchesSearch =
      !orderSearch.trim() ||
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.phone.includes(orderSearch) ||
      o.customer.city.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-6xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Siraj Oil Store Management System
              </span>
              <h2 className="text-lg font-black text-white uppercase tracking-tight">
                Authorized Staff Admin Console
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Authenticated: Login Prompt */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-white uppercase">Admin Authentication</h3>
              <p className="text-xs text-neutral-400">
                Authorized personnel access for inventory, orders, prices, and dispatch status.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-300">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter staff password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Default credentials: username <span className="font-mono text-neutral-400">admin</span> / password <span className="font-mono text-neutral-400">sirajoil2026</span>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Verify &amp; Enter Dashboard
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Admin Tabs */}
            <div className="flex border-b border-neutral-800 bg-neutral-950/70 overflow-x-auto shrink-0 px-4 scrollbar-none">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Sales &amp; KPI Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'orders'
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Inventory &amp; Products ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'inquiries'
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Wholesale B2B Inquiries ({inquiries.length})</span>
              </button>
            </div>

            {/* Admin Content Area */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && stats && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider block">
                        Total Orders
                      </span>
                      <span className="text-3xl font-black font-mono text-white tabular-nums block mt-1">
                        {stats.totalOrders}
                      </span>
                      <span className="text-[11px] text-blue-400 mt-1 block">
                        Across Pakistan (Punjab, Sindh, KPK)
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider block">
                        Gross Revenue (PKR)
                      </span>
                      <span className="text-3xl font-black font-mono text-emerald-400 tabular-nums block mt-1">
                        Rs. {stats.totalRevenuePKR.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-neutral-400 mt-1 block">
                        Excluding cancellations
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider block">
                        Pending Dispatch
                      </span>
                      <span className="text-3xl font-black font-mono text-amber-400 tabular-nums block mt-1">
                        {stats.pendingOrders}
                      </span>
                      <span className="text-[11px] text-neutral-400 mt-1 block">
                        Awaiting courier handover
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider block">
                        Low Stock Alert
                      </span>
                      <span className="text-3xl font-black font-mono text-red-400 tabular-nums block mt-1">
                        {stats.lowStockCount}
                      </span>
                      <span className="text-[11px] text-neutral-400 mt-1 block">
                        Products under 10 units
                      </span>
                    </div>
                  </div>

                  {/* Quick Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export All Orders (CSV)</span>
                      </button>
                      <button
                        onClick={loadAllData}
                        className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Refresh</span>
                      </button>
                    </div>

                    <div className="text-xs text-neutral-400">
                      Active database: <span className="font-mono text-blue-400">PostgreSQL Schema &amp; Storage</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ORDERS MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {/* Filters bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="flex items-center gap-3 flex-1 max-w-md">
                      <Search className="w-4 h-4 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search by order #, customer, mobile, city..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">Status:</span>
                      <select
                        value={orderStatusFilter}
                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                        className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                      >
                        <option value="all">All Orders ({orders.length})</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={handleExportCSV}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Orders Table */}
                  <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-900 text-neutral-400 uppercase tracking-wider font-semibold border-b border-neutral-800">
                        <tr>
                          <th className="p-3.5">Order Ref</th>
                          <th className="p-3.5">Customer &amp; City</th>
                          <th className="p-3.5">Items</th>
                          <th className="p-3.5">Total (PKR)</th>
                          <th className="p-3.5">Payment</th>
                          <th className="p-3.5">Status Update</th>
                          <th className="p-3.5">Courier Tracking</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800">
                        {filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-neutral-900/40 transition-colors">
                            <td className="p-3.5 font-mono font-bold text-white whitespace-nowrap">
                              {ord.orderNumber}
                              <span className="block text-[10px] text-neutral-500 font-normal">
                                {new Date(ord.createdAt).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-semibold text-white block">{ord.customer.fullName}</span>
                              <span className="text-neutral-400 font-mono block text-[11px]">{ord.customer.phone}</span>
                              <span className="text-neutral-400 text-[11px]">{ord.customer.city}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="text-neutral-300 font-medium">{ord.items.length} item(s)</span>
                              <span className="text-[10px] text-neutral-500 block truncate max-w-[150px]">
                                {ord.items.map((i) => `${i.productName} (x${i.quantity})`).join(', ')}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono font-bold text-blue-400 whitespace-nowrap">
                              Rs. {ord.totalPKR.toLocaleString()}
                            </td>
                            <td className="p-3.5 uppercase text-[11px]">
                              <span className="block font-semibold text-neutral-300">{ord.paymentMethod}</span>
                              <span
                                className={`text-[10px] font-bold ${
                                  ord.paymentStatus === 'verified' ? 'text-emerald-400' : 'text-amber-400'
                                }`}
                              >
                                {ord.paymentStatus}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <select
                                value={ord.orderStatus}
                                onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                                className="bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-3.5">
                              <input
                                type="text"
                                defaultValue={ord.trackingNumber || ''}
                                placeholder="e.g. TCS-8829104"
                                onBlur={(e) => {
                                  if (e.target.value !== ord.trackingNumber) {
                                    handleUpdateOrderStatus(ord.id, ord.orderStatus, e.target.value);
                                  }
                                }}
                                className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-200 focus:outline-none focus:border-blue-500 font-mono w-28"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: PRODUCTS & INVENTORY */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-300">
                      Managing <span className="font-bold text-white">{products.length}</span> automotive lubricants
                    </span>
                    <button
                      onClick={() => setShowAddProductModal(true)}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  {/* Product Cards Table */}
                  <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-900 text-neutral-400 uppercase tracking-wider font-semibold border-b border-neutral-800">
                        <tr>
                          <th className="p-3.5">Product &amp; Container</th>
                          <th className="p-3.5">Viscosity / Brand</th>
                          <th className="p-3.5">Price (PKR)</th>
                          <th className="p-3.5">Stock Qty</th>
                          <th className="p-3.5">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800">
                        {products.map((prod) => (
                          <tr key={prod.id} className="hover:bg-neutral-900/40 transition-colors">
                            <td className="p-3.5 flex items-center gap-3">
                              <img src={prod.image} alt={prod.name} className="w-10 h-10 object-contain rounded bg-neutral-900 p-0.5" />
                              <div>
                                <span className="font-bold text-white block">{prod.name}</span>
                                <span className="text-[10px] text-blue-400 font-medium">{prod.dabbaColor}</span>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span className="font-mono font-bold text-white block">{prod.viscosity}</span>
                              <span className="text-neutral-400 text-[11px]">{prod.brandName}</span>
                            </td>
                            <td className="p-3.5 font-mono font-bold text-neutral-200">
                              Rs. {prod.pricePKR.toLocaleString()}
                            </td>
                            <td className="p-3.5">
                              <span
                                className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                                  prod.stock < 10 ? 'bg-red-950 text-red-400' : 'bg-emerald-950 text-emerald-400'
                                }`}
                              >
                                {prod.stock} Units
                              </span>
                            </td>
                            <td className="p-3.5">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setEditingProduct(prod)}
                                  className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white"
                                  title="Edit Price/Stock"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(prod.id)}
                                  className="p-1.5 rounded bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: WHOLESALE INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-900 text-neutral-400 uppercase tracking-wider font-semibold border-b border-neutral-800">
                        <tr>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5">Contact &amp; Business</th>
                          <th className="p-3.5">City &amp; Phone</th>
                          <th className="p-3.5">Products / Volume</th>
                          <th className="p-3.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800">
                        {inquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-neutral-900/40 transition-colors">
                            <td className="p-3.5 text-neutral-400 font-mono">
                              {new Date(inq.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3.5">
                              <span className="font-bold text-white block">{inq.fullName}</span>
                              <span className="text-neutral-400 text-[11px]">{inq.businessName}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-mono text-white block">{inq.phone}</span>
                              <span className="text-neutral-400">{inq.city}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="text-blue-400 font-semibold block">{inq.productsInterested}</span>
                              <span className="text-neutral-400 text-[11px]">{inq.estimatedMonthlyVolume}</span>
                            </td>
                            <td className="p-3.5">
                              <select
                                value={inq.status}
                                onChange={async (e) => {
                                  const newStatus = e.target.value as any;
                                  await fetch(`/api/inquiries/${inq.id}/status`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ status: newStatus }),
                                  });
                                  setInquiries((prev) =>
                                    prev.map((i) => (i.id === inq.id ? { ...i, status: newStatus } : i))
                                  );
                                }}
                                className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs text-white"
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="quoted">Quoted</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Inline Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white uppercase">Edit Product Details</h3>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Product Title</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Single Price (PKR)</label>
                <input
                  type="number"
                  value={editingProduct.pricePKR}
                  onChange={(e) => setEditingProduct({ ...editingProduct, pricePKR: Number(e.target.value) })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-amber-300 mb-1">Carton Price (PKR)</label>
                <input
                  type="number"
                  value={editingProduct.cartonPricePKR || 5000}
                  onChange={(e) => setEditingProduct({ ...editingProduct, cartonPricePKR: Number(e.target.value) })}
                  className="w-full bg-neutral-950 border border-blue-500 rounded px-3 py-2 text-xs text-amber-300 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Stock Units</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Container Style / Dabba Color</label>
              <input
                type="text"
                value={editingProduct.dabbaColor}
                onChange={(e) => setEditingProduct({ ...editingProduct, dabbaColor: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-3 py-2 rounded bg-neutral-800 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProductEdit}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateProduct}
            className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 max-w-lg w-full space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
              <h3 className="text-base font-bold text-white uppercase">Add New Lubricant Product</h3>
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Siraj Racing Formula 5W-30"
                value={newProdName}
                onChange={(e) => setNewProdName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Brand</label>
                <input
                  type="text"
                  value={newProdBrand}
                  onChange={(e) => setNewProdBrand(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Viscosity</label>
                <select
                  value={newProdViscosity}
                  onChange={(e) => setNewProdViscosity(e.target.value as OilViscosity)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono"
                >
                  <option value="0W-20">0W-20</option>
                  <option value="5W-20">5W-20</option>
                  <option value="5W-30">5W-30</option>
                  <option value="5W-40">5W-40</option>
                  <option value="10W-40">10W-40</option>
                  <option value="15W-40">15W-40</option>
                  <option value="20W-50">20W-50</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Price (PKR) *</label>
                <input
                  type="number"
                  required
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Stock Units *</label>
                <input
                  type="number"
                  required
                  value={newProdStock}
                  onChange={(e) => setNewProdStock(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Dabba Color</label>
                <input
                  type="text"
                  value={newProdDabbaColor}
                  onChange={(e) => setNewProdDabbaColor(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Pack Size</label>
                <input
                  type="text"
                  value={newProdPackSize}
                  onChange={(e) => setNewProdPackSize(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Product Description</label>
              <textarea
                rows={2}
                value={newProdDesc}
                onChange={(e) => setNewProdDesc(e.target.value)}
                placeholder="Product description and formulation notes..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-white resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="px-3 py-2 rounded bg-neutral-800 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
