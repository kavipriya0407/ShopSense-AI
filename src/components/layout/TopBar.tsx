import React, { useState } from 'react';
import {
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  ShieldCheck,
  ShoppingCart,
  Store,
  Search,
  Zap,
  CheckCircle2,
  Database,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TopBarProps {
  pageTitle: string;
  onToggleSidebar: () => void;
  onOpenCommandPalette?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ pageTitle, onToggleSidebar, onOpenCommandPalette }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const isStoreMode = location.pathname.startsWith('/store');
  const isAdminMode = location.pathname.startsWith('/admin');
  const isVendorMode = !isStoreMode && !isAdminMode;

  return (
    <header className="h-16 bg-[#0B1120]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Left Title & Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <h1 className="text-base sm:text-lg font-display font-extrabold text-white tracking-tight">
            {pageTitle}
          </h1>

          {/* Mode Pill Badges */}
          {isAdminMode && (
            <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold rounded-full border border-indigo-500/40 font-mono">
              🛡️ SUPER-ADMIN
            </span>
          )}
          {isVendorMode && (
            <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-extrabold rounded-full border border-blue-500/40 font-mono">
              📊 VENDOR HUB
            </span>
          )}
        </div>
      </div>

      {/* Center / Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Command Palette Trigger */}
        {onOpenCommandPalette && (
          <button
            onClick={onOpenCommandPalette}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl border border-slate-800 text-xs font-medium transition-all shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span>Search or command...</span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700 text-[10px] font-mono">
              Ctrl+K
            </kbd>
          </button>
        )}

        {/* Backend & RAG Status Ping */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulsing-dot" />
          <span>RAG Online (14ms)</span>
        </div>

        {/* 3-Way Mode Switcher Pill */}
        <div className="hidden sm:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => navigate('/store')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              isStoreMode
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to Shopper Storefront"
          >
            <Store className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Store</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              isVendorMode
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to Vendor Intelligence"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Vendor</span>
          </button>

          <button
            onClick={() => navigate('/admin')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              isAdminMode
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to Admin Console"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Admin</span>
          </button>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setUnreadNotifications(0)}
          className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#0B1120]">
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="h-5 w-[1px] bg-slate-800 hidden sm:block" />

        {/* Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-800 transition-colors focus:outline-none"
          >
            <div
              className={`w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-xs shadow-md ${
                isAdminMode
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/40'
                  : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
              }`}
            >
              {isAdminMode ? 'SA' : 'SS'}
            </div>
            <span className="text-xs font-semibold text-slate-200 hidden sm:inline-block">
              {isAdminMode ? 'Super-Admin' : 'ShopSense HQ'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Dropdown Menu */}
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-52 rounded-2xl shadow-2xl bg-[#0F172A] z-50 p-2 border border-slate-800 animate-in fade-in zoom-in-95 duration-100 space-y-1">
              <div className="px-3 py-2 border-b border-slate-800 mb-1">
                <p className="text-xs font-bold text-white">
                  {isAdminMode ? 'Super-Admin' : 'Vendor Merchant'}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {isAdminMode ? 'admin@shopsense.com' : 'vendor@shopsense.com'}
                </p>
              </div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/store');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-400 hover:bg-indigo-950/40 rounded-xl transition-colors"
              >
                <Store className="w-4 h-4" />
                <span>Go to Storefront</span>
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-400 hover:bg-blue-950/40 rounded-xl transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Vendor Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/admin');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-purple-400 hover:bg-purple-950/40 rounded-xl transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Super-Admin</span>
              </button>

              <div className="h-[1px] bg-slate-800 my-1" />

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

