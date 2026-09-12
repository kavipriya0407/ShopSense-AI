import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Star, Heart, Zap, Sparkles, Check, ChevronRight } from 'lucide-react';
import { ShopZoneHeader } from '../components/shopzone/ShopZoneHeader';
import { ShopZoneFooter } from '../components/shopzone/ShopZoneFooter';
import { SHOPZONE_PRODUCTS, CATEGORIES_LIST, ShopZoneProduct } from '../mock-data/shopZoneData';
import { useShopZone } from '../context/ShopZoneContext';

export const Storefront: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('cat');
  const searchParam = searchParams.get('search');

  const { addToCart, wishlist, toggleWishlist, selectedCategory, setSelectedCategory, searchQuery } = useShopZone();

  // Filter products based on selected category or search query
  const filteredProducts = useMemo(() => {
    return SHOPZONE_PRODUCTS.filter((p) => {
      const matchCat =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (categoryParam && p.category.toLowerCase() === categoryParam.toLowerCase());

      const activeSearch = searchParam || searchQuery;
      const matchSearch =
        !activeSearch ||
        p.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(activeSearch.toLowerCase()) ||
        p.specs.some((s) => s.toLowerCase().includes(activeSearch.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [selectedCategory, categoryParam, searchParam, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between font-sans">
      <div>
        <ShopZoneHeader />

        {/* 1. Hero Banner: Big Savings Bigger Smiles */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-6">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#031B4E] via-[#092B6B] to-[#14479E] text-white p-6 sm:p-10 shadow-lg min-h-[260px] sm:min-h-[300px] flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Content */}
            <div className="space-y-4 max-w-xl z-10 text-center md:text-left">
              <div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  Big Savings <br />
                  <span className="text-[#FF5722]">Bigger Smiles</span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm font-medium mt-2">
                  Top Brands | Best Prices | Fast Delivery
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    const dealsSection = document.getElementById('deals-of-the-day');
                    dealsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Product Showcase Collage */}
            <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 shrink-0">
              {/* Product 1: Headphones */}
              <div className="w-24 sm:w-32 aspect-square rounded-xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-xl hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
                  alt="Headphones"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>

              {/* Product 2: Phone */}
              <div className="w-28 sm:w-36 aspect-square rounded-xl bg-white/15 backdrop-blur-md p-2 flex items-center justify-center border border-white/30 shadow-2xl scale-110">
                <img
                  src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&q=80"
                  alt="Samsung Galaxy"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Product 3: Watch */}
              <div className="w-24 sm:w-32 aspect-square rounded-xl bg-white/10 backdrop-blur-md p-2 flex items-center justify-center border border-white/20 shadow-xl hover:scale-105 transition-transform">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"
                  alt="Smartwatch"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Background Glow Overlay */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>

        {/* 2. Deals of the Day Section */}
        <div id="deals-of-the-day" className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Deals of the Day</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-100 text-red-600 uppercase tracking-wider">
                  Live
                </span>
              </h2>
            </div>
            <Link
              to="/"
              onClick={() => setSelectedCategory('All')}
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Cards Grid matching Screen 1 in photo */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((prod) => {
              const isWishlisted = wishlist.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 p-3 flex flex-col justify-between group relative"
                >
                  {/* Discount Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#22C55E] text-white shadow-xs">
                    {prod.discountPct}% OFF
                  </div>

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-rose-500 shadow-xs transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <div
                    onClick={() => navigate(`/product/${prod.id}`)}
                    className="aspect-square bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-3 cursor-pointer group-hover:scale-102 transition-transform"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <h3
                      onClick={() => navigate(`/product/${prod.id}`)}
                      className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
                      title={prod.name}
                    >
                      {prod.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">{prod.subtitle || prod.category}</p>

                    {/* Price Row */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-sm sm:text-base font-extrabold text-slate-900">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Quick Add Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="w-full py-1.5 bg-[#FF5722] hover:bg-[#F4511E] active:bg-orange-700 text-white font-bold text-xs rounded-md shadow-xs transition-all flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Category Icon Strip Grid matching bottom of Screen 1 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name === 'More' ? 'All' : cat.name);
                }}
                className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 hover:border-[#FF5722] hover:shadow-sm transition-all group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${cat.color} group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-[#FF5722]">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ShopZoneFooter />
    </div>
  );
};
