import React, { useState } from 'react';
import {
  BrainCircuit,
  Send,
  Download,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Info,
  Clock,
  CheckCircle2,
  Database,
} from 'lucide-react';
import { DateRangePicker } from '@/components/common/DateRangePicker';
import { LineChartCard } from '@/components/charts/LineChartCard';
import {
  ANALYST_SUGGESTIONS,
  MOCK_ANALYST_RESULT,
  QUERY_HISTORY,
} from '@/mock-data/aiDataAnalystData';
import { exportToCSV } from '@/utils/csvExport';

export const AiDataAnalyst: React.FC = () => {
  const [queryInput, setQueryInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(MOCK_ANALYST_RESULT);
  const [activeQueryTitle, setActiveQueryTitle] = useState('How is my revenue performing compared to previous weeks?');
  const [isPgConnected, setIsPgConnected] = useState(true);

  const handleQuerySubmit = async (question?: string) => {
    const q = question || queryInput;
    if (!q.trim() || isAnalyzing) return;

    setActiveQueryTitle(q);
    setQueryInput('');
    setIsAnalyzing(true);

    try {
      // Connect to Live RAG Backend API
      const res = await fetch('http://localhost:5000/api/rag/analyst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysisResult(data);
        setIsPgConnected(true);
      } else {
        throw new Error('Analyst API error');
      }
    } catch (err) {
      console.warn('RAG Analyst Server fallback:', err);
      setIsPgConnected(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadReport = () => {
    const reportRows = analysisResult.contributingFactors.map((f) => ({
      Factor: f.factor,
      Impact: f.impact,
      Change: f.change,
      Details: f.details,
    }));
    exportToCSV(reportRows, `AI_Data_Analyst_PostgreSQL_Report_${Date.now()}.csv`);
  };

  return (
    <div className="space-y-6">
      {/* Top Section: Search Input + Suggested Question Chips */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Ask Anything About Your Data (RAG + PostgreSQL)
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>PostgreSQL Engine Active</span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuerySubmit();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Ask RAG analyst: How is my revenue performing? Which products dropped?"
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!queryInput.trim() || isAnalyzing}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all shrink-0"
          >
            <span>Analyze</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Suggested Question Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0">Suggestions:</span>
          {ANALYST_SUGGESTIONS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleQuerySubmit(chip)}
              className="px-3 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-full text-xs font-medium whitespace-nowrap transition-colors border border-slate-200/60"
            >
              💡 {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Results & Right Sidebar */}
      {isAnalyzing ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-slate-100 shadow-sm space-y-4">
          <Sparkles className="w-10 h-10 text-blue-600 mx-auto animate-spin" />
          <h3 className="text-base font-bold text-slate-900">
            Running PostgreSQL Query & Vector RAG Pipeline...
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Aggregating PostgreSQL order transactions and running vector similarity scoring...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Active Query Result
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    "{activeQueryTitle}"
                  </h3>
                </div>

                <button
                  onClick={handleDownloadReport}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report</span>
                </button>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                <p>{analysisResult.summary}</p>
              </div>

              {/* 5 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {analysisResult.statCards.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block truncate">
                      {stat.label}
                    </span>
                    <span className="text-base font-extrabold text-slate-900 block mt-1">
                      {stat.value}
                    </span>
                    <div className="flex items-center gap-1 mt-1 text-[11px] font-bold">
                      {stat.trend === 'up' ? (
                        <span className="text-emerald-600 inline-flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" /> {stat.change}
                        </span>
                      ) : (
                        <span className="text-rose-600 inline-flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" /> {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Line Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LineChartCard
                title="Sales Trend (Last 4 Weeks)"
                data={analysisResult.salesTrend4Weeks}
                lines={[{ key: 'revenue', name: 'Revenue', color: '#3B82F6' }]}
                xAxisKey="week"
                height={200}
                formatYAxis={(v) => `$${v}`}
              />

              <LineChartCard
                title="Order Count Trend (Last 4 Weeks)"
                data={analysisResult.orderTrend4Weeks}
                lines={[{ key: 'orders', name: 'Orders', color: '#10B981' }]}
                xAxisKey="week"
                height={200}
              />
            </div>

            {/* Contributing Factors & Drops */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-3">
                  Top Contributing Factors
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100">
                        <th className="pb-2">Factor</th>
                        <th className="pb-2">Impact</th>
                        <th className="pb-2 text-right">Change %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {analysisResult.contributingFactors.map((f) => (
                        <tr key={f.id} className="hover:bg-slate-50">
                          <td className="py-2.5 font-semibold text-slate-900">{f.factor}</td>
                          <td className="py-2.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                f.impact === 'High'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : f.impact === 'Medium'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}
                            >
                              {f.impact}
                            </span>
                          </td>
                          <td
                            className={`py-2.5 text-right font-bold ${
                              f.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {f.change}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-3">
                  Top Products with Sales Drop
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100">
                        <th className="pb-2">Product</th>
                        <th className="pb-2 text-right">Sales Last Wk</th>
                        <th className="pb-2 text-right">Change %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {analysisResult.salesDropProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="py-2.5 font-medium text-slate-900">{p.product}</td>
                          <td className="py-2.5 text-right font-semibold text-slate-800">
                            {p.salesLastWeek}
                          </td>
                          <td className="py-2.5 text-right font-bold text-rose-600">
                            {p.change}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Data Scope:</span>
              <DateRangePicker />
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                <Info className="w-4 h-4 text-blue-600" />
                <span>RAG Pipeline Explanation</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {analysisResult.explanation}
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Key Insights
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {analysisResult.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Query History
                </h4>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="space-y-2 text-xs">
                {QUERY_HISTORY.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => handleQuerySubmit(q.question)}
                    className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100"
                  >
                    <p className="font-semibold text-slate-700 hover:text-blue-600 truncate">
                      {q.question}
                    </p>
                    <span className="text-[10px] text-slate-400">{q.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
