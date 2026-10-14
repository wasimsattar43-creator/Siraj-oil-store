import React, { useState } from 'react';
import { Building2, Send, CheckCircle2, AlertCircle, Phone, Truck, ShieldCheck } from 'lucide-react';

export const WholesaleSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [productsInterested, setProductsInterested] = useState('Siraj Oil Store Blue Dabba 5W-30 (Cartons)');
  const [estimatedMonthlyVolume, setEstimatedMonthlyVolume] = useState('20 - 50 Cartons');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          businessName,
          phone,
          city,
          productsInterested,
          estimatedMonthlyVolume,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending wholesale request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="wholesale" className="py-16 bg-neutral-900/50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: B2B Value Proposition */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <Building2 className="w-4 h-4" />
              <span>B2B Commercial Supply</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Wholesale &amp; Bulk Orders for Workshops &amp; Fleets
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Are you an authorized automotive service station, fleet operator, motorcycle dealership, or oil retailer?
              Siraj Oil Store offers verified wholesale rates, carton packaging, and scheduled supply routes across Pakistan.
            </p>

            <div className="space-y-3 pt-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Tiered wholesale discounts on full cartons &amp; drums</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Guaranteed genuine manufacturer seals to protect your workshop reputation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Direct dispatch from Montgomery Road &amp; Badami Bagh auto hubs</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 flex items-center gap-3">
              <Phone className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <span className="font-bold text-white block">Direct Wholesale Desk:</span>
                <span className="font-mono text-neutral-300">+92 300 8451299 · Mon-Sat 9AM-8PM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase">Inquiry Submitted Successfully</h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Thank you, {fullName}. Our B2B commercial accounts manager will contact you at <span className="text-neutral-200 font-mono font-semibold">{phone}</span> with the wholesale rate catalog and freight terms.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold hover:text-white"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="text-lg font-black text-white uppercase">Request Wholesale Quotation</h3>
                    <p className="text-xs text-neutral-400">Fill out your details to receive discounted commercial trade rates.</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Contact Person Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Mehmood"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Workshop / Business Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Autos &amp; Lube Point"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        City / Location <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lahore / Faisalabad"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Products / Viscosities of Interest
                      </label>
                      <input
                        type="text"
                        value={productsInterested}
                        onChange={(e) => setProductsInterested(e.target.value)}
                        placeholder="e.g. Blue Dabba 5W-30, 20W-50, 4T 10W-40"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Estimated Monthly Requirement
                      </label>
                      <select
                        value={estimatedMonthlyVolume}
                        onChange={(e) => setEstimatedMonthlyVolume(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                      >
                        <option value="5 - 15 Cartons">5 - 15 Cartons (Small Workshop)</option>
                        <option value="20 - 50 Cartons">20 - 50 Cartons (Medium Service Station)</option>
                        <option value="50 - 150 Cartons">50 - 150 Cartons (Large Fleet / Dealership)</option>
                        <option value="Drums & Bulk 200L+">Drums &amp; Bulk Over 200 Litres</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Additional Notes or Specific Brands
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Specify required brands, delivery preference, or payment terms..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Wholesale Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
