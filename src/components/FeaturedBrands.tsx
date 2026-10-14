import React from 'react';
import { Brand } from '../types/store.ts';
import { ShieldCheck } from 'lucide-react';

interface FeaturedBrandsProps {
  brands: Brand[];
  selectedBrand: string;
  onSelectBrand: (brandId: string) => void;
}

export const FeaturedBrands: React.FC<FeaturedBrandsProps> = ({
  brands,
  selectedBrand,
  onSelectBrand,
}) => {
  return (
    <section className="py-12 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Authorized Reseller Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Featured Brands &amp; Manufacturers
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-md">
            Direct authorized partnerships and sealed packaging straight from verified Pakistani distributors and international importers.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <button
            onClick={() => onSelectBrand('all')}
            className={`p-3.5 rounded-xl border text-center transition-all ${
              selectedBrand === 'all'
                ? 'bg-blue-600/10 border-blue-500 text-white shadow-sm'
                : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
            }`}
          >
            <span className="block text-xs font-bold uppercase tracking-wider">All Brands</span>
            <span className="text-[10px] text-neutral-500 block mt-0.5">Full Catalogue</span>
          </button>

          {brands.map((brand) => {
            const isSelected = selectedBrand === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(brand.id)}
                className={`p-3.5 rounded-xl border text-center transition-all relative group flex flex-col justify-center items-center ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500 text-white shadow-md shadow-blue-500/10'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                <span className="text-xs font-extrabold uppercase tracking-wide group-hover:text-blue-400 transition-colors line-clamp-1">
                  {brand.name}
                </span>
                <span className="text-[10px] text-neutral-500 mt-0.5 block truncate max-w-full">
                  {brand.country}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
