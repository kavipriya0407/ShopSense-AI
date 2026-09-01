export interface SalesTrendPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface DayOfWeekSales {
  day: string;
  amount: string;
  value: number;
}

export interface ProductPerformance {
  id: number;
  product: string;
  views: number;
  addToCart: number;
  orders: number;
  convRate: string;
  revenue: string;
  unitsSold: number;
}

export const SALES_TRENDS_DATA: SalesTrendPoint[] = [
  { date: '01 Aug', revenue: 1600, orders: 24 },
  { date: '04 Aug', revenue: 2300, orders: 42 },
  { date: '06 Aug', revenue: 2100, orders: 38 },
  { date: '08 Aug', revenue: 2700, orders: 49 },
  { date: '11 Aug', revenue: 3400, orders: 66 },
  { date: '13 Aug', revenue: 2200, orders: 58 },
  { date: '16 Aug', revenue: 3000, orders: 72 },
  { date: '18 Aug', revenue: 2500, orders: 48 },
  { date: '21 Aug', revenue: 3100, orders: 69 },
  { date: '24 Aug', revenue: 3600, orders: 78 },
  { date: '26 Aug', revenue: 3200, orders: 84 },
  { date: '29 Aug', revenue: 3400, orders: 80 },
];

export const REVENUE_VS_ORDERS_SUMMARY = {
  totalRevenue: '$24,560.80',
  totalOrders: '1,248',
  avgOrderValue: '$19.68',
  revenuePerOrder: '$19.68',
  refunds: '$342.15 (-1.39%)',
};

export const REVENUE_BY_PERIOD = [
  { name: 'This Period', value: 24560.80, percentage: '100%', color: '#3B82F6' },
  { name: 'Previous Period', value: 20701.45, percentage: '100%', color: '#10B981' },
];

export const DAY_OF_WEEK_SALES: DayOfWeekSales[] = [
  { day: 'Monday', amount: '$3,250.45', value: 3250.45 },
  { day: 'Tuesday', amount: '$3,980.20', value: 3980.20 },
  { day: 'Wednesday', amount: '$4,102.30', value: 4102.30 },
  { day: 'Thursday', amount: '$4,356.70', value: 4356.70 },
  { day: 'Friday', amount: '$4,850.60', value: 4850.60 },
  { day: 'Saturday', amount: '$2,968.40', value: 2968.40 },
  { day: 'Sunday', amount: '$1,052.15', value: 1052.15 },
];

export const PRODUCT_PERFORMANCE_TABLE: ProductPerformance[] = [
  { id: 1, product: 'Wireless Headphones', views: 1245, addToCart: 234, orders: 98, convRate: '7.87%', revenue: '$2,450.75', unitsSold: 104 },
  { id: 2, product: 'Smart Watch', views: 1102, addToCart: 195, orders: 85, convRate: '7.71%', revenue: '$2,150.40', unitsSold: 88 },
  { id: 3, product: 'Bluetooth Speaker', views: 987, addToCart: 156, orders: 74, convRate: '7.50%', revenue: '$1,850.60', unitsSold: 75 },
  { id: 4, product: 'Gaming Mouse', views: 876, addToCart: 122, orders: 62, convRate: '7.08%', revenue: '$1,420.30', unitsSold: 64 },
  { id: 5, product: 'Mechanical Keyboard', views: 765, addToCart: 110, orders: 55, convRate: '7.19%', revenue: '$1,210.50', unitsSold: 57 },
];
