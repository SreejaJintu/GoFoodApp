// import React, { useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { UserContext } from '../context/userContext'; // Import the UserContext

// function Profile() {
//   const { user, setUser } = useContext(UserContext); // Access user data from context
//   const [profile, setProfile] = useState({ name: '', email: '' });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (user) {
//       setProfile({ name: user.name || '', email: user.email || '' });
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem('authToken');
//       const backendURL = process.env.REACT_APP_BACKEND_URL;

//       const response = await axios.put(
//         `${backendURL}/user/profile`,
//         profile,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(response.data.message);
//       setError('');

//       // Update user context with the new profile data
//       setUser((prev) => ({ ...prev, ...profile }));
//       localStorage.setItem('user', JSON.stringify({ ...user, ...profile }));
//     } catch (err) {
//       setMessage('');
//       setError(err.response?.data?.message || 'Error updating profile');
//     }
//   };

//   return (
//     <div>
//       <h2>Update Profile</h2>
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           value={profile.name}
//           onChange={handleInputChange}
//           placeholder="Name"
//         />
//         <input
//           type="email"
//           name="email"
//           value={profile.email}
//           onChange={handleInputChange}
//           placeholder="Email"
//         />
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// }

// export default Profile;

// useEffect(() => {
//   console.log("User from context:", user);
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   if (storedUser) {
//     setUser(storedUser);
//     setProfile({
//       name: storedUser.name || "",
//       email: storedUser.email || "",
//       shippingAddress: {
//         addressLine1: storedUser.shippingAddress?.addressLine1 || "",
//         city: storedUser.shippingAddress?.city || "",
//         zipCode: storedUser.shippingAddress?.zipCode || "",
//       },
//     });
//   }
// }, [setUser, user]);
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "../context/StoreContext";
import "./Profile.css";

function Profile() {
  const { user, setUser } = useStore();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    shippingAddress: {
      addressLine1: "",
      city: "",
      zipCode: "",
    },
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        shippingAddress: {
          addressLine1: user.shippingAddress?.addressLine1 || "",
          city: user.shippingAddress?.city || "",
          zipCode: user.shippingAddress?.zipCode || "",
        },
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("shippingAddress.")) {
      const field = name.split(".")[1];
      setProfile((prev) => ({
        ...prev,
        shippingAddress: { ...prev.shippingAddress, [field]: value },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    
    console.log("Submitting Profile Update Payload:", profile);


    try {
      
      const token = localStorage.getItem('authToken');
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.put(
        `${backendURL}/user/profile`,
        profile,
        {
          headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
        }
      );

      const updatedUser = response.data.user;
      setUser(updatedUser);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2 className="profile-header">Update Profile</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <h5 className="mt-4">Shipping Address</h5>
          <div className="form-group">
            <label htmlFor="addressLine1">Address Line 1</label>
            <input
              type="text"
              id="addressLine1"
              name="shippingAddress.addressLine1"
              value={profile.shippingAddress.addressLine1}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter Address Line 1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="shippingAddress.city"
              value={profile.shippingAddress.city}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter City"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="shippingAddress.zipCode"
              value={profile.shippingAddress.zipCode}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter Zip Code"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
