import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ManageUsers from '../pages/ManageUsers';
import Reports from '../pages/Reports';
import AdminLayout from '../components/AdminLayout ';
import ManageFoodItems from '../pages/ManageFoodItems';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="reports" element={<Reports />} />
        <Route path="manage-food-items" element={<ManageFoodItems />} />

      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
