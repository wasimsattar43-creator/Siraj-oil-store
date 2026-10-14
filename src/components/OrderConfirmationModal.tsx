import React from 'react';
import { Order } from '../types/store.ts';
import { CheckCircle2, Package, Truck, Phone, Printer, ExternalLink, X, MapPin } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (orderNumber: string) => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onTrackOrder,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Siraj Oil Store! I just placed order ${order.orderNumber} for Rs. ${order.totalPKR.toLocaleString()}. Kindly confirm dispatch to ${order.customer.city}.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-8 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950 print:bg-white print:border-b-2 print:border-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Order Confirmed · 100% Genuine Guaranteed
              </span>
              <h2 className="text-xl font-black text-white print:text-black">
                Thank You, {order.customer.fullName}!
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors print:hidden"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Reference Box */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:border-black">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider block">
                Official Order Reference
              </span>
              <span className="text-2xl font-black font-mono text-blue-400 print:text-black">
                {order.orderNumber}
              </span>
              <span className="text-xs text-neutral-400 block mt-0.5">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider block">
                Estimated Delivery
              </span>
              <span className="text-sm font-bold text-white print:text-black block">
                {order.estimatedDeliveryDays || '2-3 Business Days'}
              </span>
              <span className="text-xs text-neutral-400">Via TCS / Leopards Express</span>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="font-bold text-neutral-300 uppercase tracking-wider block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                Shipping Destination:
              </span>
              <p className="text-white font-medium">{order.customer.fullName}</p>
              <p className="text-neutral-400">{order.customer.address}, {order.customer.city}</p>
              <p className="text-neutral-400 font-mono">Mobile: {order.customer.phone}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <span className="font-bold text-neutral-300 uppercase tracking-wider block flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-blue-400" />
                Payment Method &amp; Status:
              </span>
              <p className="text-white font-medium uppercase">{order.paymentMethod.replace('_', ' ')}</p>
              <p className="text-neutral-400">Payment Status: <span className="font-bold uppercase text-amber-400">{order.paymentStatus}</span></p>
              <p className="text-neutral-400">Order Status: <span className="font-bold uppercase text-blue-400">{order.orderStatus}</span></p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-neutral-800 rounded-xl overflow-hidden print:border-black">
            <div className="bg-neutral-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-400 flex justify-between">
              <span>Item Description</span>
              <span>Total</span>
            </div>
            <div className="divide-y divide-neutral-800 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-neutral-950 p-1 shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.productName} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="font-bold text-white print:text-black line-clamp-1">{item.productName}</p>
                      <p className="text-[11px] text-neutral-400 font-mono">
                        {item.packSize} · Qty: {item.quantity} × Rs. {item.pricePKR.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-neutral-200 print:text-black tabular-nums">
                    Rs. {(item.pricePKR * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-neutral-950 p-3 text-xs space-y-1 border-t border-neutral-800 print:border-black">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">Rs. {order.subtotalPKR.toLocaleString()}</span>
              </div>
              {order.discountPKR > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-Rs. {order.discountPKR.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Shipping Fee</span>
                <span className="font-mono tabular-nums">{order.shippingFeePKR === 0 ? 'FREE' : `Rs. ${order.shippingFeePKR}`}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-white print:text-black pt-1 border-t border-neutral-800">
                <span>Total Amount Due</span>
                <span className="font-mono text-base text-blue-400 print:text-black">
                  Rs. {order.totalPKR.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/923008451299?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={handlePrint}
                className="px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onTrackOrder(order.orderNumber);
              }}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Track This Order</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
