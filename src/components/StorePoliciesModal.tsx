import React, { useState } from 'react';
import { X, ShieldCheck, Truck, RotateCcw, Lock, FileText, Phone, MapPin, Mail, Clock, HelpCircle, Building2 } from 'lucide-react';

interface StorePoliciesModalProps {
  isOpen: boolean;
  initialTab?: string;
  onClose: () => void;
}

export const StorePoliciesModal: React.FC<StorePoliciesModalProps> = ({
  isOpen,
  initialTab = 'about',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950 shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
              Siraj Oil Store Customer Help &amp; Policies
            </span>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Information &amp; Store Policies
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/70 overflow-x-auto shrink-0 px-4 scrollbar-none">
          {[
            { id: 'about', label: 'About Us', icon: Building2 },
            { id: 'contact', label: 'Contact & Shop', icon: Phone },
            { id: 'faq', label: 'FAQs', icon: HelpCircle },
            { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
            { id: 'return', label: 'Returns & Refund', icon: RotateCcw },
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'terms', label: 'Terms & Conditions', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                  isSelected
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-neutral-300 leading-relaxed">
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white uppercase">About Siraj Oil Store</h3>
              <p>
                Founded in the automotive market heartlands of Pakistan, <strong>Siraj Oil Store</strong> is a premier multi-brand retail and commercial reseller specializing in authentic automotive engine oils, gear lubricants, motorcycle oils, and heavy-duty commercial lubricants.
              </p>
              <p>
                In a domestic market inundated with reconditioned and counterfeit engine oils, our founding commitment is simple and uncompromising: <strong>Every single bottle or canister sold through our platform is 100% factory original, induction-sealed, and batch-traceable.</strong>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <h4 className="font-bold text-white uppercase mb-1">Direct Brand Sourcing</h4>
                  <p className="text-neutral-400 text-[11px]">Authorized reseller network for Shell, Mobil, Castrol, ZIC, Total, Liqui Moly, and Toyota.</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <h4 className="font-bold text-white uppercase mb-1">Signature Blue Dabba</h4>
                  <p className="text-neutral-400 text-[11px]">Specially formulated high-temperature synthetic line packaged in tamper-evident blue canisters.</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <h4 className="font-bold text-white uppercase mb-1">Nationwide Logistics</h4>
                  <p className="text-neutral-400 text-[11px]">Direct express road delivery via TCS and Leopards Courier with Cash on Delivery inspection.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-5">
              <h3 className="text-lg font-black text-white uppercase">Store Address &amp; Contact Hubs</h3>
              <p className="text-neutral-400">
                You can reach our sales representatives, visit our retail counter, or send technical lubrication inquiries via phone and WhatsApp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold uppercase">
                    <MapPin className="w-4 h-4" />
                    <span>Lahore Central Retail &amp; Logistics Hub</span>
                  </div>
                  <p className="text-white">Shop #14-16, Auto Market, Badami Bagh / Montgomery Road</p>
                  <p className="text-neutral-400">Lahore, Punjab 54000, Pakistan</p>
                  <p className="text-neutral-400 font-mono">UAN / Landline: +92 42 37728491 (Placeholder)</p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold uppercase">
                    <MapPin className="w-4 h-4" />
                    <span>Karachi Southern Depot</span>
                  </div>
                  <p className="text-white">Warehouse 8B, Auto Spare Plaza, Plaza Market / M.A. Jinnah Road</p>
                  <p className="text-neutral-400">Karachi, Sindh 74400, Pakistan</p>
                  <p className="text-neutral-400 font-mono">Mobile / WhatsApp: +92 300 8451299</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span>Business Operating Hours:</span>
                  </div>
                  <p className="text-neutral-400">Monday to Saturday: 9:00 AM – 8:30 PM PKT | Sunday: Closed</p>
                </div>
                <a
                  href="https://wa.me/923008451299"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase"
                >
                  Chat on WhatsApp (+92 300 8451299)
                </a>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white uppercase">Frequently Asked Questions</h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <h4 className="font-bold text-white">How do I verify that the oil I received is genuine?</h4>
                  <p className="text-neutral-400">
                    All oils supplied by Siraj Oil Store feature unopened induction foil seals under the cap, original security collars that snap upon opening, and manufacturer batch stamps. You can also scan the QR security hologram on brands such as Shell and Mobil directly.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <h4 className="font-bold text-white">What is special about the "Blue Dabba" oil?</h4>
                  <p className="text-neutral-400">
                    The signature Blue Dabba line is our top-tier formulation engineered specifically for extreme Pakistani driving conditions (heatwaves exceeding 45°C, congested bumper-to-bumper city crawl). It uses high-shear resistance polymers and API SP additive packages.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <h4 className="font-bold text-white">Can I inspect the parcel before paying Cash on Delivery?</h4>
                  <p className="text-neutral-400">
                    Yes! Under our open-inspection policy, you may inspect the external packaging, brand label, and container seals in front of the TCS or Leopards delivery rider prior to handing over the cash payment.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <h4 className="font-bold text-white">How long does delivery take?</h4>
                  <p className="text-neutral-400">
                    Orders within Lahore are typically delivered within 24 to 48 hours. Orders to Karachi, Islamabad, Rawalpindi, Faisalabad, and Multan take 2 to 3 business days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white uppercase">Shipping &amp; Delivery Policy</h3>
              <p>
                Siraj Oil Store dispatches products securely packed in heavy-duty cardboard cartons with bubble cushioning and leak-proof strapping.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                <li>
                  <strong className="text-white">Shipping Rates:</strong> Lahore: Rs. 200. Karachi, Rawalpindi, Islamabad: Rs. 300. Other Pakistani cities: Rs. 350. Orders over Rs. 7,000 qualify for <strong>FREE Nationwide Delivery</strong>.
                </li>
                <li>
                  <strong className="text-white">Delivery Partners:</strong> We utilize authorized courier services (TCS, Leopards, Call Courier) with online tracking.
                </li>
                <li>
                  <strong className="text-white">Order Dispatch Time:</strong> Orders booked before 2:00 PM are handed over to couriers the same day (except Sundays and national holidays).
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'return' && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white uppercase">7-Day Return &amp; Refund Policy</h3>
              <p>
                We want you to shop with complete confidence. If you mistakenly ordered the wrong viscosity grade or bottle size:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                <li>
                  <strong className="text-white">Eligibility:</strong> The motor oil bottle/canister must remain 100% unopened, with the factory cap seal, induction foil, and barcode label completely intact.
                </li>
                <li>
                  <strong className="text-white">Return Period:</strong> You must initiate the return within 7 calendar days of delivery.
                </li>
                <li>
                  <strong className="text-white">Refund Method:</strong> Refunds are processed via Direct Bank Transfer (IBFT) or EasyPaisa/JazzCash within 48 hours after our warehouse inspects the returned sealed bottle.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white uppercase">Privacy &amp; Data Security</h3>
              <p>
                Siraj Oil Store respects your personal privacy. Customer phone numbers, addresses, and order histories are collected strictly for delivery fulfillment and order tracking.
              </p>
              <p>
                We never store payment credit/debit card numbers directly on our servers. All transactions follow strict Pakistani electronic data privacy guidelines.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white uppercase">Terms &amp; Conditions</h3>
              <p>
                By placing an order on the Siraj Oil Store website, you agree to our standard terms of trade:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                <li>Product specifications (API, ACEA, viscosity) are provided directly by original lubricant blenders.</li>
                <li>Ensure you consult your vehicle manufacturer owner's manual before filling any lubricant.</li>
                <li>Wholesale quotations are valid for 7 days due to crude base oil and currency fluctuations.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
