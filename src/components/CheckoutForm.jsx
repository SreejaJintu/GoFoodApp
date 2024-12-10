import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './CheckoutForm.css';

const backendURL = process.env.REACT_APP_BACKEND_URL;

function CheckoutForm({ totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setIsProcessing(true); // Disable the submit button

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again later.');
      setIsProcessing(false);
      return;
    }

    try {
      // Step 1: Create a payment intent on the backend
      const { data: clientSecret } = await axios.post(`${backendURL}/payment/create-payment-intent`, { 
        amount: totalAmount * 100  // Amount should be in cents
      });

      console.log('Client Secret:', clientSecret);

      // Step 2: Confirm the payment on the client side
      const { error: stripeError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        console.error('Payment error:', stripeError.message);
      } else {
        setPaymentSuccess(true);
        alert('Payment successful! Thank you for your order.');
      }

    } catch (error) {
      console.error('Error creating payment intent:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false); // Re-enable the submit button
    }
  };

  return (
    <form onSubmit={handlePayment} className="checkout-form">
      <CardElement className="card-element" />
      {error && <p className="error">{error}</p>}
      <button 
        type="submit" 
        className="btn btn-success" 
        disabled={isProcessing || paymentSuccess}
      >
        {isProcessing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
}

export default CheckoutForm;
