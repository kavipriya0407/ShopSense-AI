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
} from 'lucide-react';
import { useShopZone } from '../../context/ShopZoneContext';

export const ShopZoneHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItemCount, wishlist, user, logout, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useShopZone();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Mobiles', path: '/?cat=Mobiles' },
    { name: 'Electronics', path: '/?cat=Electronics' },
    { name: 'Fashion', path: '/?cat=Fashion' },
    { name: 'Home & Living', path: '/?cat=Home & Living' },
    { name: 'Appliances', path: '/?cat=Appliances' },
    { name: 'Beauty', path: '/?cat=Beauty' },
    { name: 'Toys & Kids', path: '/?cat=Toys & Kids' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    if (location.pathname !== '/') {
      navigate(`/?search=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* 1. Main Dark Navigation Bar */}
      <div className="bg-[#131921] text-white px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-[#FF5722] flex items-center justify-center text-white font-black shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5 fill-white stroke-none" />
          </div>
          <span className="text-xl sm:text-2xl font-black font-sans tracking-tight text-white">
            Shop<span className="text-[#FF5722]">Zone</span>
          </span>
        </Link>

        {/* Big Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-2xl mx-2 sm:mx-6 flex items-center bg-white rounded-md overflow-hidden shadow-inner"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full px-4 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#FF5722] hover:bg-[#F4511E] text-white px-5 py-2.5 transition-colors flex items-center justify-center shrink-0"
            title="Search"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold shrink-0">
          {/* User Account / Login */}
          {user.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-slate-300 hidden sm:inline">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="hover:text-[#FF5722] flex items-center gap-1 text-slate-300"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 hover:text-[#FF5722] transition-colors py-1 text-slate-200"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}

          {/* Wishlist */}
          <Link
            to="/company-reviews"
            className="hidden sm:flex items-center gap-1.5 hover:text-[#FF5722] transition-colors text-slate-200"
            title="Wishlist & Testimonials"
          >
            <Heart className="w-4 h-4 text-slate-200" />
            <span className="hidden md:inline">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="bg-slate-700 text-slate-200 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon & Count */}
          <Link
            to="/cart"
            className="flex items-center gap-1.5 hover:text-[#FF5722] transition-colors relative py-1 text-slate-200"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden md:inline">Cart</span>
            {cartItemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#FF5722] text-white text-[11px] font-extrabold flex items-center justify-center -ml-1">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 2. Horizontal Category Sub-Nav */}
      <div className="bg-white border-b border-slate-200 px-4 lg:px-8 py-2 flex items-center justify-between overflow-x-auto text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* All Categories Dropdown Button */}
          <button
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            className="flex items-center gap-1.5 text-slate-900 font-bold hover:text-[#FF5722] py-1 shrink-0"
          >
            <Menu className="w-4 h-4" />
            <span>All Categories</span>
          </button>

          {/* Category Tabs */}
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              onClick={() => {
                if (cat.name === 'Home') setSelectedCategory('All');
                else setSelectedCategory(cat.name);
              }}
              className={`hover:text-[#FF5722] transition-colors whitespace-nowrap py-1 ${
                (cat.name === 'Home' && selectedCategory === 'All') || selectedCategory === cat.name
                  ? 'text-[#FF5722] font-bold border-b-2 border-[#FF5722]'
                  : 'text-slate-600'
              }`}
            >
              {cat.name}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
              className="flex items-center gap-1 hover:text-[#FF5722] py-1"
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isMoreDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50 animate-in fade-in-50 duration-150 text-xs">
                <Link
                  to="/company-reviews"
                  onClick={() => setIsMoreDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                >
                  ⭐ Company Reviews (4.5★)
                </Link>
                <Link
                  to="/product/samsung-m14"
                  onClick={() => setIsMoreDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                >
                  📱 Product Details Demo
                </Link>
                <Link
                  to="/analytics"
                  onClick={() => setIsMoreDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                >
                  📊 Business Analytics Hub
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Portal Jump Buttons on Right of Subnav */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            to="/company-reviews"
            className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 hover:bg-amber-100"
          >
            <Star className="w-3 h-3 fill-amber-500 stroke-none" />
            <span>4.5★ (2.4L Reviews)</span>
          </Link>

          <Link
            to="/analytics"
            className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-md border border-slate-200 transition-colors"
          >
            <BarChart2 className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>Business Analytics</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
