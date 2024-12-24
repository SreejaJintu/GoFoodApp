// import React, { useEffect, useCallback, useState } from 'react';

// const Dashboard = () => {
//   const [orders, setOrders] = useState([]);

//   // ✅ Memoized fetchOrders function to avoid infinite re-renders
//   const fetchOrders = useCallback(async () => {
//     try {
//       const response = await fetch('/admin/orders');
//       const data = await response.json();
//       setOrders(data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   }, []); // No dependencies, so this function is memoized

//   // ✅ updateOrders function to update a specific order's status
//   const updateOrders = async (orderId, updatedData) => {
//     try {
//       const response = await fetch(`/admin/orders/${orderId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedData),
//       });

//       if (!response.ok) throw new Error('Failed to update order');

//       // After successful update, re-fetch the list of orders
//       await fetchOrders();
//     } catch (error) {
//       console.error('Error updating order:', error);
//     }
//   };

//   // ✅ Call fetchOrders when the component mounts
//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]); // Runs on component mount and whenever fetchOrders changes

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
      
//       <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>User</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map(order => (
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               <td>{order.user}</td>
//               <td>${order.amount}</td>
//               <td>{order.status}</td>
//               <td>
//               <button 
//   onClick={() => updateOrders(order.id, { status: 'completed' })} 
//   disabled={order.status === 'completed'}
// >
//   {order.status === 'completed' ? 'Completed' : 'Mark as Completed'}
// </button>

//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  // const [updatingOrderId, setUpdatingOrderId] = useState(null); // Track which order is being updated
  const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      const token = localStorage.getItem('authToken');
       console.log(token)
  const fetchOrders = async () => {
    setLoading(true);
    setError(null); // Clear any previous error
    try {
      if (!token) {
        throw new Error('Auth token is missing. Please log in.');
      }

      const response = await fetch(`${backendURL}/admin/orders`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError(error.message); // Save the error message to display
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
  
      // Update the local state to reflect the changes
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
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} (x{item.quantity})
                    </div>
                  ))}
                </td>
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
      Mark as Delivered
    </button>
  ) : (
    <span style={styles.statusBadge(order.status)}>Delivered</span>
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
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
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
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  statusBadge: (status) => ({
    padding: '5px 10px',
    borderRadius: '20px',
    color: status === 'Delivered' ? 'green' : 'red',
    backgroundColor: status === 'Delivered' ? '#e0f7fa' : '#f8d7da',
  }),
  buttonDisabled: {
    backgroundColor: '#d3d3d3',
    cursor: 'not-allowed',
  },
};

export default Dashboard;
