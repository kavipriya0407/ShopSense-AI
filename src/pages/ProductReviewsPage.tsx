import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle2, ChevronRight, ThumbsUp, Camera } from 'lucide-react';
import { ShopZoneHeader } from '../components/shopzone/ShopZoneHeader';
import { ShopZoneFooter } from '../components/shopzone/ShopZoneFooter';
import { PRODUCT_SPECIFIC_REVIEWS, SHOPZONE_PRODUCTS } from '../mock-data/shopZoneData';

export const ProductReviewsPage: React.FC = () => {
  const product = SHOPZONE_PRODUCTS[0]; // Samsung Galaxy M14 5G
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const starBreakdown = [
    { stars: 5, pct: 68 },
    { stars: 4, pct: 16 },
    { stars: 3, pct: 8 },
    { stars: 2, pct: 4 },
    { stars: 1, pct: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between font-sans">
      <div>
        <ShopZoneHeader />

        {/* Breadcrumb (matching Screen 6) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-slate-500 flex items-center gap-1.5 overflow-x-auto">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/?cat=Mobiles" className="hover:text-blue-600">Mobiles</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/product/samsung-m14" className="hover:text-blue-600 truncate">{product.name}</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-semibold">Customer Reviews</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Customer Reviews
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified customer opinions & uploaded photos for {product.name}
            </p>
          </div>

          {/* Rating Summary + Breakdown Card (matching Screen 6) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Big Score */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-100 text-center">
              <span className="text-5xl font-black text-slate-900">4.3</span>
              <div className="flex items-center gap-1 text-amber-400 my-2">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                ))}
                <Star className="w-4 h-4 fill-amber-400/40 text-amber-400" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                (12,498 reviews)
              </span>
            </div>

            {/* Right Distribution Bars */}
            <div className="md:col-span-8 space-y-2">
              {starBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-6 font-bold text-slate-700 flex items-center gap-0.5">
                    {item.stars} <Star className="w-3 h-3 fill-slate-500 stroke-none inline" />
                  </span>

                  <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                    <div
                      className="bg-[#FF5722] h-full rounded-full"
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

          {/* Reviews List with Photo Attachments (matching Screen 6) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Detailed Customer Feedback
            </h3>

            <div className="space-y-6 divide-y divide-slate-100">
              {PRODUCT_SPECIFIC_REVIEWS.map((rev) => (
                <div key={rev.id} className="pt-6 first:pt-0 space-y-3">
                  {/* Author Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{rev.author}</h4>
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            ✓ Verified Buyer
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">{rev.purchasedProduct}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {rev.comment}
                  </p>

                  {/* Customer Uploaded Photo Attachments (matching Screen 6) */}
                  {rev.photos && rev.photos.length > 0 && (
                    <div className="flex items-center gap-2 pt-1">
                      {rev.photos.map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => setSelectedPhoto(photo)}
                          className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity bg-slate-50"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 cursor-pointer"
        >
          <div className="max-w-xl max-h-[80vh] bg-white rounded-2xl overflow-hidden p-2">
            <img src={selectedPhoto} alt="Zoom" className="w-full h-auto object-contain max-h-[75vh]" />
          </div>
        </div>
      )}

      <ShopZoneFooter />
    </div>
  );
};
