import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Truck,
  Star,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { useShopZone } from '../context/ShopZoneContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useShopZone();

  const [emailOrPhone, setEmailOrPhone] = useState('customer@shopzone.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailOrPhone, isRegisterMode && name ? name : 'Vikram');
    navigate('/');
  };

  const handleQuickDemo = (role: 'shopper' | 'seller') => {
    if (role === 'shopper') {
      login('customer@shopzone.in', 'Vikram (Customer)');
      navigate('/');
    } else {
      login('vendor@shopzone.in', 'TechGear Merchant');
      navigate('/analytics');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[580px]">
        {/* LEFT COLUMN: Illustration & Brand Trust (matching Screen 2) */}
        <div className="bg-[#F4F7FB] p-8 sm:p-12 flex flex-col justify-between border-r border-slate-200 relative overflow-hidden">
          {/* Header */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#FF5722] flex items-center justify-center text-white font-black shadow-md shadow-orange-500/30">
                <ShoppingBag className="w-5 h-5 fill-white stroke-none" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                Shop<span className="text-[#FF5722]">Zone</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              Your One Stop Shopping Destination
            </p>
          </div>

          {/* Central 3D Shopping Cart & Mobile Illustration */}
          <div className="my-8 flex items-center justify-center relative">
            <div className="w-64 sm:w-72 aspect-square relative flex items-center justify-center">
              {/* Decorative gradient circular glow */}
              <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* Floating Product Badges */}
              <div className="absolute top-2 left-2 p-2 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center gap-1.5 animate-bounce">
                <span className="text-lg">🎧</span>
                <span className="text-[10px] font-bold text-slate-700">boAt Rockerz</span>
              </div>

              <div className="absolute bottom-4 right-2 p-2 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center gap-1.5 animate-pulse">
                <span className="text-lg">📱</span>
                <span className="text-[10px] font-bold text-slate-700">Samsung 5G</span>
              </div>

              {/* Central Illustration Graphic */}
              <div className="w-48 h-56 bg-gradient-to-b from-blue-50 to-white rounded-2xl border-4 border-slate-800 shadow-2xl p-3 flex flex-col items-center justify-between relative z-10">
                {/* Mobile screen top bar */}
                <div className="w-16 h-1.5 bg-slate-800 rounded-full mb-2" />

                {/* Shopping Cart graphic inside phone */}
                <div className="w-full flex-1 bg-orange-50 rounded-xl p-3 flex flex-col items-center justify-center gap-2 border border-orange-200">
                  <div className="w-16 h-16 rounded-full bg-[#FF5722] text-white flex items-center justify-center shadow-lg shadow-orange-500/40">
                    <ShoppingBag className="w-8 h-8 fill-white stroke-none" />
                  </div>
                  <span className="text-xs font-black text-[#FF5722]">ShopZone Cart</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    ₹13,998 Total
                  </span>
                </div>

                {/* Mobile screen bottom bar */}
                <div className="w-10 h-1 bg-slate-400 rounded-full mt-2" />
              </div>
            </div>
          </div>

          {/* 3 Trust Badges at Bottom (matching Screen 2) */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200/80 text-center">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-slate-800">Best Prices</span>
              <span className="text-[9px] text-slate-400">Everyday</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF5722] flex items-center justify-center mb-1">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-slate-800">Fast & Safe</span>
              <span className="text-[9px] text-slate-400">Delivery</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
                <Star className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-slate-800">Trusted by</span>
              <span className="text-[9px] text-slate-400">Millions</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Login Form (matching Screen 2) */}
        <div className="p-8 sm:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {isRegisterMode ? 'Create Account' : 'Welcome Back!'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isRegisterMode ? 'Sign up to start shopping on ShopZone' : 'Login to your account'}
              </p>
            </div>

            {/* Quick Demo Pre-fill Pill */}
            <div className="mb-5 p-2.5 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between text-xs">
              <span className="font-bold text-orange-800">🚀 Quick Demo:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('shopper')}
                  className="px-2.5 py-1 rounded bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold text-[11px] transition-colors"
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('seller')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] transition-colors"
                >
                  Analytics
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Vikram Sharma"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email or Mobile Number</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="customer@shopzone.in or 9876543210"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#FF5722] focus:ring-[#FF5722] border-slate-300"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset instructions sent to ' + emailOrPhone)}
                  className="text-[#FF5722] hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Orange Login Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#FF5722] hover:bg-[#F4511E] active:bg-orange-700 text-white font-bold text-sm rounded-lg shadow-md shadow-orange-500/25 transition-all mt-2"
              >
                {isRegisterMode ? 'Register & Continue' : 'Login'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-xs text-slate-400 font-medium uppercase">
                or
              </span>
            </div>

            {/* Social Logins */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  login('google.user@gmail.com', 'Google User');
                  navigate('/');
                }}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 flex items-center justify-center gap-3 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  login('facebook.user@shopzone.in', 'Facebook User');
                  navigate('/');
                }}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 flex items-center justify-center gap-3 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Continue with Facebook</span>
              </button>
            </div>
          </div>

          {/* Footer Register toggle */}
          <div className="text-center pt-6 text-xs text-slate-500">
            {isRegisterMode ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className="text-[#FF5722] font-bold hover:underline"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className="text-[#FF5722] font-bold hover:underline"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
