import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import "./Navbar.css";

function Navbar() {
  const { cart } = useStore(); 
  // const storedUser = localStorage.getItem('user');
  // const user = storedUser ? JSON.parse(storedUser) : null;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
             
     
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
      {/* {user?.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <span>Welcome, {user.name}</span>
      )} */}
    
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link className="nav-link" to="/myorders">
                  My Orders
                </Link>
              </li>
            )}
            
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-grey text-secondary mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-grey text-secondary mx-1" to="/signin">
                Signin
              </Link>
            </div>
          ) : (
            <div className="d-flex gap-2 align-items-center">
  <Link to="/cart" className="cart-link" style={{ textDecoration: 'none' }}>
    My Cart
    {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
  </Link>

  <Link
    to="/"
    className="text-bold text-danger mx-2"
    style={{ textDecoration: 'none' }}
    onClick={() => {
      localStorage.removeItem("authToken");
      window.location.reload();
    }}
  >
    Logout
  </Link>
</div>

          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
