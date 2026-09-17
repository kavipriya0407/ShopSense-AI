import React, { useState } from 'react';
import {
  User,
  Building,
  Mail,
  Phone,
  CreditCard,
  ShieldCheck,
  Save,
  CheckCircle2,
  Sparkles,
  MapPin,
  Key,
  Shield,
  Zap,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';

export const VendorProfile: React.FC = () => {
  const { user, showToast, products } = useShopSense();

  const [storeName, setStoreName] = useState('Kavi Enterprise Matrix');
  const [contactName, setContactName] = useState('Kavi M.');
  const [email, setEmail] = useState('vendor.matrix@shopsense.ai');
  const [phone, setPhone] = useState('+91 98450 12345');
  const [gstin, setGstin] = useState('29AABCU9603R1ZM');
  const [bankAccount, setBankAccount] = useState('HDFC0000123 - 501002348912');
  const [address, setAddress] = useState('Indiranagar 100ft Tech Corridor, Bangalore, Karnataka - 560038');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Merchant operational profile synced successfully', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header Banner */}
      <div className="lumen-card p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />

        <div className="flex items-center gap-5 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-display font-black text-2xl shadow-xl shadow-indigo-500/25 border border-white/20">
            K
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-display font-black text-white tracking-tight">
                {storeName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verified Merchant
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Node ID: <span className="text-cyan-400 font-bold">LMN-VEND-901</span> • Tier: <span className="text-indigo-400 font-bold">Apex Partner (Platinum)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-mono">Registered Catalog</span>
            <span className="text-base font-display font-bold text-white">
              {products.length} Active SKUs
            </span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Information Card */}
        <div className="lumen-card p-6 sm:p-8 rounded-3xl space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-display font-bold text-white">Enterprise & Dispatch Entity</h2>
              <p className="text-[11px] text-slate-400">Merchant operating identity and warehouse dispatch locations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Corporate Entity Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Primary Operator Contact
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Merchant Operations Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Emergency Dispatch Hotline
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Fulfillment Hub / Warehouse Coordinates
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-medium text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Financial & Settlement Information */}
        <div className="lumen-card p-6 sm:p-8 rounded-3xl space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-display font-bold text-white">Settlement Rails & Taxation</h2>
              <p className="text-[11px] text-slate-400">Escrow automated disbursements and GST compliance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                GSTIN Tax ID
              </label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Settlement Rail IFSC & Account
              </label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-mono font-medium text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xl shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Persist Merchant Credentials</span>
          </button>
        </div>
      </form>
    </div>
  );
};
