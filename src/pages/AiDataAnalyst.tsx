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
  Code,
  Zap,
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
      <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-600/30">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <h2 className="text-base font-display font-bold text-white tracking-tight">
              Natural Language to SQL Data Analyst (PostgreSQL + RAG)
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
            <Database className="w-3.5 h-3.5" />
            <span>PostgreSQL Schema Indexed</span>
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
            placeholder="Ask RAG analyst: 'Which audio products drove highest margin last month?'..."
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
          <button
            type="submit"
            disabled={!queryInput.trim() || isAnalyzing}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition-all shrink-0 active:scale-95"
          >
            <span>Analyze</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Suggested Question Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 font-mono">
            Suggestions:
          </span>
          {ANALYST_SUGGESTIONS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleQuerySubmit(chip)}
              className="px-3 py-1 bg-slate-900 hover:bg-purple-950/60 hover:text-purple-300 hover:border-purple-500/40 text-slate-300 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors border border-slate-800"
            >
              💡 {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Results & Right Sidebar */}
      {isAnalyzing ? (
        <div className="glass-card rounded-2xl p-16 text-center border border-slate-800/80 shadow-2xl space-y-4">
          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto animate-spin" />
          <h3 className="text-base font-display font-bold text-white">
            Compiling SQL AST & Vector RAG Pipeline...
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Aggregating PostgreSQL order transactions and computing cross-category elasticity...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6 shadow-xl border border-slate-800/80 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wide border border-purple-500/30">
                    Active Query Execution
                  </span>
                  <h3 className="text-base font-display font-extrabold text-white mt-1.5">
                    "{activeQueryTitle}"
                  </h3>
                </div>

                <button
                  onClick={handleDownloadReport}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Download CSV</span>
                </button>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-medium">
                <p>{analysisResult.summary}</p>
              </div>

              {/* Generated SQL Snippet Preview */}
              <div className="p-3.5 rounded-xl bg-[#080D18] border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono">
                  <span className="flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Auto-Generated PostgreSQL SQL Query</span>
                  </span>
                  <span className="text-emerald-400 font-bold">Execution Time: 4.2ms</span>
                </div>
                <pre className="text-indigo-300 font-mono text-[11px] overflow-x-auto p-2 bg-slate-950/60 rounded-lg border border-slate-800/60">
                  {`SELECT category, SUM(total_amount) AS revenue, COUNT(*) AS orders \nFROM orders JOIN products ON orders.product_id = products.id \nGROUP BY category ORDER BY revenue DESC;`}
                </pre>
              </div>

              {/* 5 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {analysisResult.statCards.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block truncate font-mono">
                      {stat.label}
                    </span>
                    <span className="text-base font-display font-extrabold text-white block mt-1 font-mono">
                      {stat.value}
                    </span>
                    <div className="flex items-center gap-1 mt-1 text-[11px] font-bold">
                      {stat.trend === 'up' ? (
                        <span className="text-emerald-400 inline-flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" /> {stat.change}
                        </span>
                      ) : (
                        <span className="text-rose-400 inline-flex items-center gap-0.5">
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
                lines={[{ key: 'revenue', name: 'Revenue', color: '#8B5CF6' }]}
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
              <div className="glass-card rounded-2xl p-5 border border-slate-800/80 shadow-lg">
                <h3 className="text-sm font-display font-bold text-white tracking-tight mb-3">
                  Top Contributing Factors
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800">
                        <th className="pb-2">Factor</th>
                        <th className="pb-2">Impact</th>
                        <th className="pb-2 text-right">Change %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {analysisResult.contributingFactors.map((f) => (
                        <tr key={f.id} className="hover:bg-slate-800/40">
                          <td className="py-2.5 font-semibold text-slate-200">{f.factor}</td>
                          <td className="py-2.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                                f.impact === 'High'
                                  ? 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                                  : f.impact === 'Medium'
                                  ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                                  : 'bg-indigo-950/60 text-indigo-400 border border-indigo-800/60'
                              }`}
                            >
                              {f.impact}
                            </span>
                          </td>
                          <td
                            className={`py-2.5 text-right font-mono font-bold ${
                              f.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
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

              <div className="glass-card rounded-2xl p-5 border border-slate-800/80 shadow-lg">
                <h3 className="text-sm font-display font-bold text-white tracking-tight mb-3">
                  Top Products with Sales Drop
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800">
                        <th className="pb-2">Product</th>
                        <th className="pb-2 text-right">Sales Last Wk</th>
                        <th className="pb-2 text-right">Change %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {analysisResult.salesDropProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40">
                          <td className="py-2.5 font-medium text-slate-200">{p.product}</td>
                          <td className="py-2.5 text-right font-mono font-semibold text-white">
                            {p.salesLastWeek}
                          </td>
                          <td className="py-2.5 text-right font-mono font-bold text-rose-400">
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
            <div className="glass-card rounded-2xl p-4 border border-slate-800/80 flex items-center justify-between shadow-lg">
              <span className="text-xs font-bold text-slate-300">Data Scope:</span>
              <DateRangePicker />
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-2 shadow-lg">
              <div className="flex items-center gap-1.5 font-display font-bold text-white text-xs">
                <Info className="w-4 h-4 text-purple-400" />
                <span>RAG Pipeline Explanation</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {analysisResult.explanation}
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-3 shadow-lg">
              <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">
                Key Insights
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {analysisResult.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">
                  Query History
                </h4>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="space-y-2 text-xs">
                {QUERY_HISTORY.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => handleQuerySubmit(q.question)}
                    className="p-2 rounded-xl hover:bg-slate-800/60 cursor-pointer transition-colors border border-transparent hover:border-slate-800"
                  >
                    <p className="font-semibold text-slate-300 hover:text-purple-300 truncate">
                      {q.question}
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">{q.timestamp}</span>
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

