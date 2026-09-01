export interface OrderProductItem {
  name: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
  image?: string;
}

export interface TimelineStep {
  title: string;
  timestamp: string;
  completed: boolean;
}

export interface OrderDetail {
  id: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  products: OrderProductItem[];
  itemsCount: number;
  orderAmount: string;
  subtotal: string;
  discount: string;
  shipping: string;
  tax: string;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderStatus: 'Delivered' | 'Processing' | 'Pending' | 'Cancelled';
  paymentMethod: string;
  transactionId: string;
  paidOn: string;
  timeline: TimelineStep[];
}

export const MOCK_ORDERS: OrderDetail[] = [
  {
    id: '#ORD-9821',
    orderDate: '29 Aug 2026, 10:24 AM',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1 987 654 3210',
    customerAddress: '123 Main Street, New York, NY 10001, USA',
    products: [
      { name: 'Wireless Headphones', quantity: 1, unitPrice: '$25.00', subtotal: '$25.00' },
      { name: 'Smart Watch', quantity: 1, unitPrice: '$15.00', subtotal: '$15.00' },
      { name: 'Bluetooth Speaker', quantity: 1, unitPrice: '$10.00', subtotal: '$10.00' },
    ],
    itemsCount: 3,
    orderAmount: '$48.75',
    subtotal: '$50.00',
    discount: '-$5.00',
    shipping: '$0.00',
    tax: '$3.75',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-99283482',
    paidOn: '29 Aug 2026, 10:24 AM',
    timeline: [
      { title: 'Order Placed', timestamp: '29 Aug 2026, 10:24 AM', completed: true },
      { title: 'Payment Confirmed', timestamp: '29 Aug 2026, 10:24 AM', completed: true },
      { title: 'Processing', timestamp: '29 Aug 2026, 10:30 AM', completed: true },
      { title: 'Shipped', timestamp: '29 Aug 2026, 02:15 PM', completed: true },
      { title: 'Delivered', timestamp: '30 Aug 2026, 11:20 AM', completed: true },
    ]
  },
  {
    id: '#ORD-9820',
    orderDate: '29 Aug 2026, 09:15 AM',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1 876 543 2109',
    customerAddress: '456 Oak Ave, San Francisco, CA 94102',
    products: [
      { name: 'Gaming Mouse', quantity: 1, unitPrice: '$27.50', subtotal: '$27.50' },
    ],
    itemsCount: 1,
    orderAmount: '$27.50',
    subtotal: '$27.50',
    discount: '$0.00',
    shipping: '$0.00',
    tax: '$0.00',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    paymentMethod: 'PayPal',
    transactionId: 'TXN-99283481',
    paidOn: '29 Aug 2026, 09:15 AM',
    timeline: [
      { title: 'Order Placed', timestamp: '29 Aug 2026, 09:15 AM', completed: true },
      { title: 'Payment Confirmed', timestamp: '29 Aug 2026, 09:15 AM', completed: true },
      { title: 'Processing', timestamp: '29 Aug 2026, 09:30 AM', completed: true },
      { title: 'Shipped', timestamp: 'Pending', completed: false },
      { title: 'Delivered', timestamp: 'Pending', completed: false },
    ]
  },
  {
    id: '#ORD-9819',
    orderDate: '29 Aug 2026, 08:45 AM',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    customerPhone: '+1 765 432 1098',
    customerAddress: '789 Pine Rd, Chicago, IL 60601',
    products: [
      { name: 'USB-C Cable Pack', quantity: 1, unitPrice: '$15.00', subtotal: '$15.00' },
    ],
    itemsCount: 1,
    orderAmount: '$15.00',
    subtotal: '$15.00',
    discount: '$0.00',
    shipping: '$0.00',
    tax: '$0.00',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-99283480',
    paidOn: 'Pending',
    timeline: [
      { title: 'Order Placed', timestamp: '29 Aug 2026, 08:45 AM', completed: true },
      { title: 'Payment Confirmed', timestamp: 'Pending', completed: false },
      { title: 'Processing', timestamp: 'Pending', completed: false },
      { title: 'Shipped', timestamp: 'Pending', completed: false },
      { title: 'Delivered', timestamp: 'Pending', completed: false },
    ]
  },
  {
    id: '#ORD-9818',
    orderDate: '28 Aug 2026, 07:30 PM',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah@example.com',
    customerPhone: '+1 654 321 0987',
    customerAddress: '321 Elm St, Austin, TX 78701',
    products: [
      { name: 'Mechanical Keyboard', quantity: 1, unitPrice: '$89.99', subtotal: '$89.99' },
    ],
    itemsCount: 1,
    orderAmount: '$89.99',
    subtotal: '$89.99',
    discount: '$0.00',
    shipping: '$0.00',
    tax: '$0.00',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    paymentMethod: 'Apple Pay',
    transactionId: 'TXN-99283479',
    paidOn: '28 Aug 2026, 07:30 PM',
    timeline: [
      { title: 'Order Placed', timestamp: '28 Aug 2026, 07:30 PM', completed: true },
      { title: 'Payment Confirmed', timestamp: '28 Aug 2026, 07:30 PM', completed: true },
      { title: 'Processing', timestamp: '28 Aug 2026, 08:00 PM', completed: true },
      { title: 'Shipped', timestamp: '29 Aug 2026, 08:00 AM', completed: true },
      { title: 'Delivered', timestamp: '29 Aug 2026, 04:00 PM', completed: true },
    ]
  },
  {
    id: '#ORD-9817',
    orderDate: '28 Aug 2026, 05:20 PM',
    customerName: 'David Brown',
    customerEmail: 'david@example.com',
    customerPhone: '+1 543 210 9876',
    customerAddress: '555 Birch Ln, Seattle, WA 98101',
    products: [
      { name: 'Wireless Headphones', quantity: 1, unitPrice: '$22.40', subtotal: '$22.40' },
    ],
    itemsCount: 1,
    orderAmount: '$22.40',
    subtotal: '$22.40',
    discount: '$0.00',
    shipping: '$0.00',
    tax: '$0.00',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-99283478',
    paidOn: '28 Aug 2026, 05:20 PM',
    timeline: [
      { title: 'Order Placed', timestamp: '28 Aug 2026, 05:20 PM', completed: true },
      { title: 'Payment Confirmed', timestamp: '28 Aug 2026, 05:20 PM', completed: true },
      { title: 'Processing', timestamp: '28 Aug 2026, 05:45 PM', completed: true },
      { title: 'Shipped', timestamp: 'Pending', completed: false },
      { title: 'Delivered', timestamp: 'Pending', completed: false },
    ]
  },
  {
    id: '#ORD-9816',
    orderDate: '28 Aug 2026, 05:05 PM',
    customerName: 'Emily Davis',
    customerEmail: 'emily@example.com',
    customerPhone: '+1 432 109 8765',
    customerAddress: '678 Maple St, Boston, MA 02108',
    products: [
      { name: 'Bluetooth Speaker', quantity: 2, unitPrice: '$31.60', subtotal: '$63.20' },
    ],
    itemsCount: 2,
    orderAmount: '$63.20',
    subtotal: '$63.20',
    discount: '$0.00',
    shipping: '$0.00',
    tax: '$0.00',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-99283477',
    paidOn: 'Pending',
    timeline: [
      { title: 'Order Placed', timestamp: '28 Aug 2026, 05:05 PM', completed: true },
      { title: 'Payment Confirmed', timestamp: 'Pending', completed: false },
      { title: 'Processing', timestamp: 'Pending', completed: false },
      { title: 'Shipped', timestamp: 'Pending', completed: false },
      { title: 'Delivered', timestamp: 'Pending', completed: false },
    ]
  },
  {
    id: '#ORD-9815',
    orderDate: '27 Aug 2026, 04:10 PM',
    customerName: 'William Taylor',
    customerEmail: 'william@example.com',
    customerPhone: '+1 321 098 7654',
    customerAddress: '901 Cedar Ave, Denver, CO 80202',
    products: [
      { name: 'Smart Watch', quantity: 1, unitPrice: '$35.60', subtotal: '$35.60' },
    ],
    itemsCount: 1,
    orderAmount: '$35.60',
    subtotal: '$35.60',
    discount: '$0.00',
    shipping: '$0.00',
    tax: '$0.00',
    paymentStatus: 'Paid',
    orderStatus: 'Cancelled',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-99283476',
    paidOn: '27 Aug 2026, 04:10 PM',
    timeline: [
      { title: 'Order Placed', timestamp: '27 Aug 2026, 04:10 PM', completed: true },
      { title: 'Payment Confirmed', timestamp: '27 Aug 2026, 04:10 PM', completed: true },
      { title: 'Processing', timestamp: 'Cancelled by customer', completed: false },
      { title: 'Shipped', timestamp: 'N/A', completed: false },
      { title: 'Delivered', timestamp: 'N/A', completed: false },
    ]
  },
  {
    id: '#ORD-9814',
    orderDate: '27 Aug 2026, 03:40 PM',
    customerName: 'Olivia Martinez',
    customerEmail: 'olivia@example.com',
    customerPhone: '+1 210 987 6543',
    customerAddress: '432 Walnut St, Miami, FL 33101',
    products: [
      { name: 'Gaming Mouse', quantity: 1, unitPrice: '$29.90', subtotal: '$29.90' },
      { name: 'USB Hub', quantity: 1, unitPrice: '$29.90', subtotal: '$29.90' },
    ],
    itemsCount: 2,
    orderAmount: '$59.80',
    subtotal: '$59.80',
    discount: '$0.00',
    shipping: '$0.00',
    tax: '$0.00',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    paymentMethod: 'PayPal',
    transactionId: 'TXN-99283475',
    paidOn: '27 Aug 2026, 03:40 PM',
    timeline: [
      { title: 'Order Placed', timestamp: '27 Aug 2026, 03:40 PM', completed: true },
      { title: 'Payment Confirmed', timestamp: '27 Aug 2026, 03:40 PM', completed: true },
      { title: 'Processing', timestamp: '27 Aug 2026, 04:00 PM', completed: true },
      { title: 'Shipped', timestamp: '28 Aug 2026, 09:00 AM', completed: true },
      { title: 'Delivered', timestamp: '28 Aug 2026, 03:30 PM', completed: true },
    ]
  },
  {
    id: '#ORD-9813',
    orderDate: '26 Aug 2026, 02:15 PM',
    customerName: 'James Anderson',
    customerEmail: 'james@example.com',
    customerPhone: '+1 109 876 5432',
    customerAddress: '876 Chestnut St, Portland, OR 97201',
    products: [
      { name: 'Mechanical Keyboard', quantity: 1, unitPrice: '$75.00', subtotal: '$75.00' }
    ],
    itemsCount: 1,
    orderAmount: '$75.00',
    subtotal: '$75.00',
    discount: '$0.00',
    shipping: '$0.00',
    tax: '$0.00',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-99283474',
    paidOn: '26 Aug 2026, 02:15 PM',
    timeline: [
      { title: 'Order Placed', timestamp: '26 Aug 2026, 02:15 PM', completed: true },
      { title: 'Payment Confirmed', timestamp: '26 Aug 2026, 02:15 PM', completed: true },
      { title: 'Processing', timestamp: '26 Aug 2026, 02:45 PM', completed: true },
      { title: 'Shipped', timestamp: '27 Aug 2026, 08:15 AM', completed: true },
      { title: 'Delivered', timestamp: '27 Aug 2026, 02:00 PM', completed: true },
    ]
  },
  {
    id: '#ORD-9812',
    orderDate: '26 Aug 2026, 11:30 AM',
    customerName: 'Sophia Thomas',
    customerEmail: 'sophia@example.com',
    customerPhone: '+1 098 765 4321',
    customerAddress: '543 Ash St, Phoenix, AZ 85001',
    products: [
      { name: 'Wireless Headphones', quantity: 1, unitPrice: '$45.00', subtotal: '$45.00' }
    ],
    itemsCount: 1,
    orderAmount: '$45.00',
    subtotal: '$45.00',
    discount: '$0.00',
    shipping: '$0.00',
    tax: '$0.00',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    paymentMethod: 'Apple Pay',
    transactionId: 'TXN-99283473',
    paidOn: '26 Aug 2026, 11:30 AM',
    timeline: [
      { title: 'Order Placed', timestamp: '26 Aug 2026, 11:30 AM', completed: true },
      { title: 'Payment Confirmed', timestamp: '26 Aug 2026, 11:30 AM', completed: true },
      { title: 'Processing', timestamp: '26 Aug 2026, 12:00 PM', completed: true },
      { title: 'Shipped', timestamp: '27 Aug 2026, 09:30 AM', completed: true },
      { title: 'Delivered', timestamp: '27 Aug 2026, 04:15 PM', completed: true },
    ]
  }
];

