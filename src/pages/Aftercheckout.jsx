import React from 'react';
import { useStore } from '../context/StoreContext';
import './Cart.css';
import axios from 'axios'; // Assuming axios is being used for API requests

function Cart() {
  const { cart, removeFromCart, clearCart } = useStore();
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cart,
        totalAmount: totalAmount,
        date: new Date().toISOString()
      };

      const response = await axios.post('/order/orders', orderData);
      if (response.status === 201) {
        alert('Order placed successfully!');
        clearCart(); // Clear cart after successful order
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="cart-container">
      <h2 className="text-center">My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <div className="cart-total text-center">
            <h3>Total Price: ${totalAmount.toFixed(2)}</h3>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="btn btn-success" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
