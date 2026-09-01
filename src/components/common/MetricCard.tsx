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
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-center gap-3.5 mb-3">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${metric.iconBg}`}>
          <IconComponent className="w-5.5 h-5.5" />
        </div>
        <div>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
            {metric.label}
          </span>
          <span className="text-2xl font-bold text-slate-900 tracking-tight block mt-0.5">
            {metric.value}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-50 text-xs font-medium">
        <span className={`inline-flex items-center font-semibold ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isUp ? '↑' : '↓'} {metric.trend}
        </span>
        <span className="text-slate-400 font-normal">
          {metric.periodText}
        </span>
      </div>
    </div>
  );
};
