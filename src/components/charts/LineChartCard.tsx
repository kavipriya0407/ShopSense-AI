import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface LineSeries {
  key: string;
  name: string;
  color: string;
}

interface LineChartCardProps {
  title: string;
  data: any[];
  lines: LineSeries[];
  periodToggle?: {
    activePeriod: 'Daily' | 'Weekly' | 'Monthly';
    onChange: (period: 'Daily' | 'Weekly' | 'Monthly') => void;
  };
  xAxisKey?: string;
  height?: number;
  formatYAxis?: (val: number) => string;
}

export const LineChartCard: React.FC<LineChartCardProps> = ({
  title,
  data,
  lines,
  periodToggle,
  xAxisKey = 'date',
  height = 240,
  formatYAxis,
}) => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-bold text-white tracking-tight">{title}</h3>
        {periodToggle && (
          <div className="inline-flex rounded-xl p-0.5 bg-slate-900 border border-slate-800 text-xs font-semibold">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => periodToggle.onChange(period)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
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

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              tickFormatter={formatYAxis}
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
            {lines.map((l) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                name={l.name}
                stroke={l.color}
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: l.color, strokeWidth: 1.5, stroke: '#0F172A' }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

