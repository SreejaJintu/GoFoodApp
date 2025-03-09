import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Cart4() {
  const { cart, clearCart, removeFromCart } = useStore();
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);   

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  console.log("Cart data:", cart);

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
        itemId:item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image:item.image
      })),
      totalAmount,
    };

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        setClientSecret(data.clientSecret);
        setOrderCreated(true);
        console.log("userdetails", data);
      } else {
        alert(data.message || "Failed to create order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>

      {cart.length === 0 && !orderPlaced ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : orderPlaced ? (
        <p className="empty-cart">Your order will be delivered soon.</p>
      ) : (
        <>
          <ul className="cart-list">
            
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-details flex ">
                  <div>
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div>
                  <img src={item.image} alt=""></img>
                  <button type="button" className="btn btn-danger" onClick={() => {
                      console.log("Item ID in cart:", item._id);
                      console.log("Removing item with ID:", item._id);
                      removeFromCart(item._id);
                    }}>Remove</button>

                 
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-actions">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <button className="btn-clear-cart" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          {!orderCreated && (
            <button
              className="btn-proceed"
              onClick={handleProceed}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create Order"}
            </button>
          )}

          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm
                setOrderPlaced={setOrderPlaced}
                clearCart={clearCart}
                clientSecret={clientSecret}
              />
            </Elements>
          )}
        </>
      )}
    </div>
  );
}

function PaymentForm({ clientSecret, clearCart, setOrderPlaced }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
      console.log(paymentIntent);
      if (error) {
        console.error("Payment failed:", error);
        alert("Payment failed. Please try again.");
      } else {
        clearCart();
        setOrderPlaced(true);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="payment-form">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#aab7c4" },
                padding: "10px",
              },
              invalid: { color: "#e5424d" },
            },
          }}
          className="card-element"
        />
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`pay-now-button ${isProcessing ? "disabled" : ""}`}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Order Confirmed!</h2>
            <p>Payment successful! Your order will be delivered soon.</p>
            <p>You will be redirected to the home page shortly.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart4;
