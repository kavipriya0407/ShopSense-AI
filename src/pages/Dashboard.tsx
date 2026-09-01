import React, { useState, useEffect } from 'react';
import { RefreshCw, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { MetricCard } from '@/components/common/MetricCard';
import { DateRangePicker } from '@/components/common/DateRangePicker';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { DonutChart } from '@/components/charts/DonutChart';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  DASHBOARD_METRICS,
  DAILY_CHART_DATA,
  WEEKLY_CHART_DATA,
  MONTHLY_CHART_DATA,
  INITIAL_REALTIME_UPDATES,
  TOP_PRODUCTS,
  CATEGORY_BREAKDOWN,
  RECENT_ORDERS,
  RealtimeUpdate,
} from '@/mock-data/dashboardData';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [revenuePeriod, setRevenuePeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [ordersPeriod, setOrdersPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [realtimeUpdates, setRealtimeUpdates] = useState<RealtimeUpdate[]>(INITIAL_REALTIME_UPDATES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Frontend simulation standing in for a future WebSocket connection
  useEffect(() => {
    const mockProducts = ['Noise Cancelling Headphones', 'Smart Fitness Band', 'Mechanical Keyboard', 'USB-C Fast Charger', 'Ergonomic Desk Mat'];
    const interval = setInterval(() => {
      const randomOrderNum = Math.floor(9822 + Math.random() * 50);
      const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const randomAmount = (15 + Math.random() * 120).toFixed(2);
      const isSale = Math.random() > 0.5;

      const newEvent: RealtimeUpdate = {
        id: `rt-${Date.now()}`,
        title: isSale ? 'New Sale' : 'New Order Received',
        description: isSale ? `Product: ${randomProduct}` : `Order #ORD-${randomOrderNum}`,
        amount: `$${randomAmount}`,
        timestamp: 'Just now',
        iconType: isSale ? 'sale' : 'order',
      };

      setRealtimeUpdates((prev) => [newEvent, ...prev.slice(0, 4)]);
    }, 18000); // Trigger every 18 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const getChartData = (period: 'Daily' | 'Weekly' | 'Monthly') => {
    switch (period) {
      case 'Weekly':
        return WEEKLY_CHART_DATA;
      case 'Monthly':
        return MONTHLY_CHART_DATA;
      default:
        return DAILY_CHART_DATA;
    }
  };

  const [showUpdatesModal, setShowUpdatesModal] = useState(false);

  return (
    <div className="space-y-6 relative">
      {/* Page Header */}
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Monitor real-time sales metrics, recent orders, and category breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker />
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-xs transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Row of 5 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {DASHBOARD_METRICS.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Line Charts + Real-time Updates Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Revenue & Orders Line Charts */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <LineChartCard
            title="Revenue Overview"
            data={getChartData(revenuePeriod)}
            lines={[{ key: 'revenue', name: 'Revenue (USD)', color: '#3B82F6' }]}
            periodToggle={{
              activePeriod: revenuePeriod,
              onChange: setRevenuePeriod,
            }}
            formatYAxis={(v) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
          />

          <LineChartCard
            title="Orders Trend"
            data={getChartData(ordersPeriod)}
            lines={[{ key: 'orders', name: 'Orders', color: '#10B981' }]}
            periodToggle={{
              activePeriod: ordersPeriod,
              onChange: setOrdersPeriod,
            }}
          />
        </div>

        {/* Right Column: Real-time Sales Updates Panel */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                Real-time Sales Updates
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulsing-dot" />
                <span>Live</span>
              </div>
            </div>

            {/* List of recent order/sale events */}
            <div className="space-y-3.5">
              {realtimeUpdates.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        item.iconType === 'order'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {item.iconType === 'order' ? (
                        <ShoppingBag className="w-4 h-4" />
                      ) : (
                        <Tag className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-900 block">
                      {item.amount}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 text-center">
            <button
              onClick={() => setShowUpdatesModal(true)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
            >
              <span>View All Updates</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Live Sales Updates Modal */}
      {showUpdatesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulsing-dot" />
                <h3 className="text-sm font-bold text-slate-900">All Live Real-Time Sales Feed</h3>
              </div>
              <button onClick={() => setShowUpdatesModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {realtimeUpdates.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                      🛍️
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-blue-600 block">{item.amount}</span>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowUpdatesModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                Close Feed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom 3 Columns: Top Products, Category Sales Breakdown, Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Col 1: Top 5 Products Table */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-4">
              Top 5 Products
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
                    <th className="pb-2 font-normal">Product</th>
                    <th className="pb-2 font-normal text-right">Revenue</th>
                    <th className="pb-2 font-normal text-right">Orders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TOP_PRODUCTS.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 font-medium text-slate-800 flex items-center gap-2">
                        <span className="text-slate-400 text-[11px] font-bold w-3">{prod.id}</span>
                        <span className="truncate max-w-[130px]">{prod.name}</span>
                      </td>
                      <td className="py-2.5 text-right font-semibold text-slate-900">
                        {prod.revenue}
                      </td>
                      <td className="py-2.5 text-right text-slate-500 font-medium">
                        {prod.orders}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 text-left">
            <Link
              to="/analytics"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View All Products
            </Link>
          </div>
        </div>

        {/* Col 2: Category Sales Breakdown Donut Chart */}
        <div className="flex flex-col justify-between">
          <DonutChart
            title="Category Sales Breakdown"
            data={CATEGORY_BREAKDOWN}
            centerLabel="$24,560.80"
            centerSublabel="Total Revenue"
          />
        </div>

        {/* Col 3: Recent Orders Table */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-4">
              Recent Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
                    <th className="pb-2 font-normal">Order ID</th>
                    <th className="pb-2 font-normal">Customer</th>
                    <th className="pb-2 font-normal text-right">Amount</th>
                    <th className="pb-2 font-normal text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {RECENT_ORDERS.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 font-bold text-slate-900">{ord.id}</td>
                      <td className="py-2.5 text-slate-600 font-medium truncate max-w-[90px]">
                        {ord.customer}
                      </td>
                      <td className="py-2.5 text-right font-semibold text-slate-900">
                        {ord.amount}
                      </td>
                      <td className="py-2.5 text-right">
                        <StatusBadge status={ord.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 text-left">
            <Link
              to="/orders"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
