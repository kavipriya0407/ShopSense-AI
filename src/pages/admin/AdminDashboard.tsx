import React from 'react';
import { MetricCard } from '@/components/common/MetricCard';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ADMIN_METRICS, MOCK_VENDORS, MOCK_DISPUTES } from '@/mock-data/adminData';
import { ShieldCheck, UserCheck, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const platformRevenueTrend = [
    { date: 'Week 1', revenue: 95000, commission: 9500 },
    { date: 'Week 2', revenue: 115000, commission: 11500 },
    { date: 'Week 3', revenue: 128000, commission: 12800 },
    { date: 'Week 4', revenue: 147200, commission: 14720 },
  ];

  const vendorGMVBreakdown = [
    { period: 'TechGear', store: 68400, marketplace: 60000 },
    { period: 'Apex Gaming', store: 51200, marketplace: 50000 },
    { period: 'Urban Fashion', store: 42150, marketplace: 40000 },
    { period: 'SoundBeat', store: 35800, marketplace: 35000 },
    { period: 'Vendor Store', store: 24560, marketplace: 25000 },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 lg:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-purple-950/80 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-lg bg-indigo-500/20 text-cyan-400 border border-indigo-500/30">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-widest font-mono">
              Super-Admin Command Nexus
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight font-outfit">
            Marketplace Master Administration
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Monitor ecosystem Gross Merchandise Value (GMV), vendor onboarding queues, automated revenue rake, and platform dispute resolutions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <Link
            to="/admin/vendors"
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold shadow-neon-indigo transition-all flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Manage 142 Vendors</span>
          </Link>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 5 Admin Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ADMIN_METRICS.map((metric) => (
          <MetricCard key={metric.id} metric={metric as any} />
        ))}
      </div>

      {/* Line & Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Platform Revenue & Commission Over Time */}
        <div className="lg:col-span-2">
          <LineChartCard
            title="Platform GMV & Net Commission Earned"
            data={platformRevenueTrend}
            lines={[
              { key: 'revenue', name: 'Total GMV (USD)', color: '#10B981' },
              { key: 'commission', name: 'Net Commission (USD)', color: '#6366F1' },
            ]}
            xAxisKey="date"
            height={260}
            formatYAxis={(v) => `$${v / 1000}K`}
          />
        </div>

        {/* Right Col: Top Vendors by GMV */}
        <div>
          <BarChartCard
            title="Top Vendors by Monthly GMV"
            data={vendorGMVBreakdown}
            bars={[{ key: 'store', name: 'GMV ($)', color: '#A855F7' }]}
            xAxisKey="period"
            height={260}
          />
        </div>
      </div>

      {/* Tables: Vendor Applications & Platform Disputes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Applications Queue */}
        <div className="glass-card rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-100 tracking-tight">
                Vendor Application Queue
              </h3>
              <span className="text-xs font-semibold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-mono">
                5 Pending Reviews
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-700/60">
                    <th className="pb-3">Store</th>
                    <th className="pb-3">Owner</th>
                    <th className="pb-3 text-center">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {MOCK_VENDORS.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 font-bold text-white">{v.storeName}</td>
                      <td className="py-3 text-slate-400 font-medium">{v.ownerName}</td>
                      <td className="py-3 text-center">
                        <StatusBadge status={v.status} />
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => alert(`Reviewing application for ${v.storeName}`)}
                          className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30 rounded-lg text-xs font-semibold transition-all"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/60 mt-4 text-right">
            <Link to="/admin/vendors" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">
              <span>View All 142 Vendors</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Platform Disputes */}
        <div className="glass-card rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-100 tracking-tight">
                Platform Customer Disputes
              </h3>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-700/60">
                    <th className="pb-3">Dispute ID</th>
                    <th className="pb-3">Vendor</th>
                    <th className="pb-3">Issue</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {MOCK_DISPUTES.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 font-mono font-bold text-cyan-400">{d.id}</td>
                      <td className="py-3 text-slate-200 font-medium truncate max-w-[100px]">{d.vendorName}</td>
                      <td className="py-3 text-slate-400 truncate max-w-[130px]">{d.issue}</td>
                      <td className="py-3 text-right">
                        <StatusBadge status={d.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/60 mt-4 text-right">
            <Link to="/admin/disputes" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">
              <span>View All Disputes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

