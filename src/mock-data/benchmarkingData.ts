export interface BenchmarkMetricCard {
  label: string;
  vendorValue: string;
  marketplaceAvg: string;
  vsAvgTrend: string;
  iconName: string;
  iconBg: string;
}

export interface MetricPercentile {
  label: string;
  percentile: number;
  topText: string;
  iconName: string;
  iconBg: string;
}

export const VENDOR_VS_MARKETPLACE_CARDS: BenchmarkMetricCard[] = [
  {
    label: 'Total Revenue',
    vendorValue: '$24,560.80',
    marketplaceAvg: '$18,320.60',
    vsAvgTrend: '↑ 34.08%',
    iconName: 'DollarSign',
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
  {
    label: 'Average Order Value',
    vendorValue: '$19.68',
    marketplaceAvg: '$16.42',
    vsAvgTrend: '↑ 19.87%',
    iconName: 'CreditCard',
    iconBg: 'bg-amber-100 text-amber-600',
  },
  {
    label: 'Conversion Rate',
    vendorValue: '3.42%',
    marketplaceAvg: '2.81%',
    vsAvgTrend: '↑ 0.61 pp',
    iconName: 'Filter',
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'Average Rating',
    vendorValue: '4.6 / 5',
    marketplaceAvg: '4.2 / 5',
    vsAvgTrend: '↑ 0.4',
    iconName: 'Star',
    iconBg: 'bg-cyan-100 text-cyan-600',
  },
  {
    label: 'Total Orders',
    vendorValue: '1,248',
    marketplaceAvg: '952',
    vsAvgTrend: '↑ 31.09%',
    iconName: 'ShoppingBag',
    iconBg: 'bg-blue-100 text-blue-600',
  },
];

export const PERFORMANCE_COMPARISON_DATA = {
  revenue: [
    { period: 'Daily', store: 2200, marketplace: 1650 },
    { period: 'Weekly', store: 16800, marketplace: 12500 },
    { period: 'Monthly', store: 78500, marketplace: 58000 },
  ],
  aov: [
    { period: 'Daily', store: 19.68, marketplace: 16.42 },
    { period: 'Weekly', store: 20.50, marketplace: 16.80 },
    { period: 'Monthly', store: 21.20, marketplace: 17.10 },
  ],
  conversion: [
    { period: 'Daily', store: 3.42, marketplace: 2.81 },
    { period: 'Weekly', store: 3.55, marketplace: 2.90 },
    { period: 'Monthly', store: 3.60, marketplace: 2.95 },
  ],
  rating: [
    { period: 'Daily', store: 4.6, marketplace: 4.2 },
    { period: 'Weekly', store: 4.6, marketplace: 4.2 },
    { period: 'Monthly', store: 4.7, marketplace: 4.3 },
  ],
};

export const METRIC_PERCENTILE_RANKINGS: MetricPercentile[] = [
  { label: 'Revenue', percentile: 78, topText: 'Top 22%', iconName: 'DollarSign', iconBg: 'bg-emerald-100 text-emerald-600' },
  { label: 'Avg. Order Value', percentile: 73, topText: 'Top 27%', iconName: 'CreditCard', iconBg: 'bg-amber-100 text-amber-600' },
  { label: 'Conversion Rate', percentile: 81, topText: 'Top 19%', iconName: 'Filter', iconBg: 'bg-purple-100 text-purple-600' },
  { label: 'Average Rating', percentile: 76, topText: 'Top 24%', iconName: 'Star', iconBg: 'bg-cyan-100 text-cyan-600' },
  { label: 'Total Orders', percentile: 70, topText: 'Top 30%', iconName: 'ShoppingBag', iconBg: 'bg-blue-100 text-blue-600' },
];
