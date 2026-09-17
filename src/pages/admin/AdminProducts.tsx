import React, { useState } from 'react';
import {
  Package,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Edit2,
  DollarSign,
  Zap,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';
import { CATEGORIES, Product } from '../../mock-data/shopSenseData';
import { ProductEditModal } from '../../components/common/ProductEditModal';

export const AdminProducts: React.FC = () => {
  const { products, deleteProduct, updateProduct } = useShopSense();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (updated: Product) => {
    updateProduct(updated.id, updated);
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.vendor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Global Asset Registry
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-cyan-300 border border-indigo-500/30">
            Master SKU Database
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Master ledger indexing all merchant assets, real-time prices, and stock allocations across the ShopSense network.
        </p>
      </div>

      <div className="lumen-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search asset title, SKU or merchant..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-600 font-medium focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-slate-900 text-white">
                {c}
              </option>
            ))}
          </select>
          <span className="text-xs font-mono font-bold text-slate-400">{filtered.length} SKUs</span>
        </div>
      </div>

      <div className="lumen-card rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Asset Record</th>
                <th className="py-3.5 px-4">Merchant Node</th>
                <th className="py-3.5 px-4">Domain</th>
                <th className="py-3.5 px-4">SKU Identifier</th>
                <th className="py-3.5 px-4 text-right">Unit Price</th>
                <th className="py-3.5 px-4 text-center">Reserve</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-800 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate max-w-xs">{prod.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">★ {prod.rating} rating</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-200">{prod.vendor}</td>
                  <td className="py-3 px-4 text-slate-400 font-medium">{prod.category}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300 font-bold">{prod.sku}</td>
                  <td className="py-3 px-4 text-right font-display font-black text-white">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-300">{prod.stock}</td>
                  <td className="py-3 px-4 text-center">
                    {getStockBadge(prod.stockStatus)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-1.5 text-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10 rounded-lg transition-colors"
                        title="Mutate Asset Metadata"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="De-list SKU"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <ProductEditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};
