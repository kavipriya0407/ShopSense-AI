import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Eye,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';
import { CATEGORIES } from '../../mock-data/shopSenseData';

const PRESET_IMAGES = [
  {
    name: 'Neural Audio Pods',
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Quantum Chrono Watch',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Acoustic Studio Array',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Cellular Peptide Elixir',
    url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Sculpted Ceramic Vessel',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Cybernetic Techwear',
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
  },
];

export const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct, user } = useShopSense();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('45');
  const [sku, setSku] = useState('LMN-ELE-' + Math.floor(1000 + Math.random() * 9000));
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [stockStatus, setStockStatus] = useState<'In Stock' | 'Low Stock' | 'Out of Stock'>('In Stock');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const generateSku = () => {
    const prefix =
      category === 'Electronics'
        ? 'LMN-ELE'
        : category === 'Audio'
        ? 'LMN-AUD'
        : category === 'Beauty & Care'
        ? 'LMN-BEA'
        : category === 'Fashion'
        ? 'LMN-FAS'
        : category === 'Home & Living'
        ? 'LMN-HOM'
        : 'LMN-ACC';
    setSku(`${prefix}-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const handleStockChange = (val: string) => {
    setStock(val);
    const num = parseInt(val, 10);
    if (isNaN(num) || num <= 0) {
      setStockStatus('Out of Stock');
    } else if (num <= 10) {
      setStockStatus('Low Stock');
    } else {
      setStockStatus('In Stock');
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Asset designation / title is required';
    if (!description.trim()) errs.description = 'Comprehensive asset description is required';
    if (!price || parseFloat(price) <= 0) errs.price = 'Specify a valid unit clearing price';
    if (!stock || parseInt(stock, 10) < 0) errs.stock = 'Specify a non-negative reserve allocation';
    if (!sku.trim()) errs.sku = 'SKU identifier is required';
    if (!image.trim()) errs.image = 'Media asset URL is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addProduct({
      name,
      description,
      category,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      stock: parseInt(stock, 10),
      sku,
      image,
      stockStatus,
      vendor: user?.company || 'ShopSense Merchant Network',
    });

    navigate('/catalog');
  };

  const numPrice = parseFloat(price) || 0;
  const numOriginalPrice = parseFloat(originalPrice) || 0;
  const discount =
    numOriginalPrice > numPrice
      ? Math.round(((numOriginalPrice - numPrice) / numOriginalPrice) * 100)
      : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/catalog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 mb-2 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Inventory Registry</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Publish Catalog Asset
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              <Zap className="w-3 h-3" /> SKU Registry v2.4
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deploy a verified commercial product listing to the ShopSense decentralized consumer network.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/catalog')}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish to Marketplace</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Left (7 cols) + Live Card Right (5 cols) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Core Specifications */}
          <div className="lumen-card p-6 rounded-3xl space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-display font-bold text-white">Commercial Metadata</h2>
                <p className="text-[11px] text-slate-400">Primary indexing and search parameters</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Asset Title / Model Designation <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apex Pro ANC Acoustic Array — Spatial Obsidian"
                  className={`w-full px-4 py-3 bg-slate-900/80 border rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all ${
                    errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Market Category <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                      SKU Identifier <span className="text-rose-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={generateSku}
                      className="text-[10px] font-mono font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Re-seed</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="LMN-XXX-0000"
                    className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                  {errors.sku && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.sku}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Technical Specifications & Overview <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail high-precision components, architectural tolerances, materials, and warranty guarantees..."
                  className={`w-full px-4 py-3 bg-slate-900/80 border rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all leading-relaxed ${
                    errors.description ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20'
                  }`}
                />
                {errors.description && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Valuation & Reserve Allocation */}
          <div className="lumen-card p-6 rounded-3xl space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-display font-bold text-white">Valuation & Liquidity</h2>
                <p className="text-[11px] text-slate-400">Escrow settlement figures and stock thresholds</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Target Price (₹) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-500 font-mono font-bold text-sm">₹</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="2999"
                    className={`w-full pl-8 pr-4 py-3 bg-slate-900/80 border rounded-xl text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none ${
                      errors.price ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                </div>
                {errors.price && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Baseline MSRP (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-500 font-mono font-bold text-sm">₹</span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="3999"
                    className="w-full pl-8 pr-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Unit Reserve <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => handleStockChange(e.target.value)}
                  placeholder="50"
                  className={`w-full px-4 py-3 bg-slate-900/80 border rounded-xl text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none ${
                    errors.stock ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.stock && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.stock}</p>}
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Inventory State Flag
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['In Stock', 'Low Stock', 'Out of Stock'] as const).map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setStockStatus(status)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                        stockStatus === status
                          ? status === 'In Stock'
                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-sm'
                            : status === 'Low Stock'
                            ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-sm'
                            : 'bg-rose-500/10 border-rose-500/50 text-rose-300 shadow-sm'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Media Asset Studio */}
          <div className="lumen-card p-6 rounded-3xl space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-display font-bold text-white">Media Asset & Imagery</h2>
                <p className="text-[11px] text-slate-400">High-fidelity photo rendering</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Direct CDN Asset Link <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Select curated studio showcase:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      type="button"
                      key={preset.name}
                      onClick={() => setImage(preset.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group ${
                        image === preset.url
                          ? 'border-cyan-400 ring-2 ring-cyan-400/30 scale-95 shadow-md shadow-cyan-500/20'
                          : 'border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 text-white text-[9px] font-medium py-1 px-1 text-center truncate">
                        {preset.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-28 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Marketplace Card Preview</span>
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulsing-dot" />
                Live Sync
              </span>
            </div>

            {/* Rendered Preview Card */}
            <div className="lumen-card rounded-3xl border border-slate-700/60 overflow-hidden shadow-2xl flex flex-col justify-between bg-slate-900/90">
              <div>
                <div className="w-full aspect-[4/3] bg-slate-950 relative overflow-hidden">
                  <img
                    src={image}
                    alt={name || 'Preview'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${
                        stockStatus === 'In Stock'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : stockStatus === 'Low Stock'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          stockStatus === 'In Stock'
                            ? 'bg-emerald-400'
                            : stockStatus === 'Low Stock'
                            ? 'bg-amber-400'
                            : 'bg-rose-400'
                        }`}
                      />
                      {stockStatus}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-mono font-bold text-[10px] px-2.5 py-0.5 rounded-md shadow-md">
                      {discount}% OFF
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 rounded-lg text-[10px] font-mono font-bold">
                      {sku}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      {category}
                    </span>
                    <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                      ★ 5.0 <span className="text-slate-500 text-[10px] font-normal">(New Entry)</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mt-1 line-clamp-1">
                    {name || 'Untiled Asset Preview'}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {description || 'Input technical description on the left pane to render the high-density marketplace copy here.'}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-display font-black text-white">
                        ₹{numPrice ? numPrice.toLocaleString('en-IN') : '0'}
                      </span>
                      {numOriginalPrice > numPrice && (
                        <span className="text-xs text-slate-500 line-through ml-2 font-mono">
                          ₹{numOriginalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                      {stock || 0} in reserve
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Issuer: <strong className="text-slate-200">{user?.company || 'ShopSense Merchant Network'}</strong></span>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Escrow Safe
                </span>
              </div>
            </div>

            {/* Fast Action Submit */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-display font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Confirm & Publish Asset</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
