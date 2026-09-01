import React, { useState } from 'react';
import { Download, RotateCcw, Info, CheckCircle2 } from 'lucide-react';
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
    { header: 'Date', accessorKey: 'date', className: 'font-semibold text-slate-900' },
    { header: 'Orders', accessorKey: 'orders', className: 'text-center' },
    { header: 'Items Sold', accessorKey: 'itemsSold', className: 'text-center' },
    { header: 'Revenue', accessorKey: 'revenue', className: 'text-right font-semibold text-slate-900' },
    { header: 'Discounts', accessorKey: 'discounts', className: 'text-right text-rose-600' },
    { header: 'Shipping', accessorKey: 'shipping', className: 'text-right text-slate-600' },
    { header: 'Tax', accessorKey: 'tax', className: 'text-right text-slate-600' },
    { header: 'Net Revenue', accessorKey: 'netRevenue', className: 'text-right font-bold text-blue-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter Row */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Report Type Dropdown */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Report Type</span>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="Sales Report">Sales Report</option>
              <option value="Orders Report">Orders Report</option>
              <option value="Products Report">Products Report</option>
            </select>
          </div>

          {/* Date Range Picker */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Date Range</span>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>
        </div>

        {/* Action Buttons: Reset Filters & Export CSV */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-2 md:pt-0">
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
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
      <div className="border-b border-slate-200 flex gap-6 text-xs font-bold">
        {['Sales Report', 'Orders Report', 'Products Report'].map((tab) => (
          <button
            key={tab}
            onClick={() => setReportType(tab as any)}
            className={`pb-2.5 transition-all ${
              reportType === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Left (Chart + Table) & Right (Donut + About Report) Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chart & Detailed Table */}
        <div className="lg:col-span-2 space-y-6">
          <LineChartCard
            title="Revenue Over Time"
            data={DAILY_CHART_DATA}
            lines={[{ key: 'revenue', name: 'Revenue', color: '#3B82F6' }]}
            height={220}
            formatYAxis={(v) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
          />

          {/* Sales Report Details Table */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-4">
              Sales Report Details
            </h3>
            <DataTable data={SALES_REPORT_TABLE_DATA} columns={tableColumns} pageSize={5} />
          </div>
        </div>

        {/* Right Column: Donut Chart & About This Report Card */}
        <div className="space-y-6 flex flex-col justify-between">
          <DonutChart
            title="Sales by Category"
            data={CATEGORY_BREAKDOWN}
            centerLabel="$24,560.80"
            centerSublabel="Total Revenue"
          />

          {/* About This Report Info Card */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-2">
              About This Report
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              This sales report provides an overview of your store performance for the selected date range.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2 text-slate-600">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>All amounts are in USD</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Data is updated every 15 minutes</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Report includes all completed orders</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Refunds are deducted from revenue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
