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
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">{title}</h3>
        {periodToggle && (
          <div className="inline-flex rounded-lg p-0.5 bg-slate-100 text-xs font-medium border border-slate-200">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => periodToggle.onChange(period)}
                className={`px-2.5 py-1 rounded-md transition-all ${
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

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              tickFormatter={formatYAxis}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderRadius: '8px',
                border: 'none',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
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
                dot={{ r: 3, fill: l.color, strokeWidth: 1.5, stroke: '#fff' }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
