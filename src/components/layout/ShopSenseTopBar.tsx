import React, { useState } from 'react';
import {
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  ShieldCheck,
  Store,
  Search,
  User,
  ShoppingBag,
  Sparkles,
  Activity,
  Layers,
  ExternalLink,
  Cpu,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useShopSense } from '../../context/ShopSenseContext';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export const ShopSenseTopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, switchRole } = useShopSense();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [commandQuery, setCommandQuery] = useState('');

  const isAdmin = user.role === 'admin' || location.pathname.startsWith('/admin');

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/catalog')) return 'Merchant Inventory Nexus';
    if (path.includes('/add-product')) return 'Publish New Asset';
    if (path.includes('/insights')) return 'Predictive Intelligence';
    if (path.includes('/ai-assistant')) return 'Neural Catalog Copilot';
    if (path.includes('/profile')) return 'Merchant Credentials';
    if (path.includes('/admin/customers')) return 'Customer Matrix';
    if (path.includes('/admin/approvals')) return 'Asset Governance & Approvals';
    if (path.includes('/admin/vendors')) return 'Enterprise Merchant Network';
    if (path.includes('/admin/products')) return 'Global Marketplace Registry';
    if (path.includes('/admin/revenue')) return 'Financial Settlement Engine';
    if (path.includes('/admin/analytics')) return 'Marketplace Telemetry';
    if (path.includes('/admin/settings')) return 'Platform Parameters';
    if (path.includes('/admin')) return 'Super-Admin Control Matrix';
    return 'Merchant Command Center';
  };

  const notifications = [
    {
      id: 1,
      title: 'High-Velocity Settlement Cleared',
      desc: 'Order batch #ORD-9842 verified for ₹1,49,900',
      time: '6m ago',
      type: 'success',
    },
    {
      id: 2,
      title: 'AI Reorder Threshold Reached',
      desc: 'Daily Glow Skincare stock below 10 units. Auto-restock suggested.',
      time: '42m ago',
      type: 'warning',
    },
    {
      id: 3,
      title: 'Scheduled Merchant Payout',
      desc: '₹7,95,168.00 dispatched to merchant account.',
      time: '3h ago',
      type: 'info',
    },
  ];

  return (
    <header className="h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)]">
      {/* Left: Sidebar Toggle & Page Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/80 transition-all active:scale-95"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <h1 className="text-base sm:text-lg font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{getPageTitle()}</span>
          </h1>

          <span
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold rounded-full font-mono uppercase tracking-wider ${
              isAdmin
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAdmin ? 'bg-purple-600' : 'bg-indigo-600'
              }`}
            />
            {isAdmin ? 'PLATFORM ADMIN' : 'MERCHANT HUB'}
          </span>
        </div>
      </div>

      {/* Center / Right: Quick Mode Switcher & Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Universal Mode Capsule */}
        <div className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <Link
            to="/storefront"
            className="px-2.5 py-1 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-white transition-all flex items-center gap-1.5"
            title="Browse Buyer Storefront"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-indigo-500" />
            <span>Storefront</span>
          </Link>

          <button
            onClick={() => {
              if (isAdmin) {
                switchRole('vendor');
                navigate('/dashboard');
              } else {
                navigate('/dashboard');
              }
            }}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              !isAdmin && location.pathname !== '/storefront'
                ? 'bg-[#0D1322] text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Vendor</span>
          </button>

          <button
            onClick={() => {
              if (!isAdmin) {
                switchRole('admin');
                navigate('/admin');
              } else {
                navigate('/admin');
              }
            }}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              isAdmin
                ? 'bg-[#0D1322] text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Admin</span>
          </button>

          <Link
            to="/analyst"
            className="px-2.5 py-1 rounded-lg text-slate-600 hover:text-cyan-600 hover:bg-white transition-all flex items-center gap-1.5"
            title="AI Intelligence Studio"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>AI Studio</span>
          </Link>
        </div>

        {/* Live Network Pulse */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulsing-dot" />
          <span>99.9% LIVE</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileDropdownOpen(false);
            }}
            className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 transition-colors"
            title="System Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-xl bg-white z-50 p-3.5 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">Intelligence Alerts</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-50 text-indigo-700 font-bold font-mono">
                    {unreadCount} Active
                  </span>
                </div>
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] text-indigo-600 font-bold hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-100 transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900">{n.title}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

        {/* User Account Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-indigo-200">
              {isAdmin ? 'AD' : user.name?.charAt(0) || 'A'}
            </div>
            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 leading-none">
                  {user.name || 'Merchant'}
                </span>
                <span className="px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded text-[9px] font-bold font-mono">
                  {isAdmin ? 'ADMIN' : 'VENDOR'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium block truncate max-w-[120px]">
                {user.company || 'Enterprise'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-2xl shadow-xl bg-white z-50 p-2 border border-slate-200 animate-in fade-in zoom-in-95 duration-100 space-y-1">
              <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">{user.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                  {user.company}
                </span>
              </div>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigate('/profile');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Store Profile & Settings</span>
              </button>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigate('/storefront');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-500" />
                <span>Open Buyer Storefront</span>
              </button>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  if (isAdmin) {
                    switchRole('vendor');
                    navigate('/dashboard');
                  } else {
                    switchRole('admin');
                    navigate('/admin');
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
              >
                {isAdmin ? (
                  <Store className="w-4 h-4 text-purple-600" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                )}
                <span>{isAdmin ? 'Switch to Merchant Mode' : 'Switch to Super-Admin'}</span>
              </button>

              <div className="h-[1px] bg-slate-100 my-1" />

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

