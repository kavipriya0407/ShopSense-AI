import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Sparkles,
  Package,
  DollarSign,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Eye,
  Tag,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Product, CATEGORIES } from '../../mock-data/shopSenseData';

interface ProductEditModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const PRESET_IMAGES = [
  { name: 'Smartphone', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80' },
  { name: 'Earbuds', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80' },
  { name: 'Skincare', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80' },
  { name: 'Brushes', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80' },
  { name: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' },
  { name: 'Keyboard', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80' },
];

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !product) return null;

  const [formData, setFormData] = useState<Product>({ ...product });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
      setErrors({});
    }
  }, [product]);

  const handleStockChange = (val: number) => {
    const newStock = Math.max(0, val);
    let newStatus: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    if (newStock === 0) newStatus = 'Out of Stock';
    else if (newStock <= 10) newStatus = 'Low Stock';

    setFormData((prev) => ({
      ...prev,
      stock: newStock,
      stockStatus: newStatus,
    }));
  };

  const calculateDiscount = () => {
    if (formData.originalPrice && formData.originalPrice > formData.price) {
      const discount = Math.round(
        ((formData.originalPrice - formData.price) / formData.originalPrice) * 100
      );
      return `${discount}% OFF`;
    }
    return null;
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors({ name: 'Product title cannot be empty' });
      return;
    }
    if (formData.price <= 0) {
      setErrors({ price: 'Target price must be greater than 0' });
      return;
    }

    onSave(formData);
    onClose();
  };

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            In Stock
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Low Stock
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Out of Stock
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="h-16 px-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-cyan-300 font-bold">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <span>Synchronize Asset Specifications</span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                  {formData.sku}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 -mt-0.5">
                Real-time registry mutation with dynamic consumer storefront mirror
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSaveSubmit} className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/60">
          {/* Left Form: 7 Columns */}
          <div className="lg:col-span-7 space-y-4">
            <div className="lumen-card p-5 rounded-2xl space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Asset Identity & Classification</span>
              </h4>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
                />
                {errors.name && <p className="text-xs text-rose-400 mt-1 font-semibold">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Market Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Categories').map((c) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-sm font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Product Overview & Specs
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>
            </div>

            {/* Pricing & Stock Inventory */}
            <div className="lumen-card p-5 rounded-2xl space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                <span>Valuation & Unit Allocations</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Settlement Price (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 font-mono font-bold text-sm">₹</span>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-3 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-sm font-mono font-bold text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
                    MSRP Base (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 font-mono font-bold text-sm">₹</span>
                    <input
                      type="number"
                      value={formData.originalPrice || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                      }
                      className="w-full pl-7 pr-3 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                    Stock Reserve ({formData.stock} units)
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleStockChange(formData.stock + 10)}
                      className="px-2 py-0.5 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-indigo-500/30"
                    >
                      +10
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStockChange(formData.stock + 50)}
                      className="px-2 py-0.5 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-indigo-500/30"
                    >
                      +50
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStockChange(0)}
                      className="px-2 py-0.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold border border-rose-500/30"
                    >
                      Zero
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={formData.stock}
                    onChange={(e) => handleStockChange(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleStockChange(parseInt(e.target.value, 10) || 0)}
                    className="w-20 px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono font-bold text-center text-cyan-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Stock Status Flag
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['In Stock', 'Low Stock', 'Out of Stock'] as const).map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setFormData({ ...formData, stockStatus: status })}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        formData.stockStatus === status
                          ? status === 'In Stock'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/50'
                            : status === 'Low Stock'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/50'
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/50'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="lumen-card p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Media Asset URL</span>
              </h4>

              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              />

              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    type="button"
                    key={preset.name}
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      formData.image === preset.url
                        ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-95'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Live Preview: 5 Columns */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-0 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Mirror Live Card</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulsing-dot" />
                  Sync Active
                </span>
              </div>

              {/* Rendered Live Card */}
              <div className="lumen-card rounded-3xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col justify-between bg-slate-900/95">
                <div>
                  <div className="w-full aspect-[4/3] bg-slate-950 relative overflow-hidden">
                    <img
                      src={formData.image}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      {getStockBadge(formData.stockStatus)}
                    </div>
                    {calculateDiscount() && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-mono font-bold text-[10px] px-2.5 py-0.5 rounded-md shadow-md">
                        {calculateDiscount()}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-0.5 bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 rounded-md text-[10px] font-mono font-bold">
                        {formData.sku}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        {formData.category}
                      </span>
                      <span className="text-xs text-amber-400 font-bold">
                        ★ {formData.rating || 4.8}
                      </span>
                    </div>

                    <h3 className="text-base font-display font-bold text-white mt-1 line-clamp-1">
                      {formData.name || 'Asset Designation Placeholder'}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                      {formData.description || 'Provide technical overview on the left panel.'}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xl font-display font-black text-white">
                          ₹{formData.price.toLocaleString('en-IN')}
                        </span>
                        {formData.originalPrice && formData.originalPrice > formData.price && (
                          <span className="text-xs text-slate-500 line-through ml-2 font-mono">
                            ₹{formData.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg">
                        {formData.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-medium">
                  <span>Merchant: <strong className="text-slate-200">{formData.vendor}</strong></span>
                  <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => setFormData({ ...product })}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Edits</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm font-bold transition-all"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xl shadow-indigo-500/25 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Synchronize Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
