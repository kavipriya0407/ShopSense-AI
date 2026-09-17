import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  ShoppingBag,
  Star,
  Heart,
  Zap,
  Sparkles,
  Check,
  ChevronRight,
  SlidersHorizontal,
  Bot,
  Layers,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Flame,
  Eye,
} from 'lucide-react';
import { ShopZoneHeader } from '../components/shopzone/ShopZoneHeader';
import { ShopZoneFooter } from '../components/shopzone/ShopZoneFooter';
import { SHOPZONE_PRODUCTS, CATEGORIES_LIST, ShopZoneProduct } from '../mock-data/shopZoneData';
import { useShopZone } from '../context/ShopZoneContext';

export const Storefront: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('cat');
  const searchParam = searchParams.get('search');

  const { addToCart, wishlist, toggleWishlist, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } =
    useShopZone();

  const [activePromptQuery, setActivePromptQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const promptSuggestions = [
    'Flagship 5G Smartphones under ₹40,000',
    'Audiophile ANC Headphones & Earbuds',
    'Luxury Hydrating Organic Skincare',
    'Ergonomic Home Office Tech',
  ];

  // Filter products based on selected category or search query
  const filteredProducts = useMemo(() => {
    let result = SHOPZONE_PRODUCTS.filter((p) => {
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

    if (selectedSort === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, categoryParam, searchParam, searchQuery, selectedSort]);

  const featuredSpotlightProduct = SHOPZONE_PRODUCTS[0]; // Flagship spotlight

  return (
    <div className="min-h-screen bg-[#F8FAFC] lumen-subtle-mesh text-slate-900 flex flex-col justify-between font-sans">
      <div>
        <ShopZoneHeader />

        {/* 1. Hero Section: Futuristic AI Commerce Nexus */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-5 pb-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#090D16] border border-[#1E293B] text-white p-6 sm:p-10 lg:p-12 shadow-2xl min-h-[380px] flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Background Ambient Mesh Lights */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left Hero Content */}
            <div className="space-y-6 max-w-xl z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold font-mono tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>INTELLIGENT COMMERCE MATRIX 2026</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-display font-black tracking-tight leading-[1.1] text-white">
                  Precision Curation. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-300">
                    Neural Intelligence.
                  </span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm font-normal mt-3 leading-relaxed max-w-lg">
                  Explore verified manufacturer-direct flagships, premium acoustic hardware, and smart living assets with zero-latency inventory tracking.
                </p>
              </div>

              {/* AI Quick Query Chips */}
              <div className="pt-1">
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold flex items-center justify-center lg:justify-start gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ask AI Concierge Prompt:</span>
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {promptSuggestions.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(prompt.split(' ')[0]);
                        const dealsSec = document.getElementById('catalog-matrix');
                        dealsSec?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3 py-1 rounded-xl bg-white/10 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-500/40 text-[11px] font-semibold text-slate-200 transition-all text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => {
                    const catalogSec = document.getElementById('catalog-matrix');
                    catalogSec?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-950/60 transition-all active:scale-95"
                >
                  <span>Explore Catalog Matrix</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/buyer-assistant"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/15 transition-all"
                >
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Launch AI Assistant</span>
                </Link>
              </div>
            </div>

            {/* Right Hero: Holographic Spotlight Card */}
            <div className="relative z-10 w-full lg:w-96 rounded-2xl bg-[#0D1322]/90 backdrop-blur-2xl border border-white/15 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>SPOTLIGHT DROP</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                  {featuredSpotlightProduct.discountPct}% ESCROW DISCOUNT
                </span>
              </div>

              {/* Image */}
              <div
                onClick={() => navigate(`/product/${featuredSpotlightProduct.id}`)}
                className="aspect-[4/3] bg-white/5 rounded-xl p-4 flex items-center justify-center overflow-hidden cursor-pointer group"
              >
                <img
                  src={featuredSpotlightProduct.image}
                  alt={featuredSpotlightProduct.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Specs & Pricing */}
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                  {featuredSpotlightProduct.category}
                </span>
                <h3
                  onClick={() => navigate(`/product/${featuredSpotlightProduct.id}`)}
                  className="text-base font-bold text-white line-clamp-1 hover:text-cyan-300 cursor-pointer transition-colors"
                >
                  {featuredSpotlightProduct.name}
                </h3>

                <div className="flex items-baseline gap-2.5 mt-2">
                  <span className="text-xl font-display font-black text-white">
                    ₹{featuredSpotlightProduct.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{featuredSpotlightProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addToCart(featuredSpotlightProduct, 1)}
                    className="w-full py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>

                  <button
                    onClick={() => navigate(`/product/${featuredSpotlightProduct.id}`)}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/10 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-300" />
                    <span>View Specs</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Category Capsules Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name === 'More' ? 'All' : cat.name);
                  const catalogSec = document.getElementById('catalog-matrix');
                  catalogSec?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center gap-2 group ${
                  selectedCategory === cat.name
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30'
                    : 'bg-white hover:bg-indigo-50/50 border-slate-200 hover:border-indigo-300 shadow-xs'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110 ${
                    selectedCategory === cat.name ? 'bg-white/20 text-white' : `${cat.color}`
                  }`}
                >
                  {cat.icon}
                </div>
                <span
                  className={`text-xs font-bold tracking-tight text-center ${
                    selectedCategory === cat.name ? 'text-white' : 'text-slate-700 group-hover:text-indigo-600'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Catalog Matrix & Live Drops Grid */}
        <div id="catalog-matrix" className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
          {/* Header Row with Filter & Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight">
                  High-Demand Asset Matrix
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {filteredProducts.length} ASSETS ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Verified inventory with real-time merchant pricing & autonomous escrow dispatch
              </p>
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs text-xs font-bold text-slate-700">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
                <span>Sort:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value as any)}
                  className="bg-transparent focus:outline-none cursor-pointer text-slate-900 font-semibold"
                >
                  <option value="featured">AI Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>

              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 transition-colors"
                >
                  Reset ({selectedCategory})
                </button>
              )}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {filteredProducts.map((prod) => {
              const isWishlisted = wishlist.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="lumen-card p-3.5 flex flex-col justify-between group relative overflow-hidden bg-white hover:border-indigo-400 transition-all duration-300"
                >
                  {/* Discount Ribbon */}
                  <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md text-[10px] font-mono font-black bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-xs">
                    {prod.discountPct}% OFF
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 shadow-sm transition-colors border border-slate-100"
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <div
                    onClick={() => navigate(`/product/${prod.id}`)}
                    className="aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-3 mb-3 cursor-pointer group-hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider font-mono">
                        {prod.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{prod.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => navigate(`/product/${prod.id}`)}
                      className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 cursor-pointer"
                      title={prod.name}
                    >
                      {prod.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">{prod.subtitle || prod.category}</p>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-base font-display font-black text-slate-900">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Quick Add Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="w-full py-2 bg-slate-900 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 group/btn"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-indigo-400 group-hover/btn:text-white transition-colors" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ShopZoneFooter />
    </div>
  );
};

