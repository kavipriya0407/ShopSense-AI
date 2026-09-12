import React, { useState } from 'react';
import { Search, UserCheck, ShieldAlert, Edit, Check, X, Download, Store } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DataTable, Column } from '@/components/common/DataTable';
import { MOCK_VENDORS, VendorAccount } from '@/mock-data/adminData';
import { exportToCSV } from '@/utils/csvExport';

export const AdminVendors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vendorsList, setVendorsList] = useState<VendorAccount[]>(MOCK_VENDORS);
  const [editingVendor, setEditingVendor] = useState<VendorAccount | null>(null);
  const [newCommission, setNewCommission] = useState('');

  const filteredVendors = vendorsList.filter(
    (v) =>
      v.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (vendorId: string, newStatus: 'Active' | 'Suspended' | 'Pending') => {
    setVendorsList((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, status: newStatus } : v))
    );
  };

  const handleSaveCommission = () => {
    if (!editingVendor || !newCommission) return;
    setVendorsList((prev) =>
      prev.map((v) =>
        v.id === editingVendor.id ? { ...v, commissionRate: `${newCommission}%` } : v
      )
    );
    setEditingVendor(null);
  };

  const handleExportCSV = () => {
    const exportData = filteredVendors.map((v) => ({
      'Vendor ID': v.id,
      'Store Name': v.storeName,
      'Owner': v.ownerName,
      'Email': v.email,
      'Joined Date': v.joinedDate,
      'Total GMV': v.totalGMV,
      'Orders': v.ordersCount,
      'Commission Rate': v.commissionRate,
      'Status': v.status,
    }));
    exportToCSV(exportData, `MarketPlace_Vendors_${Date.now()}.csv`);
  };

  const columns: Column<VendorAccount>[] = [
    {
      header: 'Vendor ID',
      cell: (row) => <span className="font-mono font-bold text-cyan-400">{row.id}</span>,
    },
    {
      header: 'Store & Owner',
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-100">{row.storeName}</p>
          <p className="text-[11px] text-slate-400">{row.ownerName} ({row.email})</p>
        </div>
      ),
    },
    { header: 'Joined Date', accessorKey: 'joinedDate', className: 'text-slate-400 font-mono text-[11px]' },
    {
      header: 'Total GMV',
      cell: (row) => <span className="font-extrabold text-white font-mono">{row.totalGMV}</span>,
    },
    {
      header: 'Orders',
      accessorKey: 'ordersCount',
      className: 'text-center font-mono font-semibold',
    },
    {
      header: 'Commission %',
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-indigo-400 font-mono">{row.commissionRate}</span>
          <button
            onClick={() => {
              setEditingVendor(row);
              setNewCommission(row.commissionRate.replace('%', ''));
            }}
            className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Edit className="w-3 h-3" />
          </button>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.status === 'Pending' && (
            <button
              onClick={() => handleStatusChange(row.id, 'Active')}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_8px_rgba(16,185,129,0.3)]"
            >
              Approve
            </button>
          )}
          {row.status === 'Active' && (
            <button
              onClick={() => handleStatusChange(row.id, 'Suspended')}
              className="px-2.5 py-1 bg-rose-950/50 text-rose-300 hover:bg-rose-900/50 border border-rose-500/30 rounded-lg text-xs font-semibold transition-all"
            >
              Suspend
            </button>
          )}
          {row.status === 'Suspended' && (
            <button
              onClick={() => handleStatusChange(row.id, 'Active')}
              className="px-2.5 py-1 bg-cyan-950/50 text-cyan-300 hover:bg-cyan-900/50 border border-cyan-500/30 rounded-lg text-xs font-semibold transition-all"
            >
              Reactivate
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Search */}
      <div className="glass-card rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Store className="w-5 h-5 text-indigo-400" />
            <span>Vendor Account Management</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Approve seller applications, configure custom commission rates, and manage merchant access.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search vendor store or email..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold shadow-neon-indigo flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Vendors</span>
          </button>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="glass-card rounded-2xl p-6">
        <DataTable data={filteredVendors} columns={columns} pageSize={6} />
      </div>

      {/* Commission Modal */}
      {editingVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900/95 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-800 text-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                Update Commission Rate
              </h3>
              <button onClick={() => setEditingVendor(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-200">{editingVendor.storeName}</p>
              <p className="text-[11px] text-slate-400 font-mono">Vendor ID: {editingVendor.id}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Commission Rate (%)
              </label>
              <input
                type="number"
                value={newCommission}
                onChange={(e) => setNewCommission(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleSaveCommission}
                className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 text-white font-bold text-xs rounded-xl shadow-neon-indigo"
              >
                Save Rate
              </button>
              <button
                onClick={() => setEditingVendor(null)}
                className="flex-1 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-700 border border-slate-700/80"
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

