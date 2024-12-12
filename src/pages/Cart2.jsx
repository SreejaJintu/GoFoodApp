import React from "react";
import { useStore } from "../context/StoreContext";
import './Cart2.css';

function Cart2() {
  const { cart, clearCart } = useStore();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleProceed = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage

    if (!user) {
      alert("You must be logged in to proceed with the order.");
      return;
    }

    const orderData = { 
        userId: user._id,        // Send only the user ID as the backend expects
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
      };
      

    try {
      const token = localStorage.getItem("authToken"); // Get the auth token from localStorage
      console.log("Auth Token:", token);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to place order. Please try again.");
        return;
      }

      alert("Order placed successfully!");
      clearCart(); // Clear the cart after successful order placement

    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-details">
                  <img
                    src={item.image || "https://via.placeholder.com/60"}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "5px",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <div className="cart-buttons">
              <button className="btn-clear" onClick={clearCart}>
                Clear Cart
              </button>
              <button
                className="btn-proceed"
                onClick={handleProceed}
                disabled={cart.length === 0 || totalAmount === 0}
              >
                Proceed
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart2;
