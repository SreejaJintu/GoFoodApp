import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext'; 


export default function Login() {
  let navigate = useNavigate();
  const { setUser } = useContext(StoreContext);
  const [inputs, setInputs] = useState({ name: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const backendURL = process.env.REACT_APP_BACKEND_URL;

try {
  const response = await fetch(`${backendURL}/user/login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(inputs),
  });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Login successful!');
        localStorage.setItem('authToken', data.token); 
        console.log('token ===',data.token)
        localStorage.setItem('userId', data.userId);
        console.log('userId ===',data.userId)
        localStorage.setItem('role', data.role); 
        console.log('role ===',data.role)

        localStorage.setItem(
          'user',
          JSON.stringify({
            token: data.token,
            role: data.role,
            userId: data.userId,
            name: data.name,
            email: data.email,
            shippingAddress:data.shippingAddress
          })
        );
        setUser({
          token: data.token,
          role: data.role,
          userId: data.userId,
          name: data.name,
          email: data.email,
          shippingAddress:data.shippingAddress

        });
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
        console.log('Navigating to:', data.role === 'admin' ? '/admin' : '/');

    
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useStore } from '../context/StoreContext'; // Import the StoreContext

// export default function Login() {
//   let navigate = useNavigate();
//   const { setUser } = useStore(); // Access the setUser function from the StoreContext
//   const [inputs, setInputs] = useState({ name: '', password: '' });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const backendURL = process.env.REACT_APP_BACKEND_URL;

//     try {
//       const response = await fetch(`${backendURL}/user/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(inputs),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Login successful!');
//         localStorage.setItem('authToken', data.token);
//         localStorage.setItem('userId', data.userId);
//         localStorage.setItem('role', data.role);

//         const userData = {
//           token: data.token,
//           role: data.role,
//           userId: data.userId,
//           name: data.name,
//           email: data.email,
//         };

//         localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
//         setUser(userData); // Update the user in StoreContext

//         // Redirect based on user role
//         if (data.role === 'admin') {
//           navigate('/admin');
//         } else {
//           navigate('/');
//         }
//         console.log('Navigating to:', data.role === 'admin' ? '/admin' : '/');
//       } else {
//         setError(data.message || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
//         <h3 className="text-center mb-4">Login</h3>
//         {error && <div className="alert alert-danger" role="alert">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="exampleInputName" className="form-label">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               id="exampleInputName"
//               name="name"
//               value={inputs.name}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="exampleInputPassword1"
//               name="password"
//               value={inputs.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary w-100"
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
