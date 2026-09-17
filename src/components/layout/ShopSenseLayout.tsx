import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShopSenseSidebar } from './ShopSenseSidebar';
import { ShopSenseTopBar } from './ShopSenseTopBar';
import { useShopSense } from '../../context/ShopSenseContext';

export const ShopSenseLayout: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useShopSense();

  return (
    <div className="min-h-screen bg-[#F8FAFC] lumen-subtle-mesh text-slate-800 flex">
      {/* Fixed Left Sidebar */}
      <ShopSenseSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
          sidebarCollapsed ? 'ml-18 sm:ml-18' : 'ml-64'
        }`}
      >
        <ShopSenseTopBar onToggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          <Outlet />
        </main>

        <footer className="py-4 px-6 border-t border-slate-200/80 text-center text-xs text-slate-500 bg-white/70 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 LUMEN AI Commerce Inc. Autonomous Marketplace & Merchant Operating System.</span>
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulsing-dot" />
            <span>Telemetry v4.2 • Zero Latency</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

