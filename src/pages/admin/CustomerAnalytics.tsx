import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  DollarSign,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';
import { CUSTOMER_ANALYTICS_METRICS, Customer } from '../../mock-data/shopSenseData';

type FilterType = 'All' | 'High Value' | 'Medium Value' | 'Low Value';

export const CustomerAnalytics: React.FC = () => {
  const { customers } = useShopSense();

  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter dataset based on selected pill & search query
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      const matchesSearch =
        cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = activeFilter === 'All' || cust.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [customers, searchQuery, activeFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'High Value':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Apex Tier (High)
          </span>
        );
      case 'Medium Value':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Core Tier (Med)
          </span>
        );
      case 'Low Value':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Entry Tier (Low)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Buyer Intelligence & Cohorts
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              LTV Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dynamic customer lifetime value (LTV), cohort segmentation, and repeat clearing frequency.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Customer Intelligence Ledger (CSV/JSON)...')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-mono font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Export Customer Table</span>
        </button>
      </div>

      {/* TOP FILTERS with exact counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <button
          onClick={() => {
            setActiveFilter('All');
            setCurrentPage(1);
          }}
          className={`p-5 rounded-3xl border text-left transition-all ${
            activeFilter === 'All'
              ? 'bg-slate-900 border-cyan-500/60 shadow-xl shadow-cyan-500/10'
              : 'lumen-card border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${activeFilter === 'All' ? 'text-cyan-400' : 'text-slate-400'}`}>
              Total Buyer Accounts
            </span>
            <Users className={`w-4 h-4 ${activeFilter === 'All' ? 'text-cyan-400' : 'text-slate-500'}`} />
          </div>
          <p className="text-2xl font-display font-black text-white mt-2">
            {CUSTOMER_ANALYTICS_METRICS.allCount.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">
            100% indexed consumer network
          </span>
        </button>

        <button
          onClick={() => {
            setActiveFilter('High Value');
            setCurrentPage(1);
          }}
          className={`p-5 rounded-3xl border text-left transition-all ${
            activeFilter === 'High Value'
              ? 'bg-slate-900 border-emerald-500/60 shadow-xl shadow-emerald-500/10'
              : 'lumen-card border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${activeFilter === 'High Value' ? 'text-emerald-400' : 'text-slate-400'}`}>
              Apex Tier (&gt; ₹1L)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <p className="text-2xl font-display font-black text-emerald-300 mt-2">
            {CUSTOMER_ANALYTICS_METRICS.highValueCount.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">
            High volume repeat buyers
          </span>
        </button>

        <button
          onClick={() => {
            setActiveFilter('Medium Value');
            setCurrentPage(1);
          }}
          className={`p-5 rounded-3xl border text-left transition-all ${
            activeFilter === 'Medium Value'
              ? 'bg-slate-900 border-cyan-500/60 shadow-xl shadow-cyan-500/10'
              : 'lumen-card border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${activeFilter === 'Medium Value' ? 'text-cyan-400' : 'text-slate-400'}`}>
              Core Tier (₹25k - ₹1L)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>
          <p className="text-2xl font-display font-black text-cyan-300 mt-2">
            {CUSTOMER_ANALYTICS_METRICS.mediumValueCount.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">
            Consistent conversion cohort
          </span>
        </button>

        <button
          onClick={() => {
            setActiveFilter('Low Value');
            setCurrentPage(1);
          }}
          className={`p-5 rounded-3xl border text-left transition-all ${
            activeFilter === 'Low Value'
              ? 'bg-slate-900 border-slate-600 shadow-xl'
              : 'lumen-card border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${activeFilter === 'Low Value' ? 'text-slate-300' : 'text-slate-400'}`}>
              Entry Tier (&lt; ₹25k)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
          </div>
          <p className="text-2xl font-display font-black text-slate-300 mt-2">
            {CUSTOMER_ANALYTICS_METRICS.lowValueCount.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">
            New customer onboarding
          </span>
        </button>
      </div>

      {/* SEARCH & CONTROLS */}
      <div className="lumen-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search account name, email or customer UID..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-600 font-medium focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Displaying <strong>{paginatedCustomers.length}</strong> of <strong>{filteredCustomers.length}</strong> accounts</span>
        </div>
      </div>

      {/* CUSTOMER TABLE */}
      <div className="lumen-card rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Customer UID</th>
                <th className="py-3.5 px-4">Account Name</th>
                <th className="py-3.5 px-4">Verified Email</th>
                <th className="py-3.5 px-4 text-center">Settled Orders</th>
                <th className="py-3.5 px-4 text-right">Lifetime Volume (LTV)</th>
                <th className="py-3.5 px-4 text-right">Average Order Ticket</th>
                <th className="py-3.5 px-4 text-center">Cohort Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                    No buyer accounts match the current filter or search parameters.
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                      {cust.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {cust.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-xs">
                      {cust.email}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-200">
                      {cust.orders}
                    </td>
                    <td className="py-3.5 px-4 text-right font-display font-black text-white">
                      ₹{cust.totalSpent.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-cyan-300">
                      ₹{cust.avgOrderValue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {getCategoryBadge(cust.category)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 font-bold"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
