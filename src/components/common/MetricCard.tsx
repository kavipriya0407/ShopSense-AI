import React from 'react';
import * as Icons from 'lucide-react';
import { MetricItem } from '@/mock-data/dashboardData';

interface MetricCardProps {
  metric: MetricItem;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  // Dynamically get Lucide icon component
  const IconComponent = (Icons as any)[metric.iconName] || Icons.HelpCircle;
  const isUp = metric.trendType === 'up';

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-indigo-500/40 hover:shadow-neon-indigo/20 transition-all duration-300 flex flex-col justify-between group">
      <div className="flex items-center gap-3.5 mb-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-slate-700/60 shadow-lg ${
            isUp
              ? 'bg-gradient-to-tr from-indigo-900/60 to-indigo-600/30 text-indigo-400 border-indigo-500/30'
              : 'bg-gradient-to-tr from-rose-900/60 to-rose-600/30 text-rose-400 border-rose-500/30'
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono truncate">
            {metric.label}
          </span>
          <span className="text-xl sm:text-2xl font-display font-black text-white tracking-tight block mt-0.5">
            {metric.value}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-xs">
        <span
          className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-md ${
            isUp
              ? 'text-emerald-400 bg-emerald-950/50 border border-emerald-800/60'
              : 'text-rose-400 bg-rose-950/50 border border-rose-800/60'
          }`}
        >
          <span>{isUp ? '↗' : '↘'}</span>
          <span>{metric.trend}</span>
        </span>
        <span className="text-[11px] text-slate-400 font-medium">
          {metric.periodText}
        </span>
      </div>
    </div>
  );
};

