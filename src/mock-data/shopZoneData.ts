export interface ShopZoneProduct {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPct: number;
  rating: number;
  reviewsCount: number;
  image: string;
  thumbnails: string[];
  specs: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  unitsSold: number;
  description: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  isVerified: boolean;
  rating: number;
  date: string;
  purchasedProduct: string;
  comment: string;
  photos?: string[];
}

export const SHOPZONE_PRODUCTS: ShopZoneProduct[] = [
  {
    id: 'samsung-m14',
    name: 'Samsung Galaxy M14 5G',
    subtitle: '(6GB | 128GB)',
    category: 'Mobiles',
    price: 12999,
    originalPrice: 16999,
    discountPct: 24,
    rating: 4.3,
    reviewsCount: 12458,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=700&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=700&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=700&q=80',
    ],
    specs: [
      '6GB RAM | 128GB Storage',
      '50MP Triple Camera with AI Nightography',
      '6000mAh Massive Battery',
      '5G Ready with 13 Bands Support',
      '6.6-inch FHD+ 90Hz Display',
      'Exynos 1330 Octa Core 5nm Processor',
    ],
    colors: [
      { name: 'Blue', hex: '#3B82F6' },
      { name: 'Dark Blue', hex: '#1E3A8A' },
      { name: 'Violet', hex: '#8B5CF6' },
    ],
    inStock: true,
    unitsSold: 2340,
    description: 'Experience superfast 5G speeds, crystal clear 50MP triple cameras, and uninterrupted multi-day usage with the 6000mAh battery.',
  },
  {
    id: 'boat-rockerz-450',
    name: 'boAt Rockerz 450',
    subtitle: 'Bluetooth Headphones',
    category: 'Electronics',
    price: 1299,
    originalPrice: 2499,
    discountPct: 48,
    rating: 4.4,
    reviewsCount: 8940,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=700&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&q=80',
    ],
    specs: [
      '15 Hours Playback Time',
      '40mm Dynamic Audio Drivers',
      'Adaptive Ergonomic Earcups',
      'Integrated Controls & Voice Assistant',
      'Dual Modes: Wireless & Wired AUX',
    ],
    colors: [
      { name: 'Luscious Black', hex: '#18181B' },
      { name: 'Aqua Blue', hex: '#06B6D4' },
      { name: 'Hazel Beige', hex: '#D4B996' },
    ],
    inStock: true,
    unitsSold: 1880,
    description: 'Immerse yourself in signature high-definition sound with boAt Rockerz 450 on-ear wireless headphones.',
  },
  {
    id: 'nike-running-shoes',
    name: 'Nike Running Shoes',
    subtitle: "Men's Air Zoom Breathable",
    category: 'Fashion',
    price: 2499,
    originalPrice: 4999,
    discountPct: 50,
    rating: 4.6,
    reviewsCount: 4210,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=700&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=700&q=80',
    ],
    specs: [
      'Lightweight Breathable Mesh Upper',
      'Air Zoom Responsive Cushioning',
      'Durable Waffle-Pattern Rubber Outsole',
      'Padded Collar for Ankle Support',
      'High Traction Grip for All Terrains',
    ],
    colors: [
      { name: 'Triple Black', hex: '#111827' },
      { name: 'Sport Red', hex: '#EF4444' },
      { name: 'Pure White', hex: '#F9FAFB' },
    ],
    inStock: true,
    unitsSold: 1420,
    description: 'Engineered for optimal comfort, springy strides, and maximum durability on tracks, roads, and gym workouts.',
  },
  {
    id: 'prestige-induction',
    name: 'Prestige Induction Cooktop',
    subtitle: '2000W Fast Heating',
    category: 'Appliances',
    price: 1899,
    originalPrice: 2499,
    discountPct: 24,
    rating: 4.2,
    reviewsCount: 3120,
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=700&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=700&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=700&q=80',
    ],
    specs: [
      '2000 Watts High Efficiency Heating',
      'Indian Menu Preset Options (Roti, Dosa, Curry)',
      'Automatic Voltage Regulator Protection',
      'Anti-Magnetic Ceramic Glass Plate',
      'Feather-Touch Push Buttons',
    ],
    colors: [
      { name: 'Jet Black', hex: '#18181B' },
    ],
    inStock: true,
    unitsSold: 980,
    description: 'Cook smart, quick, and safe with energy-efficient induction technology built specifically for Indian cuisine.',
  },
  {
    id: 'casual-tshirt',
    name: 'Casual T-Shirt',
    subtitle: "Men's Premium Combed Cotton",
    category: 'Fashion',
    price: 499,
    originalPrice: 999,
    discountPct: 50,
    rating: 4.5,
    reviewsCount: 6800,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=700&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&q=80',
    ],
    specs: [
      '100% Bio-Washed Combed Cotton',
      '180 GSM Fabric Weight for Soft Handfeel',
      'Ribbed Crew Neck Collar',
      'Pre-Shrunk & Colorfast Guarantee',
      'Regular Comfortable Fit',
    ],
    colors: [
      { name: 'Olive Green', hex: '#4D5D43' },
      { name: 'Charcoal', hex: '#374151' },
      { name: 'Navy Blue', hex: '#1E3A8A' },
    ],
    inStock: true,
    unitsSold: 760,
    description: 'Everyday staple classic crewneck crafted from breathable cotton for all-day easy wear.',
  },
];

