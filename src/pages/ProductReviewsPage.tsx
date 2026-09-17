import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle2, ChevronRight, ThumbsUp, Camera, ShieldCheck, Sparkles, X } from 'lucide-react';
import { ShopZoneHeader } from '../components/shopzone/ShopZoneHeader';
import { ShopZoneFooter } from '../components/shopzone/ShopZoneFooter';
import { PRODUCT_SPECIFIC_REVIEWS, SHOPZONE_PRODUCTS } from '../mock-data/shopZoneData';

export const ProductReviewsPage: React.FC = () => {
  const product = SHOPZONE_PRODUCTS[0];
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const starBreakdown = [
    { stars: 5, pct: 74 },
    { stars: 4, pct: 16 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 2 },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between font-sans antialiased">
      <div>
        <ShopZoneHeader />

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-slate-400 flex items-center gap-2 overflow-x-auto border-b border-slate-800">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Marketplace</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link to="/?cat=Mobiles" className="hover:text-cyan-400 transition-colors">Hardware & Devices</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link to={`/product/${product.id}`} className="hover:text-cyan-400 truncate transition-colors">{product.name}</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-mono font-bold">Verified Appraisals</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8 animate-fade-in">
          <div className="border-b border-slate-800 pb-4">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Asset Reviews & Consumer Field Photos
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Cryptographically verified buyer opinions and unpacked field imagery for <span className="text-cyan-400 font-bold">{product.name}</span>
            </p>
          </div>

          {/* Rating Summary + Breakdown Card */}
          <div className="lumen-card rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-slate-800 shadow-2xl">
            {/* Left Big Score */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-800 text-center">
              <span className="text-5xl font-display font-black text-white">4.8</span>
              <div className="flex items-center gap-1.5 text-amber-400 my-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 stroke-none" />
                ))}
              </div>
              <span className="text-xs font-mono text-slate-400">
                (12,498 verified deployments)
              </span>
            </div>

            {/* Right Distribution Bars */}
            <div className="md:col-span-8 space-y-2.5">
              {starBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-7 font-mono font-bold text-slate-300 flex items-center gap-1">
                    {item.stars} <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none inline" />
                  </span>

                  <div className="flex-1 bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>

                  <span className="w-10 text-right font-mono font-bold text-cyan-300">
                    {item.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List with Photo Attachments */}
          <div className="lumen-card rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
            <h3 className="text-base font-display font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Detailed Field Observations</span>
              <span className="text-xs font-mono text-cyan-400">Grounded Customer Reports</span>
            </h3>

            <div className="space-y-6 divide-y divide-slate-800/80">
              {PRODUCT_SPECIFIC_REVIEWS.map((rev) => (
                <div key={rev.id} className="pt-6 first:pt-0 space-y-3.5">
                  {/* Author Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{rev.author}</h4>
                          <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified Dispatch
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">{rev.purchasedProduct}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{rev.date}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>

                  {/* Customer Uploaded Photo Attachments */}
                  {rev.photos && rev.photos.length > 0 && (
                    <div className="flex items-center gap-3 pt-2">
                      {rev.photos.map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => setSelectedPhoto(photo)}
                          className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-700/80 cursor-pointer hover:border-cyan-400 hover:scale-105 transition-all bg-slate-900 shadow-md"
                        >
                          <img src={photo} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 cursor-pointer animate-fade-in"
        >
          <div className="max-w-2xl max-h-[85vh] bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden p-2 relative shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedPhoto} alt="Zoom" className="w-full h-auto object-contain max-h-[80vh] rounded-2xl" />
          </div>
        </div>
      )}

      <ShopZoneFooter />
    </div>
  );
};
