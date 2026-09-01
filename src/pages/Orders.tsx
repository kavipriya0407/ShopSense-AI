import React, { useState } from 'react';
import { Search, Download, X, Check, Clock, Package, CreditCard, User, MapPin } from 'lucide-react';
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
        <span className="font-bold text-slate-900">{row.id}</span>
      ),
    },
    {
      header: 'Order Date',
      cell: (row) => (
        <span className="text-slate-500 font-medium text-[11px]">{row.orderDate}</span>
      ),
    },
    {
      header: 'Customer',
      cell: (row) => (
        <div>
          <p className="font-semibold text-slate-900">{row.customerName}</p>
          <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      header: 'Products',
      cell: (row) => (
        <div className="flex items-center space-x-1">
          {row.products.slice(0, 2).map((p, idx) => (
            <div
              key={idx}
              className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 truncate p-0.5"
              title={p.name}
            >
              📦
            </div>
          ))}
          {row.products.length > 2 && (
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
              +{row.products.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Items',
      accessorKey: 'itemsCount',
      className: 'text-center',
    },
    {
      header: 'Order Amount',
      cell: (row) => (
        <span className="font-bold text-slate-900">{row.orderAmount}</span>
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
          className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 rounded-lg transition-colors"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Top Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID / Customer / Email"
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
          />
        </div>

        {/* Filters & Export CSV */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <DateRangePicker />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All Status">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 5 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ORDERS_SUMMARY_CARDS.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block truncate">
              {card.label}
            </span>
            <span className="text-lg font-extrabold text-slate-900 block mt-0.5">
              {card.value}
            </span>
            <span className={`text-[10px] font-semibold mt-1 inline-block ${card.trendType === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {card.trendType === 'up' ? '↑' : '↓'} {card.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Orders Main Table */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-4">
          Orders List
        </h3>
        <DataTable data={filteredOrders} columns={columns} pageSize={7} />
      </div>

      {/* Right Slide-in Order Details Panel */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto p-6 flex flex-col justify-between border-l border-slate-200">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {selectedOrder.id}
                    </h3>
                    <StatusBadge status={selectedOrder.orderStatus} />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedOrder.orderDate}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer Info & Order Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Customer Info */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-2">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Customer Information</span>
                  </div>
                  <p><strong className="text-slate-500 font-normal">Name:</strong> {selectedOrder.customerName}</p>
                  <p><strong className="text-slate-500 font-normal">Email:</strong> {selectedOrder.customerEmail}</p>
                  <p><strong className="text-slate-500 font-normal">Phone:</strong> {selectedOrder.customerPhone}</p>
                  <p><strong className="text-slate-500 font-normal">Address:</strong> {selectedOrder.customerAddress}</p>
                </div>

                {/* Order Summary */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-2">
                    <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    <span>Order Summary</span>
                  </div>
                  <div className="flex justify-between"><span>Items:</span><span>{selectedOrder.itemsCount}</span></div>
                  <div className="flex justify-between"><span>Subtotal:</span><span>{selectedOrder.subtotal}</span></div>
                  <div className="flex justify-between text-emerald-600"><span>Discount:</span><span>{selectedOrder.discount}</span></div>
                  <div className="flex justify-between"><span>Shipping:</span><span>{selectedOrder.shipping}</span></div>
                  <div className="flex justify-between"><span>Tax (8%):</span><span>{selectedOrder.tax}</span></div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900 text-sm">
                    <span>Total Revenue:</span>
                    <span className="text-blue-600">{selectedOrder.orderAmount}</span>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Products
                </h4>
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                      <tr>
                        <th className="px-3 py-2">Product</th>
                        <th className="px-3 py-2 text-center">Qty</th>
                        <th className="px-3 py-2 text-right">Unit Price</th>
                        <th className="px-3 py-2 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedOrder.products.map((prod, idx) => (
                        <tr key={idx}>
                          <td className="px-3 py-2 font-medium text-slate-800">{prod.name}</td>
                          <td className="px-3 py-2 text-center text-slate-600">{prod.quantity}</td>
                          <td className="px-3 py-2 text-right text-slate-600">{prod.unitPrice}</td>
                          <td className="px-3 py-2 text-right font-semibold text-slate-900">{prod.subtotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Info & Status Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Payment Info */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <h4 className="font-bold text-slate-800 mb-2">Payment Information</h4>
                  <p><span className="text-slate-500">Method:</span> <strong className="text-slate-800">{selectedOrder.paymentMethod}</strong></p>
                  <p><span className="text-slate-500">Transaction ID:</span> <strong className="text-slate-800 font-mono">{selectedOrder.transactionId}</strong></p>
                  <p><span className="text-slate-500">Status:</span> <StatusBadge status={selectedOrder.paymentStatus} /></p>
                  <p><span className="text-slate-500">Paid On:</span> <span className="text-slate-700">{selectedOrder.paidOn}</span></p>
                </div>

                {/* Vertical Order Status Timeline */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <h4 className="font-bold text-slate-800 mb-3">Order Status Timeline</h4>
                  <div className="space-y-3 relative pl-4 border-l-2 border-slate-200">
                    {selectedOrder.timeline.map((step, idx) => (
                      <div key={idx} className="relative">
                        <span
                          className={`absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] ${
                            step.completed
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-300 text-slate-500'
                          }`}
                        >
                          {step.completed ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '•'}
                        </span>
                        <p className={`font-semibold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.title}
                        </p>
                        <p className="text-[10px] text-slate-400">{step.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-6 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
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
