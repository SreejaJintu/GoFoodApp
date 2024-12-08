import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './CheckoutForm.css';

function CheckoutForm({ totalAmount, cart }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create a payment intent on the server
      const { data: clientSecret } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/payment/create-payment-intent`,
        { amount: totalAmount * 100 } // Amount in cents
      );

      // Confirm the payment on the client
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else {
        setPaymentSuccess(true);
        alert('Payment successful! Thank you for your order.');

        // Redirect to order confirmation page or another page
        navigate('/'); // Change '/order-confirmation' to your desired route
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement className="card-element" />
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn btn-success" disabled={isProcessing || paymentSuccess}>
        {isProcessing ? 'Processing...' : 'Pay $' + totalAmount.toFixed(2)}
      </button>
    </form>
  );
}

export default CheckoutForm;
