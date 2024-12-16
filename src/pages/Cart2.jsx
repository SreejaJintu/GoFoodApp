// import React, { useState } from "react";
// import { useStore } from "../context/StoreContext";
// import './Cart2.css';
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// function Cart2() {

//   const { cart, clearCart } = useStore();
//   const [clientSecret, setClientSecret] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);

//   const totalAmount = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handleProceed = async () => {
//     const userId = localStorage.getItem('userId');
//     const authToken = localStorage.getItem('authToken');

//     if (!authToken || !userId) {
//       alert("You must be logged in to proceed with the order.");
//       return;
//     }

//     const orderData = { 
//         userId,     
//         items: cart.map((item) => ({
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//         })),
//         totalAmount,
//       };
      
//     try {
//       console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
//       console.log("Auth Token:", authToken);
//       console.log("userId:", userId);
//       const backendURL = process.env.REACT_APP_BACKEND_URL;

    
//         const response = await fetch(`${backendURL}/order/create`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json' 
//           },
//           body: JSON.stringify(orderData),
//         });

//       const result = await response.json();

//       if (!response.ok) {
//         alert(result.message || "Failed to place order. Please try again.");
//         return;
//       }

//       alert("Order placed successfully!");
//       clearCart(); 

//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("An error occurred while placing the order.");
//     }
//   };

//   return (
//     <div className="cart-container">
//       <h2 className="cart-title">My Cart</h2>

//       {cart.length === 0 ? (
//         <p className="empty-cart">Your cart is empty.</p>
//       ) : (
//         <>
//           <ul className="cart-list">
//             {cart.map((item, index) => (
//               <li key={index} className="cart-item">
//                 <div className="cart-item-details">
//                   <img
//                     src={item.image || "https://via.placeholder.com/60"}
//                     alt={item.name}
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       borderRadius: "5px",
//                       marginRight: "15px",
//                     }}
//                   />
//                   <div>
//                     <h4>{item.name}</h4>
//                     <p>Price: ${item.price.toFixed(2)}</p>
//                     <p>Quantity: {item.quantity}</p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <div className="cart-footer">
//             <h3>Total: ${totalAmount.toFixed(2)}</h3>
//             <div className="cart-buttons">
//               <button className="btn-clear" onClick={clearCart}>
//                 Clear Cart
//               </button>
//               <button
//                 className="btn-proceed"
//                 onClick={handleProceed}
//                 disabled={cart.length === 0 || totalAmount === 0}
//               >
//                 Proceed
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart2;
import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Cart2.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Cart2() {
  const { cart, clearCart } = useStore();
  const [clientSecret, setClientSecret] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [orderSuccess, setOrderSuccess] = useState(false);

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
      // setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.message || "Failed to place order.");
        return;
      }

      setClientSecret(result.clientSecret); 
      alert("Order created, ready to make payment!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred.");
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
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <button className="btn-proceed" onClick={handleProceed}>
            Proceed to Payment
          </button>

          {clientSecret && (
           <Elements stripe={stripePromise} options={{ clientSecret }}>
           <PaymentForm
             clientSecret={clientSecret}  // Pass clientSecret as a prop
             clearCart={clearCart}
            //  setOrderSuccess={setOrderSuccess}
           />
         </Elements>
         
          )}
        </>
      )}
    </div>
  );
}

function PaymentForm({ clientSecret, clearCart, setOrderSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    const { error} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } else {
      alert("Payment successful!");
      clearCart();
      setOrderSuccess(true);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
export default Cart2;
