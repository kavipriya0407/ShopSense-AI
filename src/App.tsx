import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Benchmarking } from './pages/Benchmarking';
import { Orders } from './pages/Orders';
import { Reports } from './pages/Reports';
import { AiAssistant } from './pages/AiAssistant';
import { AiDataAnalyst } from './pages/AiDataAnalyst';

// Admin Portal Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminVendors } from './pages/admin/AdminVendors';
import { AdminDisputes } from './pages/admin/AdminDisputes';
import { AdminCategories } from './pages/admin/AdminCategories';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Shell Layout Wrapping All Pages */}
        <Route element={<DashboardLayout />}>
          {/* Vendor Portal Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/benchmarking" element={<Benchmarking />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route path="/ai-data-analyst" element={<AiDataAnalyst />} />

          {/* Super-Admin Portal Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/vendors" element={<AdminVendors />} />
          <Route path="/admin/disputes" element={<AdminDisputes />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
        </Route>

        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
