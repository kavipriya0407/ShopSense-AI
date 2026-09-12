import React from 'react';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShopZoneFooter: React.FC = () => {
  return (
    <footer className="bg-[#131921] text-slate-300 border-t border-slate-800 pt-10 pb-8 mt-16 text-xs">
      {/* 4 Trust Pillars Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-10 border-b border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 text-[#FF5722] flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Free & Fast Delivery</h4>
            <p className="text-slate-400 text-[11px]">On all orders above ₹499</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 text-[#FF5722] flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">7 Days Easy Return</h4>
            <p className="text-slate-400 text-[11px]">Hassle-free instant refunds</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 text-[#FF5722] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">100% Genuine Products</h4>
            <p className="text-slate-400 text-[11px]">Direct brand verified stock</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 text-[#FF5722] flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">24/7 Dedicated Support</h4>
            <p className="text-slate-400 text-[11px]">Call, Chat & WhatsApp assistance</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-[#FF5722] flex items-center justify-center text-white font-bold">
              <ShoppingBag className="w-3.5 h-3.5 fill-white stroke-none" />
            </div>
            <span className="text-base font-bold text-white">ShopZone</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            India's fastest growing one-stop shopping destination for mobiles, electronics, fashion, and home appliances.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Quick Navigation</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/" className="hover:text-white">Home & Deals</Link></li>
            <li><Link to="/product/samsung-m14" className="hover:text-white">Samsung Galaxy M14</Link></li>
            <li><Link to="/cart" className="hover:text-white">My Cart</Link></li>
            <li><Link to="/company-reviews" className="hover:text-white">Customer Reviews</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Business & Seller</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/analytics" className="hover:text-white">Business Analytics</Link></li>
            <li><Link to="/login" className="hover:text-white">Seller Hub</Link></li>
            <li><Link to="/analytics" className="hover:text-white">Performance Reports</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Secure Payments</h4>
          <p className="text-slate-400 text-[11px] mb-3">All major cards, Netbanking & UPI supported.</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-white text-[10px]">UPI</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-blue-400 text-[10px]">VISA</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-rose-400 text-[10px]">Mastercard</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-cyan-400 text-[10px]">Razorpay</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 border-t border-slate-800/60 text-center text-slate-500 text-[11px]">
        © 2026 ShopZone Online Services Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
};
