import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  CheckSquare,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Activity,
  Layers,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';
import { ADMIN_MARKETPLACE_STATS } from '../../mock-data/shopSenseData';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { approvals, approveRequest, rejectRequest, vendors } = useShopSense();

  const pendingApprovals = approvals.filter((a) => a.status === 'Pending');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="lumen-card p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              ShopSense Governance Matrix
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-cyan-300 text-xs font-mono font-bold">
              SUPER-OPERATOR
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Autonomous merchant oversight, cryptographic approvals, dispute resolution, and cross-chain GMV telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => navigate('/admin/approvals')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Approval Queue ({pendingApprovals.length})</span>
          </button>
        </div>
      </div>

      {/* MARKETPLACE STATISTICS (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Vendors */}
        <div className="lumen-card p-5 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Active Merchants
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold border border-cyan-500/30">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-2xl font-display font-black text-white mt-3">
            {ADMIN_MARKETPLACE_STATS.totalVendors}
          </h2>
          <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +14 this cycle
          </span>
        </div>

        {/* Card 2: Total Products */}
        <div className="lumen-card p-5 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Catalog Registry
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/30">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-2xl font-display font-black text-white mt-3">
            {ADMIN_MARKETPLACE_STATS.totalProducts}
          </h2>
          <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +128 active SKUs
          </span>
        </div>

        {/* Card 3: Total Orders */}
        <div className="lumen-card p-5 rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Dispatched Orders
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold border border-purple-500/30">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-2xl font-display font-black text-white mt-3">
            {ADMIN_MARKETPLACE_STATS.totalOrders}
          </h2>
          <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +21.4% GMV
          </span>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="lumen-card p-5 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Cleared Volume
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-2xl font-display font-black text-white mt-3">
            {ADMIN_MARKETPLACE_STATS.totalRevenue}
          </h2>
          <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +18.2% YoY
          </span>
        </div>

        {/* Card 5: Pending Approvals */}
        <div className="lumen-card p-5 rounded-3xl border border-amber-500/30 hover:border-amber-500/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
              Pending Validation
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-2xl font-display font-black text-amber-300 mt-3">
            {pendingApprovals.length}
          </h2>
          <span className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-1 mt-1">
            Queue Action Required
          </span>
        </div>
      </div>

      {/* SECTION 1 & 2: Vendor Performance & Product Approvals Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION 1: Top Vendor Performance Ranking */}
        <div className="lg:col-span-2 lumen-card rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-display font-bold text-white">
                1. Merchant Node Performance Index
              </h2>
              <p className="text-xs text-slate-400">
                Top grossing merchant storefronts and verified compliance tiers
              </p>
            </div>
            <Link
              to="/admin/vendors"
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Explore All Nodes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 font-mono font-bold uppercase tracking-wider border-y border-slate-800 text-[10px]">
                <tr>
                  <th className="py-3 px-3">Merchant / Storefront</th>
                  <th className="py-3 px-3">Domain</th>
                  <th className="py-3 px-3 text-right">SKUs</th>
                  <th className="py-3 px-3 text-right">Gross GMV</th>
                  <th className="py-3 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {vendors.map((vend) => (
                  <tr key={vend.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-bold text-white">{vend.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{vend.email}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-medium">
                      {vend.category}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-cyan-300">
                      {vend.productsCount}
                    </td>
                    <td className="py-3 px-3 text-right font-display font-black text-white">
                      ₹{vend.revenue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          vend.status === 'Verified'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {vend.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 2: Product Approval Queue */}
        <div className="lumen-card rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h2 className="text-base font-display font-bold text-white">
                  2. Listing Verification Protocol
                </h2>
                <p className="text-xs text-slate-400">
                  Awaiting compliance approval
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                {pendingApprovals.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {approvals.slice(0, 3).map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-2.5"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={req.image}
                      alt={req.productName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase">
                        {req.category}
                      </span>
                      <h4 className="font-bold text-xs text-white truncate">
                        {req.productName}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-display font-black text-cyan-300">
                          ₹{req.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">By {req.vendorName}</span>
                      </div>
                    </div>
                  </div>

                  {req.status === 'Pending' ? (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() => approveRequest(req.id)}
                        className="flex-1 py-1.5 px-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Authorize</span>
                      </button>
                      <button
                        onClick={() => rejectRequest(req.id)}
                        className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 text-xs font-bold transition-all flex items-center justify-center gap-1 border border-slate-700"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono font-bold">
                      <span className="text-slate-500">Status:</span>
                      <span
                        className={req.status === 'Approved' ? 'text-emerald-400' : 'text-rose-400'}
                      >
                        {req.status}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 text-center">
            <Link
              to="/admin/approvals"
              className="text-xs font-mono font-bold text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Open Global Verification Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 3, 4, 5: Revenue, Customer Intelligence, and SLA Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SECTION 3: Revenue Analytics & Platform Commission */}
        <div className="lumen-card rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-display font-bold text-white mb-1">
              3. Monetization & Take-Rate Telemetry
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Protocol fee retention and clearing splits
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
                <span className="text-[10px] font-mono text-cyan-300 font-bold block uppercase">Gross Marketplace Volume (GMV)</span>
                <span className="text-2xl font-display font-black text-white block mt-1">₹4.82 Crore</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Platform Take Rate:</span>
                <span className="font-mono font-bold text-cyan-300">8.5% Net</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Commission Retained:</span>
                <span className="font-mono font-bold text-emerald-400">₹40,97,000.00</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Next Payout Cycle:</span>
                <span className="font-mono font-bold text-white">15th Sep 2026</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 mt-4">
            <Link to="/admin/revenue" className="text-xs font-mono font-bold text-cyan-400 hover:underline">
              Revenue Breakdown & Settlements →
            </Link>
          </div>
        </div>

        {/* SECTION 4: Customer Spending Analytics Summary */}
        <div className="lumen-card rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-display font-bold text-white mb-1">
              4. Buyer Cohort Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              5,000 active platform accounts classified
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                <span className="font-bold text-emerald-300">High Value Tier (₹1L+)</span>
                <span className="font-mono font-bold text-emerald-400">1,190 buyers (23.8%)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs">
                <span className="font-bold text-cyan-300">Medium Value (₹25k - ₹1L)</span>
                <span className="font-mono font-bold text-cyan-400">1,147 buyers (22.9%)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
                <span className="font-bold text-slate-300">Entry Tier (&lt;₹25k)</span>
                <span className="font-mono font-bold text-slate-400">2,663 buyers (53.3%)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 mt-4">
            <Link to="/admin/customers" className="text-xs font-mono font-bold text-cyan-400 hover:underline">
              Inspect Customer Intelligence Ledger →
            </Link>
          </div>
        </div>

        {/* SECTION 5: Marketplace Health & SLA Telemetry */}
        <div className="lumen-card rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-display font-bold text-white mb-1">
              5. Network SLAs & Core Health
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              System uptime and dispute tolerance
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 pulsing-dot" />
                  RAG Vector SLA:
                </span>
                <span className="font-mono font-bold text-white">99.98% Nominal</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Mean Dispatch Window:</span>
                <span className="font-mono font-bold text-white">1.8 Days</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Network Dispute Rate:</span>
                <span className="font-mono font-bold text-emerald-400">0.42% (Optimal)</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-slate-400">Grounding Verifiability:</span>
                <span className="font-mono font-bold text-cyan-300">100% Deterministic</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 mt-4 text-slate-500 text-[11px] font-mono">
            All 12 decentralized nodes operational.
          </div>
        </div>
      </div>
    </div>
  );
};
