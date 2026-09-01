export interface MetricItem {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down';
  periodText: string;
  iconName: string;
  iconBg: string;
  iconColor: string;
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface RealtimeUpdate {
  id: string;
  title: string;
  description: string;
  amount: string;
  timestamp: string;
  iconType: 'order' | 'sale';
}

export interface TopProduct {
  id: number;
  name: string;
  revenue: string;
  orders: number;
  image?: string;
}

export interface CategoryBreakdown {
  name: string;
  value: number;
  formattedValue: string;
  percentage: string;
  color: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  amount: string;
  status: 'Delivered' | 'Processing' | 'Pending' | 'Cancelled';
  date: string;
}

export const DASHBOARD_METRICS: MetricItem[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$24,560.80',
    trend: '18.6%',
    trendType: 'up',
    periodText: 'vs 01 Jul - 29 Jul',
    iconName: 'DollarSign',
    iconBg: 'bg-blue-100 text-blue-600',
    iconColor: '#3B82F6',
  },
  {
    id: 'orders',
    label: 'Total Orders',
    value: '1,248',
    trend: '12.4%',
    trendType: 'up',
    periodText: 'vs 01 Jul - 29 Jul',
    iconName: 'ShoppingBag',
    iconBg: 'bg-emerald-100 text-emerald-600',
    iconColor: '#10B981',
  },
  {
    id: 'aov',
    label: 'Average Order Value',
    value: '$19.68',
    trend: '5.7%',
    trendType: 'up',
    periodText: 'vs 01 Jul - 29 Jul',
    iconName: 'CreditCard',
    iconBg: 'bg-amber-100 text-amber-600',
    iconColor: '#F59E0B',
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '3.42%',
    trend: '8.1%',
    trendType: 'up',
    periodText: 'vs 01 Jul - 29 Jul',
    iconName: 'Filter',
    iconBg: 'bg-purple-100 text-purple-600',
    iconColor: '#8B5CF6',
  },
  {
    id: 'rating',
    label: 'Average Rating',
    value: '4.6 / 5',
    trend: '0.33',
    trendType: 'up',
    periodText: 'vs 01 Jul - 29 Jul',
    iconName: 'Star',
    iconBg: 'bg-cyan-100 text-cyan-600',
    iconColor: '#06B6D4',
  },
];

export const DAILY_CHART_DATA: ChartDataPoint[] = [
  { date: '01 Aug', revenue: 1500, orders: 20 },
  { date: '04 Aug', revenue: 2200, orders: 40 },
  { date: '06 Aug', revenue: 1900, orders: 35 },
  { date: '08 Aug', revenue: 2500, orders: 45 },
  { date: '11 Aug', revenue: 3100, orders: 62 },
  { date: '13 Aug', revenue: 2000, orders: 55 },
  { date: '16 Aug', revenue: 2800, orders: 68 },
  { date: '18 Aug', revenue: 2300, orders: 45 },
  { date: '21 Aug', revenue: 2800, orders: 65 },
  { date: '24 Aug', revenue: 3300, orders: 72 },
  { date: '26 Aug', revenue: 2900, orders: 78 },
  { date: '29 Aug', revenue: 3000, orders: 74 },
];

export const WEEKLY_CHART_DATA: ChartDataPoint[] = [
  { date: 'Week 1', revenue: 14500, orders: 280 },
  { date: 'Week 2', revenue: 16800, orders: 320 },
  { date: 'Week 3', revenue: 18200, orders: 360 },
  { date: 'Week 4', revenue: 21500, orders: 420 },
];

export const MONTHLY_CHART_DATA: ChartDataPoint[] = [
  { date: 'May 2026', revenue: 58000, orders: 1100 },
  { date: 'Jun 2026', revenue: 64000, orders: 1210 },
  { date: 'Jul 2026', revenue: 71000, orders: 1350 },
  { date: 'Aug 2026', revenue: 78500, orders: 1490 },
];

export const INITIAL_REALTIME_UPDATES: RealtimeUpdate[] = [
  {
    id: 'rt-1',
    title: 'New Order Received',
    description: 'Order #ORD-9821',
    amount: '$48.75',
    timestamp: '1 min ago',
    iconType: 'order',
  },
  {
    id: 'rt-2',
    title: 'New Sale',
    description: 'Product: Wireless Headphones',
    amount: '$59.99',
    timestamp: '2 mins ago',
    iconType: 'sale',
  },
  {
    id: 'rt-3',
    title: 'New Order Received',
    description: 'Order #ORD-9820',
    amount: '$27.50',
    timestamp: '4 mins ago',
    iconType: 'order',
  },
  {
    id: 'rt-4',
    title: 'New Sale',
    description: 'Product: Smart Watch',
    amount: '$89.99',
    timestamp: '6 mins ago',
    iconType: 'sale',
  },
  {
    id: 'rt-5',
    title: 'New Order Received',
    description: 'Order #ORD-9819',
    amount: '$15.00',
    timestamp: '8 mins ago',
    iconType: 'order',
  },
];

export const TOP_PRODUCTS: TopProduct[] = [
  { id: 1, name: 'Wireless Headphones', revenue: '$2,450.75', orders: 98 },
  { id: 2, name: 'Smart Watch', revenue: '$2,150.40', orders: 85 },
  { id: 3, name: 'Bluetooth Speaker', revenue: '$1,850.60', orders: 74 },
  { id: 4, name: 'Gaming Mouse', revenue: '$1,420.30', orders: 62 },
  { id: 5, name: 'Mechanical Keyboard', revenue: '$1,210.50', orders: 55 },
];

export const CATEGORY_BREAKDOWN: CategoryBreakdown[] = [
  { name: 'Electronics', value: 9850.40, formattedValue: '$9,850.40', percentage: '40.1%', color: '#3B82F6' },
  { name: 'Accessories', value: 6423.30, formattedValue: '$6,423.30', percentage: '26.2%', color: '#10B981' },
  { name: 'Home & Living', value: 4250.60, formattedValue: '$4,250.60', percentage: '17.3%', color: '#F59E0B' },
  { name: 'Fashion', value: 2850.20, formattedValue: '$2,850.20', percentage: '11.6%', color: '#8B5CF6' },
  { name: 'Others', value: 1186.30, formattedValue: '$1,186.30', percentage: '4.8%', color: '#EC4899' },
];

export const RECENT_ORDERS: RecentOrder[] = [
  { id: '#ORD-9821', customer: 'John Doe', amount: '$48.75', status: 'Delivered', date: '29 Aug 2026' },
  { id: '#ORD-9820', customer: 'Jane Smith', amount: '$27.50', status: 'Processing', date: '29 Aug 2026' },
  { id: '#ORD-9819', customer: 'Mike Johnson', amount: '$15.00', status: 'Pending', date: '29 Aug 2026' },
  { id: '#ORD-9818', customer: 'Sarah Wilson', amount: '$89.99', status: 'Delivered', date: '28 Aug 2026' },
  { id: '#ORD-9817', customer: 'David Brown', amount: '$22.40', status: 'Processing', date: '28 Aug 2026' },
];
