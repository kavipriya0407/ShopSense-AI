import React, { useState } from 'react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { MOCK_DISPUTES, PlatformDispute } from '@/mock-data/adminData';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AdminDisputes: React.FC = () => {
  const [disputes, setDisputes] = useState<PlatformDispute[]>(MOCK_DISPUTES);

  const handleResolve = (disputeId: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === disputeId ? { ...d, status: 'Resolved' } : d))
    );
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>Platform Disputes & Order Refunds</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Resolve buyer-seller order conflicts, authorize platform refunds, and enforce store policy compliance.
          </p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center justify-between">
          <span>Active Disputes Resolution Queue</span>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
            Priority Queue
          </span>
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-700/60 bg-slate-900/40">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-700/60">
                <th className="px-4 py-3">Dispute ID</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Issue Description</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {disputes.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-cyan-400">{d.id}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-indigo-400">{d.orderId}</td>
                  <td className="px-4 py-3 font-semibold text-slate-200">{d.vendorName}</td>
                  <td className="px-4 py-3 text-slate-400">{d.customerName}</td>
                  <td className="px-4 py-3 text-slate-300 max-w-xs">{d.issue}</td>
                  <td className="px-4 py-3 text-right font-extrabold text-white font-mono">{d.amount}</td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {d.status !== 'Resolved' ? (
                      <button
                        onClick={() => handleResolve(d.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-all shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                      >
                        Resolve Dispute
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

