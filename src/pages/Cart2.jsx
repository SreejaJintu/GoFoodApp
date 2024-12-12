import React from "react";
import { useStore } from "../context/StoreContext";

function Cart2() {
  const { cart, removeFromCart, clearCart, user } = useStore(); // Access user from context

  const handleProceed = async () => {
    if (!user) {
      alert("You must be logged in to proceed with the order.");
      return;
    }

    const orderData = {
      user: {
        id: user._id, // Assuming `user` has an `id` field
        name: user.name,
        email: user.email,
      },
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });
      

      if (response.ok) {
        const result = await response.json();
        if (response.ok) {
          console.log("Order response:", result);
        }
        alert("Order placed successfully!");
        clearCart(); 
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  style={{
                    padding: "5px 10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s, transform 0.2s",
                  }}
                  onClick={() => removeFromCart(item.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <div className="cart-buttons">
              <button className="btn-clear" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="btn-proceed" onClick={handleProceed}>
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
