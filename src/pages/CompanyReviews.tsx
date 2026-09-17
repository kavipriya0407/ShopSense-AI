import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquare, Filter, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { ShopZoneHeader } from '../components/shopzone/ShopZoneHeader';
import { ShopZoneFooter } from '../components/shopzone/ShopZoneFooter';
import { COMPANY_REVIEWS } from '../mock-data/shopZoneData';

export const CompanyReviews: React.FC = () => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const starDistribution = [
    { stars: 5, pct: 78, count: '1,79,109' },
    { stars: 4, pct: 16, count: '44,777' },
    { stars: 3, pct: 4, count: '14,925' },
    { stars: 2, pct: 1, count: '4,975' },
    { stars: 1, pct: 1, count: '4,975' },
  ];

  const filteredReviews = COMPANY_REVIEWS.filter((r) =>
    filterRating === 'all' ? true : r.rating === filterRating
  );

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between font-sans antialiased">
      <div>
        <ShopZoneHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in">
          {/* Header Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                  Verified Merchant & Customer Ledger
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Cryptographic Trust
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Authentic post-settlement appraisals and satisfaction telemetry across the decentralized ShopSense network.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Escrow Verified</span>
            </div>
          </div>

          {/* Rating Summary Card with Distribution Bars */}
          <div className="lumen-card rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-slate-800 shadow-2xl">
            {/* Left Big Rating Box */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-800 text-center">
              <span className="text-6xl font-display font-black text-white tracking-tight">
                4.8<span className="text-2xl text-slate-500 font-normal">/5</span>
              </span>

              <div className="flex items-center gap-1.5 text-amber-400 my-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 stroke-none" />
                ))}
              </div>

              <span className="text-xs font-mono text-slate-400">
                Aggregated from <strong>248,763</strong> verified receipts
              </span>
            </div>

            {/* Right Distribution Bars */}
            <div className="md:col-span-8 space-y-3">
              {starDistribution.map((item) => (
                <div
                  key={item.stars}
                  onClick={() => setFilterRating(filterRating === item.stars ? 'all' : item.stars)}
                  className="flex items-center gap-3 text-xs cursor-pointer hover:opacity-90 transition-opacity group"
                >
                  <span className="w-7 font-mono font-bold text-slate-300 flex items-center gap-1">
                    {item.stars} <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none inline" />
                  </span>

                  {/* Progress bar */}
                  <div className="flex-1 bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>

                  <span className="w-12 text-right font-mono font-bold text-cyan-300">
                    {item.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Filter Chips */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterRating === 'all'
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All Appraisals
              </button>
              {[5, 4, 3, 2, 1].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterRating(st)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    filterRating === st
                      ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{st}</span>
                  <Star className="w-3 h-3 fill-current" />
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Displaying {filteredReviews.length} verified records
            </span>
          </div>

          {/* Testimonial Review Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="lumen-card rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all border border-slate-800 bg-slate-900/70"
              >
                <div className="space-y-3.5">
                  {/* Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm">{rev.author}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified Settlement</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stars Row */}
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                    ))}
                  </div>

                  {/* Comment Text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Card Footer: Purchased Product Tag & Date */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-cyan-400 truncate max-w-[160px]">
                    {rev.purchasedProduct}
                  </span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ShopZoneFooter />
    </div>
  );
};
