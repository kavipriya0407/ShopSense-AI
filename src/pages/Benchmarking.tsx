import React, { useState } from 'react';
import { DateRangePicker } from '@/components/common/DateRangePicker';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { GaugeChart } from '@/components/charts/GaugeChart';
import {
  VENDOR_VS_MARKETPLACE_CARDS,
  PERFORMANCE_COMPARISON_DATA,
  METRIC_PERCENTILE_RANKINGS,
} from '@/mock-data/benchmarkingData';
import { RefreshCw, SlidersHorizontal, Info } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-6">
          {[
            { id: 'dashboard', label: 'Marketplace Benchmark Dashboard' },
            { id: 'trends', label: 'Performance Trends' },
            { id: 'category', label: 'Category Benchmark' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker />
          <button
            onClick={() => alert('Filter drawer')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Vendor vs Marketplace Content */}
      <div className="space-y-6">
        {/* Vendor vs Marketplace Average Section */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Vendor vs Marketplace Average
            </h3>
            <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
          </div>

          {/* 5 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VENDOR_VS_MARKETPLACE_CARDS.map((card, idx) => {
              const IconComponent = (Icons as any)[card.iconName] || Icons.HelpCircle;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${card.iconBg}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        {card.label}
                      </span>
                      <span className="text-xl font-extrabold text-slate-900 block mt-0.5">
                        {card.vendorValue}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      Marketplace Avg <strong className="text-slate-700 font-semibold ml-1">{card.marketplaceAvg}</strong>
                    </span>
                    <span className="text-emerald-600 font-bold text-[11px]">
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
          <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-3">
            Performance Comparison
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <BarChartCard
              title="Revenue Performance"
              data={PERFORMANCE_COMPARISON_DATA.revenue}
              bars={[
                { key: 'store', name: 'Your Store', color: '#2563EB' },
                { key: 'marketplace', name: 'Marketplace Avg', color: '#CBD5E1' },
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
                { key: 'marketplace', name: 'Marketplace Avg', color: '#CBD5E1' },
              ]}
              xAxisKey="period"
              height={160}
              summaryText="↑ 19.87% higher than marketplace average"
            />

            <BarChartCard
              title="Conversion Rate Comparison"
              data={PERFORMANCE_COMPARISON_DATA.conversion}
              bars={[
                { key: 'store', name: 'Your Store', color: '#8B5CF6' },
                { key: 'marketplace', name: 'Marketplace Avg', color: '#CBD5E1' },
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
                { key: 'marketplace', name: 'Marketplace Avg', color: '#CBD5E1' },
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
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-4">
              Metric Percentile Ranking
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {METRIC_PERCENTILE_RANKINGS.map((metric, idx) => {
                const IconComponent = (Icons as any)[metric.iconName] || Icons.HelpCircle;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center justify-between"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${metric.iconBg} mb-2`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 truncate w-full">
                      {metric.label}
                    </span>
                    <span className="text-lg font-extrabold text-slate-900 mt-1">
                      {metric.percentile}<sup>th</sup>
                    </span>
                    <span className="text-[10px] text-slate-400 block mb-2">Percentile</span>

                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full"
                        style={{ width: `${metric.percentile}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 mt-1.5">
                      {metric.topText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Note & Timestamp */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-200/60">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-slate-400" />
            <span>Benchmark data is updated daily based on marketplace-wide performance.</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Last updated: {lastUpdated}</span>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold"
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
