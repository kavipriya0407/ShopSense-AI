import React from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Zap,
} from 'lucide-react';

export const AdminRevenue: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Settlement Rails & Protocol Treasury
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Escrow Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Gross merchandise value (GMV), automated take-rate disbursements, and liquidity settlement ledger.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Full Financial Ledger CSV...')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-mono font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Export Financial Ledger</span>
        </button>
      </div>

      {/* Revenue Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="lumen-card p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Gross Network GMV</span>
          <h2 className="text-3xl font-display font-black text-white mt-2">₹4,82,50,000.00</h2>
          <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.2% vs previous quarter
          </span>
        </div>

        <div className="lumen-card p-6 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">Platform Take Rate (8.5%)</span>
          <h2 className="text-3xl font-display font-black text-cyan-300 mt-2">₹41,01,250.00</h2>
          <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1 mt-1">
            <Zap className="w-3.5 h-3.5" /> Net recurring protocol fees
          </span>
        </div>

        <div className="lumen-card p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Disbursed to Merchants</span>
          <h2 className="text-3xl font-display font-black text-emerald-400 mt-2">₹4,41,48,750.00</h2>
          <span className="text-xs text-slate-400 font-mono font-medium block mt-1">
            100% on-time settlement SLA
          </span>
        </div>
      </div>

      {/* Settlement Cycles Table */}
      <div className="lumen-card rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-display font-bold text-white flex items-center justify-between">
          <span>Automated Epoch Settlement Cycles</span>
          <span className="text-xs font-mono text-cyan-400">Bi-Weekly Cadence</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 border-y border-slate-800 text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Cycle UID</th>
                <th className="py-3 px-4">Settlement Window</th>
                <th className="py-3 px-4">Active Merchants</th>
                <th className="py-3 px-4 text-right">GMV Cleared</th>
                <th className="py-3 px-4 text-right">Take-Rate Retained</th>
                <th className="py-3 px-4 text-center">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {[
                { id: 'SET-2026-08B', period: '16 Aug - 31 Aug 2026', vendors: 122, gmv: '₹84,20,000.00', comm: '₹7,15,700.00', status: 'Completed' },
                { id: 'SET-2026-08A', period: '01 Aug - 15 Aug 2026', vendors: 119, gmv: '₹79,50,000.00', comm: '₹6,75,750.00', status: 'Completed' },
                { id: 'SET-2026-07B', period: '16 Jul - 31 Jul 2026', vendors: 116, gmv: '₹76,10,000.00', comm: '₹6,46,850.00', status: 'Completed' },
              ].map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{c.id}</td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">{c.period}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{c.vendors} Merchants</td>
                  <td className="py-3.5 px-4 text-right font-display font-black text-white">{c.gmv}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">{c.comm}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {c.status}
                    </span>
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
