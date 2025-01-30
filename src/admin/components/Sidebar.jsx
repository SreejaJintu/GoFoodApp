import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.menu}>
        <li><Link to="/admin" style={styles.link}>Manage Orders</Link></li>
        <li><Link to="/admin/users" style={styles.link}>Manage Users</Link></li>
        <li><Link to="/admin/reports" style={styles.link}>Reports</Link></li>
        <li><Link to="/admin/manage-food-items" style={styles.link}>Manage Food Items</Link></li>

      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#34495e',
    color: '#fff',
    position: 'fixed',
    top: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  menu: {
    listStyleType: 'none',
    padding: '0',
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    padding: '10px 0',
    display: 'block',
  },
};

export default Sidebar;
