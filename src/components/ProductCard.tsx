import React, { useState } from 'react';
import { Product } from '../types/store.ts';
import { ShoppingCart, Eye, ShieldCheck, Check, Sparkles, Package, Edit2 } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onEditRate?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onEditRate }) => {
  const { addToCart, items } = useCart();
  const [packMode, setPackMode] = useState<'single' | 'carton'>('single');

  const cartonPrice = product.cartonPricePKR || 5000;
  const isCarton = packMode === 'carton';
  const displayPrice = isCarton ? cartonPrice : product.pricePKR;
  const inCartSingle = items.find((i) => i.id === `cart-${product.id}-single`);
  const inCartCarton = items.find((i) => i.id === `cart-${product.id}-carton`);
  const inCartCurrent = isCarton ? inCartCarton : inCartSingle;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, 1, isCarton);
  };

  return (
    <div className="group relative flex flex-col bg-neutral-900 border border-neutral-800 hover:border-blue-600/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/70">
      {/* Product Image Slot with Normal Small Dabba Canister Proportion */}
      <div className="relative aspect-[4/3] max-h-48 bg-neutral-950 overflow-hidden flex items-center justify-center p-3">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent z-10" />

        {/* Small Normal Size Dabba Visual */}
        <div className="relative w-full h-full max-w-[190px] flex items-center justify-center">
          <img
            src={product.image}
            alt={`Siraj Oil Store ${product.name} - ${product.dabbaColor}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 z-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Quick View overlay button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-950/65 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs text-xs font-semibold text-white gap-1.5"
          aria-label={`View full specifications for ${product.name}`}
        >
          <span className="px-3.5 py-2 rounded-lg bg-neutral-900/90 border border-neutral-700 flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            Quick View Specs
          </span>
        </button>

        {/* Brand & Dabba Badges */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 items-start">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Siraj Oil Store
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-neutral-900/90 border border-neutral-700 text-blue-300">
            Blue Dabba · Small Normal
          </span>
        </div>

        {/* Viscosity Grade Ribbon */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <span className="px-2 py-0.5 rounded-md text-xs font-bold font-mono bg-neutral-950/90 border border-neutral-800 text-neutral-200">
            {product.viscosity}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Metadata clean unboxed text */}
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-1.5 font-medium text-neutral-300">
              <span className="text-blue-400 font-bold">Siraj Oil Store</span>
              <span aria-hidden="true">·</span>
              <span>{product.packSize}</span>
            </div>
            <span className="text-[11px] text-neutral-500">{product.oilType}</span>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-bold text-white hover:text-blue-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Packaging Selector: Single Piece vs Full Carton (Rs. 5,000) */}
        <div className="pt-2 border-t border-neutral-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              پیکنگ منتخب کریں (Packaging):
            </span>
            {onEditRate && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditRate(product);
                }}
                className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 hover:underline"
                title="Change Price or Carton Rate"
              >
                <Edit2 className="w-3 h-3" />
                <span>ریٹ تبدیل کریں</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            <button
              type="button"
              onClick={() => setPackMode('single')}
              className={`py-1 px-2 rounded-lg text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                !isCarton
                  ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Single Bottle (پیس)</span>
              <span className="text-[10px] font-mono text-neutral-400">Rs. {product.pricePKR.toLocaleString()}</span>
            </button>

            <button
              type="button"
              onClick={() => setPackMode('carton')}
              className={`py-1 px-2 rounded-lg text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                isCarton
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-1">
                <Package className="w-3 h-3 text-amber-300" />
                <span>مکمل کارٹن (All Pieces)</span>
              </div>
              <span className="text-[10px] font-mono text-amber-200 font-bold">Rs. {cartonPrice.toLocaleString()}</span>
            </button>
          </div>

          {isCarton && (
            <div className="mt-1.5 px-2 py-1 rounded bg-blue-950/40 border border-blue-800/60 text-[10px] text-blue-300 flex items-center gap-1">
              <Package className="w-3 h-3 text-amber-400 shrink-0" />
              <span>سارے پیس ایک کارٹن میں — خصوصی کارٹن ریٹ Rs. {cartonPrice.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="space-y-2 pt-2 border-t border-neutral-800/80">
          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span className="font-mono text-neutral-300">
              {product.specifications.apiGrade}
            </span>
            <span>
              {isOutOfStock ? (
                <span className="text-red-400 font-semibold">Out of Stock</span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" />
                  In Stock ({product.stock})
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                {isCarton ? 'Carton Price' : 'Bottle Price'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-white font-mono tabular-nums tracking-tight">
                  Rs. {displayPrice.toLocaleString()}
                </span>
                {!isCarton && product.originalPricePKR && (
                  <span className="text-[11px] text-neutral-500 line-through font-mono tabular-nums">
                    Rs. {product.originalPricePKR.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                isOutOfStock
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : inCartCurrent
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : isCarton
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white active:scale-95'
                  : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95'
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>
                {inCartCurrent
                  ? `Added (${inCartCurrent.quantity})`
                  : isCarton
                  ? 'Add Carton'
                  : 'Add to Cart'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
