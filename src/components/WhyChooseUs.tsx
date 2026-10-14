import React from 'react';
import { ShieldAlert, ShieldCheck, Droplet, Award, Zap, Truck, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>The Counterfeit Protection Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Why Motorists &amp; Workshops Trust Siraj Oil Store
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
            Over 30% of motor oil sold in informal Pakistani markets is recycled or counterfeit, leading to seized engines, choked catalytic converters, and massive overhaul expenses. Here is how we guarantee your engine's protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/40 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">100% Sealed Factory Packs</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every bottle features intact induction heat-seals, tamper-evident security rings, and manufacturer holograms. We never sell loose or repacked oils.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Inspection on Delivery</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/40 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">Thermal Stability for Pakistan Heat</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Selected Group III and Group IV synthetic base stocks engineered to resist viscosity thinning even when ambient summer road temperatures exceed 48°C.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>High Flash Point Formula</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/40 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">Authorized Reseller Sourcing</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct procurement from authorized corporate brand importers and licensed blenders in Pakistan. Batch certificates available upon request for fleets.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Batch Verified Traceability</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/40 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white uppercase">24-48h Major City Logistics</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Next-day express dispatch across Lahore, Karachi, Islamabad, and Rawalpindi via trusted courier networks with cash on delivery payment.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Live Order Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
