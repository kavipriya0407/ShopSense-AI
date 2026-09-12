import React, { useState } from 'react';
import { DateRangePicker } from '@/components/common/DateRangePicker';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { GaugeChart } from '@/components/charts/GaugeChart';
import {
  VENDOR_VS_MARKETPLACE_CARDS,
  PERFORMANCE_COMPARISON_DATA,
  METRIC_PERCENTILE_RANKINGS,
} from '@/mock-data/benchmarkingData';
import { RefreshCw, SlidersHorizontal, Info, Sparkles, TrendingUp } from 'lucide-react';
import * as Icons from 'lucide-react';

export const Benchmarking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'trends' | 'category'>('dashboard');
  const [lastUpdated, setLastUpdated] = useState('29 Aug 2026, 08:30 AM');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' Today');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-6 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'dashboard', label: 'Marketplace Benchmark Dashboard' },
            { id: 'trends', label: 'Performance Trends' },
            { id: 'category', label: 'Category Benchmark' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 ${
                activeTab === tab.id
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker />
          <button
            onClick={() => alert('Filter drawer coming in next update')}
            className="inline-flex items-center gap-1.5 px-3 py-2 glass-card hover:bg-slate-800/80 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-300 transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Vendor vs Marketplace Content */}
      <div className="space-y-6">
        {/* Vendor vs Marketplace Average Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 tracking-tight">
              Vendor vs Marketplace Average
            </h3>
            <Info className="w-3.5 h-3.5 text-slate-500 cursor-pointer hover:text-slate-400" />
          </div>

          {/* 5 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VENDOR_VS_MARKETPLACE_CARDS.map((card, idx) => {
              const IconComponent = (Icons as any)[card.iconName] || Icons.HelpCircle;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-4 flex flex-col justify-between hover:border-indigo-500/40 hover:shadow-neon-indigo transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-700/60 ${card.iconBg} bg-opacity-20`}>
                      <IconComponent className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {card.label}
                      </span>
                      <span className="text-xl font-black text-white block mt-0.5 tracking-tight font-outfit">
                        {card.vendorValue}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      Mkt Avg <strong className="text-slate-200 font-semibold ml-1">{card.marketplaceAvg}</strong>
                    </span>
                    <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
                      {card.vsAvgTrend}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Comparison Section - 4 Side-by-side Dual Bar Charts */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100 tracking-tight">
              Performance Comparison (Store vs Average)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <BarChartCard
              title="Revenue Performance"
              data={PERFORMANCE_COMPARISON_DATA.revenue}
              bars={[
                { key: 'store', name: 'Your Store', color: '#6366F1' },
                { key: 'marketplace', name: 'Marketplace Avg', color: '#334155' },
              ]}
              xAxisKey="period"
              height={160}
              summaryText="↑ 34.08% higher than marketplace average"
            />

            <BarChartCard
              title="Average Order Value Comparison"
              data={PERFORMANCE_COMPARISON_DATA.aov}
              bars={[
                { key: 'store', name: 'Your Store', color: '#F59E0B' },
                { key: 'marketplace', name: 'Marketplace Avg', color: '#334155' },
              ]}
              xAxisKey="period"
              height={160}
              summaryText="↑ 19.87% higher than marketplace average"
            />

            <BarChartCard
              title="Conversion Rate Comparison"
              data={PERFORMANCE_COMPARISON_DATA.conversion}
              bars={[
                { key: 'store', name: 'Your Store', color: '#A855F7' },
                { key: 'marketplace', name: 'Marketplace Avg', color: '#334155' },
              ]}
              xAxisKey="period"
              height={160}
              summaryText="↑ 0.61 pp higher than marketplace average"
            />

            <BarChartCard
              title="Rating Comparison"
              data={PERFORMANCE_COMPARISON_DATA.rating}
              bars={[
                { key: 'store', name: 'Your Store', color: '#06B6D4' },
                { key: 'marketplace', name: 'Marketplace Avg', color: '#334155' },
              ]}
              xAxisKey="period"
              height={160}
              summaryText="↑ 0.4 higher than marketplace average"
            />
          </div>
        </div>

        {/* Percentile Ranking Row: Gauge Chart + Metric Percentile Ranking Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gauge Chart */}
          <div className="lg:col-span-1">
            <GaugeChart percentile={78} />
          </div>

          {/* Metric Percentile Ranking (Row of 5 metric percentile bars) */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-5 flex flex-col justify-between">
            <h3 className="text-sm font-bold text-slate-100 tracking-tight mb-4 flex items-center justify-between">
              <span>Metric Percentile Ranking</span>
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                Top 25% Overall
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {METRIC_PERCENTILE_RANKINGS.map((metric, idx) => {
                const IconComponent = (Icons as any)[metric.iconName] || Icons.HelpCircle;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-col items-center text-center justify-between hover:border-slate-700 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/20 text-indigo-400 mb-2 border border-indigo-500/30">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 truncate w-full">
                      {metric.label}
                    </span>
                    <span className="text-lg font-black text-white mt-1 font-outfit">
                      {metric.percentile}<sup>th</sup>
                    </span>
                    <span className="text-[10px] text-slate-500 block mb-2 font-mono">Percentile</span>

                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-1.5 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]"
                        style={{ width: `${metric.percentile}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 mt-1.5 font-mono">
                      {metric.topText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Note & Timestamp */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-3 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-slate-500" />
            <span>Benchmark data is calibrated in real-time across 142 active marketplace merchants.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-400">Last updated: {lastUpdated}</span>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

