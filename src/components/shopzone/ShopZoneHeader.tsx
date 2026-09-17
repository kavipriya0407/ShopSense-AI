import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  ChevronDown,
  BarChart2,
  Star,
  LogOut,
  X,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  Bot,
  Layers,
} from 'lucide-react';
import { useShopZone } from '../../context/ShopZoneContext';

export const ShopZoneHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cartItemCount,
    wishlist,
    user,
    logout,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useShopZone();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const categories = [
    { name: 'All Collections', cat: 'All', path: '/storefront' },
    { name: 'Mobiles & Flagships', cat: 'Mobiles', path: '/storefront?cat=Mobiles' },
    { name: 'Audio & Acoustics', cat: 'Electronics', path: '/storefront?cat=Electronics' },
    { name: 'Style & Apparel', cat: 'Fashion', path: '/storefront?cat=Fashion' },
    { name: 'Living & Decor', cat: 'Home & Living', path: '/storefront?cat=Home & Living' },
    { name: 'Smart Appliances', cat: 'Appliances', path: '/storefront?cat=Appliances' },
    { name: 'Cosmetics & Care', cat: 'Beauty', path: '/storefront?cat=Beauty' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    navigate(`/storefront?search=${encodeURIComponent(searchInput)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* 1. Top Bar: Luxury Obsidian Glass Navigation */}
      <div className="bg-[#090D16]/95 backdrop-blur-xl text-white px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4 border-b border-white/10">
        {/* Brand Logo */}
        <Link to="/storefront" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-950/60 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-display font-black tracking-tight text-white flex items-center gap-1.5">
              <span>ShopSense</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 text-xs font-mono font-extrabold uppercase px-1.5 py-0.2 rounded bg-white/10 border border-white/10">
                AI
              </span>
            </span>
          </div>
        </Link>

        {/* AI-Powered Smart Search Input */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-2xl mx-2 sm:mx-6 flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white focus-within:text-slate-900 border border-white/15 focus-within:border-indigo-500 rounded-2xl overflow-hidden shadow-inner transition-all group"
        >
          <div className="pl-3.5 text-slate-400 group-focus-within:text-indigo-600">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search AI curated catalog, brand specs, SKUs..."
            className="w-full px-3 py-2.5 text-xs sm:text-sm text-white group-focus-within:text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none font-medium"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white px-5 py-2.5 transition-all text-xs font-bold shrink-0 flex items-center gap-1"
            title="Search Catalog"
          >
            <span>Search</span>
          </button>
        </form>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-semibold shrink-0">
          {/* Jump to Merchant Hub */}
          <Link
            to="/dashboard"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-bold transition-all text-xs"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Merchant Hub</span>
          </Link>

          {/* AI Shopping Copilot Trigger */}
          <Link
            to="/buyer-assistant"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 font-bold transition-all text-xs"
            title="AI Shopping Concierge"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Concierge</span>
          </Link>

          {/* Wishlist */}
          <Link
            to="/company-reviews"
            className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors text-slate-200 relative py-1"
            title="Wishlist & Testimonials"
          >
            <Heart className="w-4.5 h-4.5 text-slate-300 hover:text-rose-400 transition-colors" />
            {wishlist.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center -ml-1">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon & Count */}
          <Link
            to="/cart"
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl shadow-md shadow-indigo-950/50 transition-all font-bold text-xs"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-indigo-900 text-[11px] font-black flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Account / Login */}
          {user.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-slate-300 hidden md:inline text-xs">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="hover:text-rose-400 flex items-center gap-1 text-slate-300 text-xs"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-bold"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>

      {/* 2. Horizontal Sub-Navigation */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-2.5 flex items-center justify-between overflow-x-auto text-xs font-semibold text-slate-700 shadow-xs">
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {categories.map((cat, idx) => {
            const isSelected =
              (cat.cat === 'All' && selectedCategory === 'All') || selectedCategory === cat.cat;
            return (
              <Link
                key={idx}
                to={cat.path}
                onClick={() => setSelectedCategory(cat.cat)}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-500/20'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Intelligence Links */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <Link
            to="/company-reviews"
            className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-xl border border-amber-200 transition-colors"
          >
            <Star className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
            <span>4.9★ Enterprise Score</span>
          </Link>

          <Link
            to="/analyst"
            className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 px-3 py-1 rounded-xl border border-cyan-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>AI Market Telemetry</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

