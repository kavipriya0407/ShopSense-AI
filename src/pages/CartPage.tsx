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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between font-sans">
      <div>
        <ShopZoneHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          {cart.length === 0 ? (
            /* Empty Cart View */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4 my-8 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
              <p className="text-xs text-slate-500">
                Explore our Deals of the Day and add trending items to your cart!
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold text-xs rounded-lg shadow-sm transition-all"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Active Cart & Checkout Grid (matching Screen 4) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT COLUMN: Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  {/* Cart Header */}
                  <div className="border-b border-slate-200 pb-3 mb-4 flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Your Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
                    </h2>
                    <span className="text-xs text-slate-400">All prices in INR (₹)</span>
                  </div>

                  {/* Cart Items List */}
                  <div className="divide-y divide-slate-100">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        {/* Product Image & Details */}
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            onClick={() => navigate(`/product/${item.product.id}`)}
                            className="w-20 h-20 bg-slate-50 rounded-xl p-2 border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div className="space-y-1">
                            <h3
                              onClick={() => navigate(`/product/${item.product.id}`)}
                              className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                            >
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-slate-400">
                              {item.product.subtitle || item.product.category} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                              <span className="text-sm font-extrabold text-slate-900">
                                ₹{item.product.price.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[11px] text-slate-400 line-through">
                                ₹{item.product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Stepper & Subtotal & Delete */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                          {/* Stepper */}
                          <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="p-1.5 text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 py-1 text-xs font-bold text-slate-900 border-x border-slate-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="p-1.5 text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <span className="text-base font-extrabold text-slate-900 min-w-[90px] text-right font-mono">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>

                          {/* Delete Trash Icon */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Continue Shopping Link */}
                  <div className="pt-6 border-t border-slate-100">
                    <Link
                      to="/"
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Price Details & Checkout (matching Screen 4) */}
              <div className="lg:col-span-4 space-y-4">
                {/* Price Summary Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                    Price Details
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Total MRP</span>
                      <span className="font-semibold text-slate-900 font-mono">
                        ₹{cartTotalMRP.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#16A34A] font-semibold">
                      <span>Discount</span>
                      <span className="font-mono">- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Shipping Charges</span>
                      <span className="font-bold text-[#16A34A]">FREE</span>
                    </div>

                    <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                      <span>Total Amount</span>
                      <span className="text-xl font-black text-slate-900 font-mono">
                        ₹{cartFinalTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="w-full py-3.5 bg-[#FF5722] hover:bg-[#F4511E] active:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* We Accept Payment Icons Box (matching Screen 4) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm text-center space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    We Accept
                  </span>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded font-black text-slate-800 text-xs">
                      UPI
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded font-black text-blue-600 text-xs">
                      VISA
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded font-black text-rose-600 text-xs">
                      Mastercard
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded font-black text-cyan-600 text-xs">
                      Razorpay
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#FF5722]" />
                <span>Complete Your Order</span>
              </h3>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {isOrderPlaced ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Order Placed Successfully!</h4>
                <p className="text-xs text-slate-500">
                  Your delivery is scheduled within 2-3 business days. Thank you for shopping with ShopZone!
                </p>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Address</label>
                  <textarea
                    rows={2}
                    required
                    defaultValue="142, Anna Nagar 2nd Main Road, Chennai - 600040"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#FF5722]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Payment Method</label>
                  <div className="space-y-2">
                    {[
                      { id: 'upi', label: 'UPI (Google Pay / PhonePe / Paytm)' },
                      { id: 'card', label: 'Credit / Debit Card (VISA / Mastercard)' },
                      { id: 'cod', label: 'Cash on Delivery' },
                    ].map((m) => (
                      <label
                        key={m.id}
                        className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                          selectedPayment === m.id ? 'border-[#FF5722] bg-orange-50 font-bold text-orange-900' : 'border-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPayment === m.id}
                          onChange={() => setSelectedPayment(m.id as any)}
                          className="accent-[#FF5722]"
                        />
                        <span>{m.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-bold text-sm">
                  <span>Total Payable:</span>
                  <span className="text-lg text-[#FF5722] font-mono">₹{cartFinalTotal.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold text-xs rounded-lg shadow-md transition-all"
                >
                  Confirm & Pay ₹{cartFinalTotal.toLocaleString('en-IN')}
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
