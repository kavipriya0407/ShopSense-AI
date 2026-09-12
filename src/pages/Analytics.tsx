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
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'Top Products' },
    { id: 'customers', label: 'Customer Insights' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between font-sans">
      <div>
        <ShopZoneHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
          {/* Header Title (matching Screen 7) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Business Analytics
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Real-time sales velocity, merchant revenue telemetry & inventory insights
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>Aug 01, 2026 - Aug 31, 2026</span>
              </span>
            </div>
          </div>

          {/* Sub-Navigation Tabs (matching Screen 7) */}
          <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 transition-all relative ${
                  activeTab === tab.id
                    ? 'text-[#FF5722] border-b-2 border-[#FF5722]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3 KPI Summary Cards (matching Screen 7) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* KPI 1: Total Orders */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Total Orders
              </span>
              <span className="text-3xl font-black text-slate-900 block font-mono">
                {BUSINESS_ANALYTICS_DATA.kpis.totalOrders}
              </span>
              <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{BUSINESS_ANALYTICS_DATA.kpis.ordersGrowth}</span>
              </span>
            </div>

            {/* KPI 2: Total Revenue */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Total Revenue
              </span>
              <span className="text-3xl font-black text-slate-900 block font-mono">
                {BUSINESS_ANALYTICS_DATA.kpis.totalRevenue}
              </span>
              <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{BUSINESS_ANALYTICS_DATA.kpis.revenueGrowth}</span>
              </span>
            </div>

            {/* KPI 3: Total Customers */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Total Customers
              </span>
              <span className="text-3xl font-black text-slate-900 block font-mono">
                {BUSINESS_ANALYTICS_DATA.kpis.totalCustomers}
              </span>
              <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{BUSINESS_ANALYTICS_DATA.kpis.customersGrowth}</span>
              </span>
            </div>
          </div>

          {/* Visuals Grid: Left Sales Chart + Right Top Selling Products (matching Screen 7) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Sales Overview Area Chart */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Sales Overview
                </h3>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  Monthly Trend (INR)
                </span>
              </div>

              {/* Chart Container */}
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={BUSINESS_ANALYTICS_DATA.salesChart}
                    margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: '#64748B' }}
                      axisLine={{ stroke: '#CBD5E1' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#64748B' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `${val / 1000}K`}
                    />
                    <Tooltip
                      formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Gross Sales']}
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        borderRadius: '8px',
                        border: 'none',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#3B82F6"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#salesGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column: Top Selling Products List (matching Screen 7) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">
                  Top Selling Products
                </h3>

                <div className="space-y-4">
                  {SHOPZONE_PRODUCTS.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={prod.image}
                          alt=""
                          className="w-10 h-10 object-contain rounded-lg p-1 bg-slate-50 border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {prod.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-extrabold text-[#16A34A] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0 font-mono">
                        {prod.unitsSold.toLocaleString('en-IN')} sold
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
