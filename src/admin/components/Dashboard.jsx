import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-sections">
        <Link to="/admin/orders" className="section-link">Manage Orders</Link>
        <Link to="/admin/users" className="section-link">Manage Users</Link>
        <Link to="/admin/menu" className="section-link">Manage Menu</Link>
        <Link to="/admin/analytics" className="section-link">Analytics</Link>
      </div>
    </div>
  );
};

export default Dashboard;
