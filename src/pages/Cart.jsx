import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';

function Cart() {
  const contextValue = useContext(CartContext);
  const cart = contextValue.cart;
  
  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x {item.size} @ ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