export const ORDERS_SUMMARY_CARDS = [
  { label: 'Total Orders', value: '1,248', trend: '12.4%', trendType: 'up', periodText: 'vs 01 Jul - 29 Jul', iconName: 'ShoppingBag', iconBg: 'bg-blue-100 text-blue-600' },
  { label: 'Completed', value: '820', trend: '14.6%', trendType: 'up', periodText: 'vs 01 Jul - 29 Jul', iconName: 'CheckCircle2', iconBg: 'bg-emerald-100 text-emerald-600' },
  { label: 'Processing', value: '210', trend: '5.7%', trendType: 'up', periodText: 'vs 01 Jul - 29 Jul', iconName: 'Clock', iconBg: 'bg-amber-100 text-amber-600' },
  { label: 'Pending', value: '152', trend: '-3.2%', trendType: 'down', periodText: 'vs 01 Jul - 29 Jul', iconName: 'Hourglass', iconBg: 'bg-purple-100 text-purple-600' },
  { label: 'Cancelled', value: '66', trend: '-8.1%', trendType: 'down', periodText: 'vs 01 Jul - 29 Jul', iconName: 'XCircle', iconBg: 'bg-red-100 text-red-600' },
  { label: 'Total Order Revenue', value: '$24,560.80', trend: '18.6%', trendType: 'up', periodText: 'vs 01 Jul - 29 Jul', iconName: 'DollarSign', iconBg: 'bg-cyan-100 text-cyan-600' },
];
