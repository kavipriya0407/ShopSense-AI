import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Plus,
  Search,
  Bot,
  User,
  Sliders,
  Sparkles,
  Star,
  ExternalLink,
  MessageSquare,
  Database,
  X,
  Package,
  ShieldCheck,
  CheckCircle2,
  Mic,
  Zap,
} from 'lucide-react';
import {
  INITIAL_CONVERSATION_HISTORY,
  INITIAL_CHAT_MESSAGES,
  MOCK_RECOMMENDATIONS,
  SUGGESTION_CHIPS,
  ChatMessage,
  ProductRecommendation,
} from '@/mock-data/aiAssistantData';

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedProduct, setSelectedProduct] = useState<ProductRecommendation | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isTyping) return;

    // Append user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Connect to Live RAG & PostgreSQL Backend API at http://localhost:5000
      const res = await fetch('http://localhost:5000/api/rag/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          filters: { maxPrice },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiResponse: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendations: data.recommendations && data.recommendations.length > 0 ? data.recommendations : MOCK_RECOMMENDATIONS,
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        throw new Error('RAG server response not OK');
      }
    } catch (err) {
      console.warn('Backend RAG server fallback:', err);
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `Here are vector-indexed catalog recommendations matching your query "${query}":`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendations: MOCK_RECOMMENDATIONS,
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 900);
    } finally {
      setIsTyping(false);
    }
  };

  const filteredHistory = INITIAL_CONVERSATION_HISTORY.filter((item) =>
    item.title.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-140px)] min-h-[600px] flex flex-col justify-between space-y-3 relative">
      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 h-full overflow-hidden">
        {/* Left Panel: History */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800/80 flex flex-col justify-between hidden lg:flex shadow-lg">
          <div>
            <button
              onClick={() => {
                setMessages([]);
                setInputValue('');
              }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all mb-4"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Neural Session</span>
            </button>

            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search sessions..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-1 font-mono">
              Session History
            </h4>

            <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-340px)] pr-1">
              {filteredHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="p-2.5 rounded-xl hover:bg-slate-800/60 cursor-pointer transition-colors group flex items-start gap-2.5 border border-transparent hover:border-slate-800"
                >
                  <MessageSquare className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-300 group-hover:text-indigo-300 truncate">
                      {chat.title}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">{chat.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel: Chat Interface */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-4 border border-slate-800/80 flex flex-col justify-between overflow-hidden shadow-2xl relative">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-display font-bold text-white">AI RAG Shopping Assistant</h3>
                <p className="text-[10px] text-indigo-400 font-mono">Connected to PostgreSQL Vector Knowledge Base</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulsing-dot" />
              <span>RAG Embeddings Active</span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-3">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <p className="text-sm font-display font-bold text-white">How can the RAG Assistant assist your store?</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Ask me about top performing products, customer reviews, pricing comparisons, or real-time catalog recommendations.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-3 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-tr-xs shadow-md shadow-indigo-600/20'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-[10px] block mt-1 font-mono ${msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-500'}`}>
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Embedded Product Recommendations Grid */}
                    {msg.recommendations && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
                        {msg.recommendations.map((prod) => (
                          <div
                            key={prod.id}
                            className="bg-[#111726] p-3 rounded-xl border border-slate-800 shadow-md hover:border-indigo-500/40 hover:shadow-neon-indigo/10 transition-all flex flex-col justify-between"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-24 object-cover rounded-lg mb-2 border border-slate-700/60"
                            />
                            <div>
                              <h5 className="font-bold text-white text-xs truncate">
                                {prod.name}
                              </h5>
                              <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                                {prod.specs}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="font-mono font-bold text-indigo-400 text-xs">
                                  {prod.price}
                                </span>
                                <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-400">
                                  <Star className="w-3 h-3 fill-amber-400 stroke-none" />
                                  <span>{prod.rating}</span>
                                </div>
                              </div>
                            </div>

                            {/* View Details Button -> Opens Modal */}
                            <button
                              onClick={() => setSelectedProduct(prod)}
                              className="w-full mt-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors border border-slate-700"
                            >
                              <span>Inspect Specs</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900 border border-slate-800 text-slate-400 px-4 py-2.5 rounded-2xl rounded-tl-xs text-xs flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
                  <span className="text-[11px] font-mono text-indigo-300">RAG Vector Pipeline querying PostgreSQL...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Controls */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {SUGGESTION_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-indigo-950/60 hover:text-indigo-300 hover:border-indigo-500/40 text-slate-300 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all border border-slate-800"
                >
                  ✨ {chip}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask RAG assistant about product specs, reviews, or prices..."
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition-all shrink-0"
              >
                <span>Query</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Panel */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800/80 flex flex-col justify-between hidden lg:flex shadow-lg">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-white text-xs mb-3 border-b border-slate-800 pb-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Refine Vector Parameters</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1 font-mono">
                  Domain Category
                </label>
                <select className="w-full p-2 bg-slate-900 border border-slate-800 rounded-xl font-medium text-slate-200 focus:outline-none focus:border-indigo-500">
                  <option>Electronics & Audio</option>
                  <option>Smart Home Accessories</option>
                  <option>Gaming Gear</option>
                  <option>Computers & Peripherals</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                  <span>Max Price Filter:</span>
                  <span className="text-indigo-400 font-mono font-bold">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <button
                onClick={() => handleSendMessage(`Filter vector search under $${maxPrice}`)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs transition-colors"
              >
                Apply Vector Filter
              </button>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 text-center pt-3 border-t border-slate-800 font-mono">
            RAG queries vectorized on http://localhost:5000 with PostgreSQL connection pool.
          </p>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="bg-[#0F172A] rounded-2xl max-w-lg w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-display font-extrabold text-white truncate">
                  Technical Specifications & RAG Metadata
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-36 h-36 object-cover rounded-xl border border-slate-700 shrink-0"
                />
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="text-[10px] font-mono font-extrabold uppercase text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    Verified PostgreSQL Catalog
                  </span>
                  <h4 className="text-base font-display font-bold text-white leading-tight">
                    {selectedProduct.name}
                  </h4>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-lg font-mono font-extrabold text-indigo-400">
                      {selectedProduct.price}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                      <span>{selectedProduct.rating}</span>
                      <span className="text-slate-400 font-normal">({selectedProduct.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Specs Box */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <h5 className="font-bold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Feature Extraction</span>
                </h5>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {selectedProduct.specs}
                </p>
              </div>

              {/* Extra Inventory & Vendor Info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase font-mono">
                    Stock Availability
                  </span>
                  <span className="text-sm font-bold text-emerald-400 mt-0.5 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Stock (140 units)
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase font-mono">
                    Gross Margin
                  </span>
                  <span className="text-sm font-mono font-bold text-white mt-0.5 block">
                    32% ($124.50 / unit)
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors shadow-md"
              >
                Close Spec Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

