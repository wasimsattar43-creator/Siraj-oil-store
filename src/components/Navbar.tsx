import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Lock, Tag, Edit2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenPolicies: (tab?: string) => void;
  onOpenTracking: () => void;
  onOpenRateManager?: () => void;
  onSelectCategory: (categorySlug: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onOpenPolicies,
  onOpenTracking,
  onOpenRateManager,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl">
      {/* Premium Minimal Banner Strip */}
      <div className="bg-gradient-to-r from-blue-950 via-neutral-950 to-blue-950 border-b border-blue-900/30 text-xs py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-neutral-300 font-medium">
              Siraj Oil Store Official · Single Bottle: <strong className="text-amber-400 font-mono">Rs. 500</strong> · Full Carton: <strong className="text-blue-400 font-mono">Rs. 5,000</strong>
            </span>
          </div>

          {onOpenRateManager && (
            <button
              onClick={onOpenRateManager}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-semibold transition-colors"
            >
              <Edit2 className="w-3 h-3 text-amber-400" />
              <span>Change Rates / ریٹ تبدیل کریں</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Premium Brand Wordmark & Emblem */}
        <a href="/" className="flex items-center gap-3.5 shrink-0 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-950 p-0.5 shadow-lg shadow-blue-900/40 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <svg className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-white uppercase font-sans leading-none">
              Siraj <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Oil</span> Store
            </span>
            <span className="text-[10px] tracking-widest uppercase text-blue-400/90 font-bold mt-1">
              Official Blue Dabba Store
            </span>
          </div>
        </a>

        {/* Zone 2: Search */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search Siraj Oil Store products, viscosities (5W-30, 10W-40)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/90 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-neutral-300">
          <a href="#products" className="hover:text-blue-400 transition-colors whitespace-nowrap">
            All Products
          </a>
          <button
            onClick={() => onSelectCategory('cat-car-oil')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            Car Oils
          </button>
          <button
            onClick={() => onSelectCategory('cat-motorcycle-oil')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            Motorbike 4T
          </button>
          <button
            onClick={() => onSelectCategory('cat-diesel-oil')}
            className="hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            Diesel Oil
          </button>
          <a href="#wholesale" className="hover:text-blue-400 transition-colors whitespace-nowrap">
            Carton &amp; Wholesale
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Mobile search toggle */}
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
            aria-label="Toggle Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Prominent Rate Manager Button */}
          {onOpenRateManager && (
            <button
              onClick={onOpenRateManager}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all shadow-sm"
              title="Open Price & Carton Rate Manager"
            >
              <Edit2 className="w-3.5 h-3.5 text-amber-400" />
              <span>ریٹ تبدیل کریں (Change Rates)</span>
            </button>
          )}

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 group active:scale-95"
            aria-label="View Shopping Cart"
          >
            <ShoppingCart className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="bg-amber-400 text-neutral-950 text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-5 h-5 flex items-center justify-center tabular-nums">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Input dropdown */}
      {showSearchInput && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-neutral-800 bg-neutral-950">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search Siraj Oil Store products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-neutral-950 border-t border-neutral-800 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-400"
            >
              All Engine Oils
            </a>
            <button
              onClick={() => {
                onSelectCategory('cat-car-oil');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-blue-400"
            >
              Car Engine Oils
            </button>
            <button
              onClick={() => {
                onSelectCategory('cat-motorcycle-oil');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-blue-400"
            >
              Motorbike 4T Synthetic
            </button>
            <button
              onClick={() => {
                onSelectCategory('cat-diesel-oil');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-blue-400"
            >
              Heavy Duty Diesel Oil
            </button>
            <a
              href="#wholesale"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-400"
            >
              Carton &amp; Wholesale Supply
            </a>
            {onOpenRateManager && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRateManager();
                }}
                className="text-left py-2 text-amber-400 font-bold flex items-center gap-2 border-t border-neutral-800 pt-3"
              >
                <Edit2 className="w-4 h-4 text-amber-400" />
                <span>قیمت اور ریٹ تبدیل کریں (Change Rates)</span>
              </button>
            )}
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-neutral-400 hover:text-white flex items-center gap-1.5"
            >
              <Lock className="w-4 h-4" />
              <span>Admin &amp; Staff Login</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
