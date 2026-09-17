import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  LayoutGrid,
  List as ListIcon,
  Filter,
  Package,
  Trash2,
  Edit2,
  ExternalLink,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useShopSense } from '../../context/ShopSenseContext';
import { CATEGORIES, STOCK_STATUS_OPTIONS, Product } from '../../mock-data/shopSenseData';
import { ProductEditModal } from '../../components/common/ProductEditModal';

export const MyCatalog: React.FC = () => {
  const navigate = useNavigate();
  const { products, deleteProduct, updateProduct } = useShopSense();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStockStatus, setSelectedStockStatus] = useState('All Stock Status');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (updated: Product) => {
    updateProduct(updated.id, updated);
  };

  // Filter products reactively
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Categories' || product.category === selectedCategory;

      const matchesStock =
        selectedStockStatus === 'All Stock Status' || product.stockStatus === selectedStockStatus;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, selectedStockStatus]);

  const getStockBadge = (status: string, stock: number) => {
    switch (status) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.8 rounded-full text-[11px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulsing-dot" />
            {stock} units
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.8 rounded-full text-[11px] font-bold font-mono bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {stock} units
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.8 rounded-full text-[11px] font-bold font-mono bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Depleted
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Merchant Inventory Nexus
            </h1>
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs font-bold border border-indigo-200">
              {filteredProducts.length} of {products.length} registered assets
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage your store's live SKU portfolio, calibrate pricing tiers, and trigger instant storefront sync.
          </p>
        </div>

        <button
          onClick={() => navigate('/add-product')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-950/30 transition-all self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Asset</span>
        </button>
      </div>

      {/* FILTER BAR: Search, Category, Stock Status, Grid/List View Toggle */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-84">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalog assets by title, SKU, specs..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
          />
        </div>

        {/* Dropdowns & View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 pr-8 text-xs font-bold text-slate-800 hover:bg-slate-100 focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          {/* Stock Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStockStatus}
              onChange={(e) => setSelectedStockStatus(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 pr-8 text-xs font-bold text-slate-800 hover:bg-slate-100 focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              {STOCK_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid Matrix View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-indigo-600 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Tabular Ledger View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCTS DISPLAY: Grid View or List View */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No assets match your search</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or reset your category and inventory filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
              setSelectedStockStatus('All Stock Status');
            }}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="lumen-card p-4 overflow-hidden flex flex-col justify-between group bg-white hover:border-indigo-400 transition-all duration-300"
            >
              <div>
                {/* Image & Badges */}
                <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl relative overflow-hidden p-3 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    {getStockBadge(product.stockStatus, product.stock)}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="px-2 py-0.5 bg-[#090D16]/80 backdrop-blur-md text-white rounded-lg text-[10px] font-mono font-bold">
                      {product.sku}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="pt-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-indigo-600 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <span className="text-xs text-slate-600 font-mono font-bold">
                      ⭐ {product.rating}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-slate-100 mt-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-display font-black text-slate-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-1.5 font-medium">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-600 font-mono bg-slate-100 px-2.5 py-1 rounded-lg">
                    {product.stock} units
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-indigo-200"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Live Edit</span>
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Asset Identification</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">SKU Code</th>
                  <th className="py-3.5 px-4">Listing Price</th>
                  <th className="py-3.5 px-4">Stock Ledger</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-indigo-50/20 transition-colors">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-xl object-contain border border-slate-200 bg-slate-50 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate max-w-xs sm:max-w-sm">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-sm">
                          {product.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {product.category}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 font-bold text-xs">
                      {product.sku}
                    </td>
                    <td className="py-3 px-4 font-display font-black text-slate-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">
                      {product.stock}
                    </td>
                    <td className="py-3 px-4">
                      {getStockBadge(product.stockStatus, product.stock)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold flex items-center gap-1 border border-indigo-200"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Interactive Live Edit & Preview Modal */}
      <ProductEditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

