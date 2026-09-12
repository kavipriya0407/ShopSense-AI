import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CommandPalette } from '../common/CommandPalette';

export const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const location = useLocation();

  // Handle Ctrl+K / Cmd+K global shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Derive page title from active path
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return 'Vendor Intelligence Command';
      case '/analytics':
        return 'Revenue & Growth Analytics';
      case '/benchmarking':
        return 'Competitive Benchmarking';
      case '/orders':
        return 'Orders & Fulfillment';
      case '/reports':
        return 'Automated BI Reports';
      case '/ai-assistant':
        return 'AI Shopping Assistant (RAG)';
      case '/ai-data-analyst':
        return 'AI Natural Language Analyst';
      case '/admin':
        return 'Super-Admin Governance';
      case '/admin/vendors':
        return 'Vendor Accounts Telemetry';
      case '/admin/disputes':
        return 'Dispute AI Mediation';
      case '/admin/categories':
        return 'Global Categories Matrix';
      default:
        return 'ShopSense AI Console';
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex relative overflow-x-hidden font-sans">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Sidebar navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-h-screen ${
          sidebarCollapsed ? 'ml-16' : 'ml-[230px]'
        }`}
      >
        <TopBar
          pageTitle={getPageTitle(location.pathname)}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1600px] w-full mx-auto relative z-10">
          <Outlet />
        </main>

        <footer className="py-4 px-6 text-center text-xs text-slate-500 border-t border-slate-800/80 bg-[#070B14]/80 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1600px] mx-auto">
            <span>© 2026 ShopSense AI • Enterprise Commerce Intelligence & RAG Neural Studio</span>
            <div className="flex items-center gap-4 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">Ctrl+K</kbd>
                <span>Command Palette</span>
              </span>
              <span>PostgreSQL Vector RAG Active</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

