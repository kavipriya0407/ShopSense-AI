import React, { useState } from 'react';
import { GLOBAL_CATEGORIES, GlobalCategory } from '@/mock-data/adminData';
import { Layers, Plus, Edit, Check } from 'lucide-react';
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
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Global Product Categories & Commission Tiers
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage marketplace product taxonomy, active category catalogs, and default commission rates.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100">
                <th className="pb-3">Category Name</th>
                <th className="pb-3 text-center">Products Count</th>
                <th className="pb-3 text-center">Active Vendors</th>
                <th className="pb-3 text-right">Total Category Sales</th>
                <th className="pb-3 text-right">Commission Rate</th>
                <th className="pb-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="py-3 font-extrabold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3 text-center font-semibold text-slate-700">{c.totalProducts}</td>
                  <td className="py-3 text-center font-semibold text-slate-700">{c.activeVendors}</td>
                  <td className="py-3 text-right font-extrabold text-slate-900">{c.totalSales}</td>
                  <td className="py-3 text-right font-bold text-blue-600">{c.commissionPct}</td>
                  <td className="py-3 text-center">
                    <StatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Add Marketplace Category
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name</label>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Health & Beauty"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Default Commission (%)</label>
              <input
                type="number"
                value={newCatCommission}
                onChange={(e) => setNewCatCommission(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAddCategory}
                className="flex-1 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-xs"
              >
                Add Category
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold text-xs"
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
