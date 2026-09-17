import React from 'react';
import {
  BarChart2,
  TrendingUp,
  Globe,
  PieChart,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const CATEGORY_DATA = [
  { name: 'Electronics', gmv: 1840000, orders: 480 },
  { name: 'Audio', gmv: 1420000, orders: 690 },
  { name: 'Beauty & Care', gmv: 890000, orders: 510 },
  { name: 'Fashion', gmv: 740000, orders: 430 },
  { name: 'Home & Living', gmv: 520000, orders: 390 },
  { name: 'Accessories', gmv: 390000, orders: 310 },
];

export const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Macro Sector Distribution
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            Network Telemetry
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Sector GMV market share, regional buyer elasticity, and decentralized merchant node yields.
        </p>
      </div>

      {/* Chart */}
      <div className="lumen-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-base font-display font-bold text-white">
              Gross Marketplace Volume by Sector (INR)
            </h2>
            <p className="text-xs text-slate-400">Aggregated across all 124 decentralized merchant nodes</p>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 self-start sm:self-auto">
            FY 2025-26 Live Stream
          </span>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CATEGORY_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" opacity={0.6} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
              />
              <Tooltip
                formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Gross Volume']}
                contentStyle={{ backgroundColor: '#090D16', borderRadius: '1rem', border: '1px solid #334155', color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey="gmv" fill="#06B6D4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
