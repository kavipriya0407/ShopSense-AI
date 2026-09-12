import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShopZoneProvider } from './context/ShopZoneContext';
import { Storefront } from './pages/Storefront';
import { Login } from './pages/Login';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/CartPage';
import { CompanyReviews } from './pages/CompanyReviews';
import { ProductReviewsPage } from './pages/ProductReviewsPage';
import { Analytics } from './pages/Analytics';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Benchmarking } from './pages/Benchmarking';
import { Orders } from './pages/Orders';
import { Reports } from './pages/Reports';
import { AiAssistant } from './pages/AiAssistant';
import { AiDataAnalyst } from './pages/AiDataAnalyst';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminVendors } from './pages/admin/AdminVendors';
import { AdminDisputes } from './pages/admin/AdminDisputes';
import { AdminCategories } from './pages/admin/AdminCategories';

export const App: React.FC = () => {
  return (
    <ShopZoneProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer Storefront Routes */}
          <Route path="/" element={<Storefront />} />
          <Route path="/shop" element={<Storefront />} />
          <Route path="/store" element={<Storefront />} />

          {/* Authentication Page */}
          <Route path="/login" element={<Login />} />

          {/* Product Details */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product" element={<ProductDetails />} />

          {/* Cart & Checkout */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CartPage />} />

          {/* Reviews & Social Proof */}
          <Route path="/company-reviews" element={<CompanyReviews />} />
          <Route path="/reviews" element={<CompanyReviews />} />
          <Route path="/product-reviews" element={<ProductReviewsPage />} />
          <Route path="/product/:id/reviews" element={<ProductReviewsPage />} />

          {/* Storefront Analytics */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/business-analytics" element={<Analytics />} />

          {/* Vendor Intelligence & Super-Admin Portal */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/benchmarking" element={<Benchmarking />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/ai-assistant" element={<AiAssistant />} />
            <Route path="/ai-data-analyst" element={<AiDataAnalyst />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/vendors" element={<AdminVendors />} />
            <Route path="/admin/disputes" element={<AdminDisputes />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ShopZoneProvider>
  );
};

export default App;




