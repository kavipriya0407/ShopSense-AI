import React from 'react';

interface StatusBadgeProps {
  status: 'Delivered' | 'Completed' | 'Processing' | 'Pending' | 'Cancelled' | 'Paid' | 'Refunded' | string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeStyle = (statusStr: string) => {
    switch (statusStr.toLowerCase()) {
      case 'delivered':
      case 'completed':
      case 'paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'refunded':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
};
