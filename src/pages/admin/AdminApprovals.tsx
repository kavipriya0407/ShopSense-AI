import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Package,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';

export const AdminApprovals: React.FC = () => {
  const { approvals, approveRequest, rejectRequest } = useShopSense();
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const filtered = approvals.filter(
    (a) => filterStatus === 'All' || a.status === filterStatus
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Catalog Verification & Approvals
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Zap className="w-3 h-3" /> Gatekeeper
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Certify and index incoming vendor submissions before public distribution on the ShopSense buyer network.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
            {approvals.filter((a) => a.status === 'Pending').length} Awaiting Verification
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 w-fit">
        {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === status
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Approvals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="lumen-card rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all bg-slate-900/80"
          >
            <div className="flex items-start gap-4">
              <img
                src={req.image}
                alt={req.productName}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-800 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    {req.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      req.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : req.status === 'Rejected'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm text-white mt-1 truncate">
                  {req.productName}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Merchant: <span className="text-slate-200 font-semibold">{req.vendorName}</span>
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="font-display font-black text-white">
                    ₹{req.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">SKU: {req.sku}</span>
                  <span className="text-slate-400 font-mono text-[11px]">{req.stock} in reserve</span>
                </div>
              </div>
            </div>

            {req.status === 'Pending' ? (
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => approveRequest(req.id)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize & Publish</span>
                </button>
                <button
                  onClick={() => rejectRequest(req.id)}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Submitted: {req.submittedDate}</span>
                <span className="font-bold text-cyan-400">Protocol Complete</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
