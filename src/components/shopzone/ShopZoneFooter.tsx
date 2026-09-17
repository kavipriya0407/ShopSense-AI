import React from 'react';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Headphones, Sparkles, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShopZoneFooter: React.FC = () => {
  return (
    <footer className="bg-[#090D16] text-slate-300 border-t border-[#151D33] pt-12 pb-8 mt-16 text-xs">
      {/* 4 Trust Pillars Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-10 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Autonomous Express Dispatch</h4>
            <p className="text-slate-400 text-[11px]">Free priority shipping on ₹499+</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">7-Day Zero Friction Returns</h4>
            <p className="text-slate-400 text-[11px]">Instant automated escrow refunds</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Cryptographic Authenticity</h4>
            <p className="text-slate-400 text-[11px]">100% verified merchant origin</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">AI Shopping Concierge</h4>
            <p className="text-slate-400 text-[11px]">24/7 real-time neural assistance</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-950/50">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-display font-black text-white tracking-tight">
              ShopSense <span className="text-indigo-400">AI</span>
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Next-generation intelligent commerce network powering autonomous merchant operations, real-time inventory synchronization, and AI-grounded buyer experiences.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Escrow Transactions</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px] font-mono text-indigo-300">
            Marketplace
          </h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li><Link to="/storefront" className="hover:text-white transition-colors">Catalog Nexus</Link></li>
            <li><Link to="/storefront?cat=Mobiles" className="hover:text-white transition-colors">Flagship Mobiles</Link></li>
            <li><Link to="/storefront?cat=Electronics" className="hover:text-white transition-colors">Audio & Acoustics</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">Active Cart & Checkout</Link></li>
            <li><Link to="/company-reviews" className="hover:text-white transition-colors">Verified Customer Ratings</Link></li>
          </ul>
        </div>

        {/* Merchant & Platform */}
        <div>
          <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px] font-mono text-indigo-300">
            Enterprise Hub
          </h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li><Link to="/dashboard" className="hover:text-white transition-colors">Merchant Command Center</Link></li>
            <li><Link to="/catalog" className="hover:text-white transition-colors">Inventory Control Matrix</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors">Super-Admin Console</Link></li>
            <li><Link to="/analyst" className="hover:text-white transition-colors">AI Telemetry Studio</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Merchant Sign In</Link></li>
          </ul>
        </div>

        {/* Supported Gateways */}
        <div>
          <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px] font-mono text-indigo-300">
            Settlement Rails
          </h4>
          <p className="text-slate-400 text-[11px] mb-3">Instant cross-bank settlements via unified financial layer.</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 bg-[#131B2E] border border-white/10 rounded-lg font-bold text-white text-[10px] font-mono">UPI Instant</span>
            <span className="px-2.5 py-1 bg-[#131B2E] border border-white/10 rounded-lg font-bold text-indigo-300 text-[10px]">VISA</span>
            <span className="px-2.5 py-1 bg-[#131B2E] border border-white/10 rounded-lg font-bold text-rose-300 text-[10px]">Mastercard</span>
            <span className="px-2.5 py-1 bg-[#131B2E] border border-white/10 rounded-lg font-bold text-cyan-300 text-[10px]">RuPay</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
        <span>© 2026 ShopSense AI Technologies Inc. All rights reserved.</span>
        <div className="flex items-center gap-4 text-slate-400">
          <Link to="/storefront" className="hover:text-white">Privacy Architecture</Link>
          <Link to="/storefront" className="hover:text-white">Service Level Agreement</Link>
          <Link to="/dashboard" className="hover:text-white">Merchant Portal</Link>
        </div>
      </div>
    </footer>
  );
};

