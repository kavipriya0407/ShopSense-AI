import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Save,
  Percent,
  Layers,
  Bell,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';

export const AdminSettings: React.FC = () => {
  const { showToast } = useShopSense();

  const [platformFee, setPlatformFee] = useState('8.5');
  const [autoApproveVerified, setAutoApproveVerified] = useState(false);
  const [disputeWindow, setDisputeWindow] = useState('7');
  const [settlementCycle, setSettlementCycle] = useState('Bi-weekly (1st & 16th Epoch)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform governance protocols persisted to registry', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-16">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Governance & Protocol Policies
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-cyan-300 border border-indigo-500/30">
            System Config
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Marketplace take-rate policies, catalog approval thresholds, and automated epoch payout schedules.
        </p>
      </div>

      <form onSubmit={handleSave} className="lumen-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-8">
        <div>
          <h2 className="text-sm font-display font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
            <Percent className="w-4 h-4 text-cyan-400" />
            <span>Monetization & Commission Structures</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Default Take Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={platformFee}
                onChange={(e) => setPlatformFee(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Settlement Frequency Cadence
              </label>
              <input
                type="text"
                value={settlementCycle}
                onChange={(e) => setSettlementCycle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-display font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Automated Verification Policies</span>
          </h2>

          <div className="space-y-4 mt-4">
            <label className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={autoApproveVerified}
                onChange={(e) => setAutoApproveVerified(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 border-slate-700 bg-slate-900"
              />
              <div>
                <span className="text-xs font-bold text-white block">Auto-approve Apex Partner (Platinum) Tier listings</span>
                <span className="text-[11px] text-slate-400">Bypass manual gatekeeping for merchants maintaining &gt;4.8 score and &gt;500 successful orders</span>
              </div>
            </label>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Buyer Return / Dispute Settlement Window (Days)
              </label>
              <input
                type="number"
                value={disputeWindow}
                onChange={(e) => setDisputeWindow(e.target.value)}
                className="w-full max-w-xs px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm font-mono font-medium text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xl shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Persist Governance Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
