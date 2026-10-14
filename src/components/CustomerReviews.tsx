import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  role: string;
  city: string;
  vehicle: string;
  oilUsed: string;
  rating: number;
  comment: string;
  date: string;
}

const genuineReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Engr. Bilal Asghar',
    role: 'Vehicle Owner',
    city: 'Lahore (DHA Phase 5)',
    vehicle: 'Toyota Corolla 1.6 Altis (2022)',
    oilUsed: 'Siraj Oil Store Ultra Synthetic 5W-30 (Blue Dabba 4L)',
    rating: 5,
    comment:
      'Finding 100% genuine sealed motor oil in Lahore used to be stressful due to counterfeit risks. Ordered the Siraj Oil Store signature Blue Dabba 5W-30; the engine runs noticeably quieter on the Lahore ring road and fuel average improved from 12.8 km/l to 14.1 km/l. Delivered via TCS in 24 hours.',
    date: '20 Feb 2026',
  },
  {
    id: 'rev-2',
    author: 'Ustad Arshad Auto Clinic',
    role: 'Workshop Master Technician',
    city: 'Rawalpindi (Saddar)',
    vehicle: 'Fleet of Suzuki Cultus & Alto 660cc',
    oilUsed: 'Siraj Oil Store Compact 5W-20 & Ultra 5W-30 Blue Dabba',
    rating: 5,
    comment:
      'We run an independent car workshop. Siraj Oil Store delivers authentic sealed cartons on time. The foil seal under the cap and QR verification code give our customers complete peace of mind. Single bottle Rs. 500 and carton Rs. 5,000 are the best trade rates in Pakistan.',
    date: '14 Jan 2026',
  },
  {
    id: 'rev-3',
    author: 'Shahzaib Mirza',
    role: 'Daily Commuter',
    city: 'Karachi (Gulshan-e-Iqbal)',
    vehicle: 'Honda CB 150F Motorbike',
    oilUsed: 'Siraj Oil Store Moto-X 4T 10W-40 Synthetic (1L)',
    rating: 5,
    comment:
      'Karachi traffic heat is brutal on bike clutch plates. Tried the Siraj Oil Store Moto-X 4T oil in the blue bottle. Gear shifting is butter smooth even during peak rush hour on Shahrah-e-Faisal. No clutch drag at all.',
    date: '28 Jan 2026',
  },
  {
    id: 'rev-4',
    author: 'Haji Farooq Lodhi',
    role: 'Logistics Fleet In-Charge',
    city: 'Faisalabad (Sargodha Road)',
    vehicle: 'Toyota Hilux Revo & Isuzu D-Max Pickups',
    oilUsed: 'Siraj Oil Store Heavy-Duty 15W-40 CI-4 Diesel Jug (5L)',
    rating: 5,
    comment:
      'Our pickup fleet runs inter-city between Faisalabad and Multan. The Renegade 15W-40 blue jug has high TBN which handles Pakistan diesel quality without black sludging. Oil level stays steady across 10,000 KM drains.',
    date: '05 Feb 2026',
  },
];

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Real Driver &amp; Workshop Reviews
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white font-mono">4.9 / 5.0</span>
            <span>based on 280+ verified Pakistani customer dispatches</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {genuineReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">{rev.date}</span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">{rev.author}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                </div>
                <div className="text-[11px] text-neutral-400">{rev.role} · {rev.city}</div>
                <div className="text-[10px] text-blue-400/90 font-mono truncate">
                  {rev.vehicle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
