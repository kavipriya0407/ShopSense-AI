import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  RotateCcw,
  Banknote,
  ShieldCheck,
  Check,
  Heart,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  Zap,
  Truck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ShopZoneHeader } from '../components/shopzone/ShopZoneHeader';
import { ShopZoneFooter } from '../components/shopzone/ShopZoneFooter';
import { SHOPZONE_PRODUCTS, PRODUCT_SPECIFIC_REVIEWS, ShopZoneProduct } from '../mock-data/shopZoneData';
import { useShopZone } from '../context/ShopZoneContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useShopZone();

  // Find product or fallback to default
  const product: ShopZoneProduct =
    SHOPZONE_PRODUCTS.find((p) => p.id === id) || SHOPZONE_PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Blue');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCartClick = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleBuyNowClick = () => {
    addToCart(product, quantity, selectedColor);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] lumen-subtle-mesh text-slate-900 flex flex-col justify-between font-sans">
      <div>
        <ShopZoneHeader />

        {/* 1. Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-slate-500 flex items-center gap-2 overflow-x-auto">
          <Link to="/storefront" className="hover:text-indigo-600 font-semibold">Storefront</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/storefront?cat=${product.category}`} className="hover:text-indigo-600 font-semibold">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* 2. Main Product Details View */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT: Gallery (Thumbnail column + Main showcase) */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
              {/* Vertical Thumbnail Strip */}
              <div className="flex sm:flex-col gap-2.5 overflow-x-auto shrink-0">
                {product.thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(thumb)}
                    className={`w-16 h-16 rounded-2xl overflow-hidden border-2 p-1.5 bg-slate-50 transition-all ${
                      selectedImage === thumb
                        ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md scale-95'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Large Main Product Photo */}
              <div className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-3xl border border-slate-200 p-8 flex items-center justify-center relative min-h-[400px]">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="max-h-[380px] max-w-full object-contain hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-3 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-rose-500 shadow-sm transition-all"
                  title="Toggle wishlist"
                >
                  <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Stock Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 pulsing-dot" />
                  <span>IN STOCK & ESCROW READY</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Product Specs & Purchase Control Box */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-indigo-600">
                    {product.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight mt-1">
                    {product.name}
                  </h1>
                </div>

                {/* Rating Row */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-indigo-600 text-white px-2.5 py-1 rounded-xl text-xs font-bold">
                    <span>{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-white stroke-none" />
                  </div>
                  <Link to="/product-reviews" className="text-xs text-indigo-600 hover:underline font-bold">
                    {product.reviewsCount.toLocaleString('en-IN')} verified customer reviews
                  </Link>
                </div>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-3 pt-3 pb-4 border-b border-slate-100">
                  <span className="text-3xl sm:text-4xl font-display font-black text-slate-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base text-slate-400 line-through font-medium">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-black bg-gradient-to-r from-rose-500 to-indigo-600 text-white">
                    {product.discountPct}% OFF
                  </span>
                </div>

                {/* Bullet Specifications */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Hardware Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Selector Swatches */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 font-mono uppercase">
                      Finish Selection: <span className="font-bold text-indigo-600">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            selectedColor === c.name
                              ? 'border-indigo-600 ring-4 ring-indigo-500/20 scale-110'
                              : 'border-slate-300 hover:border-slate-400'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper */}
                <div className="flex items-center gap-4 pt-1">
                  <label className="text-xs font-bold text-slate-700 font-mono uppercase">Units:</label>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden shadow-inner">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-1.5 text-xs font-mono font-bold text-slate-900 border-x border-slate-300 bg-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    onClick={handleAddToCartClick}
                    className="py-3.5 px-4 bg-slate-900 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group"
                  >
                    <ShoppingBag className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNowClick}
                    className="py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-950/40 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 3 Trust Seals */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-semibold text-center">
                  <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                    <span>7 Days Return</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Escrow Verified</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Truck className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Express Dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Customer Ratings & Reviews */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-display font-black text-slate-900">
                  Verified Buyer Reviews & Ratings
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Authentic buyer feedback verified by blockchain escrow ledger
                </p>
              </div>
              <Link
                to="/product-reviews"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>View All Reviews</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCT_SPECIFIC_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={rev.avatar} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-200" />
                      <div>
                        <p className="font-bold text-slate-900">{rev.author}</p>
                        <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Verified Purchase</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-slate-400 text-[10px] font-mono">{rev.date}</span>
                  </div>

                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                    ))}
                  </div>

                  <p className="text-slate-700 leading-relaxed font-normal">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ShopZoneFooter />
    </div>
  );
};

