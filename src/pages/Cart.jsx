// import React from 'react';
// import { useStore } from '../context/StoreContext';
// import { useNavigate } from 'react-router-dom';
// import './Cart.css'

// function Cart() {
//   const { cart, removeFromCart, clearCart } = useStore();
//   const navigate = useNavigate();
//   const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   const handleRemoveItem = (itemName) => {
//     removeFromCart(itemName); // Functionality to remove the item from the cart
//   };

//   const handlePaymentRedirect = () => {
//     navigate('/payment', { state: { cart, totalAmount } });
//   };

//   return (
//     <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', fontFamily: 'Arial, sans-serif' }}>
//       <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>My Cart</h2>
//       {cart.length === 0 ? (
//         <p style={{ textAlign: 'center', fontSize: '18px', color: '#777' }}>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul style={{ listStyleType: 'none', padding: '0' }}>
//             {cart.map((item, index) => (
//               <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', marginBottom: '15px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)' }}>
//                 <div style={{ flex: '1', paddingRight: '15px' }}>
//                   <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>{item.name}</h4>
//                   <p style={{ fontSize: '16px', margin: '5px 0', color: '#555' }}>Price: ${item.price.toFixed(2)}</p>
//                   <p style={{ fontSize: '16px', margin: '5px 0', color: '#555' }}>Quantity: {item.quantity}</p>
//                   <p style={{ fontSize: '16px', margin: '5px 0', color: '#555' }}>Size: {item.size}</p>
//                 </div>
//                 <button
//                   style={{
//                     backgroundColor: '#ff4d4d',
//                     border: 'none',
//                     color: 'white',
//                     padding: '5px 10px', // Smaller button size
//                     borderRadius: '5px',
//                     fontSize: '14px',
//                     cursor: 'pointer',
//                     transition: 'background-color 0.3s'
//                   }}
//                   onClick={() => handleRemoveItem(item.name)}
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div style={{ textAlign: 'right', marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '15px' }}>
//             <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>Total Price: ${totalAmount.toFixed(2)}</h3>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
//             <button
//               style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '12px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', flex: '1', marginRight: '10px' }}
//               onClick={clearCart}
//             >
//               Clear Cart
//             </button>
//             <button
//               style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '12px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', flex: '1' }}
//               onClick={handlePaymentRedirect}
//             >
//               Make Payment
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;
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
