import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  INITIAL_PRODUCTS,
  Customer,
  MOCK_CUSTOMERS,
  ApprovalRequest,
  INITIAL_APPROVALS,
  VendorAccount,
  VENDOR_ACCOUNTS,
} from '../mock-data/shopSenseData';

export type UserRole = 'vendor' | 'admin';

export interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: UserRole;
  avatar?: string;
  isLoggedIn: boolean;
}

interface ShopSenseContextType {
  user: UserProfile;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Products Catalog State
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'salesCount' | 'rating'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Product Approvals State
  approvals: ApprovalRequest[];
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;

  // Customers State
  customers: Customer[];

  // Vendors State
  vendors: VendorAccount[];

  // Global Toast
  toastMessage: { text: string; type?: 'success' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopSenseContext = createContext<ShopSenseContextType | undefined>(undefined);

export const ShopSenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default logged in user: Kavi (Vendor)
  const [user, setUser] = useState<UserProfile>({
    name: 'Kavi',
    email: 'vendor@demo.com',
    company: 'Kavi Enterprise',
    role: 'vendor',
    isLoggedIn: true,
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [vendors, setVendors] = useState<VendorAccount[]>(VENDOR_ACCOUNTS);
  const [toastMessage, setToastMessage] = useState<{ text: string; type?: 'success' | 'info' | 'error' } | null>(null);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 3200);
  };

  const login = (email: string, role: UserRole = 'vendor') => {
    if (role === 'admin' || email.includes('admin')) {
      setUser({
        name: 'Admin Director',
        email: email || 'admin@demo.com',
        company: 'ShopSense Global Marketplace HQ',
        role: 'admin',
        isLoggedIn: true,
      });
      showToast('Logged in as Marketplace Super-Admin');
    } else {
      setUser({
        name: 'Kavi',
        email: email || 'vendor@demo.com',
        company: 'Kavi Enterprise',
        role: 'vendor',
        isLoggedIn: true,
      });
      showToast('Welcome back, Kavi!');
    }
  };

  const logout = () => {
    setUser({
      name: '',
      email: '',
      company: '',
      role: 'vendor',
      isLoggedIn: false,
    });
    showToast('Signed out of ShopSense', 'info');
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'admin') {
      setUser({
        name: 'Admin Director',
        email: 'admin@demo.com',
        company: 'ShopSense Global Marketplace HQ',
        role: 'admin',
        isLoggedIn: true,
      });
      showToast('Switched to Super-Admin Console', 'info');
    } else {
      setUser({
        name: 'Kavi',
        email: 'vendor@demo.com',
        company: 'Kavi Enterprise',
        role: 'vendor',
        isLoggedIn: true,
      });
      showToast('Switched to Vendor Dashboard', 'info');
    }
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'salesCount' | 'rating'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      salesCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to catalog successfully!`, 'success');
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const approveRequest = (id: string) => {
    setApprovals((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
    );
    showToast('Product approval granted', 'success');
  };

  const rejectRequest = (id: string) => {
    setApprovals((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req))
    );
    showToast('Product submission rejected', 'error');
  };

  return (
    <ShopSenseContext.Provider
      value={{
        user,
        login,
        logout,
        switchRole,
        sidebarCollapsed,
        toggleSidebar,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        approvals,
        approveRequest,
        rejectRequest,
        customers,
        vendors,
        toastMessage,
        showToast,
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold border transition-all animate-in slide-in-from-bottom-5 duration-200 ${
            toastMessage.type === 'error'
              ? 'bg-rose-950 text-rose-200 border-rose-800'
              : toastMessage.type === 'info'
              ? 'bg-slate-900 text-slate-200 border-slate-700'
              : 'bg-[#06251F] text-teal-200 border-teal-600/50 shadow-teal-900/20'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              toastMessage.type === 'error'
                ? 'bg-rose-400'
                : toastMessage.type === 'info'
                ? 'bg-blue-400'
                : 'bg-teal-400 pulsing-dot'
            }`}
          />
          <span>{toastMessage.text}</span>
        </div>
      )}
    </ShopSenseContext.Provider>
  );
};

export const useShopSense = () => {
  const context = useContext(ShopSenseContext);
  if (!context) {
    throw new Error('useShopSense must be used within a ShopSenseProvider');
  }
  return context;
};
