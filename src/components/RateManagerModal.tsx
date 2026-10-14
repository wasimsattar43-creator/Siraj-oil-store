import React, { useState, useEffect } from 'react';
import { Product } from '../types/store.ts';
import { X, Save, CheckCircle2, AlertCircle, RefreshCw, Package, Tag, ShieldCheck, Sparkles } from 'lucide-react';

interface RateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRatesUpdated: () => void;
  targetProductId?: string | null;
}

export const RateManagerModal: React.FC<RateManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onRatesUpdated,
  targetProductId,
}) => {
  const [rates, setRates] = useState<Record<string, { pricePKR: number; cartonPricePKR: number; stock: number }>>({});
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Sync products when modal opens
  useEffect(() => {
    if (isOpen && products.length > 0) {
      const initial: Record<string, { pricePKR: number; cartonPricePKR: number; stock: number }> = {};
      products.forEach((p) => {
        initial[p.id] = {
          pricePKR: p.pricePKR,
          cartonPricePKR: p.cartonPricePKR || 5000,
          stock: p.stock,
        };
      });
      setRates(initial);
      setSuccessMsg(null);
      setErrorMsg(null);
    }
  }, [isOpen, products]);

  if (!isOpen) return null;

  const handlePriceChange = (id: string, field: 'pricePKR' | 'cartonPricePKR' | 'stock', val: number) => {
    setRates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: Math.max(0, val),
      },
    }));
  };

  const handleSetAllSingleTo500 = () => {
    setRates((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((id) => {
        updated[id] = {
          ...updated[id],
          pricePKR: 500,
        };
      });
      return updated;
    });
    setSuccessMsg('تمام پراڈکٹس کی سنگل بوتل کا ریٹ Rs. 500 سیٹ کر دیا گیا۔ محفوظ کرنے کے لیے "Save All Rates" پر کلک کریں۔');
  };

  const handleSetAllCartonsTo5000 = () => {
    setRates((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((id) => {
        updated[id] = {
          ...updated[id],
          cartonPricePKR: 5000,
        };
      });
      return updated;
    });
    setSuccessMsg('تمام پراڈکٹس کے مکمل کارٹن کا ریٹ Rs. 5,000 سیٹ کر دیا گیا۔ محفوظ کرنے کے لیے "Save All Rates" پر کلک کریں۔');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const updates = Object.keys(rates).map((id) => ({
        id,
        pricePKR: rates[id].pricePKR,
        cartonPricePKR: rates[id].cartonPricePKR,
        stock: rates[id].stock,
      }));

      const res = await fetch('/api/products/batch/rates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('تمام نئے ریٹس اور کارٹن کی قیمت کامیابی کے ساتھ محفوظ ہو گئی ہیں!');
        onRatesUpdated();
        setTimeout(() => {
          setSuccessMsg(null);
        }, 4000);
      } else {
        setErrorMsg(data.error || 'ریٹس محفوظ کرنے میں خرابی پیش آئی۔');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'سرور سے رابطہ نہ ہو سکا۔');
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.viscosity.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-700 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Rate &amp; Price Manager
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase">
                  Siraj Oil Store
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                یہاں سے آپ سنگل ڈبہ ریٹ (Rs. 500) اور مکمل کارٹن (Rs. 5,000) تبدیل کر سکتے ہیں۔
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
            aria-label="Close Rate Manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice & Quick Controls */}
        <div className="bg-neutral-950/60 p-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <Package className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              سنگل بوتل ریٹ: <strong>Rs. 500</strong> | مکمل کارٹن: <strong>Rs. 5,000</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSetAllSingleTo500}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-colors font-medium text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>تمام بوتلیں 500 کریں (All Bottles Rs. 500)</span>
            </button>
            <button
              onClick={handleSetAllCartonsTo5000}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 transition-colors font-medium text-xs"
            >
              <Package className="w-3.5 h-3.5 text-blue-400" />
              <span>تمام کارٹن 5,000 کریں (All Cartons Rs. 5,000)</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="m-4 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="m-4 p-3.5 rounded-xl bg-red-950/80 border border-red-700 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Search */}
        <div className="p-4 bg-neutral-900 border-b border-neutral-800">
          <input
            type="text"
            placeholder="پراڈکٹ تلاش کریں (Filter by product name, viscosity 5W-30, 10W-40...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Product Table / List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredProducts.map((p) => {
            const current = rates[p.id] || { pricePKR: p.pricePKR, cartonPricePKR: p.cartonPricePKR || 5000, stock: p.stock };
            const isTarget = targetProductId === p.id;

            return (
              <div
                key={p.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isTarget
                    ? 'bg-blue-950/30 border-blue-500 shadow-lg shadow-blue-950/40'
                    : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Product Info & Small Dabba Thumbnail */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-blue-600 text-white">
                          Siraj Oil Store
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
                          {p.viscosity}
                        </span>
                        <span className="text-[10px] text-neutral-500">{p.packSize} (Normal Small)</span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate mt-1">{p.name}</h4>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {p.dabbaColor}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price & Carton Rate Editors */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
                    {/* Single Piece Rate */}
                    <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                        Single Bottle (پیس ریٹ)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-neutral-500 font-mono">Rs.</span>
                        <input
                          type="number"
                          value={current.pricePKR}
                          onChange={(e) => handlePriceChange(p.id, 'pricePKR', Number(e.target.value))}
                          className="w-24 bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Carton Rate (Rs. 5,000) */}
                    <div className="bg-blue-950/40 p-2.5 rounded-xl border border-blue-800/80">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] uppercase font-bold text-blue-300 block">
                          Carton Rate (کارٹن ریٹ)
                        </label>
                        <span className="text-[9px] text-amber-400 font-bold">تمام پیس</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-blue-400 font-mono">Rs.</span>
                        <input
                          type="number"
                          value={current.cartonPricePKR}
                          onChange={(e) => handlePriceChange(p.id, 'cartonPricePKR', Number(e.target.value))}
                          className="w-24 bg-neutral-950 border border-blue-500 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-amber-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                        Stock (دستیاب تعداد)
                      </label>
                      <input
                        type="number"
                        value={current.stock}
                        onChange={(e) => handlePriceChange(p.id, 'stock', Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1 text-xs font-mono text-neutral-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer: Save Button */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-4">
          <div className="text-xs text-neutral-400 hidden sm:block">
            <span>تبدیل شدہ ریٹس فوری طور پر سٹور اور چیک آؤٹ میں اپ ڈیٹ ہو جائیں گے۔</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'محفوظ ہو رہا ہے...' : 'Save All Rates (ریٹ محفوظ کریں)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
