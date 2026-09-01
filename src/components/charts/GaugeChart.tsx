import React from 'react';
import { HelpCircle } from 'lucide-react';

interface GaugeChartProps {
  percentile: number;
  title?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  percentile = 78,
  title = 'Percentile Ranking',
}) => {
  const topRemaining = 100 - percentile;

  // Calculate SVG arc stroke offset
  const radius = 65;
  const circumference = Math.PI * radius; // Semi-circle circumference
  const strokeDashoffset = circumference - (percentile / 100) * circumference;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">{title}</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative w-44 h-24 overflow-hidden flex items-end justify-center">
          <svg className="w-44 h-44 -rotate-180" viewBox="0 0 160 160">
            {/* Background semi-circle track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Active gauge progress */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Centered percentile value */}
          <div className="absolute bottom-1 flex flex-col items-center">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {percentile}<sup>th</sup>
            </span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Percentile
            </span>
          </div>
        </div>
      </div>

      <div className="text-center space-y-1 mt-2 text-xs">
        <p className="text-slate-600 font-medium leading-snug">
          You are performing better than <strong className="text-slate-900">{percentile}%</strong> of vendors in the marketplace.
        </p>
        <p className="text-blue-600 font-semibold text-[11px]">
          Top {topRemaining}% remaining to reach the top!
        </p>
      </div>
    </div>
  );
};
