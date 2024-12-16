import React, { useState} from "react";
import { useStore } from "../context/StoreContext";
import "./Cart2.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Cart3() {

    const [isOrderPlaced, setIsOrderPlaced] = useState(false); 
    const stripe = useStripe();
    const elements = useElements();
  const { cart, clearCart } = useStore();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);




  const handleProceed = async () => {

    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    if (!authToken || !userId) {
      alert("You must be logged in to proceed with the order.");
      return;
    }

    const orderData = {
      userId,
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
    };

    try {
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendURL}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
     
      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to place order. Please try again.");
        return;
      }

      alert("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  const handleStripePayment = async () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    setIsLoading(true);

    try {
        const userId = localStorage.getItem("userId");

        const orderData = {
            userId,
            items: cart.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            totalAmount,
          };
      
      // Request clientSecret from the backend
      const response = await fetch(`${backendURL}/payment/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData), // Stripe accepts amount in cents
      });
      const { clientSecret } = await response.json();

      setClientSecret(clientSecret);
    } catch (error) {
      console.error("Error creating PaymentIntent:", error);
      alert("Payment failed.");
    }
    setIsLoading(false);
  };

  return (
    <Elements stripe={stripePromise}>
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
                  Place Order
                </button>

                {/* Stripe Payment Button */}
                <button
                  className="btn-proceed stripe-btn"
                  onClick={handleStripePayment}
                  disabled={isLoading || cart.length === 0 || totalAmount === 0}
                >
                  {isLoading ? "Loading..." : "Pay with Stripe"}
                </button>
              </div>

              {/* Show Stripe Form */}
              {clientSecret && (
                <StripeCheckoutForm clientSecret={clientSecret} clearCart={clearCart} />
              )}
            </div>
          </>
        )}
      </div>
    </Elements>
  );
}

function StripeCheckoutForm({ clientSecret, clearCart }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      console.error(error);
      alert("Payment failed: " + error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful! Order complete.");
      clearCart();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Complete your Payment</h3>
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      <button type="submit" disabled={loading || !stripe}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default Cart3;
