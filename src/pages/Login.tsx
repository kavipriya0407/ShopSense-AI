import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Store, ShieldCheck, Mail, Lock, ArrowRight, ShoppingCart } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<'shopper' | 'vendor' | 'admin'>('vendor');
  
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('vendor@shopsense.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  // Auto pre-fill default email when role changes for easy testing
  const handleRoleSelect = (role: 'shopper' | 'vendor' | 'admin') => {
    setSelectedRole(role);
    if (role === 'shopper') {
      setEmail('customer@shopsense.com');
    } else if (role === 'vendor') {
      setEmail('vendor@shopsense.com');
    } else if (role === 'admin') {
      setEmail('admin@shopsense.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    // Role-based routing: Admin goes to /admin, Vendor/Shopper goes to /dashboard
    if (selectedRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Blur Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Sign In / Sign Up Pill Switcher */}
      <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setActiveTab('signin')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'signin'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab('signup')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'signup'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md bg-[#111827]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-800/80 shadow-2xl relative z-10 space-y-6">
        {/* Inner Segmented Toggle Switcher */}
        <div className="bg-slate-900/90 p-1 rounded-xl flex items-center border border-slate-800/80">
          <button
            type="button"
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'signin'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'signup'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Card Heading */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {activeTab === 'signin' ? 'Sign In to ShopSense' : 'Create ShopSense Account'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Enter your credentials to access your customer, vendor, or admin dashboard.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* SELECT ROLE SECTION */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              SELECT ROLE
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Role 1: Shopper */}
              <button
                type="button"
                onClick={() => handleRoleSelect('shopper')}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedRole === 'shopper'
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm ring-2 ring-blue-500/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <User className={`w-4 h-4 ${selectedRole === 'shopper' ? 'text-blue-400' : ''}`} />
                <span className="text-xs font-bold">Shopper</span>
              </button>

              {/* Role 2: Vendor */}
              <button
                type="button"
                onClick={() => handleRoleSelect('vendor')}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedRole === 'vendor'
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm ring-2 ring-blue-500/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Store className={`w-4 h-4 ${selectedRole === 'vendor' ? 'text-blue-400' : ''}`} />
                <span className="text-xs font-bold">Vendor</span>
              </button>

              {/* Role 3: Admin */}
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-sm ring-2 ring-indigo-500/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${selectedRole === 'admin' ? 'text-indigo-400' : ''}`} />
                <span className="text-xs font-bold">Admin</span>
              </button>
            </div>
          </div>

          {/* Full Name Input for Sign Up */}
          {activeTab === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          {/* Email Address Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          {activeTab === 'signin' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-800 bg-slate-900"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to ' + email)}
                className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Dynamic Role Primary CTA Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group uppercase tracking-wider ${
              selectedRole === 'admin'
                ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
            }`}
          >
            <span>
              {activeTab === 'signin'
                ? `Sign In as ${selectedRole}`
                : `Sign Up as ${selectedRole}`}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer Toggle Text */}
        <div className="text-center pt-2 border-t border-slate-800/60">
          <p className="text-xs text-slate-400">
            {activeTab === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="text-blue-400 font-bold hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className="text-blue-400 font-bold hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
