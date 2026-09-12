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
    <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between h-full shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-display font-bold text-white tracking-tight">{title}</h3>
          <HelpCircle className="w-3.5 h-3.5 text-slate-500 cursor-pointer hover:text-slate-300" />
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
              stroke="#1E293B"
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
              stroke="#6366F1"
              strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Centered percentile value */}
          <div className="absolute bottom-1 flex flex-col items-center">
            <span className="text-2xl font-display font-black text-white tracking-tight font-mono">
              {percentile}<sup>th</sup>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono">
              Percentile
            </span>
          </div>
        </div>
      </div>

      <div className="text-center space-y-1 mt-2 text-xs">
        <p className="text-slate-300 font-medium leading-snug">
          You are outperforming <strong className="text-indigo-400 font-mono font-bold">{percentile}%</strong> of vendors in your category.
        </p>
        <p className="text-emerald-400 font-bold text-[11px] font-mono">
          Top {topRemaining}% remaining to reach the top!
        </p>
      </div>
    </div>
  );
};

