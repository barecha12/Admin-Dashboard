import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Placeholder from './pages/Placeholder';
import ProtectedRoute from './components/auth/ProtectedRoute';

/**
 * Main App Router
 * Orchestrates the professional dashboard modules
 * Connected to a modular folder structure for scale
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Dashboard Layout Wrapper */}
        <Route path="/" element={<MainLayout />}>
          {/* Index Route redirects to Dashboard Overview */}
          <Route index element={<Dashboard />} />
          
          {/* User Management Module */}
          <Route path="users" element={<Users />} />
          
          {/* Analytics & BI Module */}
          <Route path="analytics" element={<Analytics />} />
          
          {/* Operations */}
          <Route path="orders" element={<Placeholder title="Orders" description="Manage pending, completed, refunds, and payments." />} />
          <Route path="orders/pending" element={<Placeholder title="Orders • Pending" />} />
          <Route path="orders/completed" element={<Placeholder title="Orders • Completed" />} />
          <Route path="orders/refunds" element={<Placeholder title="Orders • Refunds" />} />
          <Route path="orders/payments" element={<Placeholder title="Orders • Payments" />} />
          <Route path="products" element={<Placeholder title="Products" description="Catalog, categories, tags, and stock." />} />
          <Route path="products/categories" element={<Placeholder title="Products • Categories" />} />
          <Route path="products/stock" element={<Placeholder title="Products • Inventory" />} />
          <Route path="products/reviews" element={<Placeholder title="Products • Reviews" />} />
          <Route path="customers" element={<Placeholder title="Customers" description="Profiles, support tickets, and messages." />} />
          <Route path="marketing" element={
            <ProtectedRoute allowed={['manager','admin']}>
              <Placeholder title="Marketing" description="Campaigns, coupons, and affiliates." />
            </ProtectedRoute>
          } />
          <Route path="marketing/campaigns" element={<ProtectedRoute allowed={['manager','admin']}><Placeholder title="Marketing • Campaigns" /></ProtectedRoute>} />
          <Route path="marketing/coupons" element={<ProtectedRoute allowed={['manager','admin']}><Placeholder title="Marketing • Coupons" /></ProtectedRoute>} />
          <Route path="marketing/affiliates" element={<ProtectedRoute allowed={['manager','admin']}><Placeholder title="Marketing • Affiliates" /></ProtectedRoute>} />
          <Route path="marketing/notifications" element={<ProtectedRoute allowed={['manager','admin']}><Placeholder title="Marketing • Push / Email" /></ProtectedRoute>} />
          <Route path="files" element={<Placeholder title="File Manager" description="Uploads, media gallery, and documents." />} />
          
          {/* System */}
          <Route path="reports" element={<Placeholder title="Reports" description="Revenue, traffic, and operational reports." />} />
          <Route path="content" element={<Placeholder title="Content" description="Posts, pages, media, and moderation." />} />
          <Route path="content/posts" element={<Placeholder title="Content • Posts" />} />
          <Route path="content/media" element={<Placeholder title="Content • Media" />} />
          <Route path="content/pages" element={<Placeholder title="Content • Pages" />} />
          <Route path="content/comments" element={<Placeholder title="Content • Comments" />} />
          <Route path="system" element={<ProtectedRoute allowed={['admin']}><Placeholder title="System Management" description="API keys, integrations, logs, backups." /></ProtectedRoute>} />
          <Route path="system/api" element={<ProtectedRoute allowed={['admin']}><Placeholder title="System • API Keys" /></ProtectedRoute>} />
          <Route path="system/integrations" element={<ProtectedRoute allowed={['admin']}><Placeholder title="System • Integrations" /></ProtectedRoute>} />
          <Route path="system/logs" element={<ProtectedRoute allowed={['admin']}><Placeholder title="System • Logs" /></ProtectedRoute>} />
          <Route path="system/backup" element={<ProtectedRoute allowed={['admin']}><Placeholder title="System • Backup" /></ProtectedRoute>} />
          <Route path="support" element={<ProtectedRoute allowed={['support','admin']}><Placeholder title="Support" description="Help center, docs, and contact." /></ProtectedRoute>} />
          <Route path="tasks" element={<Placeholder title="Tasks & Activity" description="Activity timeline and pending tasks." />} />
          <Route path="settings" element={<Placeholder title="Settings" description="General, payments, email, security, languages." />} />
          
          {/* Default redirect for 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
