import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Derive page title from active path
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return 'ShopSense Vendor Dashboard';
      case '/analytics':
        return 'Analytics';
      case '/benchmarking':
        return 'Benchmarking';
      case '/orders':
        return 'Orders';
      case '/reports':
        return 'Reports';
      case '/ai-assistant':
        return 'AI Shopping Assistant';
      case '/ai-data-analyst':
        return 'AI Data Analyst';
      case '/admin':
        return 'Master Admin Dashboard';
      case '/admin/vendors':
        return 'Vendor Management';
      case '/admin/disputes':
        return 'Disputes & Refunds';
      case '/admin/categories':
        return 'Global Product Categories';
      default:
        return 'ShopSense Console';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-[220px]'
        }`}
      >
        <TopBar
          pageTitle={getPageTitle(location.pathname)}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>

        <footer className="py-4 px-6 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white">
          © 2026 ShopSense. All rights reserved.
        </footer>
      </div>
    </div>
  );
};
