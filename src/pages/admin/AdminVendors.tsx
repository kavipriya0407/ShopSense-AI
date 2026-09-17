import React, { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  AlertTriangle,
  Star,
  Building,
  Mail,
  Filter,
  DollarSign,
  Plus,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';

export const AdminVendors: React.FC = () => {
  const { vendors } = useShopSense();
  const [search, setSearch] = useState('');

  const filtered = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Merchant Node Registry
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Verified Partners
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Audit merchant operating credentials, verification compliance, commission tiers, and gross volume streams.
          </p>
        </div>

        <button
          onClick={() => alert('Merchant Onboarding Invitation Link generated: https://shopsense.ai/onboard/v/demo-node')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard Merchant Node</span>
        </button>
      </div>

      <div className="lumen-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search merchant name, email, or domain..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 placeholder:text-slate-600 font-medium"
          />
        </div>
        <span className="text-xs font-mono font-bold text-slate-400">{filtered.length} Active Merchants</span>
      </div>

      <div className="lumen-card rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Merchant Entity</th>
                <th className="py-3.5 px-4">Domain Category</th>
                <th className="py-3.5 px-4 text-center">Tier</th>
                <th className="py-3.5 px-4 text-right">Active SKUs</th>
                <th className="py-3.5 px-4 text-right">Gross GMV</th>
                <th className="py-3.5 px-4 text-center">Score</th>
                <th className="py-3.5 px-4 text-center">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((vend) => (
                <tr key={vend.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white">{vend.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{vend.email}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">{vend.category}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-cyan-300 border border-indigo-500/30">
                      {vend.tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-cyan-300">{vend.productsCount}</td>
                  <td className="py-3.5 px-4 text-right font-display font-black text-white">
                    ₹{vend.revenue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-400">
                    ★ {vend.rating}
                  </td>
                  <td className="py-3.5 px-4 text-center">
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
    </div>
  );
};
