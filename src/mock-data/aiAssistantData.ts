export interface ProductRecommendation {
  id: string;
  name: string;
  price: string;
  rating: number;
  reviewsCount: number;
  specs: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendations?: ProductRecommendation[];
}

export interface ConversationHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}

export const INITIAL_CONVERSATION_HISTORY: ConversationHistoryItem[] = [
  { id: 'c-1', title: 'Best noise cancelling headphones', timestamp: '2 hours ago' },
  { id: 'c-2', title: 'Top selling smart watches under $100', timestamp: 'Yesterday' },
  { id: 'c-3', title: 'High conversion wireless speakers', timestamp: '3 days ago' },
  { id: 'c-4', title: 'Inventory restocking recommendations', timestamp: '1 week ago' },
];

export const MOCK_RECOMMENDATIONS: ProductRecommendation[] = [
  {
    id: 'p-1',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    price: '$398.00',
    rating: 4.8,
    reviewsCount: 1420,
    specs: 'Industry leading noise canceling, 30hr battery',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
  },
  {
    id: 'p-2',
    name: 'Bose QuietComfort Ultra Headphones',
    price: '$379.00',
    rating: 4.7,
    reviewsCount: 980,
    specs: 'Spatial audio, World-class ANC, 24hr battery',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&q=80',
  },
  {
    id: 'p-3',
    name: 'Sennheiser Momentum 4 Wireless',
    price: '$299.95',
    rating: 4.6,
    reviewsCount: 650,
    specs: '60hr battery life, Audiophile sound quality',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=80',
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'user',
    text: 'What are the top noise cancelling headphones currently trending in our category?',
    timestamp: '10:14 AM',
  },
  {
    id: 'm-2',
    sender: 'ai',
    text: 'Based on customer purchase frequency and marketplace benchmark ratings, here are the top 3 noise-cancelling headphones leading sales in your market segment:',
    timestamp: '10:14 AM',
    recommendations: MOCK_RECOMMENDATIONS,
  },
];

export const SUGGESTION_CHIPS = [
  'Best noise cancelling headphones',
  'Compare smart watch margins',
  'Top rated gaming accessories',
  'Fastest growing electronics',
];
