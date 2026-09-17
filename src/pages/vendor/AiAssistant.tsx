import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Send,
  Trash2,
  Sparkles,
  Search,
  Package,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  Terminal,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';
import { Product } from '../../mock-data/shopSenseData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  matchedProducts?: Product[];
}

export const AiAssistant: React.FC = () => {
  const { products } = useShopSense();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'ai',
      text: "Greetings, Merchant Operator. I am your grounded **ShopSense Inventory Copilot**.\n\nI possess direct low-latency indexing across all active catalog assets, SKU telemetry, reserve volumes, and valuation models.\n\nQuery any dimension of your inventory or select a quick prompt below.",
      timestamp: '10:00 AM',
      matchedProducts: [products[0], products[1]],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const promptSuggestions = [
    'Inspect pricing on Apple 17 Pro Max',
    'Audit all low stock thresholds',
    'Catalog inventory for Audio systems',
    'Which SKUs are currently Out of Stock?',
    'What is the reserve level for Bluetooth earbuds?',
    'Show premium Beauty & Care items',
  ];

  // Pure Grounded Catalog Engine (No Hallucinations)
  const processQuery = (query: string): { responseText: string; matched: Product[] } => {
    const q = query.toLowerCase().trim();

    if (q.includes('low stock') || q.includes('depleting') || q.includes('running low') || q.includes('threshold')) {
      const lowStockItems = products.filter((p) => p.stockStatus === 'Low Stock' || p.stock <= 10);
      if (lowStockItems.length > 0) {
        return {
          responseText: `Telemetry detected **${lowStockItems.length} asset(s)** below the critical reserve buffer. Immediate supplier dispatch recommended:`,
          matched: lowStockItems,
        };
      }
      return {
        responseText: 'All inventory nodes currently maintain nominal buffer allocations. Zero low-stock alerts detected.',
        matched: [],
      };
    }

    if (q.includes('out of stock') || q.includes('unavailable') || q.includes('zero stock')) {
      const oosItems = products.filter((p) => p.stockStatus === 'Out of Stock' || p.stock === 0);
      if (oosItems.length > 0) {
        return {
          responseText: `Identified **${oosItems.length} catalog record(s)** with zero active reserves:`,
          matched: oosItems,
        };
      }
      return {
        responseText: 'All listed SKUs possess active, verifiable inventory on the ShopSense consumer network.',
        matched: [],
      };
    }

    const categories = ['Electronics', 'Audio', 'Beauty & Care', 'Fashion', 'Home & Living', 'Accessories'];
    const matchedCategory = categories.find((c) => q.includes(c.toLowerCase()));
    if (matchedCategory) {
      const catProducts = products.filter(
        (p) => p.category.toLowerCase() === matchedCategory.toLowerCase()
      );
      return {
        responseText: `Queried **${catProducts.length} verified asset(s)** indexed under category **${matchedCategory}**:`,
        matched: catProducts,
      };
    }

    const matchedProds = products.filter((p) => {
      const nameParts = p.name.toLowerCase().split(' ');
      const hasPartMatch = nameParts.some((part) => part.length > 2 && q.includes(part));
      const hasSkuMatch = q.includes(p.sku.toLowerCase());
      const hasDirectMatch = q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q);
      return hasDirectMatch || hasSkuMatch || hasPartMatch;
    });

    if (matchedProds.length > 0) {
      return {
        responseText: `Grounded match results retrieved from your live registry for "${query}":`,
        matched: matchedProds,
      };
    }

    return {
      responseText: `The query "${query}" did not match any active SKUs or descriptive metadata in your store registry.\n\nVerify spelling or initialize a new asset listing via the **+ Publish Asset** module.`,
      matched: [],
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const { responseText, matched } = processQuery(query);
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        matchedProducts: matched.length > 0 ? matched : undefined,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'ai',
        text: "Neural context cleared. What dimension of your inventory ledger shall we inspect next?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            In Stock
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Low Stock
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Out of Stock
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="lumen-card p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/25">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              ShopSense Autonomous Copilot
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deterministic RAG engine providing real-time inventory query synthesis, telemetry audits, and price modeling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold rounded-xl border border-slate-700/80 transition-all hover:text-rose-400"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Flush Context</span>
          </button>
        </div>
      </div>

      {/* Suggested Queries Chips */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Synthesized Query Shortcuts</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSend(suggestion)}
              className="px-3.5 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 hover:border-cyan-500/50 border border-slate-800 text-xs text-slate-300 hover:text-white font-medium transition-all flex items-center gap-2 group text-left"
            >
              <Zap className="w-3 h-3 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT THREAD CONTAINER */}
      <div className="lumen-card rounded-3xl overflow-hidden flex flex-col min-h-[520px] max-h-[700px] border border-slate-800 shadow-2xl">
        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-950/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-cyan-300 flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-4 h-4 text-cyan-300" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-tr-xs shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-xs shadow-sm'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-white/10">
                  <span
                    className={`font-mono font-bold text-[11px] ${
                      msg.sender === 'user' ? 'text-cyan-100' : 'text-cyan-400'
                    }`}
                  >
                    {msg.sender === 'user' ? 'Merchant Operator' : 'ShopSense Grounded Engine'}
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {/* Message Text */}
                <div className="whitespace-pre-wrap font-normal leading-relaxed">
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {line}
                    </p>
                  ))}
                </div>

                {/* PRODUCT RECOMMENDATION CARDS */}
                {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-3">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                      Ledger Verified Citations ({msg.matchedProducts.length}):
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {msg.matchedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-cyan-500/40 p-3.5 shadow-md transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="flex items-start gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase">
                                    {product.category}
                                  </span>
                                  {getStockBadge(product.stockStatus)}
                                </div>
                                <h4 className="font-bold text-xs text-white truncate mt-0.5">
                                  {product.name}
                                </h4>
                                <p className="text-xs font-display font-black text-cyan-300 mt-1">
                                  ₹{product.price.toLocaleString('en-IN')}
                                </p>
                              </div>
                            </div>

                            <p className="text-[11px] text-slate-400 line-clamp-2 mt-2 leading-tight">
                              {product.description}
                            </p>
                          </div>

                          {/* Source SKU citation */}
                          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                            <span className="text-cyan-400 font-bold">SKU #{product.sku}</span>
                            <span className="text-slate-300 font-bold">{product.stock} units</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-slate-400">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-cyan-300 flex items-center justify-center border border-indigo-500/30">
                <Bot className="w-4 h-4" />
              </div>
              <span className="flex items-center gap-1.5 font-mono font-bold text-cyan-400">
                Querying ledger indexes
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Query inventory reserves, price thresholds, category distributions..."
                className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-40 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>Query</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-1">
            <p className="text-[10px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Grounded in active merchant telemetry — 100% hallucination-free.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
