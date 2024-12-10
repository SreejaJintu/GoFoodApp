import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import './Payment.css';

// Load Stripe with publishable key from the .env file
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Payment() {
  const location = useLocation();
  const { cart, totalAmount } = location.state || { cart: [], totalAmount: 0 };

  return (
    <div className="payment-container">
      <h2 className="text-center">Payment Page</h2>
      <div className="payment-summary">
        <h3>Order Summary</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity}: ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
      </div>
      <div className="payment-form">
        <h3>Enter Payment Details</h3>
        {/* Stripe Elements Wrapper */}
        <Elements stripe={stripePromise}>
          <CheckoutForm totalAmount={totalAmount} cart={cart} />
        </Elements>
      </div>
    </div>
  );
}

export default Payment;
