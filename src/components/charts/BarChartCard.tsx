import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface BarSeries {
  key: string;
  name: string;
  color: string;
}

interface BarChartCardProps {
  title: string;
  data: any[];
  bars: BarSeries[];
  xAxisKey?: string;
  height?: number;
  summaryText?: string;
  layout?: 'vertical' | 'horizontal';
  periodToggle?: {
    activePeriod: 'Daily' | 'Weekly' | 'Monthly';
    onChange: (period: 'Daily' | 'Weekly' | 'Monthly') => void;
  };
}

export const BarChartCard: React.FC<BarChartCardProps> = ({
  title,
  data,
  bars,
  xAxisKey = 'period',
  height = 200,
  summaryText,
  periodToggle,
}) => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-display font-bold text-white tracking-tight">{title}</h3>
        {periodToggle && (
          <div className="inline-flex rounded-xl p-0.5 bg-slate-900 border border-slate-800 text-xs font-semibold">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => periodToggle.onChange(period)}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  periodToggle.activePeriod === period
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bar Legend if multiple bars */}
      {bars.length > 1 && (
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
          {bars.map((bar) => (
            <div key={bar.key} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bar.color }} />
              <span>{bar.name}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              }}
            />
            {bars.map((b) => (
              <Bar key={b.key} dataKey={b.key} name={b.name} fill={b.color} radius={[6, 6, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {summaryText && (
        <div className="mt-3 pt-2.5 border-t border-slate-800 text-center text-xs font-bold text-emerald-400 bg-emerald-950/40 py-1.5 rounded-xl border border-emerald-800/40 font-mono">
          {summaryText}
        </div>
      )}
    </div>
  );
};

