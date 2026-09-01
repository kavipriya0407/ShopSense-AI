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
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Platform Disputes & Order Refunds
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Resolve buyer-seller order conflicts, authorize platform refunds, and enforce store policy compliance.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Active Disputes Queue</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100">
                <th className="pb-3">Dispute ID</th>
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Vendor</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Issue Description</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {disputes.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="py-3 font-mono font-bold text-slate-900">{d.id}</td>
                  <td className="py-3 font-semibold text-blue-600">{d.orderId}</td>
                  <td className="py-3 font-semibold text-slate-900">{d.vendorName}</td>
                  <td className="py-3 text-slate-600">{d.customerName}</td>
                  <td className="py-3 text-slate-500 max-w-xs">{d.issue}</td>
                  <td className="py-3 text-right font-extrabold text-slate-900">{d.amount}</td>
                  <td className="py-3 text-center">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="py-3 text-right">
                    {d.status !== 'Resolved' ? (
                      <button
                        onClick={() => handleResolve(d.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors"
                      >
                        Resolve Dispute
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-600 inline-flex items-center gap-1">
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
