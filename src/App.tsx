import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShopSenseProvider } from './context/ShopSenseContext';
import { ShopZoneProvider } from './context/ShopZoneContext';
import { ShopSenseLayout } from './components/layout/ShopSenseLayout';

// Authentication
import { Login } from './pages/Login';

// Customer Storefront & Buyer Pages
import { Storefront } from './pages/Storefront';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/CartPage';
import { Orders } from './pages/Orders';
import { CompanyReviews } from './pages/CompanyReviews';
import { ProductReviewsPage } from './pages/ProductReviewsPage';
import { AiAssistant as BuyerAiAssistant } from './pages/AiAssistant';
import { AiDataAnalyst } from './pages/AiDataAnalyst';
import { Analytics } from './pages/Analytics';
import { Benchmarking } from './pages/Benchmarking';
import { Reports } from './pages/Reports';

// Vendor Hub Pages
import { VendorDashboard } from './pages/vendor/VendorDashboard';
import { MyCatalog } from './pages/vendor/MyCatalog';
import { AddProduct } from './pages/vendor/AddProduct';
import { Insights } from './pages/vendor/Insights';
import { AiAssistant as VendorAiAssistant } from './pages/vendor/AiAssistant';
import { VendorProfile } from './pages/vendor/VendorProfile';

// Super-Admin Console Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CustomerAnalytics } from './pages/admin/CustomerAnalytics';
import { AdminVendors } from './pages/admin/AdminVendors';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminApprovals } from './pages/admin/AdminApprovals';
import { AdminRevenue } from './pages/admin/AdminRevenue';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminSettings } from './pages/admin/AdminSettings';

export const App: React.FC = () => {
  return (
    <ShopSenseProvider>
      <ShopZoneProvider>
        <BrowserRouter>
          <Routes>
            {/* Buyer Commerce Marketplace Experience */}
            <Route path="/" element={<Storefront />} />
            <Route path="/storefront" element={<Storefront />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/company-reviews" element={<CompanyReviews />} />
            <Route path="/product-reviews" element={<ProductReviewsPage />} />
            <Route path="/buyer-assistant" element={<BuyerAiAssistant />} />
            <Route path="/analyst" element={<AiDataAnalyst />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/benchmarking" element={<Benchmarking />} />
            <Route path="/reports" element={<Reports />} />

            {/* Authentication Gateway */}
            <Route path="/login" element={<Login />} />

            {/* Unified LUMEN Management Console */}
            <Route element={<ShopSenseLayout />}>
              {/* Merchant Hub */}
              <Route path="/dashboard" element={<VendorDashboard />} />
              <Route path="/catalog" element={<MyCatalog />} />
              <Route path="/my-catalog" element={<MyCatalog />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/ai-assistant" element={<VendorAiAssistant />} />
              <Route path="/profile" element={<VendorProfile />} />

              {/* Super-Admin Platform Matrix */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/customers" element={<CustomerAnalytics />} />
              <Route path="/admin/vendors" element={<AdminVendors />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/approvals" element={<AdminApprovals />} />
              <Route path="/admin/revenue" element={<AdminRevenue />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>

            {/* Fallback Redirects */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ShopZoneProvider>
    </ShopSenseProvider>
  );
};

export default App;

