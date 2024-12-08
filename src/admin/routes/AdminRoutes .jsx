import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManageUsers from './pages/ManageUsers';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import AdminLayout from './AdminLayout';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
