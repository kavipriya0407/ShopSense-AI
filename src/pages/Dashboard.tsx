import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  ShoppingBag,
  Tag,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  BrainCircuit,
  Bot,
  Layers,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
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
import { Link, useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [revenuePeriod, setRevenuePeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [ordersPeriod, setOrdersPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [realtimeUpdates, setRealtimeUpdates] = useState<RealtimeUpdate[]>(INITIAL_REALTIME_UPDATES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showUpdatesModal, setShowUpdatesModal] = useState(false);
  const [aiInsightPrompt, setAiInsightPrompt] = useState('');

  // Frontend simulation standing in for a live WebSocket connection
  useEffect(() => {
    const mockProducts = [
      'Sony WH-1000XM5 Headphones',
      'Apple Watch Series 9 OLED',
      'Bose QuietComfort Ultra',
      'Logitech MX Master 3S',
      'Philips Hue Gradient Lightstrip',
    ];
    const interval = setInterval(() => {
      const randomOrderNum = Math.floor(9822 + Math.random() * 50);
      const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const randomAmount = (45 + Math.random() * 350).toFixed(2);
      const isSale = Math.random() > 0.4;

      const newEvent: RealtimeUpdate = {
        id: `rt-${Date.now()}`,
        title: isSale ? 'High-Margin Sale' : 'New Order Dispatched',
        description: isSale ? `Purchased: ${randomProduct}` : `Order #ORD-${randomOrderNum}`,
        amount: `$${randomAmount}`,
        timestamp: 'Just now',
        iconType: isSale ? 'sale' : 'order',
      };

      setRealtimeUpdates((prev) => [newEvent, ...prev.slice(0, 4)]);
    }, 12000);

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

  return (
    <div className="space-y-6 relative">
      {/* Page Header with Action Center */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight">
              Vendor Intelligence Hub
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Live Stream Active
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Real-time telemetry, revenue velocity, and PostgreSQL vector catalog performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker />
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 shadow-xs transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* AI Copilot Quick Actions Banner */}
      <div className="glass-card rounded-2xl p-4 border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/30 shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-display font-bold text-white flex items-center gap-1.5">
              <span>AI Executive Insight Engine</span>
              <span className="text-[10px] px-2 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                +18.4% Projected Growth
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Audio category revenue jumped 34% this week. Sony WH-1000XM5 inventory is depleting at 12 units/day.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => navigate('/ai-data-analyst')}
            className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Generate SQL Forecast</span>
          </button>

          <button
            onClick={() => navigate('/ai-assistant')}
            className="flex-1 md:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ask Copilot</span>
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
            title="Revenue Velocity (USD)"
            data={getChartData(revenuePeriod)}
            lines={[{ key: 'revenue', name: 'Revenue', color: '#6366F1' }]}
            periodToggle={{
              activePeriod: revenuePeriod,
              onChange: setRevenuePeriod,
            }}
            formatYAxis={(v) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
          />

          <LineChartCard
            title="Order Volume Trajectory"
            data={getChartData(ordersPeriod)}
            lines={[{ key: 'orders', name: 'Orders', color: '#10B981' }]}
            periodToggle={{
              activePeriod: ordersPeriod,
              onChange: setOrdersPeriod,
            }}
          />
        </div>

        {/* Right Column: Real-time Sales Updates Panel */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-bold text-white tracking-tight">
                Real-Time Sales Telemetry
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulsing-dot" />
                <span>LIVE FEED</span>
              </div>
            </div>

            {/* List of recent order/sale events */}
            <div className="space-y-3">
              {realtimeUpdates.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        item.iconType === 'order'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                          : 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60'
                      }`}
                    >
                      {item.iconType === 'order' ? (
                        <ShoppingBag className="w-4 h-4" />
                      ) : (
                        <Tag className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-100 leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[140px]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-white block">
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

          <div className="pt-3 border-t border-slate-800/80 mt-4 text-center">
            <button
              onClick={() => setShowUpdatesModal(true)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 group"
            >
              <span>View Full Realtime Logs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Live Sales Updates Modal */}
      {showUpdatesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="bg-[#0F172A] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulsing-dot" />
                <h3 className="text-sm font-bold text-white font-display">Live Order Stream Telemetry</h3>
              </div>
              <button onClick={() => setShowUpdatesModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {realtimeUpdates.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 flex items-center justify-center font-bold text-xs">
                      🛍️
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{item.title}</p>
                      <p className="text-[11px] text-slate-400">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-indigo-400 block">{item.amount}</span>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowUpdatesModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Close Logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom 3 Columns: Top Products, Category Sales Breakdown, Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Col 1: Top 5 Products Table */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="text-sm font-display font-bold text-white tracking-tight mb-4">
              Top 5 Revenue Products
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-800 pb-2">
                    <th className="pb-2 font-normal">Product</th>
                    <th className="pb-2 font-normal text-right">Revenue</th>
                    <th className="pb-2 font-normal text-right">Orders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {TOP_PRODUCTS.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 font-medium text-slate-200 flex items-center gap-2">
                        <span className="text-indigo-400 text-[11px] font-mono font-bold w-3">{prod.id}</span>
                        <span className="truncate max-w-[130px]">{prod.name}</span>
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold text-white">
                        {prod.revenue}
                      </td>
                      <td className="py-2.5 text-right text-slate-400 font-mono font-medium">
                        {prod.orders}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 mt-4 text-left">
            <Link
              to="/analytics"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View Full Catalog Analytics →
            </Link>
          </div>
        </div>

        {/* Col 2: Category Sales Breakdown Donut Chart */}
        <div className="flex flex-col justify-between">
          <DonutChart
            title="Category Sales Breakdown"
            data={CATEGORY_BREAKDOWN}
            centerLabel="$24,560.80"
            centerSublabel="Total Gross"
          />
        </div>

        {/* Col 3: Recent Orders Table */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="text-sm font-display font-bold text-white tracking-tight mb-4">
              Recent Fulfillment Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-800 pb-2">
                    <th className="pb-2 font-normal">Order ID</th>
                    <th className="pb-2 font-normal">Customer</th>
                    <th className="pb-2 font-normal text-right">Amount</th>
                    <th className="pb-2 font-normal text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {RECENT_ORDERS.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 font-mono font-bold text-indigo-300">{ord.id}</td>
                      <td className="py-2.5 text-slate-300 font-medium truncate max-w-[90px]">
                        {ord.customer}
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold text-white">
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

          <div className="pt-3 border-t border-slate-800/80 mt-4 text-left">
            <Link
              to="/orders"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Manage All Orders →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

