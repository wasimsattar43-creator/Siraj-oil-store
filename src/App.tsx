import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext.tsx';
import { Product, Category, Brand, Order, OilViscosity } from './types/store.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProductCatalogue } from './components/ProductCatalogue.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { WholesaleSection } from './components/WholesaleSection.tsx';
import { CustomerReviews } from './components/CustomerReviews.tsx';
import { OrderTracking } from './components/OrderTracking.tsx';
import { Footer } from './components/Footer.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { OrderConfirmationModal } from './components/OrderConfirmationModal.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { StorePoliciesModal } from './components/StorePoliciesModal.tsx';
import { RateManagerModal } from './components/RateManagerModal.tsx';

function StoreApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedViscosity, setSelectedViscosity] = useState<string>('all');

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isRateManagerOpen, setIsRateManagerOpen] = useState<boolean>(false);
  const [rateTargetProductId, setRateTargetProductId] = useState<string | null>(null);
  const [policiesModalState, setPoliciesModalState] = useState<{ isOpen: boolean; tab: string }>({
    isOpen: false,
    tab: 'about',
  });
  const [trackingOrderNumber, setTrackingOrderNumber] = useState<string>('');

  // Fetch initial product catalog, categories, and brands
  const fetchStoreData = async () => {
    try {
      const [resProds, resCats, resBrands] = await Promise.all([
        fetch('/api/products').then((r) => r.json()),
        fetch('/api/categories').then((r) => r.json()),
        fetch('/api/brands').then((r) => r.json()),
      ]);

      if (resProds.success) setProducts(resProds.products);
      if (resCats.success) setCategories(resCats.categories);
      if (resBrands.success) setBrands(resBrands.brands);
    } catch (err) {
      console.error('Error loading store data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  // Quick oil finder handler from hero
  const handleVehicleRecommendation = (viscosity: OilViscosity, _vehicleName: string) => {
    setSelectedViscosity(viscosity);
    setSelectedCategory('all');
    setSelectedBrand('all');
  };

  const handleOpenPolicies = (tab: string = 'about') => {
    setPoliciesModalState({ isOpen: true, tab });
  };

  const handleOpenTracking = (orderNum?: string) => {
    if (orderNum) {
      setTrackingOrderNumber(orderNum);
    }
    const trackingEl = document.getElementById('tracking');
    if (trackingEl) {
      trackingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRateManager = (targetProd?: Product) => {
    setRateTargetProductId(targetProd?.id || null);
    setIsRateManagerOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Navbar with announcement bar and search */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenPolicies={handleOpenPolicies}
        onOpenTracking={() => handleOpenTracking()}
        onOpenRateManager={() => handleOpenRateManager()}
        onSelectCategory={(catSlug) => {
          setSelectedCategory(catSlug);
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        {/* Hero Section with Blue Dabba Motor Oil, Viscosity Advisor, and Headings */}
        <HeroSection
          onExploreClick={() => {
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onFilterViscosity={(v) => {
            setSelectedViscosity(v);
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectVehicleRecommendation={handleVehicleRecommendation}
          onOpenRateManager={() => handleOpenRateManager()}
        />

        {/* Product Catalogue with Viscosity, Blue Dabba, and Price Filters */}
        <ProductCatalogue
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedViscosity={selectedViscosity}
          setSelectedViscosity={setSelectedViscosity}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onEditRate={(prod) => handleOpenRateManager(prod)}
        />

        {/* Why Choose Us & Anti-Counterfeit Guarantees */}
        <WhyChooseUs />

        {/* Wholesale & B2B Volume Orders */}
        <WholesaleSection />

        {/* Customer Reviews from Verified Buyers */}
        <CustomerReviews />

        {/* Real-time Consignment & Order Tracking */}
        <OrderTracking initialOrderNumber={trackingOrderNumber} />
      </main>

      {/* Footer */}
      <Footer
        onOpenPolicies={handleOpenPolicies}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTracking={() => handleOpenTracking()}
      />

      {/* --- DRAWERS & MODALS --- */}

      {/* Cart Drawer */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onDirectCheckout={() => setIsCheckoutOpen(true)}
        onEditRate={(prod) => handleOpenRateManager(prod)}
      />

      {/* Rate & Price Manager Modal */}
      <RateManagerModal
        isOpen={isRateManagerOpen}
        onClose={() => {
          setIsRateManagerOpen(false);
          setRateTargetProductId(null);
        }}
        products={products}
        onRatesUpdated={() => fetchStoreData()}
        targetProductId={rateTargetProductId}
      />

      {/* Checkout Modal for Pakistan */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order) => {
          setConfirmedOrder(order);
          fetchStoreData(); // Refresh stock counts in background
        }}
      />

      {/* Order Confirmation Screen */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onTrackOrder={(num) => handleOpenTracking(num)}
      />

      {/* Authorized Staff Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onProductUpdated={() => fetchStoreData()}
      />

      {/* Store Policies & Information Modal */}
      <StorePoliciesModal
        isOpen={policiesModalState.isOpen}
        initialTab={policiesModalState.tab}
        onClose={() => setPoliciesModalState({ ...policiesModalState, isOpen: false })}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  );
}
