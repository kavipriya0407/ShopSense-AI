import React from 'react';
import { MetricCard } from '@/components/common/MetricCard';
import { LineChartCard } from '@/components/charts/LineChartCard';
import { BarChartCard } from '@/components/charts/BarChartCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ADMIN_METRICS, MOCK_VENDORS, MOCK_DISPUTES } from '@/mock-data/adminData';
import { ShieldCheck, UserCheck, AlertTriangle } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Super-Admin Control Panel
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            MarketPlace Master Administration
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Monitor overall marketplace Gross Merchandise Value (GMV), vendor applications, commission earnings, and platform dispute resolutions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/admin/vendors"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/30 transition-all flex items-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Manage 142 Vendors</span>
          </Link>
        </div>
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
              { key: 'commission', name: 'Net Commission (USD)', color: '#3B82F6' },
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
            bars={[{ key: 'store', name: 'GMV ($)', color: '#8B5CF6' }]}
            xAxisKey="period"
            height={260}
          />
        </div>
      </div>

      {/* Tables: Vendor Applications & Platform Disputes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Applications Queue */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Vendor Application Queue
              </h3>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                5 Pending Reviews
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100">
                    <th className="pb-2">Store</th>
                    <th className="pb-2">Owner</th>
                    <th className="pb-2 text-center">Status</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_VENDORS.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50">
                      <td className="py-2.5 font-bold text-slate-900">{v.storeName}</td>
                      <td className="py-2.5 text-slate-600 font-medium">{v.ownerName}</td>
                      <td className="py-2.5 text-center">
                        <StatusBadge status={v.status} />
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => alert(`Reviewing application for ${v.storeName}`)}
                          className="px-2.5 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors"
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

          <div className="pt-3 border-t border-slate-100 mt-4 text-right">
            <Link to="/admin/vendors" className="text-xs font-bold text-blue-600 hover:underline">
              View All Vendors →
            </Link>
          </div>
        </div>

        {/* Platform Disputes */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Platform Customer Disputes
              </h3>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100">
                    <th className="pb-2">Dispute ID</th>
                    <th className="pb-2">Vendor</th>
                    <th className="pb-2">Issue</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_DISPUTES.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="py-2.5 font-mono font-bold text-slate-900">{d.id}</td>
                      <td className="py-2.5 text-slate-700 font-medium truncate max-w-[100px]">{d.vendorName}</td>
                      <td className="py-2.5 text-slate-500 truncate max-w-[130px]">{d.issue}</td>
                      <td className="py-2.5 text-right">
                        <StatusBadge status={d.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 text-right">
            <Link to="/admin/disputes" className="text-xs font-bold text-blue-600 hover:underline">
              View All Disputes →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
