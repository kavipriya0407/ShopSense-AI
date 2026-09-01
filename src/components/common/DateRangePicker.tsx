import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface DateRangePickerProps {
  value?: string;
  onChange?: (newRange: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value = '01 Aug 2026 - 29 Aug 2026',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(value);

  const presets = [
    '01 Aug 2026 - 29 Aug 2026',
    'Last 7 Days',
    'Last 30 Days',
    'This Month',
    'Previous Month',
    'Year to Date',
  ];

  const handleSelect = (preset: string) => {
    setSelectedRange(preset);
    if (onChange) onChange(preset);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <Calendar className="w-4 h-4 text-slate-500" />
        <span>{selectedRange}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 p-1.5 border border-slate-100 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Select Period
          </div>
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => handleSelect(preset)}
              className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors ${
                selectedRange === preset
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
