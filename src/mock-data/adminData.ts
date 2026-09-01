export interface AdminMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down';
  iconName: string;
  iconBg: string;
}

export interface VendorAccount {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  joinedDate: string;
  totalGMV: string;
  ordersCount: number;
  commissionRate: string;
  status: 'Active' | 'Pending' | 'Suspended';
  rating: number;
}

export interface PlatformDispute {
  id: string;
  orderId: string;
  vendorName: string;
  customerName: string;
  issue: string;
  amount: string;
  date: string;
  status: 'Open' | 'In Review' | 'Resolved';
}

export interface GlobalCategory {
  id: number;
  name: string;
  totalProducts: number;
  activeVendors: number;
  totalSales: string;
  commissionPct: string;
  status: 'Active' | 'Inactive';
}

export const ADMIN_METRICS: AdminMetric[] = [
  { id: 'gmv', label: 'Platform Total GMV', value: '$485,200.00', trend: '24.8%', trendType: 'up', iconName: 'DollarSign', iconBg: 'bg-emerald-100 text-emerald-600' },
  { id: 'commission', label: 'Commission Earned (10%)', value: '$48,520.00', trend: '24.8%', trendType: 'up', iconName: 'CreditCard', iconBg: 'bg-blue-100 text-blue-600' },
  { id: 'vendors', label: 'Active Vendors', value: '142', trend: '14 new', trendType: 'up', iconName: 'Users', iconBg: 'bg-purple-100 text-purple-600' },
  { id: 'orders', label: 'Platform Total Orders', value: '24,150', trend: '18.2%', trendType: 'up', iconName: 'ShoppingBag', iconBg: 'bg-amber-100 text-amber-600' },
  { id: 'pending', label: 'Pending Approvals', value: '5 Vendors', trend: 'Requires Review', trendType: 'down', iconName: 'ShieldAlert', iconBg: 'bg-rose-100 text-rose-600' },
];

export const MOCK_VENDORS: VendorAccount[] = [
  { id: 'VND-101', storeName: 'Vendor Store', ownerName: 'John Alex', email: 'vendor@shopsense.com', joinedDate: '12 Jan 2025', totalGMV: '$24,560.80', ordersCount: 1248, commissionRate: '10.0%', status: 'Active', rating: 4.6 },
  { id: 'VND-102', storeName: 'TechGear Solutions', ownerName: 'Robert Fox', email: 'robert@techgear.io', joinedDate: '18 Feb 2025', totalGMV: '$68,400.00', ordersCount: 3120, commissionRate: '10.0%', status: 'Active', rating: 4.8 },
  { id: 'VND-103', storeName: 'Urban Fashion Hub', ownerName: 'Elena Rostova', email: 'elena@urbanfashion.com', joinedDate: '05 Mar 2025', totalGMV: '$42,150.50', ordersCount: 1980, commissionRate: '12.0%', status: 'Active', rating: 4.5 },
  { id: 'VND-104', storeName: 'Aura Home Essentials', ownerName: 'Marcus Vance', email: 'marcus@aurahome.co', joinedDate: '22 Apr 2025', totalGMV: '$18,900.20', ordersCount: 940, commissionRate: '10.0%', status: 'Pending', rating: 4.2 },
  { id: 'VND-105', storeName: 'SoundBeat Audio', ownerName: 'David Lee', email: 'david@soundbeat.net', joinedDate: '10 May 2025', totalGMV: '$35,800.00', ordersCount: 1650, commissionRate: '10.0%', status: 'Active', rating: 4.7 },
  { id: 'VND-106', storeName: 'Apex Gaming Accessories', ownerName: 'Sarah Jenkins', email: 'sarah@apexgaming.gg', joinedDate: '14 Jun 2025', totalGMV: '$51,200.00', ordersCount: 2400, commissionRate: '10.0%', status: 'Active', rating: 4.9 },
  { id: 'VND-107', storeName: 'EcoLifestyle Goods', ownerName: 'Michael Chang', email: 'michael@ecolife.org', joinedDate: '01 Jul 2025', totalGMV: '$8,400.00', ordersCount: 380, commissionRate: '15.0%', status: 'Suspended', rating: 3.8 },
];

export const MOCK_DISPUTES: PlatformDispute[] = [
  { id: 'DSP-501', orderId: '#ORD-9815', vendorName: 'TechGear Solutions', customerName: 'William Taylor', issue: 'Defective item received; vendor refused return request', amount: '$35.60', date: '27 Aug 2026', status: 'Open' },
  { id: 'DSP-502', orderId: '#ORD-9740', vendorName: 'Urban Fashion Hub', customerName: 'Alice Green', issue: 'Wrong size delivered; tracking delayed > 10 days', amount: '$120.00', date: '25 Aug 2026', status: 'In Review' },
  { id: 'DSP-503', orderId: '#ORD-9690', vendorName: 'SoundBeat Audio', customerName: 'Brian Miller', issue: 'Package marked delivered but not received', amount: '$89.99', date: '20 Aug 2026', status: 'Resolved' },
];

export const GLOBAL_CATEGORIES: GlobalCategory[] = [
  { id: 1, name: 'Electronics & Audio', totalProducts: 1420, activeVendors: 48, totalSales: '$198,400.00', commissionPct: '10.0%', status: 'Active' },
  { id: 2, name: 'Fashion & Apparel', totalProducts: 980, activeVendors: 35, totalSales: '$124,500.00', commissionPct: '12.0%', status: 'Active' },
  { id: 3, name: 'Home & Living', totalProducts: 650, activeVendors: 28, totalSales: '$85,300.00', commissionPct: '10.0%', status: 'Active' },
  { id: 4, name: 'Computers & Gaming', totalProducts: 820, activeVendors: 22, totalSales: '$77,000.00', commissionPct: '10.0%', status: 'Active' },
];
