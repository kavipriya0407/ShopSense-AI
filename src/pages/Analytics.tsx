import React, { useState } from 'react';
import { DateRangePicker } from '@/components/common/DateRangePicker';
import { MetricCard } from '@/components/common/MetricCard';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { DonutChart } from '@/components/charts/DonutChart';
import { DASHBOARD_METRICS, CATEGORY_BREAKDOWN, TOP_PRODUCTS } from '@/mock-data/dashboardData';
import {
  SALES_TRENDS_DATA,
  REVENUE_VS_ORDERS_SUMMARY,
  REVENUE_BY_PERIOD,
  DAY_OF_WEEK_SALES,
  PRODUCT_PERFORMANCE_TABLE,
} from '@/mock-data/analyticsData';
import { SlidersHorizontal } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sales' | 'product' | 'category' | 'performance'>('sales');
  const [trendsPeriod, setTrendsPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [revenuePeriod, setRevenuePeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [orderPeriod, setOrderPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-6 border-b border-transparent">
            {[
              { id: 'sales', label: 'Sales Analytics' },
              { id: 'product', label: 'Product Analytics' },
              { id: 'category', label: 'Category Analytics' },
              { id: 'performance', label: 'Performance Analytics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2.5 text-xs font-bold transition-all relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
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

      {activeTab !== 'sales' ? (
        /* Placeholder for other tabs */
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-lg font-bold">
            ⚡
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Analytics Coming Soon
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We are building deep-dive metrics for product performance and audience demographics. Check back soon!
          </p>
          <button
            onClick={() => setActiveTab('sales')}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
          >
            Back to Sales Analytics
          </button>
        </div>
      ) : (
        /* Main Sales Analytics Content */
        <div className="space-y-6">
          {/* Row of 5 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DASHBOARD_METRICS.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Sales Trends Combo Chart + Revenue Summary + Revenue by Period Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Combo Line Chart: Revenue + Orders */}
            <div className="lg:col-span-2">
              <LineChartCard
                title="Sales Trends"
                data={SALES_TRENDS_DATA}
                lines={[
                  { key: 'revenue', name: 'Revenue (USD)', color: '#3B82F6' },
                  { key: 'orders', name: 'Orders', color: '#10B981' },
                ]}
                periodToggle={{
                  activePeriod: trendsPeriod,
                  onChange: setTrendsPeriod,
                }}
                formatYAxis={(v) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
                height={260}
              />
            </div>

            {/* Right Column: Stat Summary & Period Donut */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Revenue vs Orders Summary Stat List */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-3">
                  Revenue vs Orders Summary
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Total Revenue</span>
                    <span className="font-bold text-slate-900">{REVENUE_VS_ORDERS_SUMMARY.totalRevenue}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Total Orders</span>
                    <span className="font-bold text-slate-900">{REVENUE_VS_ORDERS_SUMMARY.totalOrders}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Avg. Order Value</span>
                    <span className="font-bold text-slate-900">{REVENUE_VS_ORDERS_SUMMARY.avgOrderValue}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Revenue / Order</span>
                    <span className="font-bold text-slate-900">{REVENUE_VS_ORDERS_SUMMARY.revenuePerOrder}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Refunds</span>
                    <span className="font-bold text-rose-600">{REVENUE_VS_ORDERS_SUMMARY.refunds}</span>
                  </div>
                </div>
              </div>

              {/* Revenue by Period Donut */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Revenue by Period</h4>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    Growth ↑ 18.6%
                  </p>
                </div>
                <div className="w-24 h-24 relative">
                  <DonutChart
                    title=""
                    data={REVENUE_BY_PERIOD}
                    centerLabel=""
                    centerSublabel=""
                    height={90}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bar Charts Row & Sales by Day of Week */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BarChartCard
              title="Revenue Analysis"
              data={SALES_TRENDS_DATA}
              bars={[{ key: 'revenue', name: 'Revenue', color: '#3B82F6' }]}
              periodToggle={{
                activePeriod: revenuePeriod,
                onChange: setRevenuePeriod,
              }}
              xAxisKey="date"
              height={180}
            />

            <BarChartCard
              title="Order Analysis"
              data={SALES_TRENDS_DATA}
              bars={[{ key: 'orders', name: 'Orders', color: '#10B981' }]}
              periodToggle={{
                activePeriod: orderPeriod,
                onChange: setOrderPeriod,
              }}
              xAxisKey="date"
              height={180}
            />

            {/* Sales by Day of Week (Horizontal Progress Bars) */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-3">
                Sales by Day of Week
              </h3>
              <div className="space-y-2 text-xs">
                {DAY_OF_WEEK_SALES.map((item) => {
                  const maxVal = 5000;
                  const pct = Math.min(100, Math.round((item.value / maxVal) * 100));
                  return (
                    <div key={item.day} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium">
                        <span className="text-slate-600">{item.day}</span>
                        <span className="text-slate-900 font-semibold">{item.amount}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Row: Top Selling Products, Product Performance Table, Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top-Selling Products */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-3">
                Top-Selling Products
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="pb-2">#</th>
                      <th className="pb-2">Product</th>
                      <th className="pb-2 text-right">Revenue</th>
                      <th className="pb-2 text-right">Orders</th>
                      <th className="pb-2 text-right">Units Sold</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {PRODUCT_PERFORMANCE_TABLE.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="py-2 text-slate-400 font-bold">{row.id}</td>
                        <td className="py-2 font-medium text-slate-900 truncate max-w-[110px]">
                          {row.product}
                        </td>
                        <td className="py-2 text-right font-semibold text-slate-900">{row.revenue}</td>
                        <td className="py-2 text-right text-slate-600">{row.orders}</td>
                        <td className="py-2 text-right text-slate-600">{row.unitsSold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Performance Table */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-3">
                Product Performance
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="pb-2">Product</th>
                      <th className="pb-2 text-right">Views</th>
                      <th className="pb-2 text-right">Add to Cart</th>
                      <th className="pb-2 text-right">Orders</th>
                      <th className="pb-2 text-right">Conv. Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {PRODUCT_PERFORMANCE_TABLE.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="py-2 font-medium text-slate-900 truncate max-w-[110px]">
                          {row.product}
                        </td>
                        <td className="py-2 text-right text-slate-600">{row.views}</td>
                        <td className="py-2 text-right text-slate-600">{row.addToCart}</td>
                        <td className="py-2 text-right text-slate-600">{row.orders}</td>
                        <td className="py-2 text-right font-semibold text-emerald-600">
                          {row.convRate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Sales Breakdown */}
            <div className="flex flex-col justify-between">
              <DonutChart
                title="Category Sales Breakdown"
                data={CATEGORY_BREAKDOWN}
                centerLabel="$24,560.80"
                centerSublabel="Total Revenue"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
