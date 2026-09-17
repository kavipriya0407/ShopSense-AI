import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Store,
  ArrowRight,
  Zap,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useShopSense, UserRole } from '../context/ShopSenseContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useShopSense();

  const [role, setRole] = useState<UserRole>('vendor');
  const [email, setEmail] = useState('vendor@demo.com');
  const [password, setPassword] = useState('vendor123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'vendor') {
      setEmail('vendor@demo.com');
      setPassword('vendor123');
    } else {
      setEmail('admin@demo.com');
      setPassword('admin123');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleQuickDemo = (demoRole: UserRole) => {
    handleRoleChange(demoRole);
    login(demoRole === 'admin' ? 'admin@demo.com' : 'vendor@demo.com', demoRole);
    if (demoRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#090D16] font-sans antialiased text-white selection:bg-cyan-500 selection:text-black">
      {/* LEFT SIDE: Luxury Obsidian Hero */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#090D16] via-[#0E1322] to-[#121A30] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[460px] md:min-h-screen border-r border-slate-800/80">
        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 border border-white/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-tight text-white block">
                ShopSense<span className="text-cyan-400">.AI</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                Autonomous Commerce Matrix
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mt-5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Neural Settlement Protocol v3.8</span>
          </div>
        </div>

        {/* Central Value Statement */}
        <div className="my-10 md:my-auto relative z-10 max-w-lg">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.08] text-white">
            Autonomous
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              Commerce Precision.
            </span>
          </h1>

          <p className="mt-6 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Unified catalog registry, real-time inventory telemetry, and deterministic AI shopping copilot for next-generation merchants.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <p className="text-2xl font-display font-black text-cyan-300">₹84.2M</p>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">Quarterly Clearing</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <p className="text-2xl font-display font-black text-emerald-400">99.98%</p>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">Neural Resolution</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-6 flex items-center justify-between border-t border-slate-800 text-xs text-slate-400">
          <span>© 2026 ShopSense AI Platform. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulsing-dot" />
            <span className="font-mono text-[11px] text-cyan-300">Nodes Synchronized</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-[#090D16] relative">
        <div className="w-full max-w-md lumen-card p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative z-10">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Access Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select operational scope to authenticate credentials.
            </p>
          </div>

          {/* Role Toggle Capsules */}
          <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-2xl mb-6 border border-slate-800">
            <button
              type="button"
              onClick={() => handleRoleChange('vendor')}
              className={`py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                role === 'vendor'
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Merchant Hub</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                role === 'admin'
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Matrix</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Operator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'vendor' ? 'vendor@demo.com' : 'admin@demo.com'}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                  Access Key / Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Security reset token dispatched to verified merchant email.')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-mono hover:underline"
                >
                  Forgot key?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 border-slate-700 bg-slate-900"
                />
                <span>Retain session on this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-display font-bold text-sm rounded-xl shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group mt-2"
            >
              <span>{role === 'admin' ? 'Authenticate Super Admin' : 'Launch Merchant Console'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Instant Demo Access
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono font-bold border border-cyan-500/30">
                1-Click Auth
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('vendor')}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 hover:border-cyan-500/40 border border-slate-800 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300">Vendor Demo</span>
                  <Store className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-1 truncate">vendor@demo.com</p>
                <p className="text-[10px] text-slate-500 font-mono">vendor123</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 hover:border-indigo-500/40 border border-slate-800 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-indigo-300">Admin Demo</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-1 truncate">admin@demo.com</p>
                <p className="text-[10px] text-slate-500 font-mono">admin123</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