export const CATEGORIES_LIST = [
  { id: 'mobiles', name: 'Mobiles', icon: '📱', color: 'bg-blue-50 text-blue-600' },
  { id: 'laptops', name: 'Laptops', icon: '💻', color: 'bg-indigo-50 text-indigo-600' },
  { id: 'fashion', name: 'Fashion', icon: '👕', color: 'bg-rose-50 text-rose-600' },
  { id: 'home-living', name: 'Home & Living', icon: '🛋️', color: 'bg-amber-50 text-amber-600' },
  { id: 'appliances', name: 'Appliances', icon: '🔌', color: 'bg-cyan-50 text-cyan-600' },
  { id: 'beauty', name: 'Beauty', icon: '💄', color: 'bg-pink-50 text-pink-600' },
  { id: 'toys-kids', name: 'Toys & Kids', icon: '🧸', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'more', name: 'More', icon: '✨', color: 'bg-purple-50 text-purple-600' },
];

export const COMPANY_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Priya S.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    isVerified: true,
    rating: 5,
    date: '12 Aug 2026',
    purchasedProduct: 'Purchased: Samsung Galaxy M14 5G',
    comment: 'Great shopping experience! Products are genuine and delivery was super fast. Will shop again!',
  },
  {
    id: 'rev-2',
    author: 'Arun K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    isVerified: true,
    rating: 5,
    date: '7 Aug 2026',
    purchasedProduct: 'Purchased: Nike Running Shoes',
    comment: 'Good quality products and excellent customer service. Highly recommended!',
  },
  {
    id: 'rev-3',
    author: 'Sneha R.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    isVerified: true,
    rating: 5,
    date: '5 Aug 2026',
    purchasedProduct: 'Purchased: boAt Rockerz 450',
    comment: 'Amazing discounts and best prices compared to other sites. Loved it!',
  },
  {
    id: 'rev-4',
    author: 'Rajesh M.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    isVerified: true,
    rating: 4,
    date: '2 Aug 2026',
    purchasedProduct: 'Purchased: Prestige Induction Cooktop',
    comment: 'Prompt delivery and safe packaging. Working smoothly as described!',
  },
];

export const PRODUCT_SPECIFIC_REVIEWS: ReviewItem[] = [
  {
    id: 'pr-1',
    author: 'Vikram T.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
    isVerified: true,
    rating: 5,
    date: '14 Aug 2026',
    purchasedProduct: 'Samsung Galaxy M14 5G (Blue)',
    comment: 'Phone is really good at this price range. Battery backup is excellent and camera quality is also nice.',
    photos: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80',
    ],
  },
  {
    id: 'pr-2',
    author: 'Divya M.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
    isVerified: true,
    rating: 4,
    date: '10 Aug 2026',
    purchasedProduct: 'Samsung Galaxy M14 5G (Dark Blue)',
    comment: 'Value for money. Smooth 90Hz performance and vibrant display.',
  },
  {
    id: 'pr-3',
    author: 'Rohit P.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80',
    isVerified: true,
    rating: 5,
    date: '5 Aug 2026',
    purchasedProduct: 'Samsung Galaxy M14 5G (Violet)',
    comment: 'Nice mobile. 5G works well. Highly satisfied with battery longevity.',
  },
];

export const BUSINESS_ANALYTICS_DATA = {
  kpis: {
    totalOrders: '12,458',
    ordersGrowth: '+12% vs last month',
    totalRevenue: '₹1,48,75,320',
    revenueGrowth: '+18% vs last month',
    totalCustomers: '8,924',
    customersGrowth: '+15% vs last month',
  },
  salesChart: [
    { date: 'Aug 1', sales: 22000 },
    { date: 'Aug 7', sales: 48000 },
    { date: 'Aug 14', sales: 39000 },
    { date: 'Aug 21', sales: 78000 },
    { date: 'Aug 31', sales: 94500 },
  ],
};
