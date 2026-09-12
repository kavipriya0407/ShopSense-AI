import React, { useState } from 'react';
import { Search, Download, X, Check, Clock, Package, CreditCard, User, MapPin, Sparkles } from 'lucide-react';
import { DateRangePicker } from '@/components/common/DateRangePicker';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DataTable, Column } from '@/components/common/DataTable';
import { MOCK_ORDERS, ORDERS_SUMMARY_CARDS, OrderDetail } from '@/mock-data/ordersData';
import { exportToCSV } from '@/utils/csvExport';

export const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);

  // Filter orders based on search input and status dropdown
  const filteredOrders = MOCK_ORDERS.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All Status' ||
      ord.orderStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const exportData = filteredOrders.map((o) => ({
      'Order ID': o.id,
      Date: o.orderDate,
      Customer: o.customerName,
      Email: o.customerEmail,
      Items: o.itemsCount,
      Amount: o.orderAmount,
      'Payment Status': o.paymentStatus,
      'Order Status': o.orderStatus,
    }));
    exportToCSV(exportData, `ShopSense_Orders_${Date.now()}.csv`);
  };

  const columns: Column<OrderDetail>[] = [
    {
      header: 'Order ID',
      cell: (row) => (
        <span className="font-mono font-bold text-cyan-400">{row.id}</span>
      ),
    },
    {
      header: 'Order Date',
      cell: (row) => (
        <span className="text-slate-400 font-medium text-[11px]">{row.orderDate}</span>
      ),
    },
    {
      header: 'Customer',
      cell: (row) => (
        <div>
          <p className="font-semibold text-slate-100">{row.customerName}</p>
          <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      header: 'Products',
      cell: (row) => (
        <div className="flex items-center space-x-1.5">
          {row.products.slice(0, 2).map((p, idx) => (
            <div
              key={idx}
              className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-[11px] font-bold text-slate-300 truncate p-0.5"
              title={p.name}
            >
              📦
            </div>
          ))}
          {row.products.length > 2 && (
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded-md border border-slate-700/50">
              +{row.products.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Items',
      accessorKey: 'itemsCount',
      className: 'text-center font-mono',
    },
    {
      header: 'Order Amount',
      cell: (row) => (
        <span className="font-bold text-slate-100 font-mono">{row.orderAmount}</span>
      ),
    },
    {
      header: 'Payment Status',
      cell: (row) => <StatusBadge status={row.paymentStatus} />,
    },
    {
      header: 'Order Status',
      cell: (row) => <StatusBadge status={row.orderStatus} />,
    },
    {
      header: 'Action',
      cell: (row) => (
        <button
          onClick={() => setSelectedOrder(row)}
          className="px-2.5 py-1 text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/40 rounded-lg transition-all"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Top Filter Bar */}
      <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Order ID / Customer / Email"
            className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Filters & Export CSV */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <DateRangePicker />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900/60 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          >
            <option value="All Status">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold shadow-neon-indigo transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 6 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ORDERS_SUMMARY_CARDS.map((card, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-3.5 hover:border-slate-700 transition-all">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block truncate">
              {card.label}
            </span>
            <span className="text-lg font-black text-white block mt-0.5 font-outfit">
              {card.value}
            </span>
            <span className={`text-[10px] font-semibold mt-1 inline-block ${card.trendType === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {card.trendType === 'up' ? '↑' : '↓'} {card.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Orders Main Table */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-sm font-bold text-slate-100 tracking-tight mb-4 flex items-center justify-between">
          <span>Live Marketplace Orders Stream</span>
          <span className="text-xs font-normal text-slate-400">
            {filteredOrders.length} order{filteredOrders.length === 1 ? '' : 's'} matching
          </span>
        </h3>
        <DataTable data={filteredOrders} columns={columns} pageSize={7} />
      </div>

      {/* Right Slide-in Order Details Panel */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-slate-900/95 border-l border-slate-800/90 h-full shadow-2xl overflow-y-auto p-6 flex flex-col justify-between text-slate-200">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-white font-mono">
                      {selectedOrder.id}
                    </h3>
                    <StatusBadge status={selectedOrder.orderStatus} />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedOrder.orderDate}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer Info & Order Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Customer Info */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-2">
                    <User className="w-3.5 h-3.5" />
                    <span>Customer Information</span>
                  </div>
                  <p><strong className="text-slate-400 font-normal">Name:</strong> {selectedOrder.customerName}</p>
                  <p><strong className="text-slate-400 font-normal">Email:</strong> {selectedOrder.customerEmail}</p>
                  <p><strong className="text-slate-400 font-normal">Phone:</strong> {selectedOrder.customerPhone}</p>
                  <p><strong className="text-slate-400 font-normal">Address:</strong> {selectedOrder.customerAddress}</p>
                </div>

                {/* Order Summary */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold mb-2">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Order Summary</span>
                  </div>
                  <div className="flex justify-between"><span>Items:</span><span className="font-mono">{selectedOrder.itemsCount}</span></div>
                  <div className="flex justify-between"><span>Subtotal:</span><span className="font-mono">{selectedOrder.subtotal}</span></div>
                  <div className="flex justify-between text-emerald-400"><span>Discount:</span><span className="font-mono">{selectedOrder.discount}</span></div>
                  <div className="flex justify-between"><span>Shipping:</span><span className="font-mono">{selectedOrder.shipping}</span></div>
                  <div className="flex justify-between"><span>Tax (8%):</span><span className="font-mono">{selectedOrder.tax}</span></div>
                  <div className="flex justify-between pt-2 border-t border-slate-700/80 font-bold text-white text-sm">
                    <span>Total Revenue:</span>
                    <span className="text-cyan-400 font-mono">{selectedOrder.orderAmount}</span>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Products In Order
                </h4>
                <div className="border border-slate-700/60 rounded-xl overflow-hidden bg-slate-900/40">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 font-semibold border-b border-slate-700/60">
                      <tr>
                        <th className="px-3 py-2.5">Product</th>
                        <th className="px-3 py-2.5 text-center">Qty</th>
                        <th className="px-3 py-2.5 text-right">Unit Price</th>
                        <th className="px-3 py-2.5 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {selectedOrder.products.map((prod, idx) => (
                        <tr key={idx}>
                          <td className="px-3 py-2.5 font-medium text-slate-200">{prod.name}</td>
                          <td className="px-3 py-2.5 text-center text-slate-400 font-mono">{prod.quantity}</td>
                          <td className="px-3 py-2.5 text-right text-slate-400 font-mono">{prod.unitPrice}</td>
                          <td className="px-3 py-2.5 text-right font-semibold text-white font-mono">{prod.subtotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Info & Status Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Payment Info */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs space-y-2">
                  <h4 className="font-bold text-slate-200 mb-2">Payment Details</h4>
                  <p><span className="text-slate-400">Method:</span> <strong className="text-slate-100 ml-1">{selectedOrder.paymentMethod}</strong></p>
                  <p><span className="text-slate-400">Transaction ID:</span> <strong className="text-cyan-400 font-mono ml-1">{selectedOrder.transactionId}</strong></p>
                  <p className="flex items-center gap-1.5"><span className="text-slate-400">Status:</span> <StatusBadge status={selectedOrder.paymentStatus} /></p>
                  <p><span className="text-slate-400">Paid On:</span> <span className="text-slate-300 ml-1">{selectedOrder.paidOn}</span></p>
                </div>

                {/* Vertical Order Status Timeline */}
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs">
                  <h4 className="font-bold text-slate-200 mb-3">Order Status Timeline</h4>
                  <div className="space-y-3 relative pl-4 border-l-2 border-slate-700">
                    {selectedOrder.timeline.map((step, idx) => (
                      <div key={idx} className="relative">
                        <span
                          className={`absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] ${
                            step.completed
                              ? 'bg-emerald-500 text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                              : 'bg-slate-700 text-slate-500'
                          }`}
                        >
                          {step.completed ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '•'}
                        </span>
                        <p className={`font-semibold ${step.completed ? 'text-white' : 'text-slate-500'}`}>
                          {step.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">{step.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-6 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all border border-slate-700/80"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

