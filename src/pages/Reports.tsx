import React, { useState } from 'react';
import { Download, RotateCcw, Info, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { DateRangePicker } from '@/components/common/DateRangePicker';
import { MetricCard } from '@/components/common/MetricCard';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { DonutChart } from '@/components/charts/DonutChart';
import { DataTable, Column } from '@/components/common/DataTable';
import {
  REPORTS_METRICS,
  SALES_REPORT_TABLE_DATA,
  ReportTableRow,
} from '@/mock-data/reportsData';
import { CATEGORY_BREAKDOWN, DAILY_CHART_DATA } from '@/mock-data/dashboardData';
import { exportToCSV } from '@/utils/csvExport';

export const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<'Sales Report' | 'Orders Report' | 'Products Report'>('Sales Report');
  const [dateRange, setDateRange] = useState('01 Aug 2026 - 29 Aug 2026');

  const handleExportCSV = () => {
    const exportData = SALES_REPORT_TABLE_DATA.map((row) => ({
      Date: row.date,
      Orders: row.orders,
      'Items Sold': row.itemsSold,
      Revenue: row.revenue,
      Discounts: row.discounts,
      Shipping: row.shipping,
      Tax: row.tax,
      'Net Revenue': row.netRevenue,
    }));
    exportToCSV(exportData, `ShopSense_${reportType.replace(/\s+/g, '_')}_${Date.now()}.csv`);
  };

  const handleResetFilters = () => {
    setReportType('Sales Report');
    setDateRange('01 Aug 2026 - 29 Aug 2026');
  };

  const tableColumns: Column<ReportTableRow>[] = [
    { header: 'Date', accessorKey: 'date', className: 'font-semibold text-slate-100 font-mono' },
    { header: 'Orders', accessorKey: 'orders', className: 'text-center font-mono' },
    { header: 'Items Sold', accessorKey: 'itemsSold', className: 'text-center font-mono' },
    { header: 'Revenue', accessorKey: 'revenue', className: 'text-right font-semibold text-slate-100 font-mono' },
    { header: 'Discounts', accessorKey: 'discounts', className: 'text-right text-rose-400 font-mono' },
    { header: 'Shipping', accessorKey: 'shipping', className: 'text-right text-slate-400 font-mono' },
    { header: 'Tax', accessorKey: 'tax', className: 'text-right text-slate-400 font-mono' },
    { header: 'Net Revenue', accessorKey: 'netRevenue', className: 'text-right font-bold text-cyan-400 font-mono' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter Row */}
      <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Report Type Dropdown */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Report Type</span>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            >
              <option value="Sales Report">Sales Report</option>
              <option value="Orders Report">Orders Report</option>
              <option value="Products Report">Products Report</option>
            </select>
          </div>

          {/* Date Range Picker */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date Range</span>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>
        </div>

        {/* Action Buttons: Reset Filters & Export CSV */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-2 md:pt-0">
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2 glass-card hover:bg-slate-800/80 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-300 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold shadow-neon-indigo transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 5 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {REPORTS_METRICS.map((metric, idx) => (
          <MetricCard key={idx} metric={metric as any} />
        ))}
      </div>

      {/* Report Tabs */}
      <div className="border-b border-slate-800/80 flex gap-6 text-xs font-bold">
        {['Sales Report', 'Orders Report', 'Products Report'].map((tab) => (
          <button
            key={tab}
            onClick={() => setReportType(tab as any)}
            className={`pb-2.5 transition-all relative ${
              reportType === tab
                ? 'text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
            {reportType === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            )}
          </button>
        ))}
      </div>

      {/* Left (Chart + Table) & Right (Donut + About Report) Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chart & Detailed Table */}
        <div className="lg:col-span-2 space-y-6">
          <LineChartCard
            title="Revenue Over Time (Aggregated)"
            data={DAILY_CHART_DATA}
            lines={[{ key: 'revenue', name: 'Gross Revenue', color: '#06B6D4' }]}
            height={220}
            formatYAxis={(v) => (v >= 1000 ? `$${v / 1000}K` : `$${v}`)}
          />

          {/* Sales Report Details Table */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-100 tracking-tight mb-4 flex items-center justify-between">
              <span>{reportType} Details Breakdown</span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                Live Audited Data
              </span>
            </h3>
            <DataTable data={SALES_REPORT_TABLE_DATA} columns={tableColumns} pageSize={5} />
          </div>
        </div>

        {/* Right Column: Donut Chart & About This Report Card */}
        <div className="space-y-6 flex flex-col justify-between">
          <DonutChart
            title="Revenue by Category"
            data={CATEGORY_BREAKDOWN}
            centerLabel="$24,560.80"
            centerSublabel="Gross Sales"
          />

          {/* About This Report Info Card */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-100 tracking-tight mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>About This Financial Report</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              This financial ledger provides complete accounting attribution, net revenue realization, and tax breakdown for the chosen cycle.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>All amounts are recorded in USD standardized currency</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Synchronized with payment gateway webhooks</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Includes settled & completed customer checkout transactions</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Platform commission & returns deducted from net profit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

