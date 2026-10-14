import React, { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Truck, Check } from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    shippingFee,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
    selectedCity,
    setSelectedCity,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end">
      <div
        className="relative w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Your Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Progress */}
        <div className="bg-neutral-950 px-5 py-2.5 border-b border-neutral-800/80 text-xs">
          {subtotal >= 7000 ? (
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Check className="w-4 h-4" />
              <span>Congratulations! You unlocked FREE Nationwide Delivery.</span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span>Add Rs. {(7000 - subtotal).toLocaleString()} more for FREE Delivery</span>
                <span className="font-mono text-neutral-300">{Math.round((subtotal / 7000) * 100)}%</span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (subtotal / 7000) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <ShoppingBag className="w-12 h-12 text-neutral-600" />
              <p className="text-sm font-semibold text-neutral-300">Your cart is currently empty</p>
              <p className="text-xs text-neutral-500 max-w-xs">
                Explore our genuine engine oils, motorcycle lubricants, and signature Blue Dabba collection.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Browse Catalogue
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={`flex gap-3.5 p-3 rounded-xl border ${
                  item.isCarton
                    ? 'bg-blue-950/20 border-blue-800/80 shadow-sm'
                    : 'bg-neutral-950 border-neutral-800'
                }`}
              >
                <div className="w-16 h-16 rounded-lg bg-neutral-900 overflow-hidden flex items-center justify-center shrink-0 p-1">
                  <img
                    src={item.image}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 truncate">
                          {item.brandName} · {item.viscosity}
                        </span>
                        {item.isCarton && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            📦 مکمل کارٹن (All Pieces)
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                        aria-label={`Remove ${item.productName}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate">{item.productName}</h4>
                    <span className="text-[11px] text-neutral-400 font-mono block mt-0.5">
                      {item.packSize}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-white font-mono tabular-nums">
                      Rs. {(item.pricePKR * item.quantity).toLocaleString()}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Controls & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-neutral-800 bg-neutral-950 space-y-4">
            {/* Delivery Destination City Selector */}
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-neutral-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-400" />
                Shipping City:
              </span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Lahore">Lahore (Rs. 200 / Free 7K+)</option>
                <option value="Karachi">Karachi (Rs. 300 / Free 7K+)</option>
                <option value="Islamabad">Islamabad / Rawalpindi (Rs. 300)</option>
                <option value="Faisalabad">Faisalabad (Rs. 350)</option>
                <option value="Multan">Multan (Rs. 350)</option>
                <option value="Peshawar">Peshawar (Rs. 350)</option>
                <option value="Other">Other Pakistani Cities (Rs. 350)</option>
              </select>
            </div>

            {/* Coupon Code Input */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Coupon '{couponCode}' Applied (-Rs. {discount.toLocaleString()})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-neutral-400 hover:text-red-400 font-bold ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. SIRAJ10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 uppercase"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponFeedback && (
                <p
                  className={`text-[11px] mt-1 ${
                    couponFeedback.success ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Pricing Summary */}
            <div className="space-y-1.5 text-xs border-t border-neutral-800/80 pt-3">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-neutral-200">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Delivery ({selectedCity})</span>
                <span className="font-mono tabular-nums text-neutral-200">
                  {shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-neutral-800 pt-2">
                <span>Payable Amount</span>
                <span className="font-mono tabular-nums text-base text-blue-400">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
