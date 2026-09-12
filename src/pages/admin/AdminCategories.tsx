import React, { useState } from 'react';
import { GLOBAL_CATEGORIES, GlobalCategory } from '@/mock-data/adminData';
import { Layers, Plus, Edit, Check, X } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<GlobalCategory[]>(GLOBAL_CATEGORIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatCommission, setNewCatCommission] = useState('10');

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const newCat: GlobalCategory = {
      id: Date.now(),
      name: newCatName,
      totalProducts: 0,
      activeVendors: 0,
      totalSales: '$0.00',
      commissionPct: `${newCatCommission}.0%`,
      status: 'Active',
    };
    setCategories([...categories, newCat]);
    setNewCatName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Global Product Categories & Commission Tiers</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Manage marketplace product taxonomy, category catalogs, and tier commission rates.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold shadow-neon-indigo flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="overflow-x-auto rounded-xl border border-slate-700/60 bg-slate-900/40">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-700/60">
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3 text-center">Products Count</th>
                <th className="px-4 py-3 text-center">Active Vendors</th>
                <th className="px-4 py-3 text-right">Total Category Sales</th>
                <th className="px-4 py-3 text-right">Commission Rate</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-extrabold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-cyan-400">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <span>{c.name}</span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono font-semibold text-slate-300">{c.totalProducts}</td>
                  <td className="px-4 py-3 text-center font-mono font-semibold text-slate-300">{c.activeVendors}</td>
                  <td className="px-4 py-3 text-right font-extrabold text-white font-mono">{c.totalSales}</td>
                  <td className="px-4 py-3 text-right font-bold text-cyan-400 font-mono">{c.commissionPct}</td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900/95 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-800 text-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">
                Add Marketplace Category
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category Name</label>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Health & Beauty"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Default Commission (%)</label>
              <input
                type="number"
                value={newCatCommission}
                onChange={(e) => setNewCatCommission(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAddCategory}
                className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 text-white rounded-xl font-bold text-xs shadow-neon-indigo"
              >
                Add Category
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold text-xs hover:bg-slate-700 border border-slate-700/80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

