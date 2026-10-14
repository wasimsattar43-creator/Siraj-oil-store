import React, { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { Order, PaymentMethod } from '../types/store.ts';
import { X, ShieldCheck, Truck, Banknote, Building2, CreditCard, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

const pakistaniCities = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Gujrat',
  'Sahiwal',
  'Okara',
  'Rahim Yar Khan',
  'Sukkur',
  'Mirpur (AJK)',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const { items, subtotal, discount, shippingFee, total, couponCode, clearCart, selectedCity, setSelectedCity } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Frontend quick check
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Please enter your full name, Pakistani mobile number, and complete delivery address.');
      return;
    }

    const cleanPhone = phone.replace(/[\s\-]/g, '');
    const phonePattern = /^((\+92)|(0092)|(0))?3[0-9]{9}$/;
    if (!phonePattern.test(cleanPhone)) {
      setErrorMsg('Please enter a valid Pakistani mobile number (e.g. 0300-1234567 or 03211234567).');
      return;
    }

    if (paymentMethod === 'online_gateway') {
      setErrorMsg('Online payment gateway merchant account is currently in compliance verification. Please choose Cash on Delivery or Bank Transfer.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            fullName: fullName.trim(),
            phone: phone.trim(),
            email: email.trim(),
            city: selectedCity,
            address: address.trim(),
            instructions: instructions.trim(),
          },
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
          paymentMethod,
          couponCode,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order.');
      }

      clearCart();
      onClose();
      onOrderSuccess(data.order);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while processing your order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
              Siraj Oil Store Checkout
            </span>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Order Delivery Details (Pakistan)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification banner */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-xs text-red-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Section 1: Customer & Delivery Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-400" />
              1. Delivery Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Usman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Pakistani Mobile Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-blue-500 font-mono"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Used by TCS/Leopards delivery rider for arrival notification.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Destination City <span className="text-red-400">*</span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-blue-500"
                >
                  {pakistaniCities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Email Address <span className="text-neutral-500">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Complete Delivery Street Address <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="House / Workshop / Shop #, Street, Sector / Area, Landmark..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-neutral-200 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Special Delivery Instructions <span className="text-neutral-500">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Call before delivery, deliver to workshop front desk, etc."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-neutral-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="space-y-3 pt-4 border-t border-neutral-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Banknote className="w-4 h-4 text-blue-400" />
              2. Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Cash on Delivery */}
              <label
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'cod'
                    ? 'bg-blue-600/10 border-blue-500 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Banknote className="w-5 h-5 text-emerald-400" />
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-blue-500"
                  />
                </div>
                <div>
                  <span className="font-bold text-xs uppercase block text-white">Cash on Delivery</span>
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">
                    Pay cash upon delivery &amp; package inspection
                  </span>
                </div>
              </label>

              {/* Direct Bank Transfer */}
              <label
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'bank_transfer'
                    ? 'bg-blue-600/10 border-blue-500 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="accent-blue-500"
                  />
                </div>
                <div>
                  <span className="font-bold text-xs uppercase block text-white">Bank Transfer / IBFT</span>
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">
                    Meezan Bank &amp; HBL Official Account
                  </span>
                </div>
              </label>

              {/* Online Payment Gateway */}
              <label
                className={`p-3.5 rounded-xl border cursor-pointer opacity-70 transition-all flex flex-col justify-between ${
                  paymentMethod === 'online_gateway'
                    ? 'bg-blue-600/10 border-blue-500 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online_gateway"
                    checked={paymentMethod === 'online_gateway'}
                    onChange={() => setPaymentMethod('online_gateway')}
                    className="accent-blue-500"
                  />
                </div>
                <div>
                  <span className="font-bold text-xs uppercase block text-neutral-300">Online Card / Gateway</span>
                  <span className="text-[10px] text-amber-400/90 mt-0.5 block">
                    Merchant account in verification
                  </span>
                </div>
              </label>
            </div>

            {/* Bank details prompt when bank_transfer is selected */}
            {paymentMethod === 'bank_transfer' && (
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1.5 text-neutral-300">
                <span className="font-bold text-white block">Official Siraj Oil Store Bank Account:</span>
                <p className="font-mono text-[11px] text-blue-400">
                  Bank: Meezan Bank Ltd · Montgomery Road Branch Lahore<br />
                  Account Title: SIRAJ OIL STORE<br />
                  IBAN: PK42MEZN0001090019283741
                </p>
                <p className="text-[11px] text-neutral-400">
                  After placing the order, send a screenshot of the transfer with your Order # to our WhatsApp (+92 300 8451299) for express verification.
                </p>
              </div>
            )}
          </div>

          {/* Section 3: Order Summary Table */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-400 pb-2 border-b border-neutral-800">
              <span className="font-semibold text-neutral-300">Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span className="font-mono tabular-nums text-neutral-200">Rs. {subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount Promo</span>
                <span className="font-mono tabular-nums">-Rs. {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>Delivery Fee ({selectedCity})</span>
              <span className="font-mono tabular-nums text-neutral-200">
                {shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
              <span>Total Payable</span>
              <span className="font-mono tabular-nums text-blue-400">
                Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <span>Confirming &amp; Booking Order...</span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>Confirm Order · Rs. {total.toLocaleString()}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
