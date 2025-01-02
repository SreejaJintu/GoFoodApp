import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  const token = localStorage.getItem('authToken');

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        throw new Error('Auth token is missing. Please log in.');
      }

      const response = await fetch(`${backendURL}/admin/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrders = async (orderId, updatedData) => {
    try {
      const response = await fetch(`${backendURL}/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order with status ${response.status}`);
      }

      const updatedOrder = await response.json();
      console.log('Order updated successfully:', updatedOrder);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, ...updatedData } : order
        )
      );
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      {loading && <p style={styles.message}>Loading orders...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={styles.tableRow}>
                <td>{order._id}</td>
                <td>${order.totalAmount}</td>
                <td>
                  <span style={styles.statusBadge(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status !== 'Delivered' ? (
                    <button
                      onClick={() => updateOrders(order._id, { status: 'Delivered' })}
                      style={styles.button}
                    >
                      Change
                    </button>
                  ) : (
                    <span style={styles.statusBadge(order.status)}>Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f6f8',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#3498db',
    color: '#fff',
    textAlign: 'left',
    padding: '10px',
  },
  tableRow: {
    backgroundColor: '#fff',
    transition: 'background-color 0.3s',
  },
  tableRowHover: {
    backgroundColor: '#f0f4f8',
  },
  message: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    fontSize: '16px',
    color: 'red',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  statusBadge: (status) => ({
    padding: '5px 10px',
    borderRadius: '20px',
    color: status === 'Delivered' ? 'green' : 'red',
    backgroundColor: status === 'Delivered' ? '#e0f7fa' : '#f8d7da',
  }),
};

export default Dashboard;
