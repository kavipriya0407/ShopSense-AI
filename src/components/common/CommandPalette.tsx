import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bot,
  BrainCircuit,
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Store,
  ShieldCheck,
  Zap,
  ArrowRight,
  X,
  Compass,
  FileText,
  Sliders,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'AI Copilots' | 'Actions' | 'Products';
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  badge?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    {
      id: 'store',
      category: 'Navigation',
      title: '🛍️ AI Storefront & Shopping Concierge',
      description: 'Explore next-gen consumer marketplace & AI copilot',
      icon: Store,
      badge: 'Shopper',
      action: () => {
        navigate('/store');
        onClose();
      },
    },
    {
      id: 'dashboard',
      category: 'Navigation',
      title: '📊 Vendor Intelligence Dashboard',
      description: 'Real-time sales, order streams, and KPI telemetry',
      icon: LayoutDashboard,
      badge: 'Vendor',
      action: () => {
        navigate('/dashboard');
        onClose();
      },
    },
    {
      id: 'ai-assistant',
      category: 'AI Copilots',
      title: '🤖 AI Shopping Assistant (RAG Studio)',
      description: 'Vector-powered catalog search and conversational Q&A',
      icon: Bot,
      badge: 'AI RAG',
      action: () => {
        navigate('/ai-assistant');
        onClose();
      },
    },
    {
      id: 'ai-analyst',
      category: 'AI Copilots',
      title: '🧠 AI Natural Language Data Analyst',
      description: 'Generate SQL queries, visualize charts, and export data',
      icon: BrainCircuit,
      badge: 'NL to SQL',
      action: () => {
        navigate('/ai-data-analyst');
        onClose();
      },
    },
    {
      id: 'analytics',
      category: 'Navigation',
      title: '📈 Revenue & Conversion Analytics',
      description: 'Deep dive into product metrics and category sales',
      icon: BarChart3,
      action: () => {
        navigate('/analytics');
        onClose();
      },
    },
    {
      id: 'benchmarking',
      category: 'Navigation',
      title: '🏆 Competitive Market Benchmarking',
      description: 'Peer comparison, price elasticity, and market positioning',
      icon: Zap,
      action: () => {
        navigate('/benchmarking');
        onClose();
      },
    },
    {
      id: 'orders',
      category: 'Navigation',
      title: '📦 Order & Fulfillment Management',
      description: 'Track deliveries, order anomalies, and buyer details',
      icon: ShoppingBag,
      action: () => {
        navigate('/orders');
        onClose();
      },
    },
    {
      id: 'reports',
      category: 'Navigation',
      title: '📑 Automated AI BI Reports',
      description: 'Generate executive summaries and export PDF/CSV data',
      icon: FileText,
      action: () => {
        navigate('/reports');
        onClose();
      },
    },
    {
      id: 'admin',
      category: 'Navigation',
      title: '🛡️ Super-Admin Governance Center',
      description: 'Multi-tenant vendor accounts, dispute mediation, and audit logs',
      icon: ShieldCheck,
      badge: 'Admin',
      action: () => {
        navigate('/admin');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden shadow-neon-indigo/20 flex flex-col">
        {/* Search Bar Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#131D33] gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search pages, AI copilots, orders... (ESC to close)"
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700">
            <span>ESC</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Results */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <Compass className="w-8 h-8 text-slate-500 mx-auto opacity-50" />
              <p className="text-xs font-semibold">No commands found matching "{query}"</p>
              <p className="text-[11px] text-slate-500">Try searching for "Storefront", "Assistant", "Orders", or "Admin"</p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const IconComp = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 border border-indigo-500/40 text-white shadow-xs'
                      : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-100 truncate">{cmd.title}</p>
                        {cmd.badge && (
                          <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      {cmd.description && (
                        <p className="text-[11px] text-slate-400 truncate">{cmd.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <span className="text-[10px] font-mono font-semibold text-indigo-300 flex items-center gap-1">
                        <span>Select</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Quick Tips */}
        <div className="px-4 py-2.5 bg-[#0C1222] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3 font-medium">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">↓</kbd>
              <span className="ml-1">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">↵</kbd>
              <span className="ml-1">Open</span>
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">ShopSense AI Command Hub</span>
        </div>
      </div>
    </div>
  );
};
