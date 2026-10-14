import React from 'react';
import { ArrowRight, Package, Edit2, ShieldCheck, Check, Sparkles, Droplet } from 'lucide-react';
import { OilViscosity } from '../types/store.ts';

interface HeroSectionProps {
  onExploreClick: () => void;
  onFilterViscosity: (viscosity: OilViscosity) => void;
  onSelectVehicleRecommendation?: (viscosity: OilViscosity, vehicle: string) => void;
  onOpenRateManager?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onFilterViscosity,
  onOpenRateManager,
}) => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-800/80 pt-10 pb-16 lg:py-20">
      {/* Luxury Ambient Lighting Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-blue-600/12 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-10 w-[350px] h-[280px] bg-amber-500/8 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Premium Value Proposition & Exclusive Pricing */}
          <div className="lg:col-span-7 space-y-6">
            {/* Exclusive Brand Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/50 text-xs font-bold text-blue-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Siraj Oil Store Official · Signature Blue Dabba Collection</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08]">
              The Right Oil For{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-amber-300">
                Every Journey
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Engineered exclusively by <strong className="text-white font-semibold">Siraj Oil Store</strong> for maximum engine longevity, thermal stability, and fuel economy under demanding road conditions.
            </p>

            {/* Premium Pricing Showcase Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-blue-950/40 border border-neutral-700/80 shadow-2xl max-w-xl">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center justify-between">
                <span>خصوصی ریٹ لسٹ (Official Store Rates):</span>
                {onOpenRateManager && (
                  <button
                    onClick={onOpenRateManager}
                    className="text-amber-400 hover:text-amber-300 text-xs flex items-center gap-1 font-bold"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>ریٹ تبدیل کریں (Change Rate)</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Single Bottle Rate */}
                <div className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-300 font-semibold">Single Bottle (پیس)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 font-bold">نارمل سائز</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-amber-400 font-mono tabular-nums">
                      Rs. 500
                    </span>
                    <span className="text-xs text-neutral-500 line-through font-mono">
                      Rs. 650
                    </span>
                  </div>
                </div>

                {/* Carton Rate */}
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-600/60 flex flex-col justify-between shadow-lg shadow-blue-950/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-200 font-bold flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-amber-400" />
                      مکمل کارٹن (All Pieces)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 font-bold">بچت آفر</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-mono tabular-nums">
                      Rs. 5,000
                    </span>
                    <span className="text-[11px] text-blue-300">سارے پیس ایک کارٹن میں</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all transform active:scale-95"
              >
                <span>Shop Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenRateManager && (
                <button
                  onClick={onOpenRateManager}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Edit2 className="w-4 h-4 text-amber-400" />
                  <span>ریٹ تبدیل کریں (Change Rates)</span>
                </button>
              )}

              <a
                href="#wholesale"
                className="inline-flex items-center px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Carton Wholesale Info
              </a>
            </div>

            {/* Quick Viscosity Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <span className="text-[11px] uppercase font-bold text-neutral-500">Popular Grades:</span>
              {(['5W-30', '10W-40', '20W-50', '0W-20', '15W-40'] as OilViscosity[]).map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    onFilterViscosity(v);
                    onExploreClick();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-blue-600/20 border border-neutral-800 hover:border-blue-500 text-neutral-300 hover:text-white font-mono text-xs transition-colors"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Premium Showcase of Siraj Oil Store Blue Dabba */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] rounded-3xl overflow-hidden border border-blue-900/60 shadow-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 p-5 text-center group">
              {/* Blue Glow Accent */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 blur-3xl pointer-events-none rounded-full" />

              {/* Product Badge */}
              <div className="flex items-center justify-between mb-3 px-1 text-xs">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Siraj Oil Store
                </span>
                <span className="text-[11px] font-mono text-amber-300 font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                  Normal Small Size
                </span>
              </div>

              {/* Clean High Definition Blue Dabba Image */}
              <div className="relative aspect-[4/3] max-h-[240px] flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 p-3">
                <img
                  src="/src/assets/images/siraj_oil_store_blue_dabba_1791984381397.jpg"
                  alt="Siraj Oil Store Blue Dabba"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Direct Price & Details Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight">
                      Siraj Oil Store Blue Dabba
                    </h4>
                    <span className="text-[11px] text-blue-400 font-medium">5W-30 Fully Synthetic</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-amber-400 font-mono block">Rs. 500</span>
                    <span className="text-[10px] text-neutral-400">Single Bottle</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-neutral-800">
                  <span className="text-blue-300 font-semibold flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-amber-400" />
                    مکمل کارٹن: Rs. 5,000
                  </span>
                  <button
                    onClick={onExploreClick}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider"
                  >
                    View All &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
