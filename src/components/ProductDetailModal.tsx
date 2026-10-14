import React, { useState } from 'react';
import { Product } from '../types/store.ts';
import { X, ShoppingCart, ShieldCheck, CheckCircle2, Droplet, ArrowRight, Truck, Wrench, Check, Package, Edit2 } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onDirectCheckout: (product: Product, quantity: number) => void;
  onEditRate?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onDirectCheckout,
  onEditRate,
}) => {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [packMode, setPackMode] = useState<'single' | 'carton'>('single');

  if (!product) return null;

  const cartonPrice = product.cartonPricePKR || 5000;
  const isCarton = packMode === 'carton';
  const displayPrice = isCarton ? cartonPrice : product.pricePKR;
  const inCartSingle = items.find((i) => i.id === `cart-${product.id}-single`);
  const inCartCarton = items.find((i) => i.id === `cart-${product.id}-carton`);
  const inCart = isCarton ? inCartCarton : inCartSingle;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, isCarton);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, isCarton);
    onClose();
    onDirectCheckout(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-neutral-950/80 rounded-full border border-neutral-800 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Product Image & Normal Small Dabba Presentation */}
          <div className="md:col-span-5 bg-neutral-950 p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-800">
            {/* Small Normal Size Dabba Visual */}
            <div className="relative w-full aspect-square flex items-center justify-center max-w-[210px] max-h-[220px]">
              <img
                src={product.image}
                alt={`Siraj Oil Store ${product.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Packaging & Dabba Specifications */}
            <div className="w-full mt-4 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs space-y-1.5 text-neutral-300">
              <div className="flex items-center justify-between font-medium">
                <span className="text-neutral-500">Brand Name:</span>
                <span className="text-blue-400 font-bold uppercase">Siraj Oil Store</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="text-neutral-500">Canister Size:</span>
                <span className="text-neutral-200 font-semibold">{product.packSize} (Normal Small Dabba)</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="text-neutral-500">Dabba Style:</span>
                <span className="text-blue-400 font-semibold">{product.dabbaColor}</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="text-neutral-500">Carton Packaging:</span>
                <span className="text-amber-300 font-bold">سارے پیس ایک کارٹن میں (Rs. {cartonPrice.toLocaleString()})</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine Sealed Pack Guaranteed</span>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing Controls */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Brand & Category & Edit Rate */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-blue-600 text-white font-bold uppercase tracking-wider">
                    Siraj Oil Store
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono font-bold">
                    {product.viscosity}
                  </span>
                </div>

                {onEditRate && (
                  <button
                    onClick={() => {
                      onClose();
                      onEditRate(product);
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-blue-500 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>ریٹ تبدیل کریں (Change Rate)</span>
                  </button>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {product.name}
              </h2>

              {/* Packaging Selector Toggle */}
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-300">
                  <span>پیکنگ کا انتخاب کریں (Select Packaging):</span>
                  <span className="text-blue-400 font-mono">
                    {isCarton ? 'All Pieces Master Carton' : 'Single Bottle Canister'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPackMode('single')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                      !isCarton
                        ? 'bg-neutral-800 text-white border border-neutral-600 shadow-md'
                        : 'bg-neutral-900/60 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>Single Bottle (پیس)</span>
                    <span className="text-xs font-mono font-bold text-white mt-0.5">
                      Rs. {product.pricePKR.toLocaleString()}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackMode('carton')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                      isCarton
                        ? 'bg-blue-600 text-white border border-blue-400 shadow-lg shadow-blue-600/30 font-bold'
                        : 'bg-neutral-900/60 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-amber-300" />
                      <span>مکمل کارٹن (All Pieces)</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-200 mt-0.5">
                      Rs. {cartonPrice.toLocaleString()}
                    </span>
                  </button>
                </div>

                {isCarton && (
                  <div className="text-[11px] text-blue-300 flex items-center gap-1.5 pt-1">
                    <Package className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>سارے پیس ایک کارٹن میں محفوظ فیکٹری سیل کے ساتھ پیک ہیں۔ کارٹن ریٹ Rs. {cartonPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-3 pt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                    {isCarton ? 'Carton Payable Amount' : 'Single Canister Price'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-mono tabular-nums">
                      Rs. {displayPrice.toLocaleString()}
                    </span>
                    {!isCarton && product.originalPricePKR && (
                      <span className="text-sm text-neutral-500 line-through font-mono tabular-nums">
                        Rs. {product.originalPricePKR.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs text-neutral-400 ml-auto">
                  {isOutOfStock ? (
                    <span className="text-red-400 font-semibold">Out of Stock</span>
                  ) : (
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      In Stock ({product.stock} units)
                    </span>
                  )}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Key Automotive Specifications Grid */}
              <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold tracking-wider">API Certification</span>
                  <span className="font-semibold text-white font-mono">{product.specifications.apiGrade}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold tracking-wider">Base Formulation</span>
                  <span className="font-semibold text-white">{product.oilType}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold tracking-wider">Container Style</span>
                  <span className="font-semibold text-blue-400">Normal Small Blue Dabba</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold tracking-wider">Recommended Drain</span>
                  <span className="font-semibold text-blue-400">{product.specifications.drainInterval}</span>
                </div>
              </div>

              {/* Compatible Vehicles */}
              {product.compatibleVehicles && product.compatibleVehicles.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-blue-400" />
                    Verified Vehicle Compatibility:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.compatibleVehicles.map((veh, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11px] bg-neutral-950 border border-neutral-800 text-neutral-300"
                      >
                        {veh}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Purchase Controls */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-950 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="px-3 py-2 text-neutral-400 hover:text-white disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-bold text-white min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="px-3 py-2 text-neutral-400 hover:text-white disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isOutOfStock
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 text-blue-400" />
                  <span>
                    {inCart ? `Add More (${inCart.quantity} in cart)` : isCarton ? 'Add Carton to Cart' : 'Add to Cart'}
                  </span>
                </button>

                {/* Buy Now button */}
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isOutOfStock
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-95'
                  }`}
                >
                  <span>{isCarton ? 'Buy Carton Now' : 'Buy Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-400" />
                  Cash on Delivery available nationwide
                </span>
                <span>Dispatch within 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
