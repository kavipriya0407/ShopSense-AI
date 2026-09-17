import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  CreditCard,
  Lock,
  Sparkles,
  Truck,
} from 'lucide-react';
import { ShopZoneHeader } from '../components/shopzone/ShopZoneHeader';
import { ShopZoneFooter } from '../components/shopzone/ShopZoneFooter';
import { useShopZone } from '../context/ShopZoneContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotalMRP,
    cartDiscount,
    cartFinalTotal,
    cartItemCount,
  } = useShopZone();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | 'cod'>('upi');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    setTimeout(() => {
      setIsOrderPlaced(false);
      setIsCheckoutModalOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] lumen-subtle-mesh text-slate-900 flex flex-col justify-between font-sans">
      <div>
        <ShopZoneHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          {cart.length === 0 ? (
            /* Empty Cart View */
            <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto space-y-5 my-12 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-black text-slate-900">Your Cart is Empty</h2>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Browse the ShopSense AI verified catalog matrix and add hardware or lifestyle assets to your active queue.
                </p>
              </div>
              <Link
                to="/storefront"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-950/30 transition-all"
              >
                <span>Browse Storefront</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Active Cart & Checkout Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT COLUMN: Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-md">
                  {/* Cart Header */}
                  <div className="border-b border-slate-200/80 pb-4 mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-display font-black text-slate-900">
                        Active Order Queue ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Direct merchant fulfillment with verified escrow protection
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                      INR (₹) CURRENCY
                    </span>
                  </div>

                  {/* Cart Items List */}
                  <div className="divide-y divide-slate-100">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                      >
                        {/* Product Image & Details */}
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            onClick={() => navigate(`/product/${item.product.id}`)}
                            className="w-20 h-20 bg-slate-50 rounded-2xl p-2.5 border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer group-hover:scale-105 transition-transform"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 tracking-wider">
                              {item.product.category}
                            </span>
                            <h3
                              onClick={() => navigate(`/product/${item.product.id}`)}
                              className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1"
                            >
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-slate-400">
                              {item.product.subtitle || item.product.category}{' '}
                              {item.selectedColor ? `• Finish: ${item.selectedColor}` : ''}
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                              <span className="text-sm font-display font-black text-slate-900">
                                ₹{item.product.price.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs text-slate-400 line-through">
                                ₹{item.product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Stepper & Line Total & Delete */}
                        <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0">
                          {/* Stepper */}
                          <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden shadow-inner">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="p-1.5 px-2.5 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-xs font-mono font-bold text-slate-900 border-x border-slate-300 bg-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="p-1.5 px-2.5 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <span className="text-base font-display font-black text-slate-900 min-w-[90px] text-right font-mono">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>

                          {/* Delete Trash Icon */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                            title="Remove asset"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Continue Shopping Link */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to="/storefront"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Continue Exploring Catalog</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Price Details & Checkout */}
              <div className="lg:col-span-4 space-y-4">
                {/* Price Summary Card */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-lg space-y-5">
                  <h3 className="text-base font-display font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                    <span>Order Summary</span>
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Catalog Value</span>
                      <span className="font-semibold text-slate-900 font-mono">
                        ₹{cartTotalMRP.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Escrow Discount Savings</span>
                      <span className="font-mono">- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Express Priority Dispatch</span>
                      <span className="font-bold text-emerald-700 font-mono">FREE DISPATCH</span>
                    </div>

                    <div className="flex justify-between text-base font-display font-black text-slate-900 pt-3 border-t border-slate-200">
                      <span>Total Net Payable</span>
                      <span className="text-2xl font-black text-slate-900 font-mono">
                        ₹{cartFinalTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-indigo-950/40 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <span>Proceed to Escrow Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>256-Bit SSL Encrypted Transaction</span>
                  </div>
                </div>

                {/* Settlement Rails Accepted */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-center space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                    Supported Payment Rails
                  </span>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-black text-slate-800 text-xs font-mono">
                      UPI
                    </span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-black text-indigo-600 text-xs">
                      VISA
                    </span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-black text-rose-600 text-xs">
                      Mastercard
                    </span>
                    <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg font-black text-cyan-600 text-xs">
                      NetBanking
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-display font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <span>Complete Escrow Order</span>
              </h3>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {isOrderPlaced ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-display font-black text-slate-900">
                  Escrow Order Dispatched!
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Your delivery is scheduled within 2 business days. Tracking ID sent to your registered email!
                </p>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 font-mono uppercase text-[11px]">
                    Shipping Destination
                  </label>
                  <textarea
                    rows={2}
                    required
                    defaultValue="142, Anna Nagar 2nd Main Road, Chennai - 600040"
                    className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-600 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 font-mono uppercase text-[11px]">
                    Payment Gateway
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'upi', label: 'UPI Instant (Google Pay / PhonePe / QR)' },
                      { id: 'card', label: 'Credit / Debit Card (VISA / Mastercard / RuPay)' },
                      { id: 'cod', label: 'Cash on Verified Delivery' },
                    ].map((m) => (
                      <label
                        key={m.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedPayment === m.id
                            ? 'border-indigo-600 bg-indigo-50/80 font-bold text-indigo-950'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPayment === m.id}
                          onChange={() => setSelectedPayment(m.id as any)}
                          className="accent-indigo-600"
                        />
                        <span>{m.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-bold text-sm">
                  <span>Net Payable Amount:</span>
                  <span className="text-xl text-indigo-600 font-display font-black font-mono">
                    ₹{cartFinalTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-950/30 transition-all uppercase tracking-wider"
                >
                  Authorize Payment & Complete Order
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <ShopZoneFooter />
    </div>
  );
};

