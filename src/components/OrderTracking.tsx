import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types/store.ts';
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface OrderTrackingProps {
  initialOrderNumber?: string;
  onClose?: () => void;
}

const statusSteps: { key: OrderStatus; label: string; desc: string }[] = [
  { key: 'pending', label: 'Order Received', desc: 'Order logged in store system' },
  { key: 'confirmed', label: 'Verified & Confirmed', desc: 'Batch and stock verified' },
  { key: 'processing', label: 'Packed & Sealed', desc: 'Original foil seal inspected' },
  { key: 'dispatched', label: 'In Transit', desc: 'Handed over to courier' },
  { key: 'delivered', label: 'Delivered', desc: 'Received by customer' },
];

export const OrderTracking: React.FC<OrderTrackingProps> = ({ initialOrderNumber, onClose }) => {
  const [query, setQuery] = useState(initialOrderNumber || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchOrder = async (searchVal: string) => {
    if (!searchVal.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(searchVal.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Order not found.');
      }
      setOrder(data.order);
    } catch (err: any) {
      setOrder(null);
      setErrorMsg(err.message || 'Unable to find order. Please verify your order number.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      fetchOrder(initialOrderNumber);
    }
  }, [initialOrderNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(query);
  };

  const getStepStatus = (stepKey: OrderStatus, currentStatus: OrderStatus) => {
    const orderIndex = statusSteps.findIndex((s) => s.key === currentStatus);
    const stepIndex = statusSteps.findIndex((s) => s.key === stepKey);

    if (currentStatus === 'cancelled') return 'cancelled';
    if (stepIndex < orderIndex) return 'completed';
    if (stepIndex === orderIndex) return 'current';
    return 'upcoming';
  };

  return (
    <section id="tracking" className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <Truck className="w-4 h-4" />
            <span>Pakistan Dispatch Tracking</span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Track Your Consignment
          </h2>
          <p className="text-xs text-neutral-400 mt-2">
            Enter your Siraj Oil Store order number (e.g. <span className="text-neutral-200 font-mono font-semibold">SOS-PK-10491</span>) to check real-time courier status and dispatch details.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Enter Order # (e.g. SOS-PK-10491)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>

        {/* Error message */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-300 flex items-start gap-3 max-w-lg mx-auto mb-6">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{errorMsg}</p>
              <p className="text-[11px] text-red-400/80 mt-1">
                Tip: If you recently placed the order, try checking the order number provided on your confirmation screen or WhatsApp message.
              </p>
            </div>
          </div>
        )}

        {/* Tracking Details Display */}
        {order && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Order Status
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-xl font-black text-white font-mono">{order.orderNumber}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                      order.orderStatus === 'delivered'
                        ? 'bg-emerald-600 text-white'
                        : order.orderStatus === 'dispatched'
                        ? 'bg-blue-600 text-white'
                        : order.orderStatus === 'cancelled'
                        ? 'bg-red-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="sm:text-right text-xs text-neutral-400 space-y-1">
                <div>
                  <span className="text-neutral-500">Destination: </span>
                  <span className="text-neutral-200 font-medium">{order.customer.city}</span>
                </div>
                {order.trackingNumber && (
                  <div>
                    <span className="text-neutral-500">Courier Tracking: </span>
                    <span className="text-blue-400 font-mono font-semibold">{order.trackingNumber}</span>
                  </div>
                )}
                <div>
                  <span className="text-neutral-500">Service: </span>
                  <span className="text-neutral-300">{order.courierName || 'TCS & Leopards Verified Logistics'}</span>
                </div>
              </div>
            </div>

            {/* Visual Stepper */}
            <div className="py-4">
              <div className="relative flex flex-col md:flex-row justify-between gap-6">
                {statusSteps.map((step, idx) => {
                  const state = getStepStatus(step.key, order.orderStatus);
                  return (
                    <div key={step.key} className="flex-1 flex md:flex-col items-start md:items-center text-left md:text-center relative gap-3 md:gap-2">
                      {/* Node Icon */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all z-10 ${
                          state === 'completed'
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : state === 'current'
                            ? 'bg-blue-600 border-blue-400 text-white ring-4 ring-blue-600/20'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-500'
                        }`}
                      >
                        {state === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : state === 'current' ? (
                          <Truck className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <span className={`text-xs font-bold block ${state === 'current' ? 'text-blue-400' : 'text-neutral-300'}`}>
                          {step.label}
                        </span>
                        <span className="text-[11px] text-neutral-500 block">{step.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Products in this order */}
            <div className="pt-4 border-t border-neutral-800 text-xs">
              <span className="font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                Items in this Consignment:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {order.items.map((i, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/90 flex items-center gap-3">
                    <img src={i.image} alt={i.productName} className="w-10 h-10 object-contain" />
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">{i.productName}</p>
                      <p className="text-[11px] text-neutral-400">
                        {i.packSize} · Qty: {i.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
