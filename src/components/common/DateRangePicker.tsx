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
        className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      >
        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
        <span className="font-mono">{selectedRange}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl bg-[#0F172A] z-50 p-2 border border-slate-800 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Select Telemetry Period
          </div>
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => handleSelect(preset)}
              className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors font-medium ${
                selectedRange === preset
                  ? 'bg-indigo-600/30 text-indigo-300 font-bold border border-indigo-500/40'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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

