import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Trophy,
  ShoppingBag,
  FileText,
  Bot,
  BrainCircuit,
  LogOut,
  ShoppingCart,
  ChevronLeft,
  ShieldCheck,
  Users,
  AlertTriangle,
  Layers,
  Store,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminMode = location.pathname.startsWith('/admin');

  const vendorNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Benchmarking', path: '/benchmarking', icon: Trophy },
    { label: 'Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Reports', path: '/reports', icon: FileText },
    { label: 'AI Assistant', path: '/ai-assistant', icon: Bot, badge: 'RAG' },
    { label: 'AI Data Analyst', path: '/ai-data-analyst', icon: BrainCircuit, badge: 'SQL' },
  ];

  const adminNavItems = [
    { label: 'Admin Overview', path: '/admin', icon: ShieldCheck },
    { label: 'Vendor Accounts', path: '/admin/vendors', icon: Users },
    { label: 'Disputes & Refunds', path: '/admin/disputes', icon: AlertTriangle },
    { label: 'Global Categories', path: '/admin/categories', icon: Layers },
  ];

  const currentNavItems = isAdminMode ? adminNavItems : vendorNavItems;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#070B14] text-slate-300 transition-all duration-300 z-40 flex flex-col justify-between border-r border-slate-800/80 shadow-2xl ${
        collapsed ? 'w-16' : 'w-[230px]'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-[#0A0F1D]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg ${
                isAdminMode
                  ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-purple-500/20'
                  : 'bg-gradient-to-tr from-indigo-600 to-cyan-500 shadow-indigo-500/20'
              }`}
            >
              {isAdminMode ? <ShieldCheck className="w-4.5 h-4.5" /> : <Sparkles className="w-4.5 h-4.5" />}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <span className="font-display font-black text-white tracking-tight text-sm truncate block">
                  {isAdminMode ? 'ShopSense Admin' : 'ShopSense AI'}
                </span>
                <span className="text-[10px] font-semibold text-indigo-400 block -mt-0.5">
                  {isAdminMode ? 'Super-Admin Console' : 'Vendor Intelligence'}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:flex"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Featured Storefront Quick Link */}
        <div className="p-2.5 pb-1">
          <NavLink
            to="/store"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/50 border border-indigo-500/30'
              } ${collapsed ? 'justify-center px-0' : ''}`
            }
            title={collapsed ? 'Customer AI Storefront' : undefined}
          >
            <Store className="w-4 h-4 shrink-0 text-indigo-400" />
            {!collapsed && (
              <div className="flex items-center justify-between w-full">
                <span>AI Storefront</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-indigo-500 text-white rounded font-mono font-bold">
                  NEW
                </span>
              </div>
            )}
          </NavLink>
        </div>

        {/* Main Navigation Links */}
        <nav className="p-2.5 space-y-1">
          {currentNavItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin' || item.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? isAdminMode
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-600/30'
                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  } ${collapsed ? 'justify-center px-0' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <IconComponent className="w-4.5 h-4.5 shrink-0" />
                {!collapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono font-bold border border-indigo-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-2.5 border-t border-slate-800/80 space-y-1 bg-[#0A0F1D]">
        <button
          onClick={() => navigate(isAdminMode ? '/dashboard' : '/admin')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-xl transition-all ${
            isAdminMode
              ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30'
              : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30'
          } ${collapsed ? 'justify-center px-0' : ''}`}
          title={collapsed ? (isAdminMode ? 'Switch to Vendor' : 'Switch to Admin') : undefined}
        >
          {isAdminMode ? <ShoppingCart className="w-4 h-4 shrink-0" /> : <ShieldCheck className="w-4 h-4 shrink-0" />}
          {!collapsed && <span>{isAdminMode ? 'Vendor Portal' : 'Admin Console'}</span>}
        </button>

        <button
          onClick={() => navigate('/login')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-all ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

