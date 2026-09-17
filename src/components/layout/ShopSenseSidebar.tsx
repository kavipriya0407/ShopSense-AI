import React from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  TrendingUp,
  Bot,
  User,
  LogOut,
  ChevronLeft,
  ShieldCheck,
  Users,
  CheckSquare,
  DollarSign,
  BarChart2,
  Settings,
  Store,
  Sparkles,
  ShoppingBag,
  Cpu,
  Layers,
  Activity,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const ShopSenseSidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, switchRole } = useShopSense();

  const isAdminMode = location.pathname.startsWith('/admin') || user.role === 'admin';

  const vendorNavItems = [
    { label: 'Command Hub', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Inventory Nexus', path: '/catalog', icon: Package },
    { label: 'Publish Asset', path: '/add-product', icon: PlusCircle },
    { label: 'Predictive Insights', path: '/insights', icon: TrendingUp },
    { label: 'Neural Copilot', path: '/ai-assistant', icon: Bot, badge: 'AI Live' },
    { label: 'Merchant Profile', path: '/profile', icon: User },
  ];

  const adminNavItems = [
    { label: 'Control Matrix', path: '/admin', icon: LayoutDashboard },
    { label: 'Merchant Network', path: '/admin/vendors', icon: Users },
    { label: 'Asset Registry', path: '/admin/products', icon: Package },
    { label: 'Asset Approvals', path: '/admin/approvals', icon: CheckSquare, badge: '18' },
    { label: 'Customer Matrix', path: '/admin/customers', icon: Users },
    { label: 'Settlement Engine', path: '/admin/revenue', icon: DollarSign },
    { label: 'Platform Telemetry', path: '/admin/analytics', icon: BarChart2 },
    { label: 'System Parameters', path: '/admin/settings', icon: Settings },
  ];

  const navItems = isAdminMode ? adminNavItems : vendorNavItems;

  const handleRoleToggle = () => {
    if (isAdminMode) {
      switchRole('vendor');
      navigate('/dashboard');
    } else {
      switchRole('admin');
      navigate('/admin');
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#090D16] text-slate-300 transition-all duration-300 z-40 flex flex-col justify-between border-r border-[#151D33] shadow-2xl ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#151D33] bg-[#070A12]/80 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-950/60 font-black group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-white tracking-tight text-lg">
                    ShopSense
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                    AI
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 block -mt-0.5">
                  {isAdminMode ? 'Enterprise Admin Matrix' : 'Merchant Command'}
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation List */}
        <div className="p-3">
          {!collapsed && (
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
              <span>{isAdminMode ? 'GOVERNANCE & OPERATIONS' : 'COMMERCE MODULES'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
            </div>
          )}

          <nav className="space-y-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin' || item.path === '/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-950/60 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-[#131B2E]'
                    } ${collapsed ? 'justify-center px-0' : ''}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <IconComponent className="w-4.5 h-4.5 shrink-0" />
                  {!collapsed && (
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-md font-bold font-mono ${
                            item.badge === '18'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Quick jump to Buyer Storefront */}
          {!collapsed && (
            <div className="mt-4 pt-3 border-t border-[#151D33] px-2">
              <Link
                to="/storefront"
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-[#131B2E] rounded-xl transition-all border border-cyan-500/20"
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>Open Buyer Storefront</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-3 border-t border-[#151D33] bg-[#070A12]/80 space-y-1.5">
        {/* Role Switcher Pill */}
        <button
          onClick={handleRoleToggle}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl transition-all border ${
            isAdminMode
              ? 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/50 border-purple-700/40'
              : 'bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/50 border-indigo-700/40'
          } ${collapsed ? 'justify-center px-0' : ''}`}
          title={collapsed ? (isAdminMode ? 'Switch to Merchant' : 'Switch to Admin') : undefined}
        >
          {isAdminMode ? (
            <Store className="w-4 h-4 shrink-0 text-purple-400" />
          ) : (
            <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-400" />
          )}
          {!collapsed && (
            <span className="truncate">{isAdminMode ? 'Switch to Merchant' : 'Switch to Admin'}</span>
          )}
        </button>

        {/* Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-[#131B2E] rounded-xl transition-all ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <ChevronLeft
            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>

        {/* Sign Out */}
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition-all ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0 text-rose-400" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

