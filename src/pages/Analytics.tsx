import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  ArrowUpRight,
  ChevronRight,
  Filter,
  Download,
  Calendar,
  Zap,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ShopZoneHeader } from '../components/shopzone/ShopZoneHeader';
import { ShopZoneFooter } from '../components/shopzone/ShopZoneFooter';
import { BUSINESS_ANALYTICS_DATA, SHOPZONE_PRODUCTS } from '../mock-data/shopZoneData';

export const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'customers' | 'reviews'>('overview');

  const tabs = [
    { id: 'overview', label: 'Ecosystem Overview' },
    { id: 'products', label: 'Top Performing SKUs' },
    { id: 'customers', label: 'Buyer Intelligence' },
    { id: 'reviews', label: 'Satisfaction Telemetry' },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between font-sans antialiased">
      <div>
        <ShopZoneHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fade-in">
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                  Ecosystem Telemetry & Yield
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Live Feed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-time clearing velocity, gross merchant revenue streams, and decentralized product liquidity.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 flex items-center gap-2 shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Aug 01, 2026 - Aug 31, 2026</span>
              </span>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-6 border-b border-slate-800 text-xs font-bold overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 transition-all relative shrink-0 ${
                  activeTab === tab.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3 KPI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* KPI 1: Total Orders */}
            <div className="lumen-card p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Total Orders Cleared
              </span>
              <span className="text-3xl font-display font-black text-white block mt-2">
                {BUSINESS_ANALYTICS_DATA.kpis.totalOrders}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{BUSINESS_ANALYTICS_DATA.kpis.ordersGrowth}</span>
              </span>
            </div>

            {/* KPI 2: Total Revenue */}
            <div className="lumen-card p-6 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 block">
                Gross Clearing Volume
              </span>
              <span className="text-3xl font-display font-black text-cyan-300 block mt-2">
                {BUSINESS_ANALYTICS_DATA.kpis.totalRevenue}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{BUSINESS_ANALYTICS_DATA.kpis.revenueGrowth}</span>
              </span>
            </div>

            {/* KPI 3: Total Customers */}
            <div className="lumen-card p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Authenticated Consumers
              </span>
              <span className="text-3xl font-display font-black text-white block mt-2">
                {BUSINESS_ANALYTICS_DATA.kpis.totalCustomers}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{BUSINESS_ANALYTICS_DATA.kpis.customersGrowth}</span>
              </span>
            </div>
          </div>

          {/* Visuals Grid: Left Sales Chart + Right Top Selling Products */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Sales Overview Area Chart */}
            <div className="lg:col-span-8 lumen-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  Gross Clearing Velocity
                </h3>
                <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                  Monthly Trajectory (INR)
                </span>
              </div>

              {/* Chart Container */}
              <div className="w-full h-80 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={BUSINESS_ANALYTICS_DATA.salesChart}
                    margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="lumenSalesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" opacity={0.6} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 600 }}
                      axisLine={{ stroke: '#334155' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `${val / 1000}K`}
                    />
                    <Tooltip
                      formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Gross Volume']}
                      contentStyle={{
                        backgroundColor: '#090D16',
                        borderRadius: '1rem',
                        border: '1px solid #334155',
                        color: '#fff',
                        fontSize: '12px',
                        fontFamily: 'JetBrains Mono',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#06B6D4"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#lumenSalesGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column: Top Selling Products List */}
            <div className="lg:col-span-4 lumen-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800 mb-4">
                  High-Velocity SKUs
                </h3>

                <div className="space-y-3.5">
                  {SHOPZONE_PRODUCTS.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-2xl hover:bg-slate-800/40 border border-transparent hover:border-slate-800 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={prod.image}
                          alt=""
                          className="w-11 h-11 object-cover rounded-xl p-1 bg-slate-900 border border-slate-800 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {prod.name}
                          </h4>
                          <span className="text-[11px] text-cyan-300 font-mono">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 shrink-0">
                        {prod.unitsSold.toLocaleString('en-IN')} units
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShopZoneFooter />
    </div>
  );
};
