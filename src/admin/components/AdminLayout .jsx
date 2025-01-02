import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.mainContent}>
        <Navbar />
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
  },
  mainContent: {
    marginLeft: '250px',
    width: 'calc(100% - 250px)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    padding: '20px',
    backgroundColor: '#ecf0f1',
    flex: '1',
  },
};

export default AdminLayout;
