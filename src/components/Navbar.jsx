import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          {(!localStorage.getItem("authToken")) ? (
            <div className="d-flex">
              <Link className="btn bg-grey text-secondary mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-grey text-secondary mx-1" to="/signin">
                Signin
              </Link>
            </div>
          ) : (
            <div className="d-flex">

              <button className="btn bg-grey text-secondary mx-1"> My Cart</button>              
              <button
                className="btn bg-grey text-danger mx-1"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  window.location.reload(); // Reload to reflect logout state
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
