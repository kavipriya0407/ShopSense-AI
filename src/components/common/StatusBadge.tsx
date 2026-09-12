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
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60 shadow-xs';
      case 'processing':
        return 'bg-blue-950/60 text-blue-400 border-blue-800/60 shadow-xs';
      case 'pending':
        return 'bg-amber-950/60 text-amber-400 border-amber-800/60 shadow-xs';
      case 'cancelled':
        return 'bg-rose-950/60 text-rose-400 border-rose-800/60 shadow-xs';
      case 'refunded':
        return 'bg-purple-950/60 text-purple-400 border-purple-800/60 shadow-xs';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border font-mono ${getBadgeStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
};

