import React from 'react';
import { ShieldCheck, Phone, MapPin, Mail, Clock, Truck, Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenPolicies: (tab?: string) => void;
  onOpenAdmin: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPolicies,
  onOpenAdmin,
  onOpenTracking,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      {/* Top Value Banner */}
      <div className="border-b border-neutral-800/80 bg-neutral-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-xs block uppercase">100% Genuine Seals</span>
              <span className="text-[11px] text-neutral-400 mt-0.5 block">
                Tamper-proof induction foil and verified brand holograms on every pack.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-xs block uppercase">Pakistan Courier Logistics</span>
              <span className="text-[11px] text-neutral-400 mt-0.5 block">
                TCS &amp; Leopards Express delivery with Cash on Delivery across major cities.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <span className="font-bold text-white text-xs block uppercase">WhatsApp Advisory</span>
              <span className="text-[11px] text-neutral-400 mt-0.5 block">
                Speak directly with automotive lubricant technicians for vehicle grade matching.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-xs block uppercase">Secure Checkout</span>
              <span className="text-[11px] text-neutral-400 mt-0.5 block">
                Verified payment channels: Cash on Delivery &amp; Official Meezan/HBL IBFT.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                S
              </div>
              <span className="text-lg font-black text-white uppercase tracking-tight">
                Siraj <span className="text-blue-500">Oil</span> Store
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Official store for premium automotive engine oils and lubricants.
              Specializing in high-performance synthetic motor oils, motorcycle 4T lubricants, commercial diesel oils, and our signature Blue Dabba series. Single Bottle: Rs. 500 · Full Carton: Rs. 5,000.
            </p>
            <div className="space-y-1.5 text-[11px] text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Lahore Central Auto Hub: Badami Bagh &amp; Montgomery Road, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Helpline &amp; WhatsApp: +92 300 8451299 · +92 42 37728491</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>orders@sirajoilstore.pk · info@sirajoilstore.pk</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Store Hours: Mon – Sat: 9:00 AM – 8:30 PM PKT</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products" className="hover:text-white transition-colors">Car Engine Oil (PCMO)</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">Motorcycle 4T Engine Oil</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">Heavy Duty Diesel Oil</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">Fully Synthetic (0W-20, 5W-30)</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">Mineral High Mileage (20W-50)</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">Transmission &amp; Gear Fluids</a>
              </li>
            </ul>
          </div>

          {/* Store Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Customer Help &amp; Policies</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onOpenPolicies('about')} className="hover:text-white transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => onOpenPolicies('shipping')} className="hover:text-white transition-colors">Shipping &amp; Delivery Policy</button>
              </li>
              <li>
                <button onClick={() => onOpenPolicies('return')} className="hover:text-white transition-colors">7-Day Return &amp; Refund</button>
              </li>
              <li>
                <button onClick={() => onOpenPolicies('faq')} className="hover:text-white transition-colors">Frequently Asked Questions</button>
              </li>
              <li>
                <button onClick={() => onOpenPolicies('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => onOpenPolicies('terms')} className="hover:text-white transition-colors">Terms of Service</button>
              </li>
              <li>
                <button onClick={() => onOpenTracking()} className="text-blue-400 hover:text-blue-300 font-semibold">Track Consignment</button>
              </li>
            </ul>
          </div>

          {/* Business & Reseller Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">B2B &amp; Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#wholesale" className="hover:text-white transition-colors">Wholesale &amp; Fleet Inquiry</a>
              </li>
              <li>
                <a href="#quick-finder" className="hover:text-white transition-colors">Vehicle Viscosity Advisor</a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Lock className="w-3 h-3 text-neutral-500" />
                  <span>Authorized Staff Portal</span>
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider block mb-1">
                Authorized Reseller Brands
              </span>
              <p className="text-[10px] text-neutral-500">
                Shell Helix · Mobil 1 · Castrol · SK ZIC · TotalEnergies · Liqui Moly · Toyota Genuine
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Siraj Oil Store. All Rights Reserved. Reg. Auto Market, Lahore &amp; Karachi, Pakistan.
          </div>

          <div className="flex items-center gap-4">
            <span>Prices displayed in Pakistani Rupee (PKR).</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
