import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('http://localhost:5000/admin/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      });
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/admin/orders/${id}`, { status });
    setOrders(orders.map(order => order._id === id ? { ...order, status } : order));
  };

  return (
    <div className="manage-orders">
      <h2>Manage Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId.name}</td>
              <td>${order.totalAmount}</td>
              <td>{order.status}</td>
              <td>
                <select onChange={(e) => updateOrderStatus(order._id, e.target.value)} value={order.status}>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
