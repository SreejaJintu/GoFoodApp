// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './MyOrders.css';

// function MyOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const backendURL = process.env.REACT_APP_BACKEND_URL;
    
//         if (!token) {
//           throw new Error('User not authenticated');
//         }
    
//         const response = await axios.get(`${backendURL}/order/my-orders`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
    
//         setOrders(response.data.orders);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchOrders();
//   }, []);

//   if (loading) return <p>Loading orders...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="my-orders-container">
//       <h2>My Orders</h2>
//       {orders.length === 0 ? (
//         <p>You haven't placed any orders yet.</p>
//       ) : (
//         <ul className="orders-list">
//           {orders.map((order) => (
//             <li key={order._id} className="order-item">
//               <h4>Order #{order._id}</h4>
//               <p className={`status-${order.status.toLowerCase()}`}>Status: {order.status}</p>
//               <p className="total-amount">Total Amount: ${order.totalAmount.toFixed(2)}</p>
//               <p className="ordered-date">
//                 Ordered At: {new Date(order.createdAt).toLocaleString()}
//               </p>
//               <h5>Items:</h5>
//               <ul>
//                 {order.items.map((item, index) => (
//                   <li key={index}>
//                     {item.quantity}x {item.name} ({item.size}) - ${item.price.toFixed(2)}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default MyOrders;
import React, { useEffect, useState } from 'react';
import './MyOrders.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const backendURL = process.env.REACT_APP_BACKEND_URL;
  
        if (!token) {
          throw new Error('User not authenticated');
        }
  
        const response = await fetch(`${backendURL}/order/my-orders`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch orders');
        }
  
        const data = await response.json();
        console.log("Fetched Orders:", data.orders); // Debug log
        setOrders(data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err.message); // Debug log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <h4>Order #{order._id}</h4>
              <p className={`status-${order.status.toLowerCase()}`}>Status: {order.status}</p>
              <p className="total-amount">Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <p className="ordered-date">
                Ordered At: {new Date(order.createdAt).toLocaleString()}
              </p>
              <h5>Items:</h5>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.quantity}x {item.name} ({item.size}) - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyOrders;

