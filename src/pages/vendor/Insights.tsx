import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingCart,
  Calendar,
  Layers,
  ArrowUpRight,
  Info,
  Sparkles,
  Download,
  Activity,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  INSIGHTS_MONTHLY_DATA,
  INSIGHTS_WEEKLY_DATA,
  INSIGHTS_DAILY_DATA,
  INSIGHTS_SUMMARY,
} from '../../mock-data/shopSenseData';

type MetricTab = 'Revenue' | 'Units' | 'Orders' | 'AvgOrder';
type Period = 'Day' | 'Week' | 'Month';

export const Insights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MetricTab>('Units');
  const [activePeriod, setActivePeriod] = useState<Period>('Month');

  const getDataset = () => {
    switch (activePeriod) {
      case 'Day':
        return INSIGHTS_DAILY_DATA;
      case 'Week':
        return INSIGHTS_WEEKLY_DATA;
      default:
        return INSIGHTS_MONTHLY_DATA;
    }
  };

  const data = getDataset();

  const getMetricKey = () => {
    switch (activeTab) {
      case 'Revenue':
        return 'revenue';
      case 'Orders':
        return 'orders';
      case 'AvgOrder':
        return 'avgOrder';
      default:
        return 'units';
    }
  };

  const getMetricLabel = () => {
    switch (activeTab) {
      case 'Revenue':
        return 'Gross Clearing Volume (₹)';
      case 'Orders':
        return 'Settled Orders';
      case 'AvgOrder':
        return 'Average Order Ticket (₹)';
      default:
        return 'Units Dispatched';
    }
  };

  const formatYAxis = (val: number) => {
    if (activeTab === 'Revenue' || activeTab === 'AvgOrder') {
      return val >= 1000 ? `₹${(val / 1000).toFixed(0)}k` : `₹${val}`;
    }
    return `${val}`;
  };

  // Luxury ShopSense Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      const formattedVal =
        activeTab === 'Revenue' || activeTab === 'AvgOrder'
          ? `₹${val.toLocaleString('en-IN')}`
          : `${val} units`;

      return (
        <div className="bg-slate-950/95 backdrop-blur-xl text-white p-3.5 rounded-2xl shadow-2xl border border-cyan-500/40 text-xs space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono font-bold text-cyan-400">{label}</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
              Verified
            </span>
          </div>
          <p className="text-sm font-display font-black text-white pt-1">
            {getMetricLabel()}: <span className="text-cyan-300 font-mono">{formattedVal}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Commercial Telemetry & Yield
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
              <Activity className="w-3 h-3" /> Live Feed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time conversion curves, inventory depletion velocity, and algorithmic order settlements.
          </p>
        </div>

        <button
          onClick={() => alert('ShopSense Telemetry Dataset (CSV/JSON) successfully exported.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-mono font-bold shadow-md transition-all self-start sm:self-auto hover:border-cyan-500/50"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Export Telemetry Stream</span>
        </button>
      </div>

      {/* Metric Selector & Period Switcher */}
      <div className="lumen-card p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Metric Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/60 rounded-xl border border-slate-800/80 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('Revenue')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'Revenue'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Gross Revenue (₹)
          </button>

          <button
            onClick={() => setActiveTab('Units')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'Units'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Units Dispatched
          </button>

          <button
            onClick={() => setActiveTab('Orders')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'Orders'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Settled Orders
          </button>

          <button
            onClick={() => setActiveTab('AvgOrder')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'AvgOrder'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Average Ticket Value
          </button>
        </div>

        {/* Period Selector: Day / Week / Month */}
        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Window:
          </span>
          <div className="flex items-center bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            {(['Day', 'Week', 'Month'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activePeriod === period
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SUMMARY KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Volume */}
        <div className="lumen-card p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            {INSIGHTS_SUMMARY.totalVolume.label}
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mt-2">
            {INSIGHTS_SUMMARY.totalVolume.value}
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            {INSIGHTS_SUMMARY.totalVolume.subtext}
          </p>
        </div>

        {/* Card 2: Peak Point */}
        <div className="lumen-card p-6 rounded-3xl relative overflow-hidden group border-indigo-500/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400">
            {INSIGHTS_SUMMARY.peakPoint.label}
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-cyan-300 tracking-tight mt-2">
            {INSIGHTS_SUMMARY.peakPoint.value}
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            {INSIGHTS_SUMMARY.peakPoint.subtext}
          </p>
        </div>

        {/* Card 3: Average Per Unit */}
        <div className="lumen-card p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            {INSIGHTS_SUMMARY.avgPerUnit.label}
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mt-2">
            {INSIGHTS_SUMMARY.avgPerUnit.value}
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            {INSIGHTS_SUMMARY.avgPerUnit.subtext}
          </p>
        </div>

        {/* Card 4: Observed Points */}
        <div className="lumen-card p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            {INSIGHTS_SUMMARY.observedPoints.label}
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-emerald-400 tracking-tight mt-2">
            {INSIGHTS_SUMMARY.observedPoints.value}
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {INSIGHTS_SUMMARY.observedPoints.subtext}
          </p>
        </div>
      </div>

      {/* LARGE ANALYTICS CHART CONTAINER */}
      <div className="lumen-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <span>Dynamic Trajectory: {getMetricLabel()}</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Continuous trendline spanning <strong className="text-cyan-400 font-mono">Sep '25 through Aug '26</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-2 text-slate-300 font-bold">
              <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
              Observed Value Stream
            </span>
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/30 text-[10px] font-bold">
              100% Cryptographically Verified
            </span>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-80 sm:h-96 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="lumenAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                  <stop offset="60%" stopColor="#4F46E5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#090D16" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" opacity={0.6} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                tickFormatter={formatYAxis}
                dx={-4}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={getMetricKey()}
                stroke="#06B6D4"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#lumenAreaGradient)"
                dot={{ r: 4, fill: '#090D16', stroke: '#06B6D4', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: '#06B6D4', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
