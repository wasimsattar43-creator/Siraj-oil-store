import React, { useState, useMemo } from 'react';
import { Product, Category, Brand, OilViscosity } from '../types/store.ts';
import { ProductCard } from './ProductCard.tsx';
import { RotateCcw, PackageOpen, Package, Edit2, Sparkles, Filter } from 'lucide-react';

interface ProductCatalogueProps {
  products: Product[];
  categories: Category[];
  brands?: Brand[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBrand?: string;
  setSelectedBrand?: (brand: string) => void;
  selectedViscosity: string;
  setSelectedViscosity: (viscosity: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onQuickView: (product: Product) => void;
  onEditRate?: (product?: Product) => void;
}

const viscosityOptions: OilViscosity[] = [
  '0W-20',
  '5W-20',
  '5W-30',
  '5W-40',
  '10W-40',
  '15W-40',
  '20W-50',
];

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  products,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedViscosity,
  setSelectedViscosity,
  searchQuery,
  setSearchQuery,
  onQuickView,
  onEditRate,
}) => {
  const [selectedOilType, setSelectedOilType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Filtered & sorted products (Exclusive to Siraj Oil Store)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.viscosity.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.compatibleVehicles.some((v) => v.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categoryId === selectedCategory || p.slug.includes(selectedCategory));
    }

    // Viscosity filter
    if (selectedViscosity !== 'all') {
      result = result.filter((p) => p.viscosity === selectedViscosity);
    }

    // Oil type filter
    if (selectedOilType !== 'all') {
      result = result.filter((p) => p.oilType === selectedOilType);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.pricePKR - b.pricePKR);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.pricePKR - a.pricePKR);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedViscosity,
    selectedOilType,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedViscosity('all');
    setSelectedOilType('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedViscosity !== 'all' ||
    selectedOilType !== 'all' ||
    searchQuery.trim().length > 0;

  return (
    <section id="products" className="py-12 bg-neutral-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Exclusive Siraj Oil Store Branding & Pricing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Siraj Oil Store Official Catalogue</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Blue Dabba Lubricants &amp; Engine Oils
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Rate Changer Button */}
            {onEditRate && (
              <button
                onClick={() => onEditRate()}
                className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Change Rates (ریٹ تبدیل کریں)</span>
              </button>
            )}

            {/* Carton Offer Badge */}
            <div className="px-3.5 py-2 rounded-xl bg-blue-950/60 border border-blue-700/50 text-blue-200 text-xs font-bold flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-400 shrink-0" />
              <span>سنگل بوتل: <strong>Rs. 500</strong> | مکمل کارٹن: <strong>Rs. 5,000</strong></span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4 mb-8">
          {/* Top row: Categories and Sort */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                All Oils
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3 shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-blue-500"
              >
                <option value="featured">Featured / Best Match</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrival</option>
              </select>
            </div>
          </div>

          {/* Bottom row: Viscosity Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-800/80 text-xs">
            <span className="text-neutral-400 font-semibold uppercase text-[11px] mr-1">Viscosity:</span>
            <button
              onClick={() => setSelectedViscosity('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedViscosity === 'all'
                  ? 'bg-neutral-100 text-neutral-950 shadow-sm'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              ALL
            </button>
            {viscosityOptions.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedViscosity(v)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedViscosity === v
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {v}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="ml-auto text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
          <span>
            Showing <strong className="text-white">{filteredProducts.length}</strong> Siraj Oil Store products
            {selectedViscosity !== 'all' && ` matching ${selectedViscosity}`}
          </span>
          <span className="text-[11px] text-neutral-400">
            Single Bottle: <strong className="text-amber-400">Rs. 500</strong> · Full Carton: <strong className="text-blue-400">Rs. 5,000</strong>
          </span>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-neutral-900/40 rounded-2xl border border-neutral-800 p-8 space-y-4">
            <PackageOpen className="w-12 h-12 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No products found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Try adjusting your search query or clearing your active filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-blue-500"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onEditRate={onEditRate ? () => onEditRate(product) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
