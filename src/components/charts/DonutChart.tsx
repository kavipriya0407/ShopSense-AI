import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export interface DonutSegment {
  name: string;
  value: number;
  formattedValue?: string;
  percentage?: string;
  color: string;
}

interface DonutChartProps {
  title: string;
  data: DonutSegment[];
  centerLabel?: string;
  centerSublabel?: string;
  height?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  title,
  data,
  centerLabel = '$24,560.80',
  centerSublabel = 'Total Revenue',
  height = 200,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-full">
      <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-2">{title}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 my-auto">
        <div className="relative" style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '8px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm font-bold text-slate-900 leading-tight">
              {centerLabel}
            </span>
            <span className="text-[10px] font-medium text-slate-400">
              {centerSublabel}
            </span>
          </div>
        </div>

        {/* Legend Column */}
        <div className="space-y-2 text-xs">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 font-medium truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {item.percentage && (
                  <span className="text-slate-400 font-normal">{item.percentage}</span>
                )}
                <span className="font-semibold text-slate-900">
                  {item.formattedValue || `$${item.value.toLocaleString()}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
