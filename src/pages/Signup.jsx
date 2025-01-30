// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const backendURL = process.env.REACT_APP_BACKEND_URL;

//   const [inputs, setInputs] = useState({
//     name: "",
//     email: "",
//     password: "",
//     addressLine1: "",
//     city: "",
//     zipCode: "",
//   });

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${backendURL}/user/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: inputs.name,
//           email: inputs.email,
//           password: inputs.password,
//           shippingAddress: {
//             addressLine1: inputs.addressLine1,
//             city: inputs.city,
//             zipCode: inputs.zipCode,
//           },
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("authToken", data.token);
//         localStorage.setItem("userId", data.userId);
//         alert("Registration successful!");
//         navigate("/");
//       } else {
//         setError(data.message || "Registration failed. Please try again.");
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>
//         <h3 className="text-center mb-4">Signup</h3>
//         {error && <div className="alert alert-danger" role="alert">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               value={inputs.name}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               value={inputs.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={inputs.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               required
//               minLength="6"
//             />
//           </div>

//           {/* Shipping Address */}
//           <h5 className="mt-4">Shipping Address</h5>
//           <div className="mb-3">
//             <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
//             <input
//               type="text"
//               className="form-control"
//               id="addressLine1"
//               name="addressLine1"
//               value={inputs.addressLine1}
//               onChange={handleChange}
//               placeholder="Enter your address"
//               required
//             />
//           </div>
        
//           <div className="mb-3">
//             <label htmlFor="city" className="form-label">City</label>
//             <input
//               type="text"
//               className="form-control"
//               id="city"
//               name="city"
//               value={inputs.city}
//               onChange={handleChange}
//               required
//             />
//           </div>
         
//           <div className="mb-3">
//             <label htmlFor="zipCode" className="form-label">Zip Code</label>
//             <input
//               type="text"
//               className="form-control"
//               id="zipCode"
//               name="zipCode"
//               value={inputs.zipCode}
//               onChange={handleChange}
//               required
//             />
//           </div>
         
         

//           <button
//             type="submit"
//             className="btn btn-primary w-100"
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Signup"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext"; // Import the context hook

function Signup() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const { setUser } = useStore(); // Extract setUser from context

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    addressLine1: "",
    city: "",
    zipCode: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendURL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
          shippingAddress: {
            addressLine1: inputs.addressLine1,
            city: inputs.city,
            zipCode: inputs.zipCode,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user details in localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);

        // Update context with the new user
        setUser({
          id: data.userId,
          name: inputs.name,
          email: inputs.email,
          shippingAddress: {
            addressLine1: inputs.addressLine1,
            city: inputs.city,
            zipCode: inputs.zipCode,
          },
        });

        alert("Registration successful!");
        navigate("/");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h3 className="text-center mb-4">Signup</h3>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              minLength="6"
            />
          </div>

          {/* Shipping Address */}
          <h5 className="mt-4">Shipping Address</h5>
          <div className="mb-3">
            <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              id="addressLine1"
              name="addressLine1"
              value={inputs.addressLine1}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={inputs.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="zipCode" className="form-label">Zip Code</label>
            <input
              type="text"
              className="form-control"
              id="zipCode"
              name="zipCode"
              value={inputs.zipCode}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

