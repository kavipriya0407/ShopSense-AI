import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquare, Filter } from 'lucide-react';
import { ShopZoneHeader } from '../components/shopzone/ShopZoneHeader';
import { ShopZoneFooter } from '../components/shopzone/ShopZoneFooter';
import { COMPANY_REVIEWS } from '../mock-data/shopZoneData';

export const CompanyReviews: React.FC = () => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const starDistribution = [
    { stars: 5, pct: 72, count: '1,79,109' },
    { stars: 4, pct: 18, count: '44,777' },
    { stars: 3, pct: 6, count: '14,925' },
    { stars: 2, pct: 2, count: '4,975' },
    { stars: 1, pct: 2, count: '4,975' },
  ];

  const filteredReviews = COMPANY_REVIEWS.filter((r) =>
    filterRating === 'all' ? true : r.rating === filterRating
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between font-sans">
      <div>
        <ShopZoneHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
          {/* Header Title Section (matching Screen 5) */}
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Our Customers Say
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real reviews from real people. We value your feedback!
            </p>
          </div>

          {/* Rating Summary Card with Distribution Bars (matching Screen 5) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Big Rating Box */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-100 text-center">
              <span className="text-5xl font-black text-slate-900 tracking-tight">
                4.5<span className="text-2xl text-slate-400 font-semibold">/5</span>
              </span>

              <div className="flex items-center gap-1 text-amber-400 my-2">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 stroke-none" />
                ))}
                <Star className="w-5 h-5 fill-amber-400/50 text-amber-400" />
              </div>

              <span className="text-xs font-semibold text-slate-500">
                Based on (2,48,763 reviews)
              </span>
            </div>

            {/* Right Distribution Bars */}
            <div className="md:col-span-8 space-y-2.5">
              {starDistribution.map((item) => (
                <div
                  key={item.stars}
                  onClick={() => setFilterRating(filterRating === item.stars ? 'all' : item.stars)}
                  className="flex items-center gap-3 text-xs cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="w-6 font-bold text-slate-700 flex items-center gap-0.5">
                    {item.stars} <Star className="w-3 h-3 fill-slate-500 stroke-none inline" />
                  </span>

                  {/* Progress bar */}
                  <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                    <div
                      className="bg-[#FF5722] h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>

                  <span className="w-10 text-right font-mono font-bold text-slate-600">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterRating === 'all'
                    ? 'bg-[#131921] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Reviews
              </button>
              {[5, 4, 3, 2, 1].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterRating(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    filterRating === st
                      ? 'bg-[#FF5722] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{st}</span>
                  <Star className="w-3 h-3 fill-current" />
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              Showing {filteredReviews.length} verified ratings
            </span>
          </div>

          {/* Testimonial Review Cards Grid (matching Screen 5) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  {/* Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{rev.author}</h4>
                        <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified Buyer</span>
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
                  <p className="text-xs text-slate-700 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Card Footer: Purchased Product Tag & Date */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-600 truncate max-w-[160px]">
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
