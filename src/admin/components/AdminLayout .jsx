import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';


const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Navbar />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
