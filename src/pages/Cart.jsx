import React from 'react';
import { useStore } from '../context/StoreContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, clearCart } = useStore();
  const navigate = useNavigate();
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePaymentRedirect = () => {
    navigate('/payment', { state: { cart, totalAmount } });
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
            <button className="btn btn-success" onClick={handlePaymentRedirect}>
              Make Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
