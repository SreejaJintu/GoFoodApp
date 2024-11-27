import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login() {

  let navigate=useNavigate()
  const [inputs, setInputs] = useState({ name:"", password: "" });

  // Handle input changes
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value }); // Remove unnecessary array brackets
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form...");
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      console.log("Response received:", data);
  
      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("authToken",response.json.token)
        console.log( localStorage.getItem("authToken"))
        navigate('/')
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (

    <div>
      <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
           Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>
  )
}
