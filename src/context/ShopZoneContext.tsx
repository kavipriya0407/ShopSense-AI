import React, { createContext, useContext, useState, useEffect } from 'react';
import { SHOPZONE_PRODUCTS, ShopZoneProduct } from '../mock-data/shopZoneData';

export interface CartItem {
  product: ShopZoneProduct;
  quantity: number;
  selectedColor?: string;
}

interface ShopZoneContextType {
  cart: CartItem[];
  wishlist: string[];
  searchQuery: string;
  selectedCategory: string;
  user: { name: string; email: string; isLoggedIn: boolean };
  toastMessage: string | null;
  addToCart: (product: ShopZoneProduct, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  showToast: (msg: string) => void;
  cartTotalMRP: number;
  cartDiscount: number;
  cartFinalTotal: number;
  cartItemCount: number;
}

const ShopZoneContext = createContext<ShopZoneContextType | undefined>(undefined);

export const ShopZoneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default cart with 2 items matching Screen 4 in user's image!
  const [cart, setCart] = useState<CartItem[]>([
    { product: SHOPZONE_PRODUCTS[0], quantity: 1, selectedColor: 'Blue' }, // Samsung Galaxy M14 5G
    { product: SHOPZONE_PRODUCTS[1], quantity: 1, selectedColor: 'Luscious Black' }, // boAt Rockerz 450
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['samsung-m14', 'nike-running-shoes']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [user, setUser] = useState({ name: 'Vikram', email: 'vikram@example.com', isLoggedIn: false });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const addToCart = (product: ShopZoneProduct, quantity = 1, color?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, selectedColor: color || item.selectedColor }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor: color || product.colors[0]?.name }];
    });
    showToast(`Added ${product.name} to Cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from Wishlist' : 'Added to Wishlist ❤️');
      return updated;
    });
  };

  const login = (email: string, name = 'Valued Customer') => {
    setUser({ name, email, isLoggedIn: true });
    showToast(`Welcome back, ${name}!`);
  };

  const logout = () => {
    setUser({ name: '', email: '', isLoggedIn: false });
    showToast('Logged out successfully');
  };

  // Calculations matching Screen 4
  const cartTotalMRP = cart.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const cartFinalTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = cartTotalMRP - cartFinalTotal;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopZoneContext.Provider
      value={{
        cart,
        wishlist,
        searchQuery,
        selectedCategory,
        user,
        toastMessage,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        setSearchQuery,
        setSelectedCategory,
        login,
        logout,
        showToast,
        cartTotalMRP,
        cartDiscount,
        cartFinalTotal,
        cartItemCount,
      }}
    >
      {children}
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131921] text-white px-5 py-3 rounded-xl shadow-2xl border border-orange-500/50 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}
    </ShopZoneContext.Provider>
  );
};

export const useShopZone = () => {
  const context = useContext(ShopZoneContext);
  if (!context) {
    throw new Error('useShopZone must be used within a ShopZoneProvider');
  }
  return context;
};
