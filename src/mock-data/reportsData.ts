export interface ReportTableRow {
  date: string;
  orders: number;
  itemsSold: number;
  revenue: string;
  discounts: string;
  shipping: string;
  tax: string;
  netRevenue: string;
  revenueVal: number;
  netRevenueVal: number;
}

export const REPORTS_METRICS = [
  { label: 'Total Revenue', value: '$24,560.80', trend: '18.6%', trendType: 'up', periodText: 'vs 01 Jul - 29 Jul', iconName: 'DollarSign', iconBg: 'bg-blue-100 text-blue-600' },
  { label: 'Total Orders', value: '1,248', trend: '12.4%', trendType: 'up', periodText: 'vs 01 Jul - 29 Jul', iconName: 'ShoppingBag', iconBg: 'bg-emerald-100 text-emerald-600' },
  { label: 'Average Order Value', value: '$19.68', trend: '5.7%', trendType: 'up', periodText: 'vs 01 Jul - 29 Jul', iconName: 'CreditCard', iconBg: 'bg-amber-100 text-amber-600' },
  { label: 'Total Products Sold', value: '2,348', trend: '11.3%', trendType: 'up', periodText: 'vs 01 Jul - 29 Jul', iconName: 'Package', iconBg: 'bg-purple-100 text-purple-600' },
  { label: 'Refunds', value: '$342.15', trend: '-1.39%', trendType: 'down', periodText: 'vs 01 Jul - 29 Jul', iconName: 'RotateCcw', iconBg: 'bg-red-100 text-red-600' },
];

export const SALES_REPORT_TABLE_DATA: ReportTableRow[] = [
  { date: '29 Aug 2026', orders: 56, itemsSold: 98, revenue: '$2,950.75', discounts: '$120.50', shipping: '$80.00', tax: '$211.45', netRevenue: '$2,538.80', revenueVal: 2950.75, netRevenueVal: 2538.80 },
  { date: '28 Aug 2026', orders: 52, itemsSold: 92, revenue: '$2,672.40', discounts: '$110.00', shipping: '$75.00', tax: '$192.30', netRevenue: '$2,295.10', revenueVal: 2672.40, netRevenueVal: 2295.10 },
  { date: '27 Aug 2026', orders: 48, itemsSold: 85, revenue: '$2,450.30', discounts: '$105.00', shipping: '$70.00', tax: '$176.94', netRevenue: '$2,098.36', revenueVal: 2450.30, netRevenueVal: 2098.36 },
  { date: '26 Aug 2026', orders: 45, itemsSold: 76, revenue: '$2,182.10', discounts: '$95.00', shipping: '$65.00', tax: '$155.35', netRevenue: '$1,866.75', revenueVal: 2182.10, netRevenueVal: 1866.75 },
  { date: '25 Aug 2026', orders: 50, itemsSold: 88, revenue: '$2,398.60', discounts: '$100.00', shipping: '$70.00', tax: '$172.41', netRevenue: '$2,156.19', revenueVal: 2398.60, netRevenueVal: 2156.19 },
  { date: '24 Aug 2026', orders: 58, itemsSold: 104, revenue: '$3,120.50', discounts: '$130.00', shipping: '$85.00', tax: '$225.10', netRevenue: '$2,680.40', revenueVal: 3120.50, netRevenueVal: 2680.40 },
  { date: '23 Aug 2026', orders: 42, itemsSold: 70, revenue: '$1,980.20', discounts: '$80.00', shipping: '$60.00', tax: '$140.20', netRevenue: '$1,700.00', revenueVal: 1980.20, netRevenueVal: 1700.00 },
  { date: '22 Aug 2026', orders: 40, itemsSold: 68, revenue: '$1,850.00', discounts: '$75.00', shipping: '$55.00', tax: '$132.00', netRevenue: '$1,588.00', revenueVal: 1850.00, netRevenueVal: 1588.00 },
  { date: '21 Aug 2026', orders: 54, itemsSold: 95, revenue: '$2,810.30', discounts: '$115.00', shipping: '$78.00', tax: '$201.50', netRevenue: '$2,415.80', revenueVal: 2810.30, netRevenueVal: 2415.80 },
  { date: '20 Aug 2026', orders: 49, itemsSold: 86, revenue: '$2,520.40', discounts: '$102.00', shipping: '$72.00', tax: '$180.20', netRevenue: '$2,166.20', revenueVal: 2520.40, netRevenueVal: 2166.20 },
];
