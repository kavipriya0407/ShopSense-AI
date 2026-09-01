import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, User, LogOut, Settings as SettingsIcon, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TopBarProps {
  pageTitle: string;
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ pageTitle, onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const isAdminMode = location.pathname.startsWith('/admin');

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left Title & Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">
            {pageTitle}
          </h1>
          {isAdminMode && (
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-extrabold rounded-full border border-indigo-200">
              Super-Admin
            </span>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mode Switcher Button */}
        <button
          onClick={() => navigate(isAdminMode ? '/dashboard' : '/admin')}
          className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs ${
            isAdminMode
              ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
              : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'
          }`}
        >
          {isAdminMode ? (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Switch to Vendor View</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Switch to Admin Portal</span>
            </>
          )}
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setUnreadNotifications(0)}
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="h-5 w-[1px] bg-slate-200" />

        {/* Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
          >
            <div
              className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${
                isAdminMode
                  ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                  : 'bg-blue-100 text-blue-700 border-blue-200'
              }`}
            >
              {isAdminMode ? 'SA' : 'SS'}
            </div>
            <span className="text-xs font-semibold text-slate-700 hidden sm:inline-block">
              {isAdminMode ? 'Super-Admin' : 'ShopSense Store'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Dropdown Menu */}
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 p-1.5 border border-slate-100 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-semibold text-slate-900">
                  {isAdminMode ? 'ShopSense Super-Admin' : 'ShopSense Store'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {isAdminMode ? 'admin@shopsense.com' : 'vendor@shopsense.com'}
                </p>
              </div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate(isAdminMode ? '/dashboard' : '/admin');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                {isAdminMode ? <ShoppingCart className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                <span>{isAdminMode ? 'Switch to Vendor' : 'Switch to Admin'}</span>
              </button>

              <div className="h-[1px] bg-slate-100 my-1" />

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
