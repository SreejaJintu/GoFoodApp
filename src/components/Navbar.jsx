//navbar-light bg-light
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import "./Navbar.css";

function Navbar() {
  const { cart } = useStore();

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link className="nav-link" to="/">
              Home
            </Link>
            {localStorage.getItem("authToken") && (
              <>
                <Link className="nav-link" to="/myorders">
                  My Orders
                </Link>
                <Link
                  to="/myprofile"
                  className="nav-link d-flex align-items-center"
                  style={{ textDecoration: "none" }}
                >
                  <i className="bi bi-person-circle fs-5"></i>
                </Link>
              </>
            )}
          </div>
          <div className="d-flex align-items-center">
            {!localStorage.getItem("authToken") ? (
              <>
                <Link className="btn btn-outline-secondary mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-secondary mx-1" to="/signin">
                  Signin
                </Link>
              </>
            ) : (
              <div className="d-flex gap-2 align-items-center">
                <Link
                  to="/cart"
                  className="nav-link position-relative"
                  style={{ textDecoration: "none" }}
                >
                  My Cart
                  {cart.length > 0 && (
                    <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart.length}
                      <span className="visually-hidden">cart items</span>
                    </span>
                  )}
                </Link>
                <Link
                  to="/"
                  className="nav-link text-danger"
                  style={{ textDecoration: "none" }}
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
      </div>
    </nav>
  );
}

export default Navbar;
