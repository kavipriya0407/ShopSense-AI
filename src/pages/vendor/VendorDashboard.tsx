import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronRight,
  Edit2,
  Cpu,
  Activity,
  Zap,
  BarChart3,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';
import { Product } from '../../mock-data/shopSenseData';
import { ProductEditModal } from '../../components/common/ProductEditModal';

export const VendorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, products, updateProduct } = useShopSense();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');

  const featuredProducts = products.slice(0, 8);

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (updated: Product) => {
    updateProduct(updated.id, updated);
  };

  const getStockBadge = (status: string, stock: number) => {
    switch (status) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulsing-dot" />
            {stock} units • Optimal
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {stock} units • Low
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            0 units • Depleted
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome & Command Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-mono font-bold uppercase tracking-wider">
              OPERATING NODE #IND-042
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
              ESCROW SYNCHRONIZED
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight mt-2">
            Welcome, {user.name || 'Merchant Operator'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Live telemetry overview across catalog health, settlements, inventory thresholds, and AI recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-auto">
          <Link
            to="/insights"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
          >
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>Telemetry</span>
          </Link>

          <button
            onClick={() => navigate('/add-product')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-950/30 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Asset</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Settled Revenue */}
        <div className="lumen-card p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Settled Volume
            </span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">
              ₹7,95,168.00
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs font-mono">
              <span className="inline-flex items-center font-bold text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +8.2%
              </span>
              <span className="text-slate-400">vs previous cycle</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Dispatched Orders */}
        <div className="lumen-card p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Completed Orders
            </span>
            <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">
              432
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs font-mono">
              <span className="inline-flex items-center font-bold text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +12.5%
              </span>
              <span className="text-slate-400">Fulfillment SLA 99.4%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Total Transactions */}
        <div className="lumen-card p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Direct Transactions
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">
              216
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs font-mono">
              <span className="inline-flex items-center font-bold text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +15.7%
              </span>
              <span className="text-slate-400">Zero Disputes</span>
            </div>
          </div>
        </div>

        {/* Card 4: Catalog Registry Assets */}
        <div className="lumen-card p-6 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Active Asset Matrix
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">
              {products.length}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs font-mono">
              <span className="inline-flex items-center font-bold text-indigo-600">
                100% Synced
              </span>
              <span className="text-slate-400">across 6 categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Products Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
          <div>
            <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">
              Live Asset Registry
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Top performing and highlighted assets in your merchant store. Click any card to edit in real time.
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 self-start sm:self-auto"
          >
            <span>Open Inventory Nexus ({products.length} Assets)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="lumen-card p-4 overflow-hidden flex flex-col justify-between group bg-white hover:border-indigo-400 transition-all duration-300"
            >
              <div>
                {/* Product Image Container */}
                <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl relative overflow-hidden p-3 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    {getStockBadge(product.stockStatus, product.stock)}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="px-2 py-0.5 bg-[#090D16]/80 backdrop-blur-md text-white rounded-lg text-[10px] font-mono font-bold">
                      {product.sku}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="pt-3 space-y-1">
                  <span className="text-[10px] font-bold font-mono text-indigo-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Stock info + Quick Edit button */}
              <div className="pt-3 border-t border-slate-100 mt-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-display font-black text-slate-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-1.5 font-medium">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-600 font-mono bg-slate-100 px-2.5 py-1 rounded-lg">
                    ⭐ {product.rating}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenEdit(product)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-900 border border-slate-200 hover:border-indigo-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Edit Asset & Preview</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Intelligence Banner */}
      <div className="bg-[#090D16] text-white p-6 sm:p-8 rounded-3xl border border-[#1E293B] shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-950/60 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-display font-black text-white flex items-center gap-2">
              <span>Grounded Neural Catalog Copilot</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono font-bold">
                RAG ENGINE ACTIVE
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Query real-time stock deficits, profit margins, velocity ratings, and cross-category performance grounded strictly on your store data.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/ai-assistant')}
          className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 text-white rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-lg flex items-center gap-2 z-10"
        >
          <span>Launch AI Copilot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Edit Modal */}
      <ProductEditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

