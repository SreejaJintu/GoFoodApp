import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="py-4 mt-5"
      style={{
        backgroundColor: "#222",
        color: "#fff",
        borderTop: "1px solid #444",
      }}
    >
      <ul className="nav justify-content-center pb-3 mb-3">
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link px-3"
            style={{ color: "#bbb", textDecoration: "none" }}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/features"
            className="nav-link px-3"
            style={{ color: "#bbb", textDecoration: "none" }}
          >
            Features
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/pricing"
            className="nav-link px-3"
            style={{ color: "#bbb", textDecoration: "none" }}
          >
            Pricing
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/faqs"
            className="nav-link px-3"
            style={{ color: "#bbb", textDecoration: "none" }}
          >
            FAQs
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/about"
            className="nav-link px-3"
            style={{ color: "#bbb", textDecoration: "none" }}
          >
            About
          </Link>
        </li>
      </ul>
      <p className="text-center" style={{ color: "#777", fontSize: "0.9rem" }}>
        © 2021 Company, Inc. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
