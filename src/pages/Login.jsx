import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 

export default function Login() {
  let navigate = useNavigate();
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
  
        // Decode the token to get user details
        const decodedToken = jwtDecode(data.token); 
        localStorage.setItem('user', JSON.stringify({ role: decodedToken.role }));
  
        console.log(decodedToken.role); // You can use this role value in your app
        navigate('/');
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
