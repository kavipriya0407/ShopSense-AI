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
} from 'lucide-react';
import { ShopZoneHeader } from '../components/shopzone/ShopZoneHeader';
import { ShopZoneFooter } from '../components/shopzone/ShopZoneFooter';
import { SHOPZONE_PRODUCTS, PRODUCT_SPECIFIC_REVIEWS, ShopZoneProduct } from '../mock-data/shopZoneData';
import { useShopZone } from '../context/ShopZoneContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useShopZone();

  // Find product or fallback to default Samsung M14
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between font-sans">
      <div>
        <ShopZoneHeader />

        {/* 1. Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 text-xs text-slate-500 flex items-center gap-1.5 overflow-x-auto">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to={`/?cat=${product.category}`} className="hover:text-blue-600">{product.category}</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate">{product.name}</span>
        </div>

        {/* 2. Main Product Details View (matching Screen 3) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* LEFT: Thumbnail Column + Large Main Product Image */}
            <div className="md:col-span-6 flex gap-4">
              {/* Vertical Thumbnail Strip */}
              <div className="flex flex-col gap-2.5 shrink-0">
                {product.thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(thumb)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 p-1 bg-slate-50 transition-all ${
                      selectedImage === thumb ? 'border-[#FF5722] shadow-sm' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Large Main Product Photo */}
              <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex items-center justify-center relative min-h-[380px]">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="max-h-[360px] max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-rose-500 shadow-sm transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* In Stock Badge */}
                <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  ✓ In Stock & Ready to Ship
                </div>
              </div>
            </div>

            {/* RIGHT: Product Specs & Buy Box */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {product.name}
                </h1>

                {/* Rating Row */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded text-xs font-bold">
                    <span>{product.rating}</span>
                    <Star className="w-3 h-3 fill-white stroke-none" />
                  </div>
                  <Link to="/product-reviews" className="text-xs text-blue-600 hover:underline font-semibold">
                    ({product.reviewsCount.toLocaleString('en-IN')} customer reviews)
                  </Link>
                </div>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-3 mt-4 border-b border-slate-100 pb-4">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-[#22C55E] text-white">
                    {product.discountPct}% OFF
                  </span>
                </div>

                {/* Bullet Specifications (matching Screen 3) */}
                <div className="mt-4 space-y-1.5">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Color Selector Swatches */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Color: <span className="font-normal text-slate-500">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${
                            selectedColor === c.name ? 'border-[#FF5722] ring-2 ring-orange-300 scale-110' : 'border-slate-300'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper */}
                <div className="mt-5 flex items-center gap-3">
                  <label className="text-xs font-bold text-slate-700">Quantity:</label>
                  <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-slate-900 border-x border-slate-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Orange Add to Cart + Navy Buy Now) */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCartClick}
                    className="py-3 px-4 bg-[#FF5722] hover:bg-[#F4511E] active:bg-orange-700 text-white font-bold text-sm rounded-lg shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNowClick}
                    className="py-3 px-4 bg-[#131921] hover:bg-slate-800 active:bg-black text-white font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* 3 Trust Seals at Bottom of Buy Box */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-[#FF5722]" />
                    <span>7 Days Return</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Banknote className="w-3.5 h-3.5 text-[#FF5722]" />
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF5722]" />
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Product Reviews Preview & Link */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <h3 className="text-xl font-bold text-slate-900">Customer Ratings & Reviews</h3>
              <Link
                to="/product-reviews"
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                View All {product.reviewsCount.toLocaleString('en-IN')} Reviews →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCT_SPECIFIC_REVIEWS.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={rev.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-slate-900">{rev.author}</p>
                        <p className="text-[10px] text-emerald-600 font-semibold">✓ Verified Buyer</p>
                      </div>
                    </div>
                    <span className="text-slate-400 text-[10px]">{rev.date}</span>
                  </div>

                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
                    ))}
                  </div>

                  <p className="text-slate-700 leading-relaxed">{rev.comment}</p>
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
