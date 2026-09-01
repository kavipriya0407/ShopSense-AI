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
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">{title}</h3>
        {periodToggle && (
          <div className="inline-flex rounded-lg p-0.5 bg-slate-100 text-xs font-medium border border-slate-200">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => periodToggle.onChange(period)}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  periodToggle.activePeriod === period
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-700'
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
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
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
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderRadius: '8px',
                border: 'none',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            {bars.map((b) => (
              <Bar key={b.key} dataKey={b.key} name={b.name} fill={b.color} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {summaryText && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 text-center text-xs font-semibold text-emerald-600 bg-emerald-50/60 py-1.5 rounded-lg">
          {summaryText}
        </div>
      )}
    </div>
  );
};
